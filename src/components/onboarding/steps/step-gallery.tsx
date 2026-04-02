'use client'

import { useCallback, useRef, useState } from 'react'

import { StepShell } from '../step-shell'
import { toast } from 'sonner'

interface StepGalleryProps {
  value: string[]
  onChange: (galleryImages: string[]) => void
}

const MAX_PHOTOS = 8

function getFullUrl(key: string): string {
  if (key.startsWith('http')) return key
  const r2DevUrl = process.env.NEXT_PUBLIC_R2_DEV_URL
  return `${r2DevUrl}/${key}`
}

export function StepGallery({ value, onChange }: StepGalleryProps) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragSourceIndex, setDragSourceIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const handleFiles = useCallback(
    async (files: FileList) => {
      const imageFiles = Array.from(files).filter((f) =>
        f.type.startsWith('image/')
      )
      if (imageFiles.length === 0) {
        toast.error('Please select image files')
        return
      }
      const remaining = MAX_PHOTOS - value.length
      if (remaining <= 0) {
        toast.error(`Maximum ${MAX_PHOTOS} photos allowed`)
        return
      }
      const filesToUpload = imageFiles.slice(0, remaining)
      if (filesToUpload.length < imageFiles.length) {
        toast.info(
          `Uploading ${filesToUpload.length} of ${imageFiles.length} (max ${MAX_PHOTOS} total)`
        )
      }

      setUploading(true)
      const newKeys: string[] = []

      try {
        for (const file of filesToUpload) {
          const presignedRes = await fetch('/api/upload/presigned-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contentType: file.type,
              contentLength: file.size,
              target: 'handler-gallery',
              entityId: 'onboarding',
            }),
          })

          if (!presignedRes.ok) {
            const err = await presignedRes.json().catch(() => ({}))
            throw new Error(err.error || 'Failed to get upload URL')
          }

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

  // Drag-and-drop reorder handlers
  const handleDragStart = useCallback((index: number) => {
    setDragSourceIndex(index)
  }, [])

  const handleDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault()
      // Only highlight if dragging over a different filled slot
      if (
        dragSourceIndex !== null &&
        index !== dragSourceIndex &&
        index < value.length
      ) {
        setDragOverIndex(index)
      }
    },
    [dragSourceIndex, value.length]
  )

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null)
  }, [])

  const handleReorderDrop = useCallback(
    (e: React.DragEvent, targetIndex: number) => {
      e.preventDefault()
      setDragOverIndex(null)

      if (dragSourceIndex === null || dragSourceIndex === targetIndex) {
        setDragSourceIndex(null)
        return
      }

      // Only reorder within filled slots
      if (targetIndex >= value.length) {
        setDragSourceIndex(null)
        return
      }

      const newOrder = [...value]
      const [moved] = newOrder.splice(dragSourceIndex, 1)
      newOrder.splice(targetIndex, 0, moved)
      onChange(newOrder)
      setDragSourceIndex(null)
    },
    [dragSourceIndex, value, onChange]
  )

  const handleDragEnd = useCallback(() => {
    setDragSourceIndex(null)
    setDragOverIndex(null)
  }, [])

  // Handle file drop on the upload trigger slot
  const handleFileDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOverIndex(null)
      setDragSourceIndex(null)
      if (e.dataTransfer.files?.length) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [handleFiles]
  )

  const slots = Array.from({ length: MAX_PHOTOS }, (_, i) => i)
  const firstEmptyIndex = value.length

  return (
    <StepShell
      phase="Show Your Work"
      question="Add photos of your work"
      subtitle="Show dogs, grooming, wins, or your setup. Upload up to 8 photos. Drag to reorder."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {slots.map((slotIndex) => {
            const hasPhoto = slotIndex < value.length
            const isUploadTrigger = slotIndex === firstEmptyIndex
            const isEmpty = slotIndex > firstEmptyIndex

            if (hasPhoto) {
              const key = value[slotIndex]
              const isDragSource = dragSourceIndex === slotIndex
              const isDragTarget = dragOverIndex === slotIndex

              return (
                <div
                  key={key}
                  draggable
                  onDragStart={() => handleDragStart(slotIndex)}
                  onDragOver={(e) => handleDragOver(e, slotIndex)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleReorderDrop(e, slotIndex)}
                  onDragEnd={handleDragEnd}
                  className={`group relative aspect-square cursor-grab overflow-hidden rounded-xl border bg-white transition-all active:cursor-grabbing ${
                    isDragTarget
                      ? 'border-2 border-solid border-paddock-green'
                      : 'border-sand'
                  } ${isDragSource ? 'opacity-40' : 'opacity-100'}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getFullUrl(key)}
                    alt={`Gallery photo ${slotIndex + 1}`}
                    className="size-full object-cover"
                    draggable={false}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(slotIndex)}
                    className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-ringside-black/60 text-white opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
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
                  {slotIndex === 0 && (
                    <span className="absolute bottom-1 left-1 rounded bg-ringside-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                      Featured
                    </span>
                  )}
                </div>
              )
            }

            if (isUploadTrigger) {
              return (
                <div
                  key={`upload-trigger-${slotIndex}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      fileInputRef.current?.click()
                    }
                  }}
                  className="flex aspect-square cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-sand transition-colors hover:border-paddock-green"
                >
                  {uploading ? (
                    <svg
                      className="size-6 animate-spin text-paddock-green"
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
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  )}
                </div>
              )
            }

            // Empty placeholder slot
            if (isEmpty) {
              return (
                <div
                  key={`empty-${slotIndex}`}
                  className="aspect-square rounded-xl border-2 border-dashed border-sand"
                />
              )
            }

            return null
          })}
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
