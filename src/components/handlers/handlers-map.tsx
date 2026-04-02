'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { MapPin } from '@phosphor-icons/react'
import { Map, Marker, Overlay } from 'pigeon-maps'

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

interface PinWithCoords {
  handler: HandlerPin
  coords: [number, number]
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
  const containerRef = useRef<HTMLDivElement>(null)
  const [mapHeight, setMapHeight] = useState(600)
  const [selectedPin, setSelectedPin] = useState<PinWithCoords | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setMapHeight(Math.round(entry.contentRect.height))
      }
    })
    observer.observe(el)
    setMapHeight(Math.round(el.clientHeight))
    return () => observer.disconnect()
  }, [])

  // Memoize pin positions so random offsets stay stable across renders
  const pinsWithCoords = useMemo(() => {
    return handlers
      .map((h) => ({ handler: h, coords: getHandlerCoords(h) }))
      .filter((p): p is PinWithCoords => p.coords !== null)
  }, [handlers])

  // Compute center from pins or default to US center
  const center = useMemo<[number, number]>(() => {
    if (pinsWithCoords.length === 0) return [39.8283, -98.5795]
    const avgLat =
      pinsWithCoords.reduce((sum, p) => sum + p.coords[0], 0) /
      pinsWithCoords.length
    const avgLng =
      pinsWithCoords.reduce((sum, p) => sum + p.coords[1], 0) /
      pinsWithCoords.length
    return [avgLat, avgLng]
  }, [pinsWithCoords])

  const handleMapClick = useCallback(() => {
    setSelectedPin(null)
  }, [])

  const handleMarkerClick = useCallback(
    (pin: PinWithCoords) => {
      setSelectedPin((prev) =>
        prev?.handler.id === pin.handler.id ? null : pin
      )
      onPinClick?.(pin.handler.id)
    },
    [onPinClick]
  )

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      <div className="h-full w-full overflow-hidden rounded-2xl border border-sand">
        <Map
          defaultCenter={center}
          defaultZoom={4}
          height={mapHeight}
          onClick={({ event }) => {
            const target = event.target as HTMLElement
            if (!target.closest('[data-pin-overlay]')) {
              handleMapClick()
            }
          }}
          attribution={false}
        >
          {pinsWithCoords.map((pin) => {
            const isHighlighted = highlightedId === pin.handler.id

            return (
              <Marker
                key={pin.handler.id}
                anchor={pin.coords}
                onClick={() => handleMarkerClick(pin)}
                onMouseOver={() => onPinHover?.(pin.handler.id)}
                onMouseOut={() => onPinHover?.(null)}
              >
                <div
                  style={{
                    background: '#1F6B4A',
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    border: '2.5px solid white',
                    boxShadow: isHighlighted
                      ? '0 0 8px rgba(31, 107, 74, 0.6), 0 2px 6px rgba(0,0,0,0.25)'
                      : '0 2px 6px rgba(0,0,0,0.25)',
                    transform: isHighlighted ? 'scale(1.3)' : 'scale(1)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer',
                    zIndex: isHighlighted ? 1000 : 'auto',
                  }}
                />
              </Marker>
            )
          })}

          {selectedPin && (
            <Overlay anchor={selectedPin.coords} offset={[0, -20]}>
              <div
                data-pin-overlay
                className="rounded-lg border border-sand bg-white p-3 shadow-md"
                style={{ minWidth: 180, maxWidth: 260 }}
              >
                <div className="border-b-2 border-paddock-green pb-1 font-display text-sm font-bold text-ringside-black">
                  {selectedPin.handler.name}
                </div>
                <p className="mb-1 mt-1 text-xs text-warm-gray">
                  {[selectedPin.handler.city, selectedPin.handler.state]
                    .filter(Boolean)
                    .join(', ')}
                </p>
                <p className="mb-2 text-xs text-warm-gray">
                  {selectedPin.handler.serviceType}
                  {selectedPin.handler.ratePerShow
                    ? ` · $${selectedPin.handler.ratePerShow}/show`
                    : ''}
                </p>
                <a
                  href={`/handlers/${selectedPin.handler.id}`}
                  className="inline-flex items-center gap-1 rounded-lg bg-paddock-green px-2.5 py-1 text-xs font-semibold text-white no-underline"
                >
                  View Profile
                </a>
              </div>
            </Overlay>
          )}
        </Map>
      </div>

      {/* Empty state overlay */}
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
