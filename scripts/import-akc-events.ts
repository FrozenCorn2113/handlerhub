/**
 * AKC CSV Event Import Script
 *
 * Parses the AKC "Save to Excel" CSV export and upserts events into the database.
 * Normalizes venue addresses for "also at this venue" matching.
 *
 * Usage:
 *   npx tsx scripts/import-akc-events.ts path/to/EventSearch.csv
 */
import { EntryStatus, EventType, PrismaClient } from '@prisma/client'
import { parse } from 'csv-parse/sync'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const prisma = new PrismaClient()

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Map AKC event type codes to our enum */
function mapEventType(raw: string): EventType {
  const code = raw.trim().toUpperCase()
  switch (code) {
    case 'AB':
      return 'ALL_BREED'
    case 'LB':
      return 'LIMITED_BREED'
    case 'S':
      return 'SPECIALTY'
    case 'PS':
      return 'PARENT_SPECIALTY'
    case 'DS':
      return 'DESIGNATED_SPECIALTY'
    case 'JSHW':
      return 'JUNIOR_SHOWMANSHIP'
    case 'SWPC':
      return 'SWEEPSTAKES'
    case 'O':
      return 'OTHER'
    default:
      return 'OTHER'
  }
}

/** Normalize an address string for venue dedup matching */
function normalizeAddress(address: string): string {
  return address
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[;]+/g, ',')
    .replace(/\bst\.?\b/g, 'street')
    .replace(/\brd\.?\b/g, 'road')
    .replace(/\bdr\.?\b/g, 'drive')
    .replace(/\bave\.?\b/g, 'avenue')
    .replace(/\bblvd\.?\b/g, 'boulevard')
    .replace(/\bln\.?\b/g, 'lane')
    .replace(/\bct\.?\b/g, 'court')
    .replace(/\bcntr?\b/g, 'center')
    .replace(/\bctr\b/g, 'center')
    .replace(/\bpkwy\b/g, 'parkway')
    .replace(/\bhwy\b/g, 'highway')
    .replace(/suite\s*\d+/gi, '')
    .replace(/ste\s*\d+/gi, '')
    .replace(/[.,#]/g, '')
    .trim()
}

/** Extract venue name from the AKC address field (semicolon-delimited) */
function extractVenueName(rawAddress: string): string {
  // AKC address format: "Venue Name; Venue Name; 123 Some Rd."
  const parts = rawAddress.split(';').map((p) => p.trim())
  return parts[0] || rawAddress
}

/** Extract street address from the AKC address field */
function extractStreetAddress(rawAddress: string): string {
  const parts = rawAddress.split(';').map((p) => p.trim())
  // Last part is usually the street address
  return parts[parts.length - 1] || rawAddress
}

/** Parse AKC date string like "29-Mar-2026" into a Date */
function parseAKCDate(dateStr: string): Date | null {
  if (!dateStr || !dateStr.trim()) return null
  const cleaned = dateStr.trim()
  const parsed = new Date(cleaned)
  if (isNaN(parsed.getTime())) return null
  return parsed
}

/** Parse AKC datetime string like "11-Mar-2026, 12:00:00 AM" into a Date */
function parseAKCDateTime(dateTimeStr: string): Date | null {
  if (!dateTimeStr || !dateTimeStr.trim()) return null
  const cleaned = dateTimeStr.trim()
  const parsed = new Date(cleaned)
  if (isNaN(parsed.getTime())) return null
  return parsed
}

/** Determine entry status from closing date */
function computeEntryStatus(
  closingDateTime: Date | null,
  openingDateTime: Date | null
): EntryStatus {
  const now = new Date()

  if (openingDateTime && openingDateTime > now) return 'NOT_YET_OPEN'
  if (!closingDateTime) return 'OPEN'

  const daysUntilClose = Math.ceil(
    (closingDateTime.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (daysUntilClose < 0) return 'CLOSED'
  if (daysUntilClose <= 5) return 'CLOSING_SOON'
  return 'OPEN'
}

/** Generate a URL-friendly slug from event data */
function generateSlug(
  clubName: string,
  eventTypeRaw: string,
  startDate: Date,
  eventNumber: string
): string {
  const clubSlug = clubName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  const typeSlug = eventTypeRaw.toLowerCase()
  const dateStr = startDate.toISOString().split('T')[0]
  return `${clubSlug}-${typeSlug}-${dateStr}-${eventNumber}`
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const csvPath = process.argv[2]
  if (!csvPath) {
    console.error('Usage: npx tsx scripts/import-akc-events.ts <path-to-csv>')
    process.exit(1)
  }

  const absolutePath = resolve(csvPath)
  console.log(`Reading CSV from: ${absolutePath}`)

  const raw = readFileSync(absolutePath, 'utf-8')

  // The AKC CSV has header rows before the actual data header.
  // Find the line that starts with "Name" to locate the real header.
  const lines = raw.split('\n')
  let headerLineIndex = -1
  for (let i = 0; i < Math.min(lines.length, 20); i++) {
    if (lines[i].startsWith('"Name"')) {
      headerLineIndex = i
      break
    }
  }

  if (headerLineIndex === -1) {
    console.error('Could not find header row starting with "Name"')
    process.exit(1)
  }

  const csvContent = lines.slice(headerLineIndex).join('\n')

  const records: Record<string, string>[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
  })

  console.log(`Parsed ${records.length} rows from CSV`)

  // Venue cache: normalizedAddress -> venueId
  const venueCache = new Map<string, string>()

  let created = 0
  let updated = 0
  let skipped = 0

  for (const row of records) {
    try {
      const clubName = row['Name'] || ''
      const eventNumber = row['Event Number'] || ''
      const eventTypeRaw = row['Event Type'] || ''
      const locationRaw = row['Location'] || ''
      const addressRaw = row['Address'] || ''
      const city = row['City'] || ''
      const state = row['State'] || ''
      const startDay = row['Start day'] || ''
      const startDateStr = row['Start Date'] || ''
      const entryAcceptanceMethod = row['Entry Acceptance Method'] || ''
      const entryLimit = row['Entry Limit'] || ''
      const openingDay = row['Opening Day'] || ''
      const openingDayTime = row['Opening Day/ Time'] || ''
      const closingDay = row['Closing Day'] || ''
      const closingDateTime = row['Closing Date/Time'] || ''
      const timeZone = row['Time Zome'] || '' // Note: AKC CSV has typo "Zome"
      const superName = row['Superintendent/Secretary Name'] || ''
      const superPhone = row['Superintendent/Secretary Phone'] || ''
      const superEmail = row['Superintendent/ Secretary Email'] || ''
      const chairName = row['Event Chair Name'] || ''
      const chairPhone = row['Event Chair Phone'] || ''
      const chairEmail = row['Event Chair Email'] || ''
      const eligibleBreeds = row['Eligible Breeds'] || ''
      const entryFee = row['Entry Fee'] || ''

      if (!clubName || !eventNumber || !startDateStr) {
        skipped++
        continue
      }

      const startDate = parseAKCDate(startDateStr)
      if (!startDate) {
        console.warn(
          `Skipping event ${eventNumber}: invalid date "${startDateStr}"`
        )
        skipped++
        continue
      }

      const openingDT = parseAKCDateTime(openingDayTime)
      const closingDT = parseAKCDateTime(closingDateTime)

      // Venue handling
      const venueName = extractVenueName(addressRaw)
      const streetAddress = extractStreetAddress(addressRaw)
      const fullAddress = `${streetAddress}, ${city}, ${state}`
      const normalizedAddr = normalizeAddress(fullAddress)
      const normalizedVenueName = venueName.toLowerCase().trim()

      let venueId = venueCache.get(normalizedAddr)
      if (!venueId) {
        const existingVenue = await prisma.venue.findUnique({
          where: { normalizedAddress: normalizedAddr },
        })
        if (existingVenue) {
          venueId = existingVenue.id
        } else {
          const newVenue = await prisma.venue.create({
            data: {
              name: venueName,
              normalizedName: normalizedVenueName,
              address: fullAddress,
              normalizedAddress: normalizedAddr,
              city,
              state,
              indoorOutdoor: locationRaw || null,
            },
          })
          venueId = newVenue.id
        }
        venueCache.set(normalizedAddr, venueId)
      }

      const eventType = mapEventType(eventTypeRaw)
      const entryStatus = computeEntryStatus(closingDT, openingDT)
      const slug = generateSlug(clubName, eventTypeRaw, startDate, eventNumber)

      // Upsert event
      const existingEvent = await prisma.event.findUnique({
        where: { slug },
      })

      if (existingEvent) {
        await prisma.event.update({
          where: { slug },
          data: {
            clubName,
            eventNumber,
            eventType,
            eventTypeRaw: eventTypeRaw.trim(),
            startDate,
            startDay: startDay || null,
            entryAcceptanceMethod: entryAcceptanceMethod || null,
            entryLimit: entryLimit || null,
            openingDay: openingDay || null,
            openingDateTime: openingDT,
            closingDay: closingDay || null,
            closingDateTime: closingDT,
            timeZone: timeZone || null,
            entryStatus,
            entryFee: entryFee || null,
            superintendentName: superName || null,
            superintendentPhone: superPhone || null,
            superintendentEmail: superEmail || null,
            eventChairName: chairName || null,
            eventChairPhone: chairPhone || null,
            eventChairEmail: chairEmail || null,
            eligibleBreeds: eligibleBreeds || null,
            venueId,
          },
        })
        updated++
      } else {
        await prisma.event.create({
          data: {
            slug,
            clubName,
            eventNumber,
            eventType,
            eventTypeRaw: eventTypeRaw.trim(),
            startDate,
            startDay: startDay || null,
            entryAcceptanceMethod: entryAcceptanceMethod || null,
            entryLimit: entryLimit || null,
            openingDay: openingDay || null,
            openingDateTime: openingDT,
            closingDay: closingDay || null,
            closingDateTime: closingDT,
            timeZone: timeZone || null,
            entryStatus,
            entryFee: entryFee || null,
            superintendentName: superName || null,
            superintendentPhone: superPhone || null,
            superintendentEmail: superEmail || null,
            eventChairName: chairName || null,
            eventChairPhone: chairPhone || null,
            eventChairEmail: chairEmail || null,
            eligibleBreeds: eligibleBreeds || null,
            venueId,
          },
        })
        created++
      }
    } catch (err) {
      console.error(`Error processing row:`, err)
      skipped++
    }
  }

  console.log(`\nImport complete:`)
  console.log(`  Created: ${created}`)
  console.log(`  Updated: ${updated}`)
  console.log(`  Skipped: ${skipped}`)
  console.log(`  Venues in cache: ${venueCache.size}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
