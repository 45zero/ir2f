import "server-only"
import {
  publishToFacebookPage,
  publishFacebookNativePhoto,
  publishFacebookNativeVideo,
  publishToInstagram,
  publishInstagramVideo,
} from "@/lib/social/graph"
import type { SocialAccount } from "@/lib/social/accounts"
import type { MediaMode } from "@/lib/social/publication"

/**
 * Route vers la bonne fonction Graph API selon la plateforme et le mode média choisi — partagé
 * entre la publication interactive (src/lib/actions/social-publish.ts) et le cron des publications
 * programmées, pour ne pas dupliquer cette logique de branchement.
 */
export async function publishToSocialAccount(
  compte: SocialAccount,
  message: string,
  entityUrl: string,
  mediaMode: MediaMode,
  mediaUrl: string | undefined
): Promise<{ postId: string }> {
  if (compte.plateforme === "FACEBOOK") {
    if (mediaMode === "LIEN") {
      return publishToFacebookPage(compte.externalId, compte.accessToken, { message, link: entityUrl })
    }
    if (!mediaUrl) throw new Error("Aucun média sélectionné.")
    const caption = `${message}\n\n${entityUrl}`
    return mediaMode === "VIDEO"
      ? publishFacebookNativeVideo(compte.externalId, compte.accessToken, { fileUrl: mediaUrl, description: caption })
      : publishFacebookNativePhoto(compte.externalId, compte.accessToken, { url: mediaUrl, caption })
  }

  if (!mediaUrl) throw new Error("Aucun média sélectionné — Instagram en nécessite un.")
  const caption = `${message}\n\n${entityUrl}`
  return mediaMode === "VIDEO"
    ? publishInstagramVideo(compte.externalId, compte.accessToken, { videoUrl: mediaUrl, caption })
    : publishToInstagram(compte.externalId, compte.accessToken, { imageUrl: mediaUrl, caption })
}
