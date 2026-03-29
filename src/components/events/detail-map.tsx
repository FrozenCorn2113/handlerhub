'use client'

import { useEffect, useRef } from 'react'

interface DetailMapProps {
  lat: number
  lng: number
  name: string
}

export function DetailMap({ lat, lng, name }: DetailMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<any>(null)

  useEffect(() => {
    if (!mapRef.current) return

    const initMap = async () => {
      const L = (await import('leaflet')).default

      // Fix default icon paths
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
      }

      const map = L.map(mapRef.current!, {
        center: [lat, lng],
        zoom: 14,
        scrollWheelZoom: false,
        zoomControl: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)

      // Custom pin
      const icon = L.divIcon({
        html: `<div style="
          background: #1F6B4A;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>`,
        className: 'custom-pin',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      })

      L.marker([lat, lng], { icon })
        .addTo(map)
        .bindPopup(`<strong>${name}</strong>`)

      leafletMapRef.current = map
    }

    initMap()

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [lat, lng, name])

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />
      <style>{`
        .custom-pin {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
      <div
        ref={mapRef}
        className="h-full w-full"
        style={{ minHeight: '300px' }}
      />
    </>
  )
}
