/**
 * Venue Geocoding Script
 *
 * Geocodes venues that are missing lat/lng coordinates using
 * OpenStreetMap's Nominatim API (free, no API key needed).
 *
 * Respects Nominatim's rate limit of 1 request per second.
 * Skips venues that already have coordinates, so re-runs are safe.
 *
 * Usage:
 *   npx tsx scripts/geocode-venues.ts
 *   npx tsx scripts/geocode-venues.ts --dry-run   # Preview without updating
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const DRY_RUN = process.argv.includes('--dry-run')
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search'
const DELAY_MS = 1100 // Slightly over 1s to respect rate limits
const USER_AGENT = 'HandlerHub/1.0 (venue geocoding script)'

interface NominatimResult {
  lat: string
  lon: string
  display_name: string
}

/** Sleep for a given number of milliseconds */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Query Nominatim for coordinates given an address string */
async function geocodeAddress(
  address: string
): Promise<{ lat: number; lng: number } | null> {
  const params = new URLSearchParams({
    q: address,
    format: 'json',
    limit: '1',
    countrycodes: 'us',
  })

  try {
    const response = await fetch(`${NOMINATIM_URL}?${params}`, {
      headers: {
        'User-Agent': USER_AGENT,
      },
    })

    if (!response.ok) {
      console.warn(`  HTTP ${response.status} for: ${address}`)
      return null
    }

    const results: NominatimResult[] = await response.json()

    if (results.length === 0) {
      return null
    }

    const lat = parseFloat(results[0].lat)
    const lng = parseFloat(results[0].lon)

    if (isNaN(lat) || isNaN(lng)) {
      return null
    }

    return { lat, lng }
  } catch (err) {
    console.warn(`  Fetch error for "${address}":`, (err as Error).message)
    return null
  }
}

/**
 * Build progressively simpler address queries to try.
 * Nominatim can be picky -- sometimes "123 Main St, Springfield, IL"
 * fails but "Springfield, IL" succeeds.
 */
function buildQueries(venue: {
  address: string
  city: string
  state: string
}): string[] {
  const queries: string[] = []

  // Full address as stored
  if (venue.address) {
    queries.push(venue.address)
  }

  // City + State fallback (gives approximate location, better than nothing)
  if (venue.city && venue.state) {
    const cityState = `${venue.city}, ${venue.state}`
    if (!queries.includes(cityState)) {
      queries.push(cityState)
    }
  }

  return queries
}

async function main() {
  if (DRY_RUN) {
    console.log('=== DRY RUN MODE (no database updates) ===\n')
  }

  // Find all venues without coordinates
  const venues = await prisma.venue.findMany({
    where: {
      OR: [{ latitude: null }, { longitude: null }],
    },
    orderBy: { createdAt: 'asc' },
  })

  console.log(`Found ${venues.length} venues without coordinates\n`)

  if (venues.length === 0) {
    console.log('All venues already have coordinates. Nothing to do.')
    return
  }

  let geocoded = 0
  let failed = 0
  let fallback = 0

  for (let i = 0; i < venues.length; i++) {
    const venue = venues[i]
    const progress = `[${i + 1}/${venues.length}]`
    console.log(`${progress} ${venue.name}`)
    console.log(`  Address: ${venue.address}`)

    const queries = buildQueries(venue)
    let result: { lat: number; lng: number } | null = null
    let usedFallback = false

    for (let q = 0; q < queries.length; q++) {
      if (i > 0 || q > 0) {
        // Rate limit: wait between requests (skip delay before first request)
        await sleep(DELAY_MS)
      }

      const query = queries[q]
      if (q > 0) {
        console.log(`  Trying fallback: "${query}"`)
        usedFallback = true
      }

      result = await geocodeAddress(query)
      if (result) break
    }

    if (result) {
      console.log(
        `  -> ${result.lat.toFixed(4)}, ${result.lng.toFixed(4)}${usedFallback ? ' (city-level fallback)' : ''}`
      )

      if (!DRY_RUN) {
        await prisma.venue.update({
          where: { id: venue.id },
          data: {
            latitude: result.lat,
            longitude: result.lng,
          },
        })
      }

      geocoded++
      if (usedFallback) fallback++
    } else {
      console.log(`  -> FAILED to geocode`)
      failed++
    }
  }

  console.log(`\nGeocoding complete:`)
  console.log(`  Geocoded: ${geocoded} (${fallback} via city-level fallback)`)
  console.log(`  Failed:   ${failed}`)
  console.log(`  Total:    ${venues.length}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
