export const REGIONS = [
  'Pacific Northwest',
  'West Coast',
  'Mountain',
  'Southwest',
  'Midwest',
  'Southeast',
  'Mid-Atlantic',
  'Northeast',
  'Florida Circuit',
  'Texas Circuit',
  'National',
  'Western Canada',
  'Eastern Canada',
] as const

export type Region = (typeof REGIONS)[number]
