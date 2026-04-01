'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

import { StepShell } from '../step-shell'
import { toast } from 'sonner'

interface StepPhotoProps {
  value: string
  cropX: number
  cropY: number
  onChange: (profileImage: string, cropX: number, cropY: number) => void
}

const CONTAINER_SIZE = 192
const SCALE = 1.5 // Image is 150% of container so there's room to pan

export function StepPhoto({ value, cropX, cropY, onChange }: StepPhotoProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(
    value ? getFullUrl(value) : null
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Drag state
  const [offsetX, setOffsetX] = useState(cropX) // percentage -50 to 50
  const [offsetY, setOffsetY] = useState(cropY)
  const [locked, setLocked] = useState(value ? true : false)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef<{
    x: number
    y: number
    ox: number
    oy: number
  } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Sync crop values when props change (e.g. navigating back to this step)
  useEffect(() => {
    setOffsetX(cropX)
    setOffsetY(cropY)
  }, [cropX, cropY])

  // When preview is set from a new upload, reset to unlocked so user can position
  const justUploaded = useRef(false)

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file')
        return
      }

      const localPreview = URL.createObjectURL(file)
      setPreview(localPreview)
      setUploading(true)
      // Reset crop on new upload
      setOffsetX(0)
      setOffsetY(0)
      setLocked(false)
      justUploaded.current = true

      try {
        const presignedRes = await fetch('/api/upload/presigned-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contentType: file.type,
            contentLength: file.size,
            target: 'handler-profile',
            entityId: 'onboarding',
          }),
        })

        if (!presignedRes.ok) throw new Error('Failed to get upload URL')

        const { url: presignedUrl, key } = await presignedRes.json()

        const uploadRes = await fetch(presignedUrl, {
          method: 'PUT',
          body: file,
          headers: { 'Content-Type': file.type },
        })

        if (!uploadRes.ok) throw new Error('Upload failed')

        onChange(key, 0, 0)
        toast.success('Photo uploaded! Drag to reposition.')
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

  // --- Drag-to-reposition handlers ---

  const clampOffset = (val: number) => {
    // Max pan is limited by scale. At 1.5x, image overflows by 25% on each side
    const maxPan = ((SCALE - 1) / SCALE) * 50
    return Math.max(-maxPan, Math.min(maxPan, val))
  }

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (locked || uploading || !preview) return
      e.preventDefault()
      e.stopPropagation()
      setDragging(true)
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        ox: offsetX,
        oy: offsetY,
      }
      // Capture pointer for reliable tracking
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    },
    [locked, uploading, preview, offsetX, offsetY]
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging || !dragStart.current) return
      e.preventDefault()

      const dx = e.clientX - dragStart.current.x
      const dy = e.clientY - dragStart.current.y

      // Convert pixel movement to percentage of container
      const pctX = (dx / CONTAINER_SIZE) * 100
      const pctY = (dy / CONTAINER_SIZE) * 100

      setOffsetX(clampOffset(dragStart.current.ox + pctX))
      setOffsetY(clampOffset(dragStart.current.oy + pctY))
    },
    [dragging]
  )

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return
      setDragging(false)
      dragStart.current = null
      ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
    },
    [dragging]
  )

  const handleLock = useCallback(() => {
    setLocked(true)
    // Pass the current key + crop position up
    if (value) {
      onChange(value, offsetX, offsetY)
    }
  }, [value, offsetX, offsetY, onChange])

  const handleAdjust = useCallback(() => {
    setLocked(false)
  }, [])

  const handleRemove = useCallback(() => {
    setPreview(null)
    setOffsetX(0)
    setOffsetY(0)
    setLocked(false)
    onChange('', 0, 0)
  }, [onChange])

  // Compute the CSS transform for the image inside the circle
  const scaledSize = CONTAINER_SIZE * SCALE
  const translateX = (offsetX / 100) * CONTAINER_SIZE
  const translateY = (offsetY / 100) * CONTAINER_SIZE

  const showDragUI = preview && !uploading && !locked
  const showLockButton = preview && !uploading && !locked
  const showAdjustButton = preview && !uploading && locked

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
        <div
          ref={containerRef}
          role="button"
          tabIndex={0}
          onClick={() => {
            if (!preview && !uploading) {
              fileInputRef.current?.click()
            }
          }}
          onKeyDown={(e) => {
            if (
              !preview &&
              !uploading &&
              (e.key === 'Enter' || e.key === ' ')
            ) {
              fileInputRef.current?.click()
            }
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className={cn(
            'relative flex size-48 select-none items-center justify-center overflow-hidden rounded-full border-2 border-dashed transition-all',
            preview
              ? 'border-paddock-green'
              : 'border-sand hover:border-paddock-green',
            uploading && 'cursor-not-allowed opacity-70',
            showDragUI
              ? dragging
                ? 'cursor-grabbing'
                : 'cursor-grab'
              : !preview
                ? 'cursor-pointer'
                : 'cursor-default'
          )}
          style={{
            touchAction: 'none',
            width: CONTAINER_SIZE,
            height: CONTAINER_SIZE,
          }}
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Profile preview"
              draggable={false}
              className="pointer-events-none absolute"
              style={{
                width: scaledSize,
                height: scaledSize,
                objectFit: 'cover',
                transform: `translate(${translateX}px, ${translateY}px)`,
                left: (CONTAINER_SIZE - scaledSize) / 2,
                top: (CONTAINER_SIZE - scaledSize) / 2,
              }}
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

          {/* Drag hint overlay */}
          {showDragUI && !dragging && (
            <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-3">
              <span
                className="rounded-full bg-black/50 px-2.5 py-0.5 text-xs text-white"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Drag to reposition
              </span>
            </div>
          )}
        </div>

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

        {/* Lock / Adjust buttons */}
        <div className="mt-4 flex flex-col items-center gap-2">
          {showLockButton && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleLock}
            >
              Lock Position
            </Button>
          )}

          {showAdjustButton && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAdjust}
            >
              Adjust
            </Button>
          )}

          {preview && !uploading && (
            <button
              type="button"
              onClick={handleRemove}
              className="text-sm text-warm-gray underline-offset-4 hover:text-ringside-black hover:underline"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Remove and choose another
            </button>
          )}
        </div>
      </div>
    </StepShell>
  )
}

function getFullUrl(key: string): string {
  if (key.startsWith('http')) return key
  const r2DevUrl = process.env.NEXT_PUBLIC_R2_DEV_URL
  return `${r2DevUrl}/${key}`
}
