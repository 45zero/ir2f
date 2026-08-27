import { createClient } from "@supabase/supabase-js"

let client: ReturnType<typeof createClient> | null = null

/** Client Supabase côté navigateur (clé publique anon), utilisé uniquement pour envoyer un
 * fichier vers une URL d'upload déjà signée côté serveur — jamais pour lire/écrire directement. */
export function getBrowserSupabase() {
  if (!client) {
    client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    })
  }
  return client
}
