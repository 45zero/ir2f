import "server-only"
import { randomInt } from "node:crypto"

const TEMP_PASSWORD_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"

export function generateTempPassword(length = 12): string {
  let out = ""
  for (let i = 0; i < length; i++) {
    out += TEMP_PASSWORD_CHARS[randomInt(TEMP_PASSWORD_CHARS.length)]
  }
  return out
}
