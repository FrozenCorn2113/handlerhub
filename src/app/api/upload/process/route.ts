import { NextResponse } from 'next/server'

import { processImage } from '@/lib/image-processing'
import { r2 } from '@/lib/r2'
import { getCurrentUser } from '@/lib/session'
import { validateFileBuffer } from '@/lib/upload-server-validation'

import { env } from '@/root/env.mjs'
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { key } = await request.json()
    if (!key || typeof key !== 'string') {
      return NextResponse.json(
        { error: 'Missing required field: key.' },
        { status: 400 }
      )
    }

    // Fetch original from R2
    const getRes = await r2.send(
      new GetObjectCommand({
        Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: key,
      })
    )

    if (!getRes.Body) {
      return NextResponse.json(
        { error: 'File not found in storage.' },
        { status: 404 }
      )
    }

    const buffer = Buffer.from(await getRes.Body.transformToByteArray())

    // Validate file via magic bytes before processing
    const validation = validateFileBuffer(buffer)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    // Process image into variants
    const { thumbnail, medium, original } = await processImage(buffer)

    // Build variant keys
    const keyWithoutExt = key.replace(/\.[^.]+$/, '')
    const thumbKey = `${keyWithoutExt}_thumb.webp`
    const medKey = `${keyWithoutExt}_med.webp`

    // Upload all variants (overwrite original with stripped metadata version)
    await Promise.all([
      r2.send(
        new PutObjectCommand({
          Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
          Key: key,
          Body: original,
          ContentType: getRes.ContentType ?? 'image/jpeg',
        })
      ),
      r2.send(
        new PutObjectCommand({
          Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
          Key: thumbKey,
          Body: thumbnail,
          ContentType: 'image/webp',
        })
      ),
      r2.send(
        new PutObjectCommand({
          Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
          Key: medKey,
          Body: medium,
          ContentType: 'image/webp',
        })
      ),
    ])

    const base = env.NEXT_PUBLIC_R2_DEV_URL
    return NextResponse.json({
      original: `${base}/${key}`,
      thumbnail: `${base}/${thumbKey}`,
      medium: `${base}/${medKey}`,
    })
  } catch (error) {
    console.error('Error processing image:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
