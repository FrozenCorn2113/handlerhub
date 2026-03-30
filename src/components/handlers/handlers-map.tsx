'use client'

import { useEffect, useMemo, useRef } from 'react'

import { MapPin } from '@phosphor-icons/react'

export interface HandlerPin {
  id: string
  name: string
  city: string | null
  state: string | null
  serviceType: string
  ratePerShow: number | null
}

interface HandlersMapProps {
  handlers: HandlerPin[]
  highlightedId?: string | null
  onPinHover?: (id: string | null) => void
  onPinClick?: (id: string) => void
}

// Simple US city geocoding fallback - state centers
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

function getHandlerCoords(handler: HandlerPin): [number, number] | null {
  if (handler.state) {
    const coords = STATE_COORDS[handler.state.toUpperCase()]
    if (coords) {
      // Add small random offset so pins at same state don't stack
      return [
        coords[0] + (Math.random() - 0.5) * 1.5,
        coords[1] + (Math.random() - 0.5) * 1.5,
      ]
    }
  }
  return null
}

export function HandlersMap({
  handlers,
  highlightedId,
  onPinHover,
  onPinClick,
}: HandlersMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<any>(null)
  const clusterGroupRef = useRef<any>(null)
  const markersRef = useRef<Map<string, any>>(new Map())

  useEffect(() => {
    if (!mapRef.current) return

    const initMap = async () => {
      const L = (await import('leaflet')).default
      await import('leaflet.markercluster')

      if (!document.getElementById('handler-markercluster-css')) {
        const css1 = document.createElement('link')
        css1.id = 'handler-markercluster-css'
        css1.rel = 'stylesheet'
        css1.href =
          'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css'
        document.head.appendChild(css1)
        const css2 = document.createElement('link')
        css2.rel = 'stylesheet'
        css2.href =
          'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css'
        document.head.appendChild(css2)
      }

      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      if (leafletMapRef.current) leafletMapRef.current.remove()

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
    }

    initMap()
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [])

  // Update markers when handlers change
  useEffect(() => {
    if (!leafletMapRef.current) return

    const updateMarkers = async () => {
      const L = (await import('leaflet')).default
      await import('leaflet.markercluster')

      if (clusterGroupRef.current) {
        leafletMapRef.current.removeLayer(clusterGroupRef.current)
      }
      markersRef.current.clear()

      const pinsWithCoords = handlers
        .map((h) => ({ handler: h, coords: getHandlerCoords(h) }))
        .filter(
          (p): p is { handler: HandlerPin; coords: [number, number] } =>
            p.coords !== null
        )

      if (pinsWithCoords.length === 0) return

      const clusterGroup = L.markerClusterGroup({
        maxClusterRadius: 50,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        iconCreateFunction: (cluster: any) => {
          const count = cluster.getChildCount()
          const size = count >= 100 ? 44 : count >= 10 ? 40 : 36
          const fontSize = count >= 100 ? 14 : 13
          return L.divIcon({
            html: `<div style="background:#1F6B4A;color:white;width:${size}px;height:${size}px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:${fontSize}px;font-weight:700;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.25);">${count}</div>`,
            className: 'custom-cluster',
            iconSize: [size, size],
            iconAnchor: [size / 2, size / 2],
          })
        },
      })

      const bounds: [number, number][] = []

      pinsWithCoords.forEach(({ handler: h, coords }) => {
        bounds.push(coords)

        const icon = L.divIcon({
          html: `<div style="background:#1F6B4A;width:14px;height:14px;border-radius:50%;border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.25);"></div>`,
          className: 'custom-pin',
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        })

        const marker = L.marker(coords, { icon })

        const price = h.ratePerShow ? `$${h.ratePerShow}/show` : ''
        marker.bindPopup(
          `
          <div style="min-width:160px;">
            <div style="font-weight:700;font-size:14px;color:#1C1208;padding-bottom:4px;border-bottom:2px solid #1F6B4A;margin-bottom:4px;">
              ${h.name}
            </div>
            <div style="font-size:12px;color:#7A6E5E;margin-bottom:4px;">${[h.city, h.state].filter(Boolean).join(', ')}</div>
            <div style="font-size:12px;color:#7A6E5E;">${h.serviceType}${price ? ` · ${price}` : ''}</div>
            <a href="/handlers/${h.id}" style="display:inline-block;margin-top:6px;padding:4px 10px;background:#1F6B4A;color:white;border-radius:8px;text-decoration:none;font-size:12px;font-weight:600;">
              View Profile
            </a>
          </div>
        `,
          { maxWidth: 250, className: 'handler-popup' }
        )

        marker.on('mouseover', () => onPinHover?.(h.id))
        marker.on('mouseout', () => onPinHover?.(null))
        marker.on('click', () => onPinClick?.(h.id))

        clusterGroup.addLayer(marker)
        markersRef.current.set(h.id, marker)
      })

      leafletMapRef.current.addLayer(clusterGroup)
      clusterGroupRef.current = clusterGroup

      if (bounds.length > 0) {
        leafletMapRef.current.fitBounds(bounds, {
          padding: [40, 40],
          maxZoom: 12,
        })
      }
    }

    updateMarkers()
  }, [handlers, onPinHover, onPinClick])

  // Highlight effect
  useEffect(() => {
    markersRef.current.forEach((m, id) => {
      const el = m.getElement?.()
      if (!el) return
      if (highlightedId && id === highlightedId) {
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
  }, [highlightedId])

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />
      <style>{`
        .custom-pin, .custom-cluster { background: transparent !important; border: none !important; }
        .handler-popup .leaflet-popup-content-wrapper { border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
        .handler-popup .leaflet-popup-content { margin: 10px 14px; }
      `}</style>
      <div className="relative h-full w-full">
        <div
          ref={mapRef}
          className="h-full w-full"
          style={{ minHeight: '400px' }}
        />
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
    </>
  )
}
