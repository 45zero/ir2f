import "server-only"

export function str(formData: FormData, key: string): string {
  return (formData.get(key) as string | null)?.trim() ?? ""
}

export function optionalStr(formData: FormData, key: string): string | null {
  const v = str(formData, key)
  return v.length > 0 ? v : null
}

export function optionalNumber(formData: FormData, key: string): number | null {
  const v = str(formData, key)
  if (v.length === 0) return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

export function parseJsonArray<T>(formData: FormData, key: string): T[] {
  const raw = formData.get(key) as string | null
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
