import { HandlerProfile } from '@prisma/client'

/**
 * Profile Completeness Calculation
 *
 * Awards points for completing various profile sections to encourage handlers
 * to fill out their profiles completely. This builds trust with exhibitors.
 */

export interface ProfileField {
  key: keyof HandlerProfile | string
  weight: number // How important this field is (1-10)
  label: string
}

// Define which fields contribute to profile completeness and their weights
export const PROFILE_FIELDS: ProfileField[] = [
  // Basic Info (High Priority)
  { key: 'fullName', weight: 10, label: 'Full Name' },
  { key: 'bio', weight: 10, label: 'Bio/Description' },
  { key: 'profileImage', weight: 10, label: 'Profile Photo' },
  { key: 'businessName', weight: 5, label: 'Business Name' },

  // Contact & Location (Critical)
  { key: 'contactEmail', weight: 8, label: 'Contact Email' },
  { key: 'contactPhone', weight: 8, label: 'Phone Number' },
  { key: 'city', weight: 7, label: 'City' },
  { key: 'state', weight: 7, label: 'State' },
  { key: 'regions', weight: 6, label: 'Regions Served' },

  // Specializations (Very Important)
  { key: 'breeds', weight: 9, label: 'Breed Specialties' },
  { key: 'services', weight: 8, label: 'Services Offered' },
  { key: 'travelWillingness', weight: 5, label: 'Travel Willingness' },

  // Pricing (Important for transparency)
  { key: 'ratePerShow', weight: 7, label: 'Pricing Information' },

  // Portfolio & Experience (Builds Trust)
  { key: 'yearsExperience', weight: 6, label: 'Years of Experience' },
  { key: 'showHighlights', weight: 5, label: 'Show Highlights' },
  { key: 'handlerResume', weight: 4, label: 'Handler Resume' },

  // Trust Indicators (Nice to Have)
  { key: 'isInsured', weight: 6, label: 'Insurance Status' },
  { key: 'referencesAvailable', weight: 4, label: 'References Available' },
  { key: 'kennelClubMemberships', weight: 3, label: 'Kennel Club Memberships' },

  // Social/Website (Nice to Have)
  { key: 'website', weight: 2, label: 'Website' },
  { key: 'instagram', weight: 2, label: 'Instagram' },
  { key: 'facebook', weight: 2, label: 'Facebook' },
]

/**
 * Calculate profile completeness percentage (0-100)
 */
export function calculateProfileCompleteness(
  profile: Partial<HandlerProfile>
): number {
  let totalWeight = 0
  let earnedWeight = 0

  for (const field of PROFILE_FIELDS) {
    totalWeight += field.weight

    const value = profile[field.key as keyof HandlerProfile]

    // Check if field has a value
    if (isFieldComplete(value)) {
      earnedWeight += field.weight
    }
  }

  // Calculate percentage
  const percentage = totalWeight > 0 ? (earnedWeight / totalWeight) * 100 : 0

  return Math.round(percentage)
}

/**
 * Check if a field value is considered "complete"
 */
function isFieldComplete(value: any): boolean {
  if (value === null || value === undefined) {
    return false
  }

  // String fields must have content
  if (typeof value === 'string') {
    return value.trim().length > 0
  }

  // Boolean fields count as complete if true
  if (typeof value === 'boolean') {
    return value === true
  }

  // Number fields must be > 0
  if (typeof value === 'number') {
    return value > 0
  }

  // Array fields must have at least one item
  if (Array.isArray(value)) {
    return value.length > 0
  }

  // Other types considered complete if truthy
  return !!value
}

/**
 * Get incomplete fields to show handler what to complete
 */
export function getIncompleteFields(
  profile: Partial<HandlerProfile>
): ProfileField[] {
  const incomplete: ProfileField[] = []

  for (const field of PROFILE_FIELDS) {
    const value = profile[field.key as keyof HandlerProfile]

    if (!isFieldComplete(value)) {
      incomplete.push(field)
    }
  }

  // Sort by weight (most important first)
  return incomplete.sort((a, b) => b.weight - a.weight)
}

/**
 * Get completion status by category
 */
export function getCompletionByCategory(profile: Partial<HandlerProfile>) {
  const categories = {
    basicInfo: {
      label: 'Basic Information',
      fields: ['fullName', 'bio', 'profileImage', 'businessName'],
      completion: 0,
    },
    contact: {
      label: 'Contact & Location',
      fields: ['contactEmail', 'contactPhone', 'city', 'state', 'regions'],
      completion: 0,
    },
    specializations: {
      label: 'Specializations',
      fields: ['breeds', 'services', 'travelWillingness'],
      completion: 0,
    },
    pricing: {
      label: 'Pricing',
      fields: ['ratePerShow'],
      completion: 0,
    },
    portfolio: {
      label: 'Portfolio & Experience',
      fields: ['yearsExperience', 'showHighlights', 'handlerResume'],
      completion: 0,
    },
    trust: {
      label: 'Trust Indicators',
      fields: ['isInsured', 'referencesAvailable', 'kennelClubMemberships'],
      completion: 0,
    },
  }

  for (const [key, category] of Object.entries(categories)) {
    const categoryFields = PROFILE_FIELDS.filter((f) =>
      category.fields.includes(f.key as string)
    )

    let totalWeight = 0
    let earnedWeight = 0

    for (const field of categoryFields) {
      totalWeight += field.weight
      const value = profile[field.key as keyof HandlerProfile]
      if (isFieldComplete(value)) {
        earnedWeight += field.weight
      }
    }

    category.completion =
      totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0
  }

  return categories
}
