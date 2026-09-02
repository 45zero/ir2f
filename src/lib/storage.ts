import "server-only"
import { randomUUID } from "crypto"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import sharp from "sharp"
import { VIDEOS_BUCKET } from "@/lib/storage-shared"

const BUCKET = "ir2f-documents"

function getStorageClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase Storage non configuré : SUPABASE_SERVICE_ROLE_KEY est manquante (voir .env)."
    )
  }
  return createClient(url, serviceRoleKey, { auth: { persistSession: false } })
}

let bucketEnsured = false

async function ensureBucket(client: SupabaseClient) {
  if (bucketEnsured) return
  const { data } = await client.storage.getBucket(BUCKET)
  if (!data) {
    await client.storage.createBucket(BUCKET, { public: false, fileSizeLimit: "20MB" })
  }
  bucketEnsured = true
}

export async function uploadDocumentFile(file: File, keyHint: string) {
  const client = getStorageClient()
  await ensureBucket(client)

  const ext = file.name.includes(".") ? file.name.split(".").pop() : "pdf"
  const storagePath = `${keyHint}/${randomUUID()}.${ext}`
  const bytes = await file.arrayBuffer()

  const { error } = await client.storage.from(BUCKET).upload(storagePath, bytes, {
    contentType: file.type || "application/pdf",
    upsert: false,
  })
  if (error) throw new Error(`Échec de l'upload du fichier : ${error.message}`)

  return { storagePath, mimeType: file.type || "application/pdf", taille: file.size }
}

const IMAGES_BUCKET = "ir2f-images"
let imagesBucketEnsured = false

async function ensureImagesBucket(client: SupabaseClient) {
  if (imagesBucketEnsured) return
  const { data } = await client.storage.getBucket(IMAGES_BUCKET)
  if (!data) {
    await client.storage.createBucket(IMAGES_BUCKET, { public: true, fileSizeLimit: "8MB" })
  }
  imagesBucketEnsured = true
}

const IMAGE_MAX_DIMENSION = 1920
const IMAGE_TARGET_BYTES = 2 * 1024 * 1024

/**
 * Filet de sécurité côté serveur : redimensionne/compresse toute image publique avant
 * stockage, même si la compression déjà faite dans le navigateur a été contournée. Garantit
 * qu'aucune image servie publiquement ne dépasse ~2 Mo, quelle que soit la taille envoyée.
 * Les images avec transparence (logos) restent en PNG pour ne pas perdre le fond transparent.
 */
async function compressForStorage(bytes: ArrayBuffer, mimeType: string): Promise<{ buffer: Buffer; contentType: string; ext: string }> {
  if (mimeType === "image/svg+xml") {
    return { buffer: Buffer.from(bytes), contentType: mimeType, ext: "svg" }
  }

  const input = Buffer.from(bytes)
  const resizeOptions = { width: IMAGE_MAX_DIMENSION, height: IMAGE_MAX_DIMENSION, fit: "inside" as const, withoutEnlargement: true }
  const metadata = await sharp(input).metadata()

  if (metadata.hasAlpha) {
    const output = await sharp(input).rotate().resize(resizeOptions).png({ compressionLevel: 9, effort: 10 }).toBuffer()
    return { buffer: output, contentType: "image/png", ext: "png" }
  }

  let quality = 85
  let output = await sharp(input).rotate().resize(resizeOptions).jpeg({ quality, mozjpeg: true }).toBuffer()

  while (output.length > IMAGE_TARGET_BYTES && quality > 35) {
    quality -= 12
    output = await sharp(input).rotate().resize(resizeOptions).jpeg({ quality, mozjpeg: true }).toBuffer()
  }

  return { buffer: output, contentType: "image/jpeg", ext: "jpg" }
}

export async function uploadPublicImage(file: File, keyHint: string): Promise<string> {
  const client = getStorageClient()
  await ensureImagesBucket(client)

  const bytes = await file.arrayBuffer()
  const { buffer, contentType, ext } = await compressForStorage(bytes, file.type || "image/jpeg")
  const storagePath = `${keyHint}/${randomUUID()}.${ext}`

  const { error } = await client.storage.from(IMAGES_BUCKET).upload(storagePath, buffer, {
    contentType,
    upsert: false,
  })
  if (error) throw new Error(`Échec de l'upload de l'image : ${error.message}`)

  const { data } = client.storage.from(IMAGES_BUCKET).getPublicUrl(storagePath)
  return data.publicUrl
}

/** Récupère l'URL d'une image envoyée en fichier (champ `${fieldName}File`), ou reprend l'URL existante (champ `fieldName`). */
export async function resolveImageUrl(formData: FormData, fieldName: string, keyHint: string): Promise<string | null> {
  const file = formData.get(`${fieldName}File`)
  if (file instanceof File && file.size > 0) {
    return uploadPublicImage(file, keyHint)
  }
  const existing = (formData.get(fieldName) as string | null)?.trim()
  return existing || null
}

const PDFS_BUCKET = "ir2f-public-pdfs"
let pdfsBucketEnsured = false

async function ensurePdfsBucket(client: SupabaseClient) {
  if (pdfsBucketEnsured) return
  const { data } = await client.storage.getBucket(PDFS_BUCKET)
  if (!data) {
    await client.storage.createBucket(PDFS_BUCKET, { public: true, fileSizeLimit: "20MB" })
  }
  pdfsBucketEnsured = true
}

export async function uploadPublicPdf(file: File, keyHint: string): Promise<string> {
  const client = getStorageClient()
  await ensurePdfsBucket(client)

  const storagePath = `${keyHint}/${randomUUID()}.pdf`
  const bytes = await file.arrayBuffer()

  const { error } = await client.storage.from(PDFS_BUCKET).upload(storagePath, bytes, {
    contentType: "application/pdf",
    upsert: false,
  })
  if (error) throw new Error(`Échec de l'upload du PDF : ${error.message}`)

  const { data } = client.storage.from(PDFS_BUCKET).getPublicUrl(storagePath)
  return data.publicUrl
}

/** Récupère l'URL d'un PDF envoyé en fichier (champ `${fieldName}File`), ou reprend l'URL existante (champ `fieldName`). */
export async function resolvePdfUrl(formData: FormData, fieldName: string, keyHint: string): Promise<string | null> {
  const file = formData.get(`${fieldName}File`)
  if (file instanceof File && file.size > 0) {
    return uploadPublicPdf(file, keyHint)
  }
  const existing = (formData.get(fieldName) as string | null)?.trim()
  return existing || null
}

/** Comme uploadPublicPdf, mais conserve l'extension/le type MIME réels du fichier (PDF ou DOCX). */
export async function uploadPublicDocument(file: File, keyHint: string): Promise<string> {
  const client = getStorageClient()
  await ensurePdfsBucket(client)

  const ext = file.name.includes(".") ? file.name.split(".").pop() : "pdf"
  const storagePath = `${keyHint}/${randomUUID()}.${ext}`
  const bytes = await file.arrayBuffer()

  const { error } = await client.storage.from(PDFS_BUCKET).upload(storagePath, bytes, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  })
  if (error) throw new Error(`Échec de l'upload du document : ${error.message}`)

  const { data } = client.storage.from(PDFS_BUCKET).getPublicUrl(storagePath)
  return data.publicUrl
}

export async function resolveDocumentUrl(formData: FormData, fieldName: string, keyHint: string): Promise<string | null> {
  const file = formData.get(`${fieldName}File`)
  if (file instanceof File && file.size > 0) {
    return uploadPublicDocument(file, keyHint)
  }
  const existing = (formData.get(fieldName) as string | null)?.trim()
  return existing || null
}

let videosBucketEnsured = false

async function ensureVideosBucket(client: SupabaseClient) {
  if (videosBucketEnsured) return
  const { data } = await client.storage.getBucket(VIDEOS_BUCKET)
  if (!data) {
    await client.storage.createBucket(VIDEOS_BUCKET, { public: true, fileSizeLimit: "200MB" })
  }
  videosBucketEnsured = true
}

/**
 * Les vidéos sont trop volumineuses pour transiter par une Server Action (Vercel plafonne le
 * corps des requêtes à ~4,5 Mo) : on génère ici une URL d'upload signée, que le navigateur
 * utilise ensuite pour envoyer le fichier directement à Supabase Storage, sans passer par notre
 * serveur. Voir VideoField.tsx (upload) et video-upload.ts (action qui appelle cette fonction).
 */
export async function createVideoUploadTarget(
  keyHint: string,
  fileName: string
): Promise<{ storagePath: string; token: string; publicUrl: string }> {
  const client = getStorageClient()
  await ensureVideosBucket(client)

  const ext = fileName.includes(".") ? fileName.split(".").pop() : "mp4"
  const storagePath = `${keyHint}/${randomUUID()}.${ext}`

  const { data, error } = await client.storage.from(VIDEOS_BUCKET).createSignedUploadUrl(storagePath)
  if (error || !data) throw new Error(`Échec de la préparation de l'upload vidéo : ${error?.message ?? "erreur inconnue"}`)

  const { data: publicData } = client.storage.from(VIDEOS_BUCKET).getPublicUrl(storagePath)
  return { storagePath, token: data.token, publicUrl: publicData.publicUrl }
}

export async function downloadStorageFile(storagePath: string): Promise<Buffer> {
  const client = getStorageClient()
  const { data, error } = await client.storage.from(BUCKET).download(storagePath)
  if (error || !data) throw new Error(`Échec du téléchargement du fichier : ${error?.message ?? "introuvable"}`)
  return Buffer.from(await data.arrayBuffer())
}

/** Upload générique d'octets déjà en mémoire (PDF généré, image de signature) dans le bucket documents. */
export async function uploadBytes(bytes: Uint8Array, storagePath: string, contentType: string): Promise<{ storagePath: string }> {
  const client = getStorageClient()
  await ensureBucket(client)
  const { error } = await client.storage.from(BUCKET).upload(storagePath, bytes, { contentType, upsert: true })
  if (error) throw new Error(`Échec de l'upload du fichier : ${error.message}`)
  return { storagePath }
}

export async function getSignedDocumentUrl(storagePath: string, expiresInSeconds = 3600): Promise<string | null> {
  const client = getStorageClient()
  const { data, error } = await client.storage.from(BUCKET).createSignedUrl(storagePath, expiresInSeconds)
  if (error || !data) return null
  return data.signedUrl
}

// Le nom affiché (saisi librement en admin, ex. "CALENDRIER FIA 26/27") sert de nom de fichier
// au téléchargement : un "/" (ou tout autre caractère interdit dans un nom de fichier) le fait
// interpréter comme un séparateur de dossier par certains navigateurs, ce qui donne un fichier
// tronqué/inexploitable une fois enregistré. On neutralise ces caractères et on force l'extension
// du fichier stocké (déduite de storagePath) si le nom saisi ne l'a pas déjà.
function sanitizeDownloadFileName(fileName: string, storagePath: string): string {
  const safeName = fileName.replace(/[\\/:*?"<>|]+/g, "-").trim()
  const ext = storagePath.split(".").pop()
  if (!ext) return safeName
  return safeName.toLowerCase().endsWith(`.${ext.toLowerCase()}`) ? safeName : `${safeName}.${ext}`
}

export async function getSignedDocumentDownloadUrl(
  storagePath: string,
  fileName: string,
  expiresInSeconds = 3600
): Promise<string | null> {
  const client = getStorageClient()
  const { data, error } = await client.storage
    .from(BUCKET)
    .createSignedUrl(storagePath, expiresInSeconds, { download: sanitizeDownloadFileName(fileName, storagePath) })
  if (error || !data) return null
  return data.signedUrl
}
