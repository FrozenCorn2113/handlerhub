/**
 * Server-side geocoding via Nominatim (OpenStreetMap).
 * Rate limit: 1 req/s — appropriate for write-time geocoding only.
 */

interface NominatimResult {
  lat: string
  lon: string
  display_name: string
}

/**
 * Geocode a city + state (US) to lat/lng.
 * Returns null if the lookup fails or returns no results.
 */
export async function geocodeCityState(
  city: string,
  state: string,
  country = 'USA'
): Promise<{ lat: number; lng: number } | null> {
  const q = `${city}, ${state}, ${country}`
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1&countrycodes=us`

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'HandlerHub/1.0 (https://handlerhub.com)',
        Accept: 'application/json',
      },
      // 8-second timeout
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) return null

    const data: NominatimResult[] = await res.json()
    if (!data.length) return null

    const lat = parseFloat(data[0].lat)
    const lng = parseFloat(data[0].lon)
    if (isNaN(lat) || isNaN(lng)) return null

    return { lat, lng }
  } catch {
    // Non-fatal: map will fall back to state centroids
    return null
  }
}
