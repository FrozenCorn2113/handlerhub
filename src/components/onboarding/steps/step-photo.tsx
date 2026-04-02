'use client'

import { useCallback, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'

import { StepShell } from '../step-shell'
import Cropper from 'react-easy-crop'
import type { Area } from 'react-easy-crop'
import { toast } from 'sonner'

interface StepPhotoProps {
  value: string
  cropX: number
  cropY: number
  zoom: number
  onChange: (
    profileImage: string,
    cropX: number,
    cropY: number,
    zoom: number
  ) => void
}

const CIRCLE_SIZE = 192
const CONTAINER_WIDTH = 340
const CONTAINER_HEIGHT = 340
const MIN_ZOOM = 1
const MAX_ZOOM = 3

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<string> {
  const image = new Image()
  image.crossOrigin = 'anonymous'
  image.src = imageSrc
  await new Promise((resolve) => {
    image.onload = resolve
  })
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )
  return canvas.toDataURL('image/jpeg')
}

export function StepPhoto({
  value,
  cropX,
  cropY,
  zoom: propZoom,
  onChange,
}: StepPhotoProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(
    value ? getFullUrl(value) : null
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Crop state for react-easy-crop
  const [crop, setCrop] = useState({ x: cropX || 0, y: cropY || 0 })
  const [zoomLevel, setZoomLevel] = useState(propZoom || 1)
  const [locked, setLocked] = useState(value ? true : false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [croppedPreview, setCroppedPreview] = useState<string | null>(null)

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPx: Area) => {
      setCroppedAreaPixels(croppedAreaPx)
    },
    []
  )

  // --- Upload logic (unchanged) ---

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file')
        return
      }

      const localPreview = URL.createObjectURL(file)
      setPreview(localPreview)
      setUploading(true)
      setCrop({ x: 0, y: 0 })
      setZoomLevel(1)
      setLocked(false)
      setCroppedPreview(null)

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

        onChange(key, 0, 0, 1)
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

  // --- Confirm / Adjust ---

  const handleConfirm = useCallback(async () => {
    if (!preview || !croppedAreaPixels) return

    try {
      const croppedDataUrl = await getCroppedImg(preview, croppedAreaPixels)
      setCroppedPreview(croppedDataUrl)
      setLocked(true)
      if (value) {
        onChange(value, crop.x, crop.y, zoomLevel)
      }
    } catch {
      toast.error('Failed to generate crop preview')
    }
  }, [preview, croppedAreaPixels, value, crop.x, crop.y, zoomLevel, onChange])

  const handleAdjust = useCallback(() => {
    setCroppedPreview(null)
    setLocked(false)
  }, [])

  const handleRemove = useCallback(() => {
    setPreview(null)
    setCrop({ x: 0, y: 0 })
    setZoomLevel(1)
    setLocked(false)
    setCroppedPreview(null)
    onChange('', 0, 0, 1)
  }, [onChange])

  const showEditor = preview && !uploading && !locked
  const showConfirmedPreview = preview && !uploading && locked && croppedPreview

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
        {/* Upload drop zone (no image yet) */}
        {!preview && !uploading && (
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                fileInputRef.current?.click()
              }
            }}
            className="flex size-48 cursor-pointer select-none items-center justify-center rounded-full border-2 border-dashed border-sand transition-all hover:border-paddock-green"
            style={{ touchAction: 'none' }}
          >
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
          </div>
        )}

        {/* Uploading spinner */}
        {uploading && (
          <div className="flex size-48 items-center justify-center rounded-full border-2 border-dashed border-paddock-green">
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

        {/* Crop editor using react-easy-crop */}
        {showEditor && (
          <div className="flex flex-col items-center gap-2">
            <div
              className="relative overflow-hidden rounded-2xl border border-sand"
              style={{
                width: CONTAINER_WIDTH,
                height: CONTAINER_HEIGHT,
              }}
            >
              <Cropper
                image={preview}
                crop={crop}
                zoom={zoomLevel}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoomLevel}
                onCropComplete={onCropComplete}
              />
            </div>

            {/* Zoom slider */}
            <div className="flex w-full max-w-[340px] items-center gap-3 px-2">
              <svg
                className="size-4 shrink-0 text-warm-gray"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
                />
              </svg>
              <input
                type="range"
                min={MIN_ZOOM}
                max={MAX_ZOOM}
                step={0.01}
                value={zoomLevel}
                onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                className="zoom-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-sand"
              />
              <svg
                className="size-4 shrink-0 text-warm-gray"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            </div>

            {/* Confirm button */}
            <Button type="button" onClick={handleConfirm}>
              Confirm Position
            </Button>
          </div>
        )}

        {/* Confirmed circular preview */}
        {showConfirmedPreview && (
          <div className="flex flex-col items-center gap-3">
            <div
              className="overflow-hidden rounded-full border-2 border-paddock-green"
              style={{
                width: CIRCLE_SIZE,
                height: CIRCLE_SIZE,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={croppedPreview}
                alt="Profile preview"
                className="size-full object-cover"
              />
            </div>
          </div>
        )}

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

        {/* Adjust / Remove buttons */}
        <div className="mt-4 flex flex-col items-center gap-2">
          {showConfirmedPreview && (
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

        {/* Zoom slider custom styles */}
        <style jsx>{`
          .zoom-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: var(--color-paddock-green, #2d6a4f);
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
          }
          .zoom-slider::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: var(--color-paddock-green, #2d6a4f);
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
          }
          .zoom-slider::-webkit-slider-runnable-track {
            height: 6px;
            border-radius: 3px;
          }
          .zoom-slider::-moz-range-track {
            height: 6px;
            border-radius: 3px;
          }
        `}</style>
      </div>
    </StepShell>
  )
}

function getFullUrl(key: string): string {
  if (key.startsWith('http')) return key
  const r2DevUrl = process.env.NEXT_PUBLIC_R2_DEV_URL
  return `${r2DevUrl}/${key}`
}
