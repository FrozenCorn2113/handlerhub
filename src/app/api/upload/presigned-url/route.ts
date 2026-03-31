import { NextResponse } from 'next/server'

import { r2 } from '@/lib/r2'
import { getCurrentUser } from '@/lib/session'
import { validateUploadRequest } from '@/lib/upload-server-validation'

import { env } from '@/root/env.mjs'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const TARGET_PREFIXES: Record<string, (entityId: string) => string> = {
  'dog-photo': (id) => `dogs/${id}/`,
  'handler-profile': (id) => `handlers/${id}/profile/`,
  'handler-cover': (id) => `handlers/${id}/cover/`,
  'handler-gallery': (id) => `handlers/${id}/gallery/`,
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { contentType, contentLength, target, entityId } =
      await request.json()

    if (!contentType || !contentLength || !target || !entityId) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: contentType, contentLength, target, entityId.',
        },
        { status: 400 }
      )
    }

    const validation = validateUploadRequest(contentType, contentLength)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 })
    }

    const prefixFn = TARGET_PREFIXES[target]
    if (!prefixFn) {
      return NextResponse.json(
        { error: `Invalid target "${target}".` },
        { status: 400 }
      )
    }

    const ext =
      contentType === 'image/webp'
        ? 'webp'
        : contentType === 'image/png'
          ? 'png'
          : 'jpg'
    const key = `${prefixFn(entityId)}${crypto.randomUUID()}.${ext}`

    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: key,
        ContentType: contentType,
        ContentLength: contentLength,
      }),
      { expiresIn: 60 }
    )

    const publicUrl = `${env.NEXT_PUBLIC_R2_DEV_URL}/${key}`

    return NextResponse.json({ url: signedUrl, key, publicUrl })
  } catch (error) {
    console.error('Error generating presigned URL:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
