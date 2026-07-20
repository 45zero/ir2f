import "server-only"
import { getFormationOnglets, getFormationTuiles, type FormationOngletData, type FormationTuileData } from "@/lib/formations"
import { ONGLET_KEYS, ongletKeyId, type OngletKey } from "@/lib/formations-page-shared"

export type AdminFormationTuile = FormationTuileData

export async function getAllFormationTuilesAdmin(): Promise<AdminFormationTuile[]> {
  return getFormationTuiles()
}

export type AdminFormationOnglet = OngletKey & FormationOngletData

export async function getAllFormationOngletsAdmin(): Promise<AdminFormationOnglet[]> {
  const byKey = await getFormationOnglets()
  return ONGLET_KEYS.map((key) => ({ ...key, ...byKey[ongletKeyId(key.categorie, key.onglet)] }))
}
