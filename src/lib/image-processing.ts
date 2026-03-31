import sharp from 'sharp'

interface ProcessOptions {
  quality?: number
}

interface ProcessedImages {
  thumbnail: Buffer
  medium: Buffer
  original: Buffer
}

export async function processImage(
  buffer: Buffer,
  options?: ProcessOptions
): Promise<ProcessedImages> {
  const thumbQuality = options?.quality ?? 80
  const medQuality = options?.quality ?? 85

  const [thumbnail, medium, original] = await Promise.all([
    // Thumbnail: 200x200, cover, webp (Sharp strips metadata by default)
    sharp(buffer)
      .rotate() // auto-rotate based on EXIF before stripping
      .resize(200, 200, { fit: 'cover' })
      .webp({ quality: thumbQuality })
      .toBuffer(),

    // Medium: 600px wide, maintain aspect, webp
    sharp(buffer)
      .rotate()
      .resize(600, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: medQuality })
      .toBuffer(),

    // Original: strip EXIF via auto-rotate, re-encode to strip metadata
    sharp(buffer).rotate().toBuffer(),
  ])

  return { thumbnail, medium, original }
}
