'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import {
  ENTRY_STATUS_CONFIG,
  EVENT_TYPE_COLORS,
  EVENT_TYPE_LABELS,
} from '@/lib/events/constants'

import { MapPin } from '@phosphor-icons/react'
import type { EntryStatus, EventType } from '@prisma/client'

export interface VenuePin {
  venueId: string
  name: string
  lat: number
  lng: number
  city: string
  state: string
  eventCount: number
  events: Array<{
    id: string
    slug: string
    clubName: string
    eventType: EventType
    eventTypeRaw: string
    startDate: string | Date
    entryStatus: EntryStatus
  }>
}

interface EventsMapProps {
  pins: VenuePin[]
  highlightedEventId?: string | null
  onPinHover?: (eventId: string | null) => void
  onPinClick?: (eventId: string) => void
}

/**
 * Lazily loads Leaflet + MarkerCluster and injects required CSS.
 * Returns the Leaflet `L` namespace or null if something goes wrong.
 */
async function loadLeaflet() {
  if (typeof window === 'undefined') return null

  const L = (await import('leaflet')).default

  // markercluster mutates the global L, so expose it on window first
  ;(window as any).L = L

  // Dynamically import markercluster (side-effect import)
  await import('leaflet.markercluster')

  // Inject Leaflet core CSS
  injectCSS(
    'leaflet-core-css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
  )
  // Inject MarkerCluster CSS
  injectCSS(
    'markercluster-css',
    'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css'
  )
  injectCSS(
    'markercluster-default-css',
    'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css'
  )

  // Fix default icon paths
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  })

  return L
}

function injectCSS(id: string, href: string) {
  if (document.getElementById(id)) return
  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
}

export function EventsMap({
  pins,
  highlightedEventId,
  onPinHover,
  onPinClick,
}: EventsMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<any>(null)
  const leafletRef = useRef<any>(null)
  const clusterGroupRef = useRef<any>(null)
  const markersRef = useRef<Map<string, any>>(new Map())
  const [mapError, setMapError] = useState<string | null>(null)

  // Compute which venue is highlighted
  const highlightedVenueId = useMemo(() => {
    if (!highlightedEventId) return null
    for (const pin of pins) {
      if (pin.events.some((e) => e.id === highlightedEventId)) {
        return pin.venueId
      }
    }
    return null
  }, [highlightedEventId, pins])

  // Stable refs for callbacks used in markers
  const onPinHoverRef = useRef(onPinHover)
  const onPinClickRef = useRef(onPinClick)
  useEffect(() => {
    onPinHoverRef.current = onPinHover
  }, [onPinHover])
  useEffect(() => {
    onPinClickRef.current = onPinClick
  }, [onPinClick])

  useEffect(() => {
    if (!mapRef.current) return

    let resizeObserver: ResizeObserver | null = null
    let disposed = false

    const initMap = async () => {
      try {
        const L = await loadLeaflet()
        if (!L || disposed) return

        leafletRef.current = L

        if (leafletMapRef.current) {
          leafletMapRef.current.remove()
          leafletMapRef.current = null
        }

        const isMobile = window.innerWidth < 768

        const map = L.map(mapRef.current!, {
          center: [39.8283, -98.5795],
          zoom: 4,
          scrollWheelZoom: !isMobile,
          zoomControl: true,
        })

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 18,
        }).addTo(map)

        leafletMapRef.current = map

        resizeObserver = new ResizeObserver(() => {
          if (!disposed) map.invalidateSize()
        })
        resizeObserver.observe(mapRef.current!)

        requestAnimationFrame(() => {
          if (disposed) return
          map.invalidateSize()
          setTimeout(() => {
            if (!disposed) map.invalidateSize()
          }, 200)
        })

        updateMarkers(L, map)
      } catch (err) {
        console.error('[EventsMap] Failed to initialize map:', err)
        setMapError('Map failed to load. Showing list view only.')
      }
    }

    initMap()

    return () => {
      disposed = true
      resizeObserver?.disconnect()
      if (leafletMapRef.current) {
        try {
          leafletMapRef.current.remove()
        } catch {
          // Leaflet cleanup can throw if DOM is already gone
        }
        leafletMapRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update markers when pins change
  useEffect(() => {
    if (!leafletMapRef.current || !leafletRef.current) return
    updateMarkers(leafletRef.current, leafletMapRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pins])

  // Update highlight effect
  useEffect(() => {
    markersRef.current.forEach((m, venueId) => {
      const el = m.getElement?.()
      if (!el) return
      if (highlightedVenueId && venueId === highlightedVenueId) {
        el.style.transform = `${el.style.transform || ''} scale(1.3)`
        el.style.zIndex = '1000'
        el.style.filter =
          'brightness(1.2) drop-shadow(0 0 6px rgba(31, 107, 74, 0.6))'
      } else {
        el.style.transform = (el.style.transform || '').replace(
          /scale\([^)]*\)/g,
          ''
        )
        el.style.zIndex = ''
        el.style.filter = ''
      }
    })
  }, [highlightedVenueId])

  // Pan to highlighted venue
  useEffect(() => {
    if (!highlightedVenueId || !leafletMapRef.current) return
    const marker = markersRef.current.get(highlightedVenueId)
    if (marker) {
      const latLng = marker.getLatLng()
      leafletMapRef.current.panTo(latLng, { animate: true, duration: 0.3 })
    }
  }, [highlightedVenueId])

  function updateMarkers(L: any, map: any) {
    try {
      // Clear existing cluster group
      if (clusterGroupRef.current) {
        map.removeLayer(clusterGroupRef.current)
      }
      markersRef.current.clear()

      if (pins.length === 0) return

      // Verify markerClusterGroup is available
      if (typeof L.markerClusterGroup !== 'function') {
        console.error('[EventsMap] L.markerClusterGroup is not a function')
        setMapError('Map clustering failed to load.')
        return
      }

      // Create cluster group with HandlerHub styling
      const clusterGroup = L.markerClusterGroup({
        maxClusterRadius: 50,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        chunkedLoading: true,
        chunkInterval: 100,
        iconCreateFunction: (cluster: any) => {
          const count = cluster.getChildCount()
          let size = 36
          let fontSize = 13
          if (count >= 100) {
            size = 44
            fontSize = 14
          } else if (count >= 10) {
            size = 40
            fontSize = 13
          }
          return L.divIcon({
            html: `<div style="
              background: #1F6B4A;
              color: white;
              width: ${size}px;
              height: ${size}px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: ${fontSize}px;
              font-weight: 700;
              border: 3px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.25);
            ">${count}</div>`,
            className: 'custom-cluster',
            iconSize: [size, size],
            iconAnchor: [size / 2, size / 2],
          })
        },
      })

      const bounds: [number, number][] = []

      pins.forEach((pin) => {
        bounds.push([pin.lat, pin.lng])

        const primaryEvent = pin.events[0]
        const color = primaryEvent
          ? EVENT_TYPE_COLORS[primaryEvent.eventType]
          : '#1F6B4A'

        const isMulti = pin.eventCount > 1
        const iconHtml = isMulti
          ? `<div style="
              background: ${color};
              color: white;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 13px;
              font-weight: 700;
              border: 2.5px solid white;
              box-shadow: 0 2px 6px rgba(0,0,0,0.25);
            ">${pin.eventCount}</div>`
          : `<div style="
              background: ${color};
              width: 14px;
              height: 14px;
              border-radius: 50%;
              border: 2.5px solid white;
              box-shadow: 0 2px 6px rgba(0,0,0,0.25);
            "></div>`

        const icon = L.divIcon({
          html: iconHtml,
          className: 'custom-pin',
          iconSize: isMulti ? [32, 32] : [14, 14],
          iconAnchor: isMulti ? [16, 16] : [7, 7],
        })

        const marker = L.marker([pin.lat, pin.lng], { icon })
        ;(marker as any)._venueId = pin.venueId

        const popupContent = buildPopupContent(pin)
        marker.bindPopup(popupContent, {
          maxWidth: 300,
          className: 'event-popup',
        })

        marker.on('mouseover', () => {
          if (pin.events.length > 0) {
            onPinHoverRef.current?.(pin.events[0].id)
          }
        })
        marker.on('mouseout', () => {
          onPinHoverRef.current?.(null)
        })
        marker.on('click', () => {
          if (pin.events.length > 0) {
            onPinClickRef.current?.(pin.events[0].id)
          }
        })

        clusterGroup.addLayer(marker)
        markersRef.current.set(pin.venueId, marker)
      })

      map.addLayer(clusterGroup)
      clusterGroupRef.current = clusterGroup

      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 })
      }
    } catch (err) {
      console.error('[EventsMap] Failed to update markers:', err)
      setMapError('Map markers failed to load.')
    }
  }

  function buildPopupContent(pin: VenuePin): string {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${pin.lat},${pin.lng}`

    const eventList = pin.events
      .slice(0, 5)
      .map((e) => {
        const date = new Date(e.startDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })
        const typeLabel = EVENT_TYPE_LABELS[e.eventType]
        const statusCfg = ENTRY_STATUS_CONFIG[e.entryStatus]
        return `
          <a href="/events/${e.slug}" style="display:block;padding:6px 0;border-bottom:1px solid #E8E0D4;text-decoration:none;color:inherit;">
            <div style="font-weight:600;font-size:13px;color:#1C1208;">${e.clubName}</div>
            <div style="display:flex;gap:6px;align-items:center;margin-top:3px;">
              <span style="font-size:11px;color:#7A6E5E;">${date}</span>
              <span style="font-size:11px;color:#7A6E5E;">${typeLabel}</span>
              <span style="font-size:11px;color:${statusCfg.color};background:${statusCfg.bgColor};padding:1px 6px;border-radius:9px;">${statusCfg.label}</span>
            </div>
          </a>
        `
      })
      .join('')

    const moreText =
      pin.events.length > 5
        ? `<div style="padding:4px 0;font-size:12px;color:#7A6E5E;">+ ${pin.events.length - 5} more events</div>`
        : ''

    return `
      <div style="min-width:220px;">
        <div style="font-weight:700;font-size:14px;color:#1C1208;padding-bottom:4px;border-bottom:2px solid #1F6B4A;margin-bottom:4px;">
          ${pin.name}
        </div>
        <div style="font-size:12px;color:#7A6E5E;margin-bottom:6px;">${pin.city}, ${pin.state}</div>
        ${eventList}
        ${moreText}
        <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer"
          style="display:inline-flex;align-items:center;gap:4px;margin-top:6px;padding:4px 10px;
          background:#1F6B4A;color:white;border-radius:8px;text-decoration:none;font-size:12px;font-weight:600;">
          Get Directions
        </a>
      </div>
    `
  }

  // If map errored out, show a graceful fallback
  if (mapError) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-light-sand p-8 text-center">
        <MapPin size={40} weight="light" className="mb-3 text-warm-gray" />
        <p className="text-sm font-medium text-ringside-black">{mapError}</p>
        <p className="mt-1 text-xs text-warm-gray">
          Events are still available in the list view.
        </p>
      </div>
    )
  }

  return (
    <>
      <style>{`
        .custom-pin, .custom-cluster {
          background: transparent !important;
          border: none !important;
        }
        .event-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .event-popup .leaflet-popup-content {
          margin: 10px 14px;
        }
      `}</style>
      <div className="relative h-full w-full">
        <div
          ref={mapRef}
          className="h-full w-full"
          style={{ minHeight: '400px' }}
        />
        {/* Empty state overlay */}
        {pins.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80">
            <MapPin size={40} weight="light" className="mb-2 text-warm-gray" />
            <p className="text-sm font-medium text-warm-gray">
              No venues with coordinates found
            </p>
            <p className="text-xs text-warm-gray/70">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>
    </>
  )
}
