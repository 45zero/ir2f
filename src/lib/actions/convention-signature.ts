"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import crypto from "crypto"
import { prisma } from "@/lib/prisma"
import { downloadStorageFile, uploadBytes } from "@/lib/storage"
import { fillConventionTemplate, stampSignature, stampCheckmark, finalizeConvention } from "@/lib/conventions/pdf"
import { SIGNATURE_FIELD_NAMES, NATURE_INTERVENTION_OPTIONS, OBJECTIF_PEDAGOGIQUE_FIELDS, formatAdresseLigne } from "@/lib/conventions/variables"
import { notifyAdminSignatureProgress } from "@/lib/emails/convention-notifications"
import { avancerConvention } from "@/lib/actions/conventions"
import { str, optionalStr } from "@/lib/actions/form-utils"

export type SignatureActionState = { error: string | null; success: boolean }

async function loadActionableSignataire(token: string) {
  const signataire = await prisma.conventionSignataire.findUnique({
    where: { token },
    include: { conventionStagiaire: { include: { formation: { select: { id: true, titre: true } } } } },
  })
  const error =
    !signataire
      ? "Ce lien de signature est invalide."
      : signataire.statut === "SIGNE"
        ? "Cette étape a déjà été signée."
        : signataire.statut === "REFUSE"
          ? "Cette étape a été refusée. Contactez l'administrateur IR2F."
          : signataire.statut === "NON_ENVOYE"
            ? "Ce n'est pas encore votre tour de signer."
            : null

  return { signataire: error ? null : signataire, error }
}

export async function signerConvention(
  token: string,
  _prev: SignatureActionState | undefined,
  formData: FormData
): Promise<SignatureActionState> {
  const { signataire, error } = await loadActionableSignataire(token)
  if (error || !signataire) return { error: error ?? "Signataire introuvable.", success: false }
  const stagiaire = signataire.conventionStagiaire

  if (formData.get("consent") !== "on") return { error: "Vous devez cocher la case de consentement.", success: false }

  const signatureDataUrl = str(formData, "signatureImage")
  const base64 = signatureDataUrl.split(",")[1]
  if (!base64) return { error: "Merci de dessiner ou taper votre nom avant de signer.", success: false }
  const pngBytes = Buffer.from(base64, "base64")

  if (!stagiaire.pdfStoragePath) return { error: "Document introuvable.", success: false }

  // Chaque rôle renseigne certaines informations propres à lui-même en même temps que sa
  // signature (article 1/3 pour le stagiaire, coordonnées pour club/tuteur/maître de stage) — ces
  // réponses sont donc traitées uniquement à l'étape du rôle concerné.
  let natureIntervention: string[] = []
  let natureInterventionAutre: string | null = null
  let publicVise: string | null = null
  let publicNiveauSportif: string | null = null
  let objectifEncadrementSeul: boolean | null = null
  let objectifEncadrementAutonomie: boolean | null = null
  let objectifEncadrementPonctuel: boolean | null = null
  let clubRepresentantNom: string | null = null
  let clubRepresentantQualite: string | null = null
  let clubAdresse: string | null = null
  let clubCp: string | null = null
  let clubVille: string | null = null
  let tuteurQualite: string | null = null
  let tuteurAdresse: string | null = null
  let tuteurCp: string | null = null
  let tuteurVille: string | null = null
  let tuteurTelephone: string | null = null
  let tuteurQualification: string | null = null
  let maitreDeStageQualite: string | null = null

  if (signataire.role === "STAGIAIRE") {
    natureIntervention = formData.getAll("nature").map(String)
    natureInterventionAutre = natureIntervention.includes("AUTRE") ? optionalStr(formData, "natureAutreTexte") : null
    publicVise = optionalStr(formData, "publicVise")
    if (!publicVise) return { error: "Merci de préciser le public visé.", success: false }
    publicNiveauSportif = optionalStr(formData, "publicNiveauSportif")
    if (!publicNiveauSportif) return { error: "Merci de préciser le niveau sportif du public.", success: false }
    objectifEncadrementSeul = formData.get("objectif_seul") === "OUI"
    objectifEncadrementAutonomie = formData.get("objectif_autonomie") === "OUI"
    objectifEncadrementPonctuel = formData.get("objectif_ponctuel") === "OUI"

    await prisma.conventionStagiaire.update({
      where: { id: stagiaire.id },
      data: {
        natureIntervention,
        natureInterventionAutre,
        publicVise,
        publicNiveauSportif,
        objectifEncadrementSeul,
        objectifEncadrementAutonomie,
        objectifEncadrementPonctuel,
      },
    })
  }

  if (signataire.role === "CLUB") {
    clubRepresentantNom = optionalStr(formData, "clubRepresentantNom")
    clubRepresentantQualite = optionalStr(formData, "clubRepresentantQualite")
    clubAdresse = optionalStr(formData, "clubAdresse")
    clubCp = optionalStr(formData, "clubCp")
    clubVille = optionalStr(formData, "clubVille")
    if (!clubRepresentantNom || !clubRepresentantQualite || !clubAdresse || !clubCp || !clubVille) {
      return { error: "Merci de préciser le nom et la qualité du responsable, ainsi que l'adresse du club.", success: false }
    }

    await prisma.conventionStagiaire.update({
      where: { id: stagiaire.id },
      data: { clubRepresentantNom, clubRepresentantQualite, clubAdresse, clubCp, clubVille },
    })
  }

  if (signataire.role === "TUTEUR") {
    tuteurQualite = optionalStr(formData, "tuteurQualite")
    tuteurAdresse = optionalStr(formData, "tuteurAdresse")
    tuteurCp = optionalStr(formData, "tuteurCp")
    tuteurVille = optionalStr(formData, "tuteurVille")
    tuteurTelephone = optionalStr(formData, "tuteurTelephone")
    tuteurQualification = optionalStr(formData, "tuteurQualification")
    if (!tuteurQualite || !tuteurAdresse || !tuteurCp || !tuteurVille || !tuteurTelephone || !tuteurQualification) {
      return { error: "Merci de compléter vos informations avant de signer.", success: false }
    }

    await prisma.conventionStagiaire.update({
      where: { id: stagiaire.id },
      data: { tuteurQualite, tuteurAdresse, tuteurCp, tuteurVille, tuteurTelephone, tuteurQualification },
    })
  }

  if (signataire.role === "MAITRE_DE_STAGE") {
    maitreDeStageQualite = optionalStr(formData, "maitreDeStageQualite")
    if (!maitreDeStageQualite) return { error: "Merci de préciser votre qualité avant de signer.", success: false }

    await prisma.conventionStagiaire.update({
      where: { id: stagiaire.id },
      data: { maitreDeStageQualite },
    })
  }

  const signatureStoragePath = `conventions/signatures/${signataire.id}.png`
  await uploadBytes(pngBytes, signatureStoragePath, "image/png")

  const signedAt = new Date()
  let updatedPdf: Uint8Array = await downloadStorageFile(stagiaire.pdfStoragePath)

  if (signataire.role === "STAGIAIRE") {
    updatedPdf = await fillConventionTemplate(updatedPdf, {
      stagiaire_public_vise: publicVise ?? "",
      public_niveau_sportif: publicNiveauSportif ?? "",
      nature_intervention_autre_texte: natureInterventionAutre ?? "",
    })
    for (const option of NATURE_INTERVENTION_OPTIONS) {
      if (natureIntervention.includes(option.value)) updatedPdf = await stampCheckmark(updatedPdf, option.champ)
    }
    const objectifReponses = {
      objectifEncadrementSeul,
      objectifEncadrementAutonomie,
      objectifEncadrementPonctuel,
    }
    for (const o of OBJECTIF_PEDAGOGIQUE_FIELDS) {
      const reponse = objectifReponses[o.key as keyof typeof objectifReponses]
      updatedPdf = await stampCheckmark(updatedPdf, reponse ? o.champOui : o.champNon)
    }
  }

  if (signataire.role === "CLUB") {
    updatedPdf = await fillConventionTemplate(updatedPdf, {
      club_representant_nom: clubRepresentantNom ?? "",
      club_representant_qualite: clubRepresentantQualite ?? "",
      club_adresse: formatAdresseLigne(clubAdresse, clubCp, clubVille),
      club_cp: clubCp ?? "",
      club_ville: clubVille ?? "",
    })
  }

  if (signataire.role === "TUTEUR") {
    updatedPdf = await fillConventionTemplate(updatedPdf, {
      tuteur_qualite: tuteurQualite ?? "",
      tuteur_adresse: tuteurAdresse ?? "",
      tuteur_cp: tuteurCp ?? "",
      tuteur_ville: tuteurVille ?? "",
      tuteur_telephone: tuteurTelephone ?? "",
      tuteur_qualification: tuteurQualification ?? "",
    })
  }

  if (signataire.role === "MAITRE_DE_STAGE") {
    updatedPdf = await fillConventionTemplate(updatedPdf, {
      maitre_de_stage_qualite: maitreDeStageQualite ?? "",
    })
  }

  updatedPdf = await stampSignature(updatedPdf, SIGNATURE_FIELD_NAMES[signataire.role], pngBytes, signedAt)
  // Le tuteur peut être absent du circuit (email non renseigné, voir conventions.ts) : le nombre
  // réel de signataires varie donc d'un stagiaire à l'autre, pas de longueur fixe à 5. On compare
  // à la dernière étape effectivement créée pour CE stagiaire plutôt qu'à SIGNATAIRE_ORDER.length.
  const derniereEtape = await prisma.conventionSignataire.aggregate({
    where: { conventionStagiaireId: stagiaire.id },
    _max: { ordre: true },
  })
  if (signataire.ordre === derniereEtape._max.ordre) updatedPdf = await finalizeConvention(updatedPdf)
  await uploadBytes(updatedPdf, stagiaire.pdfStoragePath, "application/pdf")

  const hdrs = await headers()
  const ipAddress = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || hdrs.get("x-real-ip") || null
  const userAgent = hdrs.get("user-agent")
  const documentHash = crypto.createHash("sha256").update(updatedPdf).digest("hex")

  await prisma.conventionSignataire.update({
    where: { id: signataire.id },
    data: { statut: "SIGNE", signedAt, ipAddress, userAgent, documentHash, signatureStoragePath },
  })

  await avancerConvention(stagiaire.id, signataire.ordre)
  await notifyAdminSignatureProgress({
    formationTitre: stagiaire.formation.titre,
    stagiairePrenom: stagiaire.prenom,
    stagiaireNom: stagiaire.nom,
    role: signataire.role,
    refused: false,
  })

  revalidatePath(`/admin/formations/${stagiaire.formation.id}/conventions`)
  return { error: null, success: true }
}

export async function refuserConvention(
  token: string,
  _prev: SignatureActionState | undefined,
  formData: FormData
): Promise<SignatureActionState> {
  const { signataire, error } = await loadActionableSignataire(token)
  if (error || !signataire) return { error: error ?? "Signataire introuvable.", success: false }
  const stagiaire = signataire.conventionStagiaire
  const motif = optionalStr(formData, "motif")

  await prisma.conventionSignataire.update({
    where: { id: signataire.id },
    data: { statut: "REFUSE", refusedAt: new Date(), motifRefus: motif },
  })

  await notifyAdminSignatureProgress({
    formationTitre: stagiaire.formation.titre,
    stagiairePrenom: stagiaire.prenom,
    stagiaireNom: stagiaire.nom,
    role: signataire.role,
    refused: true,
    motif,
  })

  revalidatePath(`/admin/formations/${stagiaire.formation.id}/conventions`)
  return { error: null, success: true }
}
