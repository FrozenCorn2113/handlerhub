import { ALLOWED_TYPES, MAX_FILE_SIZE } from './upload-validation'

type ValidationResult = { valid: true } | { valid: false; error: string }

// Magic byte signatures for allowed image types
const MAGIC_BYTES: Record<string, { offset: number; bytes: number[] }[]> = {
  'image/jpeg': [{ offset: 0, bytes: [0xff, 0xd8, 0xff] }],
  'image/png': [{ offset: 0, bytes: [0x89, 0x50, 0x4e, 0x47] }],
  'image/webp': [
    // RIFF....WEBP (bytes at offset 0 and 8)
    { offset: 0, bytes: [0x52, 0x49, 0x46, 0x46] },
    { offset: 8, bytes: [0x57, 0x45, 0x42, 0x50] },
  ],
}

/**
 * Validate file type by inspecting magic bytes rather than trusting
 * the Content-Type header or file extension.
 */
export function validateMagicBytes(
  buffer: Buffer
): ValidationResult & { detectedType?: string } {
  if (buffer.length < 12) {
    return { valid: false, error: 'File too small to identify.' }
  }

  for (const [mimeType, signatures] of Object.entries(MAGIC_BYTES)) {
    const matches = signatures.every((sig) =>
      sig.bytes.every((byte, i) => buffer[sig.offset + i] === byte)
    )
    if (matches) {
      return { valid: true, detectedType: mimeType }
    }
  }

  return {
    valid: false,
    error:
      'File does not match any allowed image type (checked via magic bytes).',
  }
}

/**
 * Server-side validation for presigned URL requests.
 * Validates declared content type and size before granting upload access.
 */
export function validateUploadRequest(
  contentType: string,
  contentLength: number
): ValidationResult {
  if (!ALLOWED_TYPES.includes(contentType as (typeof ALLOWED_TYPES)[number])) {
    return {
      valid: false,
      error: `Invalid content type "${contentType}". Allowed: ${ALLOWED_TYPES.join(', ')}.`,
    }
  }

  if (typeof contentLength !== 'number' || contentLength <= 0) {
    return { valid: false, error: 'Content length must be greater than 0.' }
  }

  if (contentLength > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large (${(contentLength / 1024 / 1024).toFixed(1)}MB). Max: ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(0)}MB.`,
    }
  }

  return { valid: true }
}

/**
 * Full server-side validation for a file buffer already in memory.
 * Checks both size and magic bytes.
 */
export function validateFileBuffer(buffer: Buffer): ValidationResult {
  if (buffer.length > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large (${(buffer.length / 1024 / 1024).toFixed(1)}MB). Max: ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(0)}MB.`,
    }
  }

  const magicResult = validateMagicBytes(buffer)
  if (!magicResult.valid) {
    return magicResult
  }

  return { valid: true }
}
