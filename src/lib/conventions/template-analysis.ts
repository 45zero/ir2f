import "server-only"
import { PDFDocument as PDFLibDocument, StandardFonts } from "pdf-lib"
// Import statique (effet de bord) : évalue le worker et pose `globalThis.pdfjsWorker`, ce que le
// module principal détecte pour utiliser directement ce "fake worker" en mémoire plutôt que
// d'essayer de résoudre dynamiquement le fichier worker par son chemin — cette résolution
// dynamique casse une fois le code empaqueté par Turbopack (le fichier n'existe plus au chemin
// attendu dans .next/...). Import statique = Turbopack l'inclut correctement dans le bundle.
import "pdfjs-dist/legacy/build/pdf.worker.mjs"

// pdfjs-dist n'exporte que de l'ESM ; import dynamique pour rester compatible avec le
// bundling Next.js (module utilisé uniquement côté serveur, jamais dans le bundle client).
let pdfjsPromise: Promise<typeof import("pdfjs-dist/legacy/build/pdf.mjs")> | undefined

async function loadPdfjs() {
  if (!pdfjsPromise) pdfjsPromise = import("pdfjs-dist/legacy/build/pdf.mjs")
  return pdfjsPromise
}

export type DetectedFieldKind = "text" | "checkbox" | "signature"

export type DetectedField = {
  id: string
  kind: DetectedFieldKind
  page: number
  x: number
  y: number
  width: number
  height: number
  context: string
  suggestedRole?: "STAGIAIRE" | "CLUB" | "TUTEUR" | "MAITRE_DE_STAGE" | "RESPONSABLE_PEDAGOGIQUE"
}

const DOT_RUN = /\.{3,}/g
const CHECKBOX_CHAR = "□"
const CHECKBOX_WIDTH = 9
const SIGNATURE_DEFAULT_WIDTH = 190
const SIGNATURE_DEFAULT_HEIGHT = 65
const SIGNATURE_GAP_BELOW_CAPTION = 8

const ROLE_KEYWORDS: { pattern: RegExp; role: DetectedField["suggestedRole"] }[] = [
  { pattern: /ma[iî]tre[\s-]*de[\s-]*stage/i, role: "MAITRE_DE_STAGE" },
  { pattern: /tuteur/i, role: "TUTEUR" },
  { pattern: /stagiaire/i, role: "STAGIAIRE" },
  { pattern: /organisme de formation|responsable p[ée]dagogique/i, role: "RESPONSABLE_PEDAGOGIQUE" },
  { pattern: /structure agr[ée]{2}e|club/i, role: "CLUB" },
]

function guessRole(text: string): DetectedField["suggestedRole"] {
  for (const { pattern, role } of ROLE_KEYWORDS) {
    if (pattern.test(text)) return role
  }
  return undefined
}

/**
 * Analyse un PDF brut (sans champs de formulaire) et détecte mécaniquement les emplacements
 * probables : lignes en pointillés (texte à remplir), cases "□" (choix à cocher), légendes de
 * signature ("Signature du ..."). Ne devine jamais la variable exacte — fournit juste la position
 * et le texte de contexte, à valider par un humain (voir ConventionTemplateReview).
 */
export async function analyzeConventionPdf(pdfBytes: Uint8Array): Promise<DetectedField[]> {
  const pdfjs = await loadPdfjs()
  const helveticaDoc = await PDFLibDocument.create()
  const font = await helveticaDoc.embedFont(StandardFonts.Helvetica)

  // pdfjs-dist détache le buffer sous-jacent passé en "data" (transfert interne) — on lui donne
  // une copie pour ne jamais neutraliser le buffer d'origine du côté appelant.
  const doc = await pdfjs.getDocument({ data: pdfBytes.slice(), useSystemFonts: true }).promise
  const fields: DetectedField[] = []
  let counter = 0

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum)
    const content = await page.getTextContent()
    type Item = { str: string; x: number; y: number; width: number; height: number }
    const items: Item[] = []
    for (const it of content.items) {
      if (!("str" in it) || !it.str.trim()) continue
      const [, , , , x, y] = it.transform
      items.push({ str: it.str, x, y, width: it.width, height: it.height || 10 })
    }

    // --- lignes en pointillés (texte) ---
    for (const item of items) {
      if (!item.str.includes("...")) continue
      let m: RegExpExecArray | null
      DOT_RUN.lastIndex = 0
      while ((m = DOT_RUN.exec(item.str))) {
        const before = item.str.slice(0, m.index)
        const rectX = item.x + font.widthOfTextAtSize(before, item.height)
        const rectW = font.widthOfTextAtSize(m[0], item.height)
        let context = before.trim()
        if (!context) {
          const sameLine = items.find((o) => o !== item && Math.abs(o.y - item.y) < 1 && o.x < item.x && !o.str.includes("..."))
          context = sameLine?.str.trim() ?? ""
        }
        fields.push({
          id: `t${counter++}`,
          kind: "text",
          page: pageNum,
          x: rectX,
          y: item.y - 2,
          width: rectW,
          height: item.height + 3,
          context: context || "(sans contexte détecté)",
        })
      }
    }

    // --- cases à cocher "□" ---
    for (const item of items) {
      const idxList: number[] = []
      for (let i = 0; i < item.str.length; i++) if (item.str[i] === CHECKBOX_CHAR) idxList.push(i)
      for (const idx of idxList) {
        const before = item.str.slice(0, idx)
        const rectX = item.x + font.widthOfTextAtSize(before, item.height)
        const afterLabel = item.str.slice(idx + 1).trim()

        // La case et son libellé peuvent être scindés en plusieurs items sur la même ligne
        // (case seule à gauche, libellé juste après ; ou "□ Oui"/"□ Non" à droite d'un libellé de
        // ligne à gauche) — on complète le contexte avec les items voisins sur la même ligne.
        const before_ = items.find((o) => o !== item && Math.abs(o.y - item.y) < 1 && o.x < item.x)
        const after_ = items.find((o) => o !== item && Math.abs(o.y - item.y) < 1 && o.x > item.x)
        const context = [before_?.str.trim(), afterLabel || item.str.trim(), after_?.str.trim()].filter(Boolean).join(" — ")

        fields.push({
          id: `c${counter++}`,
          kind: "checkbox",
          page: pageNum,
          x: rectX,
          y: item.y - 2,
          width: CHECKBOX_WIDTH,
          height: item.height + 2,
          context,
        })
      }
    }

    // --- légendes de signature ---
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (!/signature/i.test(item.str)) continue
      // Le rôle se devine d'abord depuis la légende elle-même ; si ambigüe (ex. "Signature et
      // cachet du Président" répété pour le club ET l'organisme de formation), on élargit à un
      // voisinage restreint en x (même colonne) pour capter la ligne suivante qui désambiguïse.
      const ownRole = guessRole(item.str)
      const nearby = items
        .filter((o) => o.y <= item.y && item.y - o.y < 30 && Math.abs(o.x - item.x) < 180)
        .map((o) => o.str)
        .join(" ")
      fields.push({
        id: `s${counter++}`,
        kind: "signature",
        page: pageNum,
        x: item.x,
        y: item.y - SIGNATURE_GAP_BELOW_CAPTION - SIGNATURE_DEFAULT_HEIGHT,
        width: SIGNATURE_DEFAULT_WIDTH,
        height: SIGNATURE_DEFAULT_HEIGHT,
        context: nearby.trim() || item.str.trim(),
        suggestedRole: ownRole ?? guessRole(nearby),
      })
    }
  }

  return fields
}
