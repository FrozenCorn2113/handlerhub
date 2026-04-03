import { useMemo } from 'react'

import type { VenuePin } from './events-map'
import Supercluster from 'supercluster'

interface ClusterItem {
  lat: number
  lng: number
  isCluster: boolean
  pointCount: number
  clusterId: number | null
  venuePin?: VenuePin
}

interface MapBounds {
  ne: [number, number]
  sw: [number, number]
}

type VenuePinProperties = {
  venuePin: VenuePin
}

export function useMapClusters(
  pins: VenuePin[],
  bounds: MapBounds | null,
  zoom: number
) {
  // Convert pins to GeoJSON features
  const features = useMemo<
    GeoJSON.Feature<GeoJSON.Point, VenuePinProperties>[]
  >(() => {
    return pins.map((pin) => ({
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [pin.lng, pin.lat],
      },
      properties: {
        venuePin: pin,
      },
    }))
  }, [pins])

  // Build supercluster index
  const index = useMemo(() => {
    const sc = new Supercluster<VenuePinProperties>({
      radius: 60,
      maxZoom: 16,
    })
    sc.load(features)
    return sc
  }, [features])

  // Compute clusters for current viewport
  const clusters = useMemo<ClusterItem[]>(() => {
    if (!bounds) {
      // Before first onBoundsChanged, show full US extent
      const defaultBbox: [number, number, number, number] = [-130, 24, -65, 50]
      const raw = index.getClusters(defaultBbox, zoom)
      return raw.map((f) => {
        const [lng, lat] = f.geometry.coordinates
        const props = f.properties
        if ('cluster' in props && props.cluster) {
          return {
            lat,
            lng,
            isCluster: true,
            pointCount: props.point_count ?? 0,
            clusterId: props.cluster_id as number,
          }
        }
        return {
          lat,
          lng,
          isCluster: false,
          pointCount: 1,
          clusterId: null,
          venuePin: (props as unknown as VenuePinProperties).venuePin,
        }
      })
    }

    // Convert pigeon-maps bounds { ne: [lat, lng], sw: [lat, lng] }
    // to supercluster bbox [westLng, southLat, eastLng, northLat]
    const bbox: [number, number, number, number] = [
      bounds.sw[1], // west lng
      bounds.sw[0], // south lat
      bounds.ne[1], // east lng
      bounds.ne[0], // north lat
    ]

    const raw = index.getClusters(bbox, Math.floor(zoom))
    return raw.map((f) => {
      const [lng, lat] = f.geometry.coordinates
      const props = f.properties
      if ('cluster' in props && props.cluster) {
        return {
          lat,
          lng,
          isCluster: true,
          pointCount: props.point_count ?? 0,
          clusterId: props.cluster_id as number,
        }
      }
      return {
        lat,
        lng,
        isCluster: false,
        pointCount: 1,
        clusterId: null,
        venuePin: (props as unknown as VenuePinProperties).venuePin,
      }
    })
  }, [bounds, zoom, index])

  // Expansion zoom helper
  const getExpansionZoom = useMemo(() => {
    return (clusterId: number): number => {
      return index.getClusterExpansionZoom(clusterId)
    }
  }, [index])

  return { clusters, getExpansionZoom }
}
