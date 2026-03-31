/**
 * Shared constants for handler profile options.
 * Used by the onboarding wizard and handler profile form.
 */

export const DOG_BREEDS = [
  'Golden Retriever',
  'Labrador Retriever',
  'German Shepherd',
  'French Bulldog',
  'Bulldog',
  'Poodle',
  'Beagle',
  'Rottweiler',
  'Yorkshire Terrier',
  'Boxer',
  'Dachshund',
  'Siberian Husky',
  'Great Dane',
  'Doberman Pinscher',
  'Australian Shepherd',
  'Border Collie',
  'Shih Tzu',
  'Boston Terrier',
  'Pomeranian',
  'Cavalier King Charles Spaniel',
] as const

export const SERVICES = [
  'Professional Handling',
  'Conformation Handling',
  'Show Grooming',
  'Handler Training',
  'Puppy Evaluation',
  'Transportation',
] as const

export const TRAVEL_OPTIONS = [
  'Local',
  'Regional',
  'National',
  'International',
] as const

export const KENNEL_CLUBS = [
  'AKC (American Kennel Club)',
  'CKC (Canadian Kennel Club)',
  'UKC (United Kennel Club)',
  'FCI (Federation Cynologique Internationale)',
  'The Kennel Club (UK)',
] as const

export const CONTACT_METHODS = [
  'Email',
  'Phone',
  'Text',
  'Facebook Messenger',
] as const

export const REGISTRIES = ['AKC', 'CKC', 'UKC'] as const

export const SERVICE_TYPE_OPTIONS = [
  'Campaign',
  'Ringside Pickup',
  'Both',
] as const

export const EXPERIENCE_RANGES = [
  { label: '1 - 3 years', value: 2, description: 'Getting started' },
  { label: '3 - 7 years', value: 5, description: 'Building experience' },
  { label: '7 - 15 years', value: 11, description: 'Seasoned professional' },
  { label: '15+ years', value: 20, description: 'Industry veteran' },
] as const

export type DogBreed = (typeof DOG_BREEDS)[number]
export type Service = (typeof SERVICES)[number]
export type TravelOption = (typeof TRAVEL_OPTIONS)[number]
export type KennelClub = (typeof KENNEL_CLUBS)[number]
