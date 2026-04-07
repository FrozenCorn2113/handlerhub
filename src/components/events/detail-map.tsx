'use client'

import { useEffect, useRef } from 'react'

import 'mapbox-gl/dist/mapbox-gl.css'

interface DetailMapProps {
  lat: number
  lng: number
  name: string
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

export function DetailMap({ lat, lng, name }: DetailMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (!containerRef.current) return

    let map: any
    let marker: any

    const init = async () => {
      const mapboxgl = (await import('mapbox-gl')).default

      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }

      mapboxgl.accessToken = MAPBOX_TOKEN

      map = new mapboxgl.Map({
        container: containerRef.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: 13,
        attributionControl: false,
      })

      map.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }),
        'top-right'
      )

      const el = document.createElement('div')
      el.style.cssText = `
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #1F6B4A;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      `

      marker = new mapboxgl.Marker({ element: el })
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 16, closeButton: false }).setHTML(
            `<div style="font-weight:600;font-size:13px;padding:2px 4px">${name}</div>`
          )
        )
        .addTo(map)

      marker.togglePopup()
      mapRef.current = map
    }

    init()

    return () => {
      marker?.remove()
      map?.remove()
      mapRef.current = null
    }
  }, [lat, lng, name])

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      style={{ minHeight: '300px' }}
    />
  )
}
