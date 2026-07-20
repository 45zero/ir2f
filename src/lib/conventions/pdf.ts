import "server-only"
import { PDFDocument, PDFTextField, type PDFField, type PDFPage } from "pdf-lib"

export type ConventionVariables = Record<string, string>

/** Remplit les champs de formulaire du modèle dont le nom correspond à une variable connue. Les champs absents du modèle (ou les champs-emplacements de signature, laissés vides) sont ignorés. */
export async function fillConventionTemplate(templateBytes: Uint8Array, variables: ConventionVariables): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(templateBytes)
  const form = pdfDoc.getForm()

  for (const [key, value] of Object.entries(variables)) {
    const field = form.getFieldMaybe(key)
    if (field instanceof PDFTextField) field.setText(value)
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
 * Incruste une image de signature (PNG) sur l'emplacement du champ-signature donné, puis retire
 * ce seul champ du formulaire — l'image fait désormais partie du contenu de la page, et les
 * champs-signature des étapes suivantes restent intacts pour être localisés à leur tour.
 */
export async function stampSignature(pdfBytes: Uint8Array, fieldName: string, signaturePngBytes: Uint8Array): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes)
  const form = pdfDoc.getForm()
  const field = form.getField(fieldName)
  const { page, rect } = findWidgetPageAndRect(pdfDoc, field)

  const image = await pdfDoc.embedPng(signaturePngBytes)
  const padding = 2
  const scale = Math.min((rect.width - padding * 2) / image.width, (rect.height - padding * 2) / image.height, 1)
  const drawWidth = image.width * scale
  const drawHeight = image.height * scale

  page.drawImage(image, {
    x: rect.x + (rect.width - drawWidth) / 2,
    y: rect.y + (rect.height - drawHeight) / 2,
    width: drawWidth,
    height: drawHeight,
  })

  form.removeField(field)

  return pdfDoc.save()
}

/** Aplatit le formulaire restant (appelée après la dernière signature) pour figer le PDF final. */
export async function finalizeConvention(pdfBytes: Uint8Array): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes)
  const form = pdfDoc.getForm()
  if (form.getFields().length > 0) form.flatten()
  return pdfDoc.save()
}

/** Liste les noms des champs de formulaire d'un PDF, pour vérifier qu'un modèle uploadé contient bien les champs attendus. */
export async function listTemplateFieldNames(templateBytes: Uint8Array): Promise<string[]> {
  const pdfDoc = await PDFDocument.load(templateBytes)
  return pdfDoc.getForm().getFields().map((f) => f.getName())
}
