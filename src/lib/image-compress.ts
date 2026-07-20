const MAX_DIMENSION = 1920
const TARGET_BYTES = 2 * 1024 * 1024

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Échec de la compression de l'image."))), type, quality)
  })
}

/** Détecte une transparence réelle dans l'image (échantillonnage par pas de 4 pixels, suffisant pour un logo/aplat). */
function hasTransparency(ctx: CanvasRenderingContext2D, width: number, height: number): boolean {
  const { data } = ctx.getImageData(0, 0, width, height)
  for (let i = 3; i < data.length; i += 16) {
    if (data[i] < 255) return true
  }
  return false
}

/** Redimensionne et compresse une image côté navigateur avant envoi, pour ne jamais dépasser la limite de taille du serveur.
 *  Les images avec transparence (logos) restent en PNG pour ne pas perdre le fond transparent. */
export async function compressImageFile(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") return file

  let bitmap: ImageBitmap
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" })
  } catch {
    bitmap = await createImageBitmap(file)
  }

  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height))
  const width = Math.max(1, Math.round(bitmap.width * scale))
  const height = Math.max(1, Math.round(bitmap.height * scale))

  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")
  if (!ctx) return file
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  const transparent = hasTransparency(ctx, width, height)

  let blob: Blob
  if (transparent) {
    // Le PNG n'a pas de réglage de qualité "avec perte" : le redimensionnement est la seule compression possible.
    blob = await canvasToBlob(canvas, "image/png")
  } else {
    let quality = 0.85
    blob = await canvasToBlob(canvas, "image/jpeg", quality)
    while (blob.size > TARGET_BYTES && quality > 0.35) {
      quality -= 0.12
      blob = await canvasToBlob(canvas, "image/jpeg", quality)
    }
  }

  // Si la compression n'a pas aidé (ex : petite image déjà optimisée), on garde l'original.
  if (blob.size >= file.size) return file

  const ext = transparent ? "png" : "jpg"
  const mimeType = transparent ? "image/png" : "image/jpeg"
  const newName = file.name.replace(/\.[^.]+$/, "") + "." + ext
  return new File([blob], newName, { type: mimeType })
}
