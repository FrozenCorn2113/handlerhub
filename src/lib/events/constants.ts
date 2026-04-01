import { EntryStatus, EventType } from '@prisma/client'

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  ALL_BREED: 'All-Breed',
  LIMITED_BREED: 'Limited Breed',
  SPECIALTY: 'Specialty',
  PARENT_SPECIALTY: 'Parent Specialty',
  DESIGNATED_SPECIALTY: 'Designated Specialty',
  JUNIOR_SHOWMANSHIP: 'Junior Showmanship',
  SWEEPSTAKES: 'Sweepstakes',
  OTHER: 'Other',
}

export const EVENT_TYPE_COLORS: Record<EventType, string> = {
  ALL_BREED: '#1F6B4A', // paddock-green
  LIMITED_BREED: '#14472F', // forest
  SPECIALTY: '#4A6F8A', // slate-blue
  PARENT_SPECIALTY: '#4A6F8A', // slate-blue
  DESIGNATED_SPECIALTY: '#4A6F8A', // slate-blue
  JUNIOR_SHOWMANSHIP: '#4A3E2E', // warm-brown
  SWEEPSTAKES: '#7A6E5E', // warm-gray
  OTHER: '#7A6E5E', // warm-gray
}

export const ENTRY_STATUS_CONFIG: Record<
  EntryStatus,
  { label: string; color: string; bgColor: string }
> = {
  NOT_YET_OPEN: {
    label: 'Not Yet Open',
    color: '#7A6E5E',
    bgColor: '#F0EAE0',
  },
  OPEN: {
    label: 'Entries Open',
    color: '#1F6B4A',
    bgColor: '#D4EFE0',
  },
  CLOSING_SOON: {
    label: 'Closing Soon',
    color: '#4A6F8A',
    bgColor: '#F5E0CC',
  },
  CLOSED: {
    label: 'Entries Closed',
    color: '#7A6E5E',
    bgColor: '#F0EAE0',
  },
}

export const US_STATES: Record<string, string> = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
  DC: 'District of Columbia',
}

/** Main filter event types (hide junior showmanship and sweepstakes from primary filter) */
export const FILTERABLE_EVENT_TYPES: EventType[] = [
  'ALL_BREED',
  'LIMITED_BREED',
  'SPECIALTY',
  'PARENT_SPECIALTY',
  'DESIGNATED_SPECIALTY',
]
