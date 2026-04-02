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
  zoom: number
  onChange: (
    profileImage: string,
    cropX: number,
    cropY: number,
    zoom: number
  ) => void
}

// The visible crop circle diameter
const CIRCLE_SIZE = 192
// The editor container width
const CONTAINER_WIDTH = 340
const CONTAINER_MAX_HEIGHT = 400
const MIN_ZOOM = 1
const MAX_ZOOM = 3

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

  // Image natural dimensions
  const [naturalW, setNaturalW] = useState(0)
  const [naturalH, setNaturalH] = useState(0)

  // Crop state: offsets are in pixels relative to the image's top-left at current zoom
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(propZoom || 1)
  const [locked, setLocked] = useState(value ? true : false)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef<{
    x: number
    y: number
    ox: number
    oy: number
  } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Compute the minimum zoom so the image covers the crop circle
  const getMinZoom = useCallback((nw: number, nh: number) => {
    if (nw === 0 || nh === 0) return 1
    // We need the scaled image to be at least CIRCLE_SIZE in both dimensions
    // The image is rendered to fit within CONTAINER_WIDTH (width-constrained display)
    // Base display size: image scaled to fit CONTAINER_WIDTH wide
    const baseW = CONTAINER_WIDTH
    const baseH = (nh / nw) * CONTAINER_WIDTH
    const minZoomW = CIRCLE_SIZE / baseW
    const minZoomH = CIRCLE_SIZE / baseH
    return Math.max(minZoomW, minZoomH, 1)
  }, [])

  // Load natural dimensions when preview changes
  useEffect(() => {
    if (!preview) return
    const img = new Image()
    img.onload = () => {
      setNaturalW(img.naturalWidth)
      setNaturalH(img.naturalHeight)
    }
    img.src = preview
  }, [preview])

  // Convert stored percentage offsets back to pixel offsets ONLY on initial load
  const initializedRef = useRef(false)
  useEffect(() => {
    if (naturalW === 0 || naturalH === 0) return
    if (initializedRef.current) return
    initializedRef.current = true

    const minZoom = getMinZoom(naturalW, naturalH)
    const effectiveZoom = Math.max(propZoom || 1, minZoom)
    setZoomLevel(effectiveZoom)

    const dw = CONTAINER_WIDTH * effectiveZoom
    const dh = (naturalH / naturalW) * CONTAINER_WIDTH * effectiveZoom
    setOffsetX((cropX / 100) * dw)
    setOffsetY((cropY / 100) * dh)
  }, [cropX, cropY, propZoom, naturalW, naturalH, getMinZoom])

  // Compute display dimensions
  const displayW = CONTAINER_WIDTH * zoomLevel
  const displayH =
    naturalW > 0
      ? (naturalH / naturalW) * CONTAINER_WIDTH * zoomLevel
      : CONTAINER_WIDTH * zoomLevel

  // Container height based on aspect ratio, capped
  const baseDisplayH =
    naturalW > 0 ? (naturalH / naturalW) * CONTAINER_WIDTH : CONTAINER_WIDTH
  const containerHeight = Math.min(
    Math.max(baseDisplayH, CIRCLE_SIZE + 32),
    CONTAINER_MAX_HEIGHT
  )

  // The crop circle center in the container
  const circleCenterX = CONTAINER_WIDTH / 2
  const circleCenterY = containerHeight / 2

  // Clamp offsets so the image edge doesn't enter the crop circle
  const clampOffsets = useCallback(
    (ox: number, oy: number, dw: number, dh: number) => {
      // Image is centered at (circleCenterX + ox, circleCenterY + oy)
      // Image left edge: circleCenterX + ox - dw/2
      // For the crop circle, we need:
      //   image_left <= circle_left  =>  cx + ox - dw/2 <= cx - CIRCLE_SIZE/2
      //   => ox <= dw/2 - CIRCLE_SIZE/2
      //   image_right >= circle_right => cx + ox + dw/2 >= cx + CIRCLE_SIZE/2
      //   => ox >= CIRCLE_SIZE/2 - dw/2
      const halfCircle = CIRCLE_SIZE / 2
      const minOx = halfCircle - dw / 2
      const maxOx = dw / 2 - halfCircle
      const minOy = halfCircle - dh / 2
      const maxOy = dh / 2 - halfCircle

      return {
        x: Math.max(minOx, Math.min(maxOx, ox)),
        y: Math.max(minOy, Math.min(maxOy, oy)),
      }
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
      setOffsetX(0)
      setOffsetY(0)
      setZoomLevel(1)
      setLocked(false)

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

  // --- Drag handlers ---

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

      const newOx = dragStart.current.ox + dx
      const newOy = dragStart.current.oy + dy

      const clamped = clampOffsets(newOx, newOy, displayW, displayH)
      setOffsetX(clamped.x)
      setOffsetY(clamped.y)
    },
    [dragging, displayW, displayH, clampOffsets]
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

  // --- Zoom handler ---
  const handleZoomChange = useCallback(
    (newZoom: number) => {
      // When zooming, keep the crop circle centered on the same image point
      // Scale the offsets proportionally
      const ratio = newZoom / zoomLevel
      const newOx = offsetX * ratio
      const newOy = offsetY * ratio
      const newDw = CONTAINER_WIDTH * newZoom
      const newDh =
        naturalW > 0
          ? (naturalH / naturalW) * CONTAINER_WIDTH * newZoom
          : CONTAINER_WIDTH * newZoom
      const clamped = clampOffsets(newOx, newOy, newDw, newDh)
      setZoomLevel(newZoom)
      setOffsetX(clamped.x)
      setOffsetY(clamped.y)
    },
    [zoomLevel, offsetX, offsetY, naturalW, naturalH, clampOffsets]
  )

  // --- Confirm / Adjust ---
  // Store confirmed snapshot so prop changes can't reset the preview
  const [confirmedState, setConfirmedState] = useState<{
    ox: number
    oy: number
    dw: number
    dh: number
  } | null>(null)

  const handleConfirm = useCallback(() => {
    // Snapshot the current pixel positions before locking
    setConfirmedState({ ox: offsetX, oy: offsetY, dw: displayW, dh: displayH })
    setLocked(true)
    if (value) {
      const pctX = displayW > 0 ? (offsetX / displayW) * 100 : 0
      const pctY = displayH > 0 ? (offsetY / displayH) * 100 : 0
      onChange(value, pctX, pctY, zoomLevel)
    }
  }, [value, offsetX, offsetY, displayW, displayH, zoomLevel, onChange])

  const handleAdjust = useCallback(() => {
    setConfirmedState(null)
    setLocked(false)
  }, [])

  const handleRemove = useCallback(() => {
    setPreview(null)
    setOffsetX(0)
    setOffsetY(0)
    setZoomLevel(1)
    setLocked(false)
    onChange('', 0, 0, 1)
  }, [onChange])

  // Compute effective min zoom
  const effectiveMinZoom = Math.max(MIN_ZOOM, getMinZoom(naturalW, naturalH))

  // Image position: centered in container + offset
  const imgLeft = circleCenterX - displayW / 2 + offsetX
  const imgTop = circleCenterY - displayH / 2 + offsetY

  const showEditor = preview && !uploading && !locked
  const showConfirmedPreview = preview && !uploading && locked

  // SVG overlay with circular cutout
  const overlayMask = `radial-gradient(circle ${CIRCLE_SIZE / 2}px at ${circleCenterX}px ${circleCenterY}px, transparent ${CIRCLE_SIZE / 2}px, rgba(0,0,0,0.55) ${CIRCLE_SIZE / 2}px)`

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

        {/* Uploading spinner (no image yet or during upload) */}
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

        {/* Crop editor: full image with overlay + circle cutout */}
        {showEditor && (
          <div className="flex flex-col items-center gap-2">
            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className={cn(
                'relative select-none overflow-hidden rounded-2xl border border-sand',
                dragging ? 'cursor-grabbing' : 'cursor-grab'
              )}
              style={{
                width: CONTAINER_WIDTH,
                height: containerHeight,
                touchAction: 'none',
              }}
            >
              {/* The actual image, draggable */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Profile preview"
                draggable={false}
                className="pointer-events-none absolute"
                style={{
                  width: displayW,
                  height: displayH,
                  left: imgLeft,
                  top: imgTop,
                  objectFit: 'cover',
                }}
              />

              {/* Dark overlay with circular cutout */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: overlayMask,
                }}
              />

              {/* Circle border ring */}
              <div
                className="pointer-events-none absolute rounded-full border-2 border-white/70"
                style={{
                  width: CIRCLE_SIZE,
                  height: CIRCLE_SIZE,
                  left: circleCenterX - CIRCLE_SIZE / 2,
                  top: circleCenterY - CIRCLE_SIZE / 2,
                }}
              />

              {/* Drag hint */}
              {!dragging && (
                <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
                  <span
                    className="rounded-full bg-black/50 px-2.5 py-0.5 text-xs text-white"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Drag to reposition
                  </span>
                </div>
              )}
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
                min={effectiveMinZoom}
                max={MAX_ZOOM}
                step={0.01}
                value={zoomLevel}
                onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
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
        {showConfirmedPreview && confirmedState && (
          <div className="flex flex-col items-center gap-3">
            <div
              className="relative overflow-hidden rounded-full border-2 border-paddock-green"
              style={{
                width: CIRCLE_SIZE,
                height: CIRCLE_SIZE,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Profile preview"
                draggable={false}
                className="pointer-events-none absolute"
                style={{
                  width: confirmedState.dw,
                  height: confirmedState.dh,
                  left:
                    CIRCLE_SIZE / 2 - confirmedState.dw / 2 + confirmedState.ox,
                  top:
                    CIRCLE_SIZE / 2 - confirmedState.dh / 2 + confirmedState.oy,
                }}
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
