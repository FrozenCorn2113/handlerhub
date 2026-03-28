'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { REGIONS } from '@/lib/constants/regions'

import { Button } from '@/components/ui/button-ui'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { FoundingHandlerBanner } from '@/components/marketing/founding-handler-banner'

import { HandlerProfile, User } from '@prisma/client'
import { toast } from 'sonner'

const REGISTRIES = ['AKC', 'CKC', 'UKC'] as const
const SERVICE_TYPE_OPTIONS = ['Campaign', 'Ringside Pickup', 'Both'] as const

interface FeeScheduleData {
  allBreed: number | string
  specialty: number | string
  nationalSpecialty: number | string
  boardRate: number | string
  groomingRate: number | string
  mileageRate: number | string
  winBonuses: { bis: number | string; group: number | string }
  notes: string
}

interface HandlerProfileFormProps {
  user: User
  profile: HandlerProfile | null
}

const dogBreeds = [
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
]

const regionsArray = [...REGIONS]

const services = [
  'Professional Handling',
  'Conformation Handling',
  'Show Grooming',
  'Handler Training',
  'Puppy Evaluation',
  'Transportation',
]

const travelOptions = ['Local', 'Regional', 'National', 'International']

const contactMethods = ['Email', 'Phone', 'Text', 'Facebook Messenger']

const kennelClubs = [
  'AKC (American Kennel Club)',
  'CKC (Canadian Kennel Club)',
  'UKC (United Kennel Club)',
  'FCI (Fédération Cynologique Internationale)',
  'The Kennel Club (UK)',
]

export default function HandlerProfileForm({
  user,
  profile,
}: HandlerProfileFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    // Basic info
    fullName: profile?.fullName || user.name || '',
    businessName: profile?.businessName || '',
    bio: profile?.bio || '',
    yearsExperience: profile?.yearsExperience || '',

    // Contact & Location
    city: profile?.city || '',
    state: profile?.state || '',
    country: profile?.country || 'USA',
    contactEmail: profile?.contactEmail || user.email || '',
    contactPhone: profile?.contactPhone || '',
    website: profile?.website || '',
    facebook: profile?.facebook || '',
    instagram: profile?.instagram || '',
    preferredContactMethod: profile?.preferredContactMethod || '',

    // Specializations
    breeds: profile?.breeds || [],
    regions: profile?.regions || [],
    services: profile?.services || [],
    travelWillingness: profile?.travelWillingness || [],

    // Pricing
    feeRangeMin: profile?.feeRangeMin || '',
    feeRangeMax: profile?.feeRangeMax || '',
    ratePerShow: profile?.ratePerShow || '',
    ratePerDay: profile?.ratePerDay || '',

    // Availability
    availability: profile?.availability || '',
    availabilityScheduleLink: profile?.availabilityScheduleLink || '',
    isAvailable: profile?.isAvailable ?? true,

    // Portfolio & Proof
    showHighlights: profile?.showHighlights || '',
    pastClients: profile?.pastClients || '',
    handlerResume: profile?.handlerResume || '',

    // Trust & Verification
    isInsured: profile?.isInsured || false,
    isBonded: profile?.isBonded || false,
    referencesAvailable: profile?.referencesAvailable || false,
    kennelClubMemberships: profile?.kennelClubMemberships || [],

    // Fee Schedule (stored as JSON)
    feeSchedule: {
      allBreed: (profile?.feeSchedule as any)?.allBreed || '',
      specialty: (profile?.feeSchedule as any)?.specialty || '',
      nationalSpecialty: (profile?.feeSchedule as any)?.nationalSpecialty || '',
      boardRate: (profile?.feeSchedule as any)?.boardRate || '',
      groomingRate: (profile?.feeSchedule as any)?.groomingRate || '',
      mileageRate: (profile?.feeSchedule as any)?.mileageRate || '',
      winBonuses: {
        bis: (profile?.feeSchedule as any)?.winBonuses?.bis || '',
        group: (profile?.feeSchedule as any)?.winBonuses?.group || '',
      },
      notes: (profile?.feeSchedule as any)?.notes || '',
    } as FeeScheduleData,

    // Registries
    registries: profile?.registries || [],

    // Service Type
    serviceType: (profile?.feeSchedule as any)?.serviceType || '',

    // Terms
    agreedToTerms: profile?.agreedToTerms || false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validate terms agreement for new profiles
    if (!profile && !formData.agreedToTerms) {
      toast.error('Please agree to the Terms and Conditions')
      setLoading(false)
      return
    }

    try {
      // Build fee schedule JSON for persistence
      const feeSchedulePayload = {
        allBreed: formData.feeSchedule.allBreed
          ? parseFloat(formData.feeSchedule.allBreed as string)
          : null,
        specialty: formData.feeSchedule.specialty
          ? parseFloat(formData.feeSchedule.specialty as string)
          : null,
        nationalSpecialty: formData.feeSchedule.nationalSpecialty
          ? parseFloat(formData.feeSchedule.nationalSpecialty as string)
          : null,
        boardRate: formData.feeSchedule.boardRate
          ? parseFloat(formData.feeSchedule.boardRate as string)
          : null,
        groomingRate: formData.feeSchedule.groomingRate
          ? parseFloat(formData.feeSchedule.groomingRate as string)
          : null,
        mileageRate: formData.feeSchedule.mileageRate
          ? parseFloat(formData.feeSchedule.mileageRate as string)
          : null,
        winBonuses: {
          bis: formData.feeSchedule.winBonuses.bis
            ? parseFloat(formData.feeSchedule.winBonuses.bis as string)
            : null,
          group: formData.feeSchedule.winBonuses.group
            ? parseFloat(formData.feeSchedule.winBonuses.group as string)
            : null,
        },
        notes: formData.feeSchedule.notes || '',
        serviceType: formData.serviceType || null,
      }

      const { feeSchedule: _fs, serviceType: _st, ...restFormData } = formData

      const response = await fetch('/api/handler-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...restFormData,
          yearsExperience: restFormData.yearsExperience
            ? parseInt(restFormData.yearsExperience as string)
            : null,
          feeRangeMin: restFormData.feeRangeMin
            ? parseFloat(restFormData.feeRangeMin as string)
            : null,
          feeRangeMax: restFormData.feeRangeMax
            ? parseFloat(restFormData.feeRangeMax as string)
            : null,
          ratePerShow: restFormData.ratePerShow
            ? parseFloat(restFormData.ratePerShow as string)
            : null,
          ratePerDay: restFormData.ratePerDay
            ? parseFloat(restFormData.ratePerDay as string)
            : null,
          feeSchedule: feeSchedulePayload,
          registries: formData.registries,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save profile')
      }

      toast.success('Profile saved successfully!')
      router.refresh()
    } catch (error) {
      toast.error('Failed to save profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const toggleArrayItem = (field: string, value: string) => {
    setFormData((prev) => {
      const currentArray = prev[field] as string[]
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value]
      return { ...prev, [field]: newArray }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Founding Handler Banner */}
      {!profile && <FoundingHandlerBanner variant="compact" showCTA={false} />}

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Your professional details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="John Smith"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name (Optional)</Label>
              <Input
                id="businessName"
                placeholder="Elite Dog Handlers LLC"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({ ...formData, businessName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Professional Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell exhibitors about your experience, achievements, and handling style..."
              rows={6}
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="Los Angeles"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                placeholder="CA"
                maxLength={2}
                value={formData.state}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    state: e.target.value.toUpperCase(),
                  })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearsExperience">Years Experience</Label>
              <Input
                id="yearsExperience"
                type="number"
                min="0"
                placeholder="10"
                value={formData.yearsExperience}
                onChange={(e) =>
                  setFormData({ ...formData, yearsExperience: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            How exhibitors can reach you (visible on your profile)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email Address *</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="handler@example.com"
                value={formData.contactEmail}
                onChange={(e) =>
                  setFormData({ ...formData, contactEmail: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Phone Number</Label>
              <Input
                id="contactPhone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.contactPhone}
                onChange={(e) =>
                  setFormData({ ...formData, contactPhone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://yourwebsite.com"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                placeholder="facebook.com/yourpage"
                value={formData.facebook}
                onChange={(e) =>
                  setFormData({ ...formData, facebook: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                placeholder="@yourhandle"
                value={formData.instagram}
                onChange={(e) =>
                  setFormData({ ...formData, instagram: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredContactMethod">
              Preferred Contact Method
            </Label>
            <Select
              value={formData.preferredContactMethod}
              onValueChange={(value) =>
                setFormData({ ...formData, preferredContactMethod: value })
              }
            >
              <SelectTrigger id="preferredContactMethod">
                <SelectValue placeholder="Select preferred method" />
              </SelectTrigger>
              <SelectContent>
                {contactMethods.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Breed Specialties */}
      <Card>
        <CardHeader>
          <CardTitle>Dog Breeds You Specialize In</CardTitle>
          <CardDescription>
            Select the breeds you have experience handling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {dogBreeds.map((breed) => (
              <label
                key={breed}
                className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 hover:bg-accent"
              >
                <input
                  type="checkbox"
                  checked={formData.breeds.includes(breed)}
                  onChange={() => toggleArrayItem('breeds', breed)}
                  className="size-4"
                />
                <span className="text-sm">{breed}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Services Offered */}
      <Card>
        <CardHeader>
          <CardTitle>Services Offered</CardTitle>
          <CardDescription>Select the services you provide</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {services.map((service) => (
              <label
                key={service}
                className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 hover:bg-accent"
              >
                <input
                  type="checkbox"
                  checked={formData.services.includes(service)}
                  onChange={() => toggleArrayItem('services', service)}
                  className="size-4"
                />
                <span className="text-sm">{service}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Travel & Regions */}
      <Card>
        <CardHeader>
          <CardTitle>Travel Willingness & Regions</CardTitle>
          <CardDescription>
            Where you travel and regions you serve
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Travel Willingness</Label>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {travelOptions.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 hover:bg-accent"
                >
                  <input
                    type="checkbox"
                    checked={formData.travelWillingness.includes(option)}
                    onChange={() =>
                      toggleArrayItem('travelWillingness', option)
                    }
                    className="size-4"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Regions Covered</Label>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {regionsArray.map((region) => (
                <label
                  key={region}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 hover:bg-accent"
                >
                  <input
                    type="checkbox"
                    checked={formData.regions.includes(region)}
                    onChange={() => toggleArrayItem('regions', region)}
                    className="size-4"
                  />
                  <span className="text-sm">{region}</span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>Handler Fee Range</CardTitle>
          <CardDescription>
            Set your rates (optional - you can discuss pricing directly with
            clients).{' '}
            {!profile &&
              'As a founding handler, all fees go directly to you - HandlerHub takes zero commission.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="feeRangeMin">Minimum Fee ($)</Label>
              <Input
                id="feeRangeMin"
                type="number"
                step="0.01"
                min="0"
                placeholder="50.00"
                value={formData.feeRangeMin}
                onChange={(e) =>
                  setFormData({ ...formData, feeRangeMin: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="feeRangeMax">Maximum Fee ($)</Label>
              <Input
                id="feeRangeMax"
                type="number"
                step="0.01"
                min="0"
                placeholder="300.00"
                value={formData.feeRangeMax}
                onChange={(e) =>
                  setFormData({ ...formData, feeRangeMax: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ratePerShow">Rate Per Show ($)</Label>
              <Input
                id="ratePerShow"
                type="number"
                step="0.01"
                min="0"
                placeholder="150.00"
                value={formData.ratePerShow}
                onChange={(e) =>
                  setFormData({ ...formData, ratePerShow: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ratePerDay">Rate Per Day ($)</Label>
              <Input
                id="ratePerDay"
                type="number"
                step="0.01"
                min="0"
                placeholder="250.00"
                value={formData.ratePerDay}
                onChange={(e) =>
                  setFormData({ ...formData, ratePerDay: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fee Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Fee Schedule</CardTitle>
          <CardDescription>
            Provide a detailed breakdown of your rates. All fields are optional.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="allBreed">All-Breed Show Fee ($)</Label>
              <Input
                id="allBreed"
                type="number"
                step="0.01"
                min="0"
                placeholder="150.00"
                value={formData.feeSchedule.allBreed}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    feeSchedule: {
                      ...formData.feeSchedule,
                      allBreed: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty Show Fee ($)</Label>
              <Input
                id="specialty"
                type="number"
                step="0.01"
                min="0"
                placeholder="200.00"
                value={formData.feeSchedule.specialty}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    feeSchedule: {
                      ...formData.feeSchedule,
                      specialty: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationalSpecialty">
                National Specialty Fee ($)
              </Label>
              <Input
                id="nationalSpecialty"
                type="number"
                step="0.01"
                min="0"
                placeholder="300.00"
                value={formData.feeSchedule.nationalSpecialty}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    feeSchedule: {
                      ...formData.feeSchedule,
                      nationalSpecialty: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="boardRate">Board & Train Rate ($/month)</Label>
              <Input
                id="boardRate"
                type="number"
                step="0.01"
                min="0"
                placeholder="800.00"
                value={formData.feeSchedule.boardRate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    feeSchedule: {
                      ...formData.feeSchedule,
                      boardRate: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="groomingRate">Grooming Rate ($/session)</Label>
              <Input
                id="groomingRate"
                type="number"
                step="0.01"
                min="0"
                placeholder="75.00"
                value={formData.feeSchedule.groomingRate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    feeSchedule: {
                      ...formData.feeSchedule,
                      groomingRate: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mileageRate">Mileage Rate ($/mile)</Label>
              <Input
                id="mileageRate"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.65"
                value={formData.feeSchedule.mileageRate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    feeSchedule: {
                      ...formData.feeSchedule,
                      mileageRate: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="winBis">Win Bonus: Best in Show ($)</Label>
              <Input
                id="winBis"
                type="number"
                step="0.01"
                min="0"
                placeholder="500.00"
                value={formData.feeSchedule.winBonuses.bis}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    feeSchedule: {
                      ...formData.feeSchedule,
                      winBonuses: {
                        ...formData.feeSchedule.winBonuses,
                        bis: e.target.value,
                      },
                    },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="winGroup">Win Bonus: Group ($)</Label>
              <Input
                id="winGroup"
                type="number"
                step="0.01"
                min="0"
                placeholder="250.00"
                value={formData.feeSchedule.winBonuses.group}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    feeSchedule: {
                      ...formData.feeSchedule,
                      winBonuses: {
                        ...formData.feeSchedule.winBonuses,
                        group: e.target.value,
                      },
                    },
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feeNotes">Fee Schedule Notes</Label>
            <Textarea
              id="feeNotes"
              placeholder="Rates negotiable for multi-show campaigns. Travel expenses billed separately..."
              rows={3}
              value={formData.feeSchedule.notes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  feeSchedule: {
                    ...formData.feeSchedule,
                    notes: e.target.value,
                  },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Service Type */}
      <Card>
        <CardHeader>
          <CardTitle>Service Type</CardTitle>
          <CardDescription>
            What type of handling services do you offer?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {SERVICE_TYPE_OPTIONS.map((option) => (
              <label
                key={option}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 hover:bg-accent ${
                  formData.serviceType === option
                    ? 'border-primary bg-accent'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name="serviceType"
                  checked={formData.serviceType === option}
                  onChange={() =>
                    setFormData({ ...formData, serviceType: option })
                  }
                  className="size-4"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Registries */}
      <Card>
        <CardHeader>
          <CardTitle>Registries</CardTitle>
          <CardDescription>
            Which kennel club registries do you handle for?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {REGISTRIES.map((registry) => (
              <label
                key={registry}
                className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 hover:bg-accent"
              >
                <input
                  type="checkbox"
                  checked={formData.registries.includes(registry)}
                  onChange={() => toggleArrayItem('registries', registry)}
                  className="size-4"
                />
                <span className="text-sm">{registry}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader>
          <CardTitle>Booking & Availability</CardTitle>
          <CardDescription>
            Let exhibitors know when you&apos;re available
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="availability">Availability Notes</Label>
            <Textarea
              id="availability"
              placeholder="Available most weekends, booking 2-3 months in advance recommended..."
              rows={3}
              value={formData.availability}
              onChange={(e) =>
                setFormData({ ...formData, availability: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="availabilityScheduleLink">
              Schedule Link (Optional)
            </Label>
            <Input
              id="availabilityScheduleLink"
              type="url"
              placeholder="https://calendly.com/yourname"
              value={formData.availabilityScheduleLink}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  availabilityScheduleLink: e.target.value,
                })
              }
            />
            <p className="text-sm text-muted-foreground">
              Link to Calendly, Google Calendar, or other scheduling tool
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="isAvailable"
              checked={formData.isAvailable}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isAvailable: checked as boolean })
              }
            />
            <Label htmlFor="isAvailable" className="cursor-pointer">
              Currently accepting new bookings
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio & Proof */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio & Professional Highlights</CardTitle>
          <CardDescription>
            Showcase your achievements and experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="showHighlights">Show Highlights or Titles</Label>
            <Textarea
              id="showHighlights"
              placeholder="Westminster finalist, AKC Group Winner, Regional Specialty Winner..."
              rows={3}
              value={formData.showHighlights}
              onChange={(e) =>
                setFormData({ ...formData, showHighlights: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="handlerResume">Handler Resume / Detailed Bio</Label>
            <Textarea
              id="handlerResume"
              placeholder="Detailed professional history, training, certifications, notable accomplishments..."
              rows={6}
              value={formData.handlerResume}
              onChange={(e) =>
                setFormData({ ...formData, handlerResume: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pastClients">
              Past Clients / Kennels (Optional)
            </Label>
            <Textarea
              id="pastClients"
              placeholder="List kennels or notable clients you've worked with (with their permission)..."
              rows={3}
              value={formData.pastClients}
              onChange={(e) =>
                setFormData({ ...formData, pastClients: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Trust & Verification */}
      <Card>
        <CardHeader>
          <CardTitle>Trust & Verification</CardTitle>
          <CardDescription>
            Build trust with exhibitors by providing credentials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="isInsured"
                checked={formData.isInsured}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isInsured: checked as boolean })
                }
              />
              <Label htmlFor="isInsured" className="cursor-pointer">
                I am insured
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="isBonded"
                checked={formData.isBonded}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isBonded: checked as boolean })
                }
              />
              <Label htmlFor="isBonded" className="cursor-pointer">
                I am bonded
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="referencesAvailable"
                checked={formData.referencesAvailable}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    referencesAvailable: checked as boolean,
                  })
                }
              />
              <Label htmlFor="referencesAvailable" className="cursor-pointer">
                References available upon request
              </Label>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Kennel Club Memberships</Label>
            <div className="grid grid-cols-1 gap-2">
              {kennelClubs.map((club) => (
                <label
                  key={club}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 hover:bg-accent"
                >
                  <input
                    type="checkbox"
                    checked={formData.kennelClubMemberships.includes(club)}
                    onChange={() =>
                      toggleArrayItem('kennelClubMemberships', club)
                    }
                    className="size-4"
                  />
                  <span className="text-sm">{club}</span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms & Conditions */}
      {!profile && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Terms and Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-2">
              <Checkbox
                id="agreedToTerms"
                checked={formData.agreedToTerms}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    agreedToTerms: checked as boolean,
                  })
                }
                required
              />
              <Label htmlFor="agreedToTerms" className="cursor-pointer">
                I agree to the HandlerHub{' '}
                <a
                  href="/terms"
                  target="_blank"
                  className="text-primary underline"
                >
                  Terms and Conditions
                </a>
                *
              </Label>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading
            ? 'Saving...'
            : profile
              ? 'Update Profile'
              : 'Join as Founding Handler'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push('/dashboard')}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
