'use client'

import { useCallback, useRef, useState } from 'react'

import { StepShell } from '../step-shell'
import { toast } from 'sonner'

interface StepPhotoProps {
  value: string
  onChange: (profileImage: string) => void
}

export function StepPhoto({ value, onChange }: StepPhotoProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(
    value ? getFullUrl(value) : null
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file')
        return
      }

      // Show preview immediately
      const localPreview = URL.createObjectURL(file)
      setPreview(localPreview)
      setUploading(true)

      try {
        const uniqueKey = `profile/${crypto.randomUUID()}-${file.name}`

        // Get presigned URL
        const presignedRes = await fetch('/api/upload/presigned-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: uniqueKey }),
        })

        if (!presignedRes.ok) throw new Error('Failed to get upload URL')

        const { url: presignedUrl, key } = await presignedRes.json()

        // Upload to R2
        const uploadRes = await fetch(presignedUrl, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type },
        })

        if (!uploadRes.ok) throw new Error('Upload failed')

        onChange(key)
        toast.success('Photo uploaded!')
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Upload failed')
        setPreview(null)
      } finally {
        setUploading(false)
      }
    },
    [onChange]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const file = e.dataTransfer.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  return (
    <StepShell
      phase="Show Your Work"
      question="Upload a profile photo"
      subtitle="A photo helps build trust. Exhibitors are more likely to reach out when they can see who they're working with."
    >
      <div
        className="flex flex-col items-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {/* Circular drop zone / preview */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className={`relative flex size-48 items-center justify-center overflow-hidden rounded-full border-2 border-dashed transition-all ${
            preview
              ? 'border-paddock-green'
              : 'border-sand hover:border-paddock-green'
          } ${uploading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Profile preview"
              className="size-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-warm-gray">
              <svg
                className="size-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                />
              </svg>
              <span
                className="text-sm"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Click or drag to upload
              </span>
            </div>
          )}

          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
              <svg
                className="size-8 animate-spin text-paddock-green"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          )}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
          className="hidden"
        />

        {preview && !uploading && (
          <button
            type="button"
            onClick={() => {
              setPreview(null)
              onChange('')
            }}
            className="mt-4 text-sm text-warm-gray underline-offset-4 hover:text-ringside-black hover:underline"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Remove and choose another
          </button>
        )}
      </div>
    </StepShell>
  )
}

function getFullUrl(key: string): string {
  if (key.startsWith('http')) return key
  const r2DevUrl = process.env.NEXT_PUBLIC_R2_DEV_URL
  return `${r2DevUrl}/${key}`
}
