'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { MapPin } from '@phosphor-icons/react'
import type { EntryStatus, EventType } from '@prisma/client'
import 'mapbox-gl/dist/mapbox-gl.css'

// Larger close button for Mapbox popups
const POPUP_STYLE = `
.hh-popup .mapboxgl-popup-close-button {
  font-size: 20px;
  width: 28px;
  height: 28px;
  line-height: 28px;
  padding: 0;
  text-align: center;
  border-radius: 4px;
  right: 4px;
  top: 4px;
}
.hh-popup .mapboxgl-popup-close-button:hover {
  background: #f3f4f6;
}
`

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

export interface MapBounds {
  north: number
  south: number
  east: number
  west: number
}

interface EventsMapProps {
  pins: VenuePin[]
  highlightedEventId?: string | null
  onPinHover?: (eventId: string | null) => void
  onPinClick?: (eventId: string) => void
  focusLocation?: { lat: number; lng: number } | null
  onBoundsChange?: (bounds: MapBounds) => void
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
if (!MAPBOX_TOKEN && typeof window !== 'undefined') {
  console.warn(
    '[EventsMap] NEXT_PUBLIC_MAPBOX_TOKEN is not set. Map tiles will not load. Get a token at https://account.mapbox.com/'
  )
}

const SOURCE_ID = 'venues'
const CLUSTERS_LAYER = 'venue-clusters'
const CLUSTER_COUNT_LAYER = 'venue-cluster-count'
const UNCLUSTERED_LAYER = 'venue-unclustered'

export function EventsMap({
  pins,
  highlightedEventId,
  onPinHover,
  onPinClick,
  focusLocation,
  onBoundsChange,
}: EventsMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const popupRef = useRef<any>(null)
  const onBoundsChangeRef = useRef(onBoundsChange)
  onBoundsChangeRef.current = onBoundsChange
  const [mapReady, setMapReady] = useState(false)

  // Build GeoJSON from pins
  const geojson = useMemo(
    () => ({
      type: 'FeatureCollection' as const,
      features: pins.map((pin) => ({
        type: 'Feature' as const,
        geometry: { type: 'Point' as const, coordinates: [pin.lng, pin.lat] },
        properties: {
          venueId: pin.venueId,
          name: pin.name,
          city: pin.city,
          state: pin.state,
          eventCount: pin.eventCount,
          events: JSON.stringify(pin.events),
        },
      })),
    }),
    [pins]
  )

  // Initial center
  const initialCenter = useMemo<[number, number]>(() => {
    if (pins.length === 0) return [-98.5795, 39.8283]
    const avgLng = pins.reduce((s, p) => s + p.lng, 0) / pins.length
    const avgLat = pins.reduce((s, p) => s + p.lat, 0) / pins.length
    return [avgLng, avgLat]
  }, [pins])

  useEffect(() => {
    if (!containerRef.current) return

    let map: any
    let isDestroyed = false

    // Inject popup styles once
    if (!document.getElementById('hh-popup-style')) {
      const styleEl = document.createElement('style')
      styleEl.id = 'hh-popup-style'
      styleEl.textContent = POPUP_STYLE
      document.head.appendChild(styleEl)
    }

    const init = async () => {
      const mapboxgl = (await import('mapbox-gl')).default
      if (isDestroyed) return

      mapboxgl.accessToken = MAPBOX_TOKEN

      map = new mapboxgl.Map({
        container: containerRef.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: initialCenter,
        zoom: 4,
        attributionControl: false,
      })

      map.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }),
        'top-right'
      )

      map.on('load', () => {
        if (isDestroyed) return

        map.addSource(SOURCE_ID, {
          type: 'geojson',
          data: geojson,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
          clusterProperties: {
            totalEvents: ['+', ['get', 'eventCount']],
          },
        })

        // Cluster circles
        map.addLayer({
          id: CLUSTERS_LAYER,
          type: 'circle',
          source: SOURCE_ID,
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'totalEvents'],
              '#60A5FA',
              10,
              '#3B82F6',
              30,
              '#1D4ED8',
            ],
            'circle-radius': [
              'step',
              ['get', 'totalEvents'],
              20,
              10,
              28,
              30,
              36,
            ],
            'circle-stroke-width': 2.5,
            'circle-stroke-color': '#ffffff',
            'circle-opacity': 0.92,
          },
        })

        // Cluster count labels
        map.addLayer({
          id: CLUSTER_COUNT_LAYER,
          type: 'symbol',
          source: SOURCE_ID,
          filter: ['has', 'point_count'],
          layout: {
            'text-field': ['to-string', ['get', 'totalEvents']],
            'text-font': ['DIN Pro Bold', 'Arial Unicode MS Bold'],
            'text-size': 13,
          },
          paint: { 'text-color': '#ffffff' },
        })

        // Individual venue pins
        map.addLayer({
          id: UNCLUSTERED_LAYER,
          type: 'circle',
          source: SOURCE_ID,
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': [
              'step',
              ['get', 'eventCount'],
              '#60A5FA',
              3,
              '#3B82F6',
              6,
              '#2563EB',
            ],
            'circle-radius': 14,
            'circle-stroke-width': 2.5,
            'circle-stroke-color': '#ffffff',
            'circle-opacity': 0.92,
          },
        })

        // Event count label on individual pins
        map.addLayer({
          id: 'venue-unclustered-count',
          type: 'symbol',
          source: SOURCE_ID,
          filter: ['!', ['has', 'point_count']],
          layout: {
            'text-field': ['to-string', ['get', 'eventCount']],
            'text-font': ['DIN Pro Bold', 'Arial Unicode MS Bold'],
            'text-size': 12,
          },
          paint: { 'text-color': '#ffffff' },
        })

        mapRef.current = map
        setMapReady(true)

        // Helper to report current bounds to parent
        const reportBounds = () => {
          if (isDestroyed) return
          const b = map.getBounds()
          onBoundsChangeRef.current?.({
            north: b.getNorth(),
            south: b.getSouth(),
            east: b.getEast(),
            west: b.getWest(),
          })
        }

        // Report initial bounds immediately so list filters on load
        reportBounds()

        // Notify parent of bounds changes on pan/zoom
        map.on('moveend', reportBounds)

        // Click cluster -> expand
        map.on('click', CLUSTERS_LAYER, (e: any) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: [CLUSTERS_LAYER],
          })
          if (!features.length) return
          const clusterId = features[0].properties.cluster_id
          ;(map.getSource(SOURCE_ID) as any).getClusterExpansionZoom(
            clusterId,
            (err: any, zoom: number) => {
              if (err) return
              map.easeTo({ center: features[0].geometry.coordinates, zoom })
            }
          )
        })

        // Click individual pin -> show popup
        map.on('click', UNCLUSTERED_LAYER, (e: any) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: [UNCLUSTERED_LAYER],
          })
          if (!features.length) return
          const props = features[0].properties
          const coords = features[0].geometry.coordinates.slice()
          const events: VenuePin['events'] = JSON.parse(props.events || '[]')

          if (popupRef.current) {
            popupRef.current.remove()
          }

          // Compute date range
          const EVENT_TYPE_LABELS: Record<string, string> = {
            ALL_BREED: 'All Breed',
            LIMITED_BREED: 'Limited Breed',
            SPECIALTY: 'Specialty',
            PARENT_SPECIALTY: 'Parent Specialty',
            DESIGNATED_SPECIALTY: 'Designated Specialty',
            JUNIOR_SHOWMANSHIP: 'Junior Showmanship',
            SWEEPSTAKES: 'Sweepstakes',
            OTHER: 'Other',
          }

          const dates = events.map((ev) => new Date(ev.startDate).getTime())
          const minDate = new Date(Math.min(...dates))
          const maxDate = new Date(Math.max(...dates))
          const fmtDate = (d: Date) =>
            d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          const dateRange =
            minDate.getTime() === maxDate.getTime()
              ? fmtDate(minDate)
              : `${fmtDate(minDate)} - ${fmtDate(maxDate)}`

          // Unique club names
          const uniqueClubs = Array.from(
            new Set(events.map((ev) => ev.clubName))
          )
          const clubHtml =
            uniqueClubs.length === 1
              ? uniqueClubs[0]
              : `${uniqueClubs[0]} <span style="color:#7A6E5E">+${uniqueClubs.length - 1} more club${uniqueClubs.length - 1 > 1 ? 's' : ''}</span>`

          // Deduplicated event types
          const uniqueTypes = Array.from(
            new Set(events.map((ev) => ev.eventType))
          )
          const typesList = uniqueTypes
            .map((t) => EVENT_TYPE_LABELS[t] || t)
            .join(', ')

          const html = `
            <div style="min-width:200px;max-width:260px">
              <div style="font-size:13px;font-weight:600;color:#1a1a1a;margin-bottom:2px">${props.city}, ${props.state}</div>
              <div style="font-size:12px;color:#7A6E5E;margin-bottom:6px">${dateRange}</div>
              <div style="font-size:12px;font-weight:500;color:#1a1a1a;line-height:1.4;margin-bottom:4px">${clubHtml}</div>
              <div style="font-size:11px;color:#7A6E5E;margin-bottom:8px">${events.length} event${events.length > 1 ? 's' : ''}: ${typesList}</div>
              <a href="/events/${events[0].slug}" style="font-size:12px;font-weight:500;color:#3B82F6;text-decoration:none">View event${events.length > 1 ? 's' : ''} &rarr;</a>
            </div>
          `

          const popup = new mapboxgl.Popup({
            closeButton: true,
            maxWidth: '260px',
            offset: 8,
            className: 'hh-popup',
          })
            .setLngLat(coords as [number, number])
            .setHTML(html)
            .addTo(map)

          popupRef.current = popup

          if (props.venueId) {
            onPinClick?.(props.venueId)
          }
        })

        // Hover cursors
        map.on('mouseenter', CLUSTERS_LAYER, () => {
          map.getCanvas().style.cursor = 'pointer'
        })
        map.on('mouseleave', CLUSTERS_LAYER, () => {
          map.getCanvas().style.cursor = ''
        })
        map.on('mouseenter', UNCLUSTERED_LAYER, (e: any) => {
          map.getCanvas().style.cursor = 'pointer'
          const features = map.queryRenderedFeatures(e.point, {
            layers: [UNCLUSTERED_LAYER],
          })
          if (features.length) {
            const props = features[0].properties
            if (props.venueId) onPinHover?.(props.venueId)
          }
        })
        map.on('mouseleave', UNCLUSTERED_LAYER, () => {
          map.getCanvas().style.cursor = ''
          onPinHover?.(null)
        })
      })
    }

    init()

    return () => {
      isDestroyed = true
      popupRef.current?.remove()
      map?.remove()
      mapRef.current = null
      setMapReady(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only init once; update source data separately below

  // Update source data when pins change (after map is ready)
  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapReady) return
    const source = map.getSource(SOURCE_ID)
    if (source) {
      source.setData(geojson)
    }
  }, [geojson, mapReady])

  // Focus location
  useEffect(() => {
    const map = mapRef.current
    if (!map || !focusLocation) return
    map.easeTo({ center: [focusLocation.lng, focusLocation.lat], zoom: 12 })
  }, [focusLocation])

  // Highlight pin
  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapReady) return
    if (!highlightedEventId) {
      map.setPaintProperty(UNCLUSTERED_LAYER, 'circle-radius', 14)
      return
    }
    // Find the pin - match by venueId directly (cluster hover) or by eventId (pin hover)
    const pin =
      pins.find((p) => p.venueId === highlightedEventId) ||
      pins.find((p) => p.events.some((e) => e.id === highlightedEventId))
    if (!pin) return
    map.setPaintProperty(UNCLUSTERED_LAYER, 'circle-radius', [
      'case',
      ['==', ['get', 'venueId'], pin.venueId],
      18,
      14,
    ])
  }, [highlightedEventId, pins, mapReady])

  return (
    <div className="relative h-full w-full">
      <div className="h-full w-full overflow-hidden rounded-2xl border border-sand">
        <div ref={containerRef} className="h-full w-full" />
      </div>

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
  )
}
