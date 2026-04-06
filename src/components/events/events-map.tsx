'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { EVENT_TYPE_COLORS } from '@/lib/events/constants'

import { MapPin } from '@phosphor-icons/react'
import type { EntryStatus, EventType } from '@prisma/client'
import 'maplibre-gl/dist/maplibre-gl.css'

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
  focusLocation?: { lat: number; lng: number } | null
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
if (!MAPBOX_TOKEN && typeof window !== 'undefined') {
  console.warn(
    '[EventsMap] NEXT_PUBLIC_MAPBOX_TOKEN is not set. Map tiles will not load. Get a token at https://account.mapbox.com/'
  )
}
const MAP_STYLE_URL = `https://api.mapbox.com/styles/v1/mapbox/streets-v12?access_token=${MAPBOX_TOKEN}`

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
}: EventsMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const popupRef = useRef<any>(null)
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
          // Encode events as JSON string for MapLibre property access
          events: JSON.stringify(pin.events),
          // Primary event color
          color: pin.events[0]
            ? EVENT_TYPE_COLORS[pin.events[0].eventType]
            : '#1F6B4A',
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

    const init = async () => {
      const maplibre = await import('maplibre-gl')
      const maplibregl = maplibre.default
      if (isDestroyed) return

      map = new maplibregl.Map({
        container: containerRef.current!,
        style: MAP_STYLE_URL,
        center: initialCenter,
        zoom: 4,
        attributionControl: false,
      })

      map.addControl(
        new maplibregl.NavigationControl({ showCompass: false }),
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
        })

        // Cluster circles
        map.addLayer({
          id: CLUSTERS_LAYER,
          type: 'circle',
          source: SOURCE_ID,
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': '#1F6B4A',
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              5,
              28,
              20,
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
            'text-field': '{point_count_abbreviated}',
            'text-font': ['Noto Sans Bold'],
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
            'circle-color': ['get', 'color'],
            'circle-radius': ['case', ['>', ['get', 'eventCount'], 1], 10, 7],
            'circle-stroke-width': 2.5,
            'circle-stroke-color': '#ffffff',
            'circle-opacity': 0.95,
          },
        })

        mapRef.current = map
        setMapReady(true)

        // Click cluster → expand
        map.on('click', CLUSTERS_LAYER, (e: any) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: [CLUSTERS_LAYER],
          })
          if (!features.length) return
          const clusterId = features[0].properties.cluster_id
          map
            .getSource(SOURCE_ID)
            .getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
              if (err) return
              map.easeTo({ center: features[0].geometry.coordinates, zoom })
            })
        })

        // Click individual pin → show popup
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

          const eventsHtml = events
            .slice(0, 3)
            .map((ev) => {
              const date = new Date(ev.startDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })
              return `<a href="/events/${ev.slug}" style="display:block;padding:2px 0;font-size:12px;line-height:1.4;color:#1a1a1a;text-decoration:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
              ${ev.clubName}<span style="margin-left:8px;font-size:11px;color:#7A6E5E">${date}</span>
            </a>`
            })
            .join('')

          const moreHtml =
            events.length > 3
              ? `<p style="margin-top:4px;font-size:11px;color:#7A6E5E">+${events.length - 3} more events</p>`
              : ''

          const html = `
            <div style="min-width:200px;max-width:240px">
              <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:6px">
                <span style="font-size:11px;font-weight:500;color:#7A6E5E">${props.city}, ${props.state}</span>
              </div>
              ${eventsHtml}
              ${moreHtml}
            </div>
          `

          const popup = new maplibregl.Popup({
            closeButton: true,
            maxWidth: '260px',
            offset: 8,
          })
            .setLngLat(coords as [number, number])
            .setHTML(html)
            .addTo(map)

          popupRef.current = popup

          if (events.length > 0) {
            onPinClick?.(events[0].id)
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
            const events: VenuePin['events'] = JSON.parse(props.events || '[]')
            if (events.length > 0) onPinHover?.(events[0].id)
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
      map.setPaintProperty(UNCLUSTERED_LAYER, 'circle-radius', [
        'case',
        ['>', ['get', 'eventCount'], 1],
        10,
        7,
      ])
      return
    }
    // Find the venueId for this eventId
    const pin = pins.find((p) =>
      p.events.some((e) => e.id === highlightedEventId)
    )
    if (!pin) return
    map.setPaintProperty(UNCLUSTERED_LAYER, 'circle-radius', [
      'case',
      ['==', ['get', 'venueId'], pin.venueId],
      13,
      ['>', ['get', 'eventCount'], 1],
      10,
      7,
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
