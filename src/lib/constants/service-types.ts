export const SERVICE_TYPES = [
  'HANDLING',
  'GROOMING',
  'TRANSPORT',
  'OTHER',
] as const

export type ServiceType = (typeof SERVICE_TYPES)[number]

export const AKC_GROUPS = [
  'Sporting',
  'Hound',
  'Working',
  'Terrier',
  'Toy',
  'Non-Sporting',
  'Herding',
  'Miscellaneous',
] as const

export type AkcGroup = (typeof AKC_GROUPS)[number]
