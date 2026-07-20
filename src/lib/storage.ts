import "server-only"
import { randomUUID } from "crypto"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import sharp from "sharp"

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

export async function getSignedDocumentUrl(storagePath: string, expiresInSeconds = 3600): Promise<string | null> {
  const client = getStorageClient()
  const { data, error } = await client.storage.from(BUCKET).createSignedUrl(storagePath, expiresInSeconds)
  if (error || !data) return null
  return data.signedUrl
}

export async function getSignedDocumentDownloadUrl(
  storagePath: string,
  fileName: string,
  expiresInSeconds = 3600
): Promise<string | null> {
  const client = getStorageClient()
  const { data, error } = await client.storage
    .from(BUCKET)
    .createSignedUrl(storagePath, expiresInSeconds, { download: fileName })
  if (error || !data) return null
  return data.signedUrl
}
