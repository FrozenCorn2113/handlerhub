'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { MapPin } from '@phosphor-icons/react'
import 'maplibre-gl/dist/maplibre-gl.css'

export interface HandlerPin {
  id: string
  name: string
  city: string | null
  state: string | null
  serviceType: string
  ratePerShow: number | null
  latitude?: number | null
  longitude?: number | null
}

interface HandlersMapProps {
  handlers: HandlerPin[]
  highlightedId?: string | null
  onPinHover?: (id: string | null) => void
  onPinClick?: (id: string) => void
}

// State center coordinates as fallback
const STATE_COORDS: Record<string, [number, number]> = {
  AL: [32.806671, -86.79113],
  AK: [61.370716, -152.404419],
  AZ: [33.729759, -111.431221],
  AR: [34.969704, -92.373123],
  CA: [36.116203, -119.681564],
  CO: [39.059811, -105.311104],
  CT: [41.597782, -72.755371],
  DE: [39.318523, -75.507141],
  FL: [27.766279, -81.686783],
  GA: [33.040619, -83.643074],
  HI: [21.094318, -157.498337],
  ID: [44.240459, -114.478773],
  IL: [40.349457, -88.986137],
  IN: [39.849426, -86.258278],
  IA: [42.011539, -93.210526],
  KS: [38.5266, -96.726486],
  KY: [37.66814, -84.670067],
  LA: [31.169546, -91.867805],
  ME: [44.693947, -69.381927],
  MD: [39.063946, -76.802101],
  MA: [42.230171, -71.530106],
  MI: [43.326618, -84.536095],
  MN: [45.694454, -93.900192],
  MS: [32.741646, -89.678696],
  MO: [38.456085, -92.288368],
  MT: [46.921925, -110.454353],
  NE: [41.12537, -98.268082],
  NV: [38.313515, -117.055374],
  NH: [43.452492, -71.563896],
  NJ: [40.298904, -74.521011],
  NM: [34.840515, -106.248482],
  NY: [42.165726, -74.948051],
  NC: [35.630066, -79.806419],
  ND: [47.528912, -99.784012],
  OH: [40.388783, -82.764915],
  OK: [35.565342, -96.928917],
  OR: [44.572021, -122.070938],
  PA: [40.590752, -77.209755],
  RI: [41.680893, -71.51178],
  SC: [33.856892, -80.945007],
  SD: [44.299782, -99.438828],
  TN: [35.747845, -86.692345],
  TX: [31.054487, -97.563461],
  UT: [40.150032, -111.862434],
  VT: [44.045876, -72.710686],
  VA: [37.769337, -78.169968],
  WA: [47.400902, -121.490494],
  WV: [38.491226, -80.954456],
  WI: [44.268543, -89.616508],
  WY: [42.755966, -107.30249],
}

const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY || ''
const MAPTILER_URL = `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`

const SOURCE_ID = 'handlers'
const CLUSTERS_LAYER = 'handler-clusters'
const CLUSTER_COUNT_LAYER = 'handler-cluster-count'
const PINS_LAYER = 'handler-pins'

export function HandlersMap({
  handlers,
  highlightedId,
  onPinHover,
  onPinClick,
}: HandlersMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const popupRef = useRef<any>(null)
  const [mapReady, setMapReady] = useState(false)

  // Stable random offsets per handler id (so pins don't jump on re-render)
  const offsets = useMemo(() => {
    const m: Record<string, [number, number]> = {}
    for (const h of handlers) {
      m[h.id] = [(Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5]
    }
    return m
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlers.map((h) => h.id).join(',')])

  const geojson = useMemo(() => {
    const features: any[] = []
    for (const handler of handlers) {
      let lat: number | null = null
      let lng: number | null = null
      if (handler.latitude != null && handler.longitude != null) {
        lat = handler.latitude
        lng = handler.longitude
      } else if (handler.state) {
        const coords = STATE_COORDS[handler.state.toUpperCase()]
        if (coords) {
          const off = offsets[handler.id] || [0, 0]
          lat = coords[0] + off[0]
          lng = coords[1] + off[1]
        }
      }
      if (lat == null || lng == null) continue
      features.push({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [lng, lat] },
        properties: {
          id: handler.id,
          name: handler.name,
          city: handler.city || '',
          state: handler.state || '',
          serviceType: handler.serviceType,
          ratePerShow: handler.ratePerShow,
        },
      })
    }
    return { type: 'FeatureCollection', features }
  }, [handlers, offsets])

  const initialCenter = useMemo<[number, number]>(() => {
    const pts = geojson.features
    if (pts.length === 0) return [-98.5795, 39.8283]
    const avgLng =
      pts.reduce((s: number, f: any) => s + f.geometry.coordinates[0], 0) /
      pts.length
    const avgLat =
      pts.reduce((s: number, f: any) => s + f.geometry.coordinates[1], 0) /
      pts.length
    return [avgLng, avgLat]
  }, [geojson])

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
        style: MAPTILER_URL,
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
          clusterMaxZoom: 12,
          clusterRadius: 50,
        })

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
              18,
              5,
              24,
              15,
              32,
            ],
            'circle-stroke-width': 2.5,
            'circle-stroke-color': '#ffffff',
            'circle-opacity': 0.9,
          },
        })

        map.addLayer({
          id: CLUSTER_COUNT_LAYER,
          type: 'symbol',
          source: SOURCE_ID,
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['Noto Sans Bold'],
            'text-size': 12,
          },
          paint: { 'text-color': '#ffffff' },
        })

        map.addLayer({
          id: PINS_LAYER,
          type: 'circle',
          source: SOURCE_ID,
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': '#1F6B4A',
            'circle-radius': 7,
            'circle-stroke-width': 2.5,
            'circle-stroke-color': '#ffffff',
            'circle-opacity': 0.95,
          },
        })

        mapRef.current = map
        setMapReady(true)

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

        map.on('click', PINS_LAYER, (e: any) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: [PINS_LAYER],
          })
          if (!features.length) return
          const props = features[0].properties
          const coords = features[0].geometry.coordinates.slice()

          if (popupRef.current) popupRef.current.remove()

          const location = [props.city, props.state].filter(Boolean).join(', ')
          const rate = props.ratePerShow ? ` · $${props.ratePerShow}/show` : ''

          const html = `
            <div style="min-width:180px">
              <div style="font-weight:700;font-size:14px;margin-bottom:4px;color:#1a1a1a">${props.name}</div>
              <p style="margin:0 0 2px;font-size:12px;color:#7A6E5E">${location}</p>
              <p style="margin:0 0 10px;font-size:12px;color:#7A6E5E">${props.serviceType}${rate}</p>
              <a href="/handlers/${props.id}" style="display:inline-flex;align-items:center;padding:4px 10px;background:#1F6B4A;color:white;border-radius:8px;font-size:12px;font-weight:600;text-decoration:none">View Profile</a>
            </div>
          `

          const popup = new maplibregl.Popup({
            closeButton: true,
            maxWidth: '280px',
            offset: 8,
          })
            .setLngLat(coords as [number, number])
            .setHTML(html)
            .addTo(map)

          popupRef.current = popup
          onPinClick?.(props.id)
        })

        map.on('mouseenter', CLUSTERS_LAYER, () => {
          map.getCanvas().style.cursor = 'pointer'
        })
        map.on('mouseleave', CLUSTERS_LAYER, () => {
          map.getCanvas().style.cursor = ''
        })
        map.on('mouseenter', PINS_LAYER, (e: any) => {
          map.getCanvas().style.cursor = 'pointer'
          const features = map.queryRenderedFeatures(e.point, {
            layers: [PINS_LAYER],
          })
          if (features.length) onPinHover?.(features[0].properties.id)
        })
        map.on('mouseleave', PINS_LAYER, () => {
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
  }, [])

  // Update data when handlers change
  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapReady) return
    const source = map.getSource(SOURCE_ID)
    if (source) source.setData(geojson)
  }, [geojson, mapReady])

  // Highlight
  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapReady) return
    map.setPaintProperty(
      PINS_LAYER,
      'circle-radius',
      highlightedId ? ['case', ['==', ['get', 'id'], highlightedId], 11, 7] : 7
    )
    map.setPaintProperty(
      PINS_LAYER,
      'circle-opacity',
      highlightedId
        ? ['case', ['==', ['get', 'id'], highlightedId], 1, 0.7]
        : 0.95
    )
  }, [highlightedId, mapReady])

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="h-full w-full overflow-hidden rounded-2xl border border-sand">
        <div ref={containerRef} className="h-full w-full" />
      </div>

      {handlers.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80">
          <MapPin size={40} weight="light" className="mb-2 text-warm-gray" />
          <p className="text-sm font-medium text-warm-gray">
            No handlers to display
          </p>
          <p className="text-xs text-warm-gray/70">
            Try adjusting your filters
          </p>
        </div>
      )}
    </div>
  )
}
