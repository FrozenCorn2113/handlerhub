'use client'

import { useCallback, useRef, useState } from 'react'

import { StepShell } from '../step-shell'
import { toast } from 'sonner'

interface StepGalleryProps {
  value: string[]
  onChange: (galleryImages: string[]) => void
}

function getFullUrl(key: string): string {
  if (key.startsWith('http')) return key
  const r2DevUrl = process.env.NEXT_PUBLIC_R2_DEV_URL
  return `${r2DevUrl}/${key}`
}

export function StepGallery({ value, onChange }: StepGalleryProps) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback(
    async (files: FileList) => {
      const imageFiles = Array.from(files).filter((f) =>
        f.type.startsWith('image/')
      )
      if (imageFiles.length === 0) {
        toast.error('Please select image files')
        return
      }

      setUploading(true)
      const newKeys: string[] = []

      try {
        for (const file of imageFiles) {
          const uniqueKey = `gallery/${crypto.randomUUID()}-${file.name}`

          const presignedRes = await fetch('/api/upload/presigned-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key: uniqueKey }),
          })

          if (!presignedRes.ok) throw new Error('Failed to get upload URL')

          const { url: presignedUrl, key } = await presignedRes.json()

          const uploadRes = await fetch(presignedUrl, {
            method: 'PUT',
            body: file,
            headers: { 'Content-Type': file.type },
          })

          if (!uploadRes.ok) throw new Error('Upload failed')

          newKeys.push(key)
        }

        onChange([...value, ...newKeys])
        toast.success(
          `${newKeys.length} photo${newKeys.length > 1 ? 's' : ''} uploaded!`
        )
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Upload failed')
      } finally {
        setUploading(false)
      }
    },
    [value, onChange]
  )

  const removeImage = useCallback(
    (index: number) => {
      onChange(value.filter((_, i) => i !== index))
    },
    [value, onChange]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (e.dataTransfer.files?.length) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [handleFiles]
  )

  return (
    <StepShell
      phase="Show Your Work"
      question="Add photos of your work"
      subtitle="Show dogs, grooming, wins, or your setup. Great photos make a big difference."
    >
      <div className="space-y-4">
        {/* Existing images grid */}
        {value.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {value.map((key, i) => (
              <div
                key={key}
                className="group relative aspect-square overflow-hidden rounded-xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getFullUrl(key)}
                  alt={`Gallery photo ${i + 1}`}
                  className="size-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-ringside-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <svg
                    className="size-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload area */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-sand bg-white p-8 transition-colors hover:border-paddock-green"
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              fileInputRef.current?.click()
            }
          }}
        >
          {uploading ? (
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
          ) : (
            <>
              <svg
                className="size-8 text-warm-gray"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 6.75v11.25a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              <span
                className="text-sm text-warm-gray"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Click or drag photos here
              </span>
            </>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (e.target.files?.length) {
              handleFiles(e.target.files)
            }
          }}
          className="hidden"
        />
      </div>
    </StepShell>
  )
}
