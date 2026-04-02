export const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const
export const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'] as const
export const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

type ValidationResult = { valid: boolean; error?: string }

export function validateFile(file: File): ValidationResult {
  if (!ALLOWED_TYPES.includes(file.type as (typeof ALLOWED_TYPES)[number])) {
    return {
      valid: false,
      error: `Invalid file type "${file.type}". Allowed: JPG, PNG, WebP.`,
    }
  }

  const ext = '.' + file.name.split('.').pop()?.toLowerCase()
  if (
    !ALLOWED_EXTENSIONS.includes(ext as (typeof ALLOWED_EXTENSIONS)[number])
  ) {
    return {
      valid: false,
      error: `Invalid file extension "${ext}". Allowed: ${ALLOWED_EXTENSIONS.join(', ')}.`,
    }
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max: 5MB.`,
    }
  }

  return { valid: true }
}
