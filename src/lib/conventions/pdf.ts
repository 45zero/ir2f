import "server-only"
import {
  PDFDocument,
  PDFTextField,
  StandardFonts,
  rgb,
  PDFArray,
  PDFRawStream,
  PDFContentStream,
  PDFName,
  decodePDFRawStream,
  type PDFField,
  type PDFPage,
} from "pdf-lib"

const signedAtFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/Paris" })

/**
 * Fusionne le tableau `/Contents` d'une page (s'il en contient plusieurs) en un seul flux
 * physique. À chaque cycle load→modification→save, pdf-lib enveloppe le `/Contents` existant
 * dans une nouvelle paire d'opérateurs q/Q (voir `PDFPageLeaf.normalize`) sans jamais fusionner
 * les flux précédents : au fil des signatures successives (5 cycles indépendants sur le même
 * document), ce tableau s'empile et finit par produire un déséquilibre de pile graphique qui rend
 * un tampon invisible de façon imprévisible. Fusionner avant toute autre opération (avant que
 * `normalize()` ne se déclenche) neutralise l'empilement à la source.
 */
function consolidatePageContent(pdfDoc: PDFDocument, page: PDFPage): void {
  const contents = page.node.Contents()
  if (!(contents instanceof PDFArray)) return

  const chunks: Uint8Array[] = []
  for (let i = 0; i < contents.size(); i++) {
    const stream = pdfDoc.context.lookup(contents.get(i))
    if (stream instanceof PDFRawStream) {
      chunks.push(decodePDFRawStream(stream).decode())
    } else if (stream instanceof PDFContentStream) {
      chunks.push(stream.getUnencodedContents())
    }
    chunks.push(new Uint8Array([0x0a]))
  }

  const merged = new Uint8Array(chunks.reduce((sum, c) => sum + c.length, 0))
  let offset = 0
  for (const chunk of chunks) {
    merged.set(chunk, offset)
    offset += chunk.length
  }

  const ref = pdfDoc.context.register(pdfDoc.context.flateStream(merged, {}))
  page.node.set(PDFName.of("Contents"), pdfDoc.context.obj([ref]))
}

function consolidateAllPages(pdfDoc: PDFDocument): void {
  for (const page of pdfDoc.getPages()) consolidatePageContent(pdfDoc, page)
}

export type ConventionVariables = Record<string, string>

/**
 * Remplit les champs de formulaire du modèle dont le nom correspond à une variable connue. Les
 * champs absents du modèle (ou les champs-emplacements de signature, laissés vides) sont ignorés.
 *
 * Certains modèles (générés via PyMuPDF, voir mémo pipeline PDF) contiennent par erreur plusieurs
 * objets-champ distincts portant le même nom (ex. `stagiaire_nom_prenom` répété en page 1 et en
 * page 4 de "Le stagiaire M ___") au lieu d'un seul champ avec plusieurs widgets (`Kids`) — un
 * défaut d'AcroForm invalide que `form.getFieldMaybe` ne voit pas : il ne résout qu'UN seul des
 * objets-champ portant ce nom, laissant les autres occurrences vides. On regroupe donc les champs
 * par nom et on remplit toutes les occurrences plutôt que de se fier à la résolution par nom.
 */
export async function fillConventionTemplate(templateBytes: Uint8Array, variables: ConventionVariables): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(templateBytes)
  consolidateAllPages(pdfDoc)
  const form = pdfDoc.getForm()

  const fieldsByName = new Map<string, PDFField[]>()
  for (const field of form.getFields()) {
    const name = field.getName()
    const existing = fieldsByName.get(name)
    if (existing) existing.push(field)
    else fieldsByName.set(name, [field])
  }

  for (const [key, value] of Object.entries(variables)) {
    for (const field of fieldsByName.get(key) ?? []) {
      if (field instanceof PDFTextField) field.setText(value)
    }
  }

  return pdfDoc.save()
}

function findWidgetPageAndRect(pdfDoc: PDFDocument, field: PDFField): { page: PDFPage; rect: { x: number; y: number; width: number; height: number } } {
  const widget = field.acroField.getWidgets()[0]
  if (!widget) throw new Error(`Le champ "${field.getName()}" n'a pas d'emplacement dans le PDF.`)

  for (const page of pdfDoc.getPages()) {
    const annots = page.node.Annots()
    if (!annots) continue
    for (let i = 0; i < annots.size(); i++) {
      if (pdfDoc.context.lookup(annots.get(i)) === widget.dict) {
        return { page, rect: widget.getRectangle() }
      }
    }
  }
  throw new Error(`Impossible de localiser la page du champ "${field.getName()}" dans le PDF.`)
}

/**
 * Incruste une image de signature (PNG) sur l'emplacement du champ-signature donné, avec le nom
 * du signataire et la date/heure de signature imprimés à côté (visibles même à l'impression du
 * PDF), puis retire ce seul champ du formulaire — l'image et le texte font désormais partie du
 * contenu de la page, et les champs-signature des étapes suivantes restent intacts pour être
 * localisés à leur tour.
 *
 * Layout horizontal (image à gauche, nom + date empilés à droite) plutôt qu'un bandeau de date en
 * dessous de l'image : les emplacements de signature de ce modèle sont des lignes larges et basses
 * (~14pt de haut sur ~225pt de large, voir mémo pipeline PDF), donc réserver une hauteur fixe pour
 * la date au-dessus/en-dessous de l'image ne laissait quasiment plus de hauteur pour l'image
 * elle-même (tampon invisible en pratique). Le layout horizontal s'adapte à la forme réelle du
 * champ au lieu de supposer un champ haut et étroit.
 */
export async function stampSignature(
  pdfBytes: Uint8Array,
  fieldName: string,
  signaturePngBytes: Uint8Array,
  signedAt: Date,
  signerName?: string
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes)
  consolidateAllPages(pdfDoc)
  const form = pdfDoc.getForm()
  const field = form.getField(fieldName)
  const { page, rect } = findWidgetPageAndRect(pdfDoc, field)
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const padding = 2
  const labelLines = [signerName?.trim(), `Signé le ${signedAtFormatter.format(signedAt)}`].filter(
    (l): l is string => Boolean(l)
  )
  const labelFontSize = 7
  const labelLineHeight = labelFontSize + 1.5
  const labelWidth = labelLines.length > 0 ? Math.max(...labelLines.map((l) => font.widthOfTextAtSize(l, labelFontSize))) : 0
  const labelGap = labelLines.length > 0 ? 6 : 0

  const image = await pdfDoc.embedPng(signaturePngBytes)
  const availableHeight = rect.height - padding * 2
  const availableImageWidth = Math.max(rect.width - padding * 2 - labelGap - labelWidth, rect.width * 0.35)
  const scale = Math.min(availableImageWidth / image.width, availableHeight / image.height, 1)
  const drawWidth = image.width * scale
  const drawHeight = image.height * scale

  page.drawImage(image, {
    x: rect.x + padding,
    y: rect.y + (rect.height - drawHeight) / 2,
    width: drawWidth,
    height: drawHeight,
  })

  const labelsBlockHeight = labelLines.length * labelLineHeight
  let labelY = rect.y + (rect.height + labelsBlockHeight) / 2 - labelFontSize
  for (const [i, line] of labelLines.entries()) {
    page.drawText(line, {
      x: rect.x + padding + drawWidth + labelGap,
      y: labelY,
      size: labelFontSize,
      font: i === 0 && signerName ? boldFont : font,
      color: rgb(0.2, 0.23, 0.3),
    })
    labelY -= labelLineHeight
  }

  form.removeField(field)

  return pdfDoc.save()
}

/**
 * Coche une case (article 3 : nature de l'intervention, objectifs pédagogiques) en dessinant une
 * croix sur son emplacement, puis retire le champ-ancrage — même mécanique que stampSignature
 * mais sans image, juste un caractère « X ».
 */
export async function stampCheckmark(pdfBytes: Uint8Array, fieldName: string): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes)
  consolidateAllPages(pdfDoc)
  const form = pdfDoc.getForm()
  const field = form.getFieldMaybe(fieldName)
  if (!field) return pdfDoc.save()

  const { page, rect } = findWidgetPageAndRect(pdfDoc, field)
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  page.drawText("X", {
    x: rect.x + 1,
    y: rect.y + 1,
    size: rect.height,
    font,
    color: rgb(0.1, 0.1, 0.1),
  })

  form.removeField(field)

  return pdfDoc.save()
}

/** Aplatit le formulaire restant (appelée après la dernière signature) pour figer le PDF final. */
export async function finalizeConvention(pdfBytes: Uint8Array): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes)
  consolidateAllPages(pdfDoc)
  const form = pdfDoc.getForm()
  if (form.getFields().length > 0) form.flatten()
  return pdfDoc.save()
}

/** Liste les noms des champs de formulaire d'un PDF, pour vérifier qu'un modèle uploadé contient bien les champs attendus. */
export async function listTemplateFieldNames(templateBytes: Uint8Array): Promise<string[]> {
  const pdfDoc = await PDFDocument.load(templateBytes)
  return pdfDoc.getForm().getFields().map((f) => f.getName())
}
