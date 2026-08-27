"use server"

import { requireAdmin } from "@/lib/auth/guards"
import { createVideoUploadTarget } from "@/lib/storage"

/** Prépare un upload vidéo direct navigateur → Supabase Storage (voir storage.ts pour le pourquoi). */
export async function getVideoUploadTarget(keyHint: string, fileName: string) {
  await requireAdmin()
  return createVideoUploadTarget(keyHint, fileName)
}
