'use client'

import { useCallback, useRef, useState } from 'react'

import { useRouter } from 'next/navigation'

import { REGIONS } from '@/lib/constants/regions'
import { cn } from '@/lib/utils'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

import {
  ArrowSquareOut,
  Camera,
  Certificate,
  CheckCircle,
  CurrencyDollar,
  Dog,
  FloppyDisk,
  Images,
  Info,
  MapPin,
  Medal,
  PencilSimpleLine,
  ShieldCheck,
  SpinnerGap,
  User as UserIcon,
} from '@phosphor-icons/react'
import { HandlerProfile, User } from '@prisma/client'
import { toast } from 'sonner'

// -- Constants --

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
  'FCI (Federation Cynologique Internationale)',
  'The Kennel Club (UK)',
]

const REGISTRIES = ['AKC', 'CKC', 'UKC'] as const
const SERVICE_TYPE_OPTIONS = ['Campaign', 'Ringside Pickup', 'Both'] as const

// -- Types --

interface FeeScheduleData {
  allBreed: number | string
  specialty: number | string
  nationalSpecialty: number | string
  boardRate: number | string
  groomingRate: number | string
  mileageRate: number | string
  winBonuses: { bis: number | string; group: number | string }
  notes: string
  serviceType?: string
}

interface ProfileEditorProps {
  user: User
  profile: HandlerProfile | null
}

type TabId =
  | 'basic'
  | 'services'
  | 'gallery'
  | 'breeds'
  | 'experience'
  | 'trust'

interface TabConfig {
  id: TabId
  label: string
  icon: React.ElementType
  mobileLabel: string
}

const TABS: TabConfig[] = [
  { id: 'basic', label: 'Basic Info', icon: UserIcon, mobileLabel: 'Basic' },
  {
    id: 'services',
    label: 'Services & Rates',
    icon: CurrencyDollar,
    mobileLabel: 'Rates',
  },
  { id: 'gallery', label: 'Gallery', icon: Images, mobileLabel: 'Gallery' },
  { id: 'breeds', label: 'Breeds & Regions', icon: Dog, mobileLabel: 'Breeds' },
  { id: 'experience', label: 'Experience', icon: Medal, mobileLabel: 'Exp.' },
  {
    id: 'trust',
    label: 'Trust & Credentials',
    icon: ShieldCheck,
    mobileLabel: 'Trust',
  },
]

// -- Empty State Component --

function EmptyState({
  icon: Icon,
  message,
  actionLabel,
  onAction,
}: {
  icon: React.ElementType
  message: string
  actionLabel: string
  onAction?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-tan bg-ring-cream/50 px-6 py-10 text-center">
      <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-light-sand">
        <Icon className="size-6 text-warm-gray" />
      </div>
      <p className="mb-4 max-w-md font-body text-sm text-warm-brown">
        {message}
      </p>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#24845a] to-paddock-green px-5 py-2.5 font-body text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

// -- Selectable Pill Component --

function SelectablePill({
  label,
  selected,
  onToggle,
}: {
  label: string
  selected: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'rounded-full border px-4 py-2 font-body text-sm font-medium transition-all duration-200',
        selected
          ? 'border-paddock-green bg-sage text-paddock-green shadow-sm'
          : 'border-sand bg-white text-warm-brown hover:border-tan hover:bg-light-sand'
      )}
    >
      {selected && (
        <CheckCircle weight="fill" className="-ml-0.5 mr-1.5 inline size-4" />
      )}
      {label}
    </button>
  )
}

// -- Save Button --

function SaveButton({ loading, saved }: { loading: boolean; saved: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-body text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60',
        saved
          ? 'bg-gradient-to-b from-[#24845a] to-paddock-green'
          : 'bg-gradient-to-b from-[#2a2015] to-ringside-black'
      )}
    >
      {loading ? (
        <>
          <SpinnerGap className="size-4 animate-spin" />
          Saving...
        </>
      ) : saved ? (
        <>
          <CheckCircle weight="fill" className="size-4" />
          Saved
        </>
      ) : (
        <>
          <FloppyDisk className="size-4" />
          Save Section
        </>
      )}
    </button>
  )
}

// -- Gallery Tab Component --

const MAX_GALLERY_PHOTOS = 8

function getGalleryUrl(key: string): string {
  if (key.startsWith('http')) return key
  return `${process.env.NEXT_PUBLIC_R2_DEV_URL}/${key}`
}

function GalleryTab({
  userId,
  galleryImages,
  onImagesChange,
  saving,
  saved,
  onSave,
}: {
  userId: string
  galleryImages: string[]
  onImagesChange: (images: string[]) => void
  saving: boolean
  saved: boolean
  onSave: (images: string[]) => void
}) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragSourceIndex, setDragSourceIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const handleFiles = useCallback(
    async (files: FileList) => {
      const imageFiles = Array.from(files).filter((f) =>
        f.type.startsWith('image/')
      )
      if (imageFiles.length === 0) {
        toast.error('Please select image files')
        return
      }
      const remaining = MAX_GALLERY_PHOTOS - galleryImages.length
      if (remaining <= 0) {
        toast.error(`Maximum ${MAX_GALLERY_PHOTOS} photos allowed`)
        return
      }
      const filesToUpload = imageFiles.slice(0, remaining)
      if (filesToUpload.length < imageFiles.length) {
        toast.info(
          `Uploading ${filesToUpload.length} of ${imageFiles.length} (max ${MAX_GALLERY_PHOTOS} total)`
        )
      }

      setUploading(true)
      const newKeys: string[] = []

      try {
        for (const file of filesToUpload) {
          const presignedRes = await fetch('/api/upload/presigned-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contentType: file.type,
              contentLength: file.size,
              target: 'handler-gallery',
              entityId: userId,
            }),
          })

          if (!presignedRes.ok) {
            const err = await presignedRes.json().catch(() => ({}))
            throw new Error(err.error || 'Failed to get upload URL')
          }

          const { url: presignedUrl, key } = await presignedRes.json()

          const uploadRes = await fetch(presignedUrl, {
            method: 'PUT',
            body: file,
            headers: { 'Content-Type': file.type },
          })

          if (!uploadRes.ok) throw new Error('Upload failed')
          newKeys.push(key)
        }

        const updated = [...galleryImages, ...newKeys]
        onImagesChange(updated)
        toast.success(
          `${newKeys.length} photo${newKeys.length > 1 ? 's' : ''} uploaded`
        )
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Upload failed')
      } finally {
        setUploading(false)
      }
    },
    [galleryImages, onImagesChange, userId]
  )

  const removeImage = useCallback(
    (index: number) => {
      onImagesChange(galleryImages.filter((_, i) => i !== index))
    },
    [galleryImages, onImagesChange]
  )

  const handleDragStart = useCallback((index: number) => {
    setDragSourceIndex(index)
  }, [])

  const handleDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault()
      if (
        dragSourceIndex !== null &&
        index !== dragSourceIndex &&
        index < galleryImages.length
      ) {
        setDragOverIndex(index)
      }
    },
    [dragSourceIndex, galleryImages.length]
  )

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null)
  }, [])

  const handleReorderDrop = useCallback(
    (e: React.DragEvent, targetIndex: number) => {
      e.preventDefault()
      setDragOverIndex(null)
      if (dragSourceIndex === null || dragSourceIndex === targetIndex) {
        setDragSourceIndex(null)
        return
      }
      if (targetIndex >= galleryImages.length) {
        setDragSourceIndex(null)
        return
      }
      const newOrder = [...galleryImages]
      const [moved] = newOrder.splice(dragSourceIndex, 1)
      newOrder.splice(targetIndex, 0, moved)
      onImagesChange(newOrder)
      setDragSourceIndex(null)
    },
    [dragSourceIndex, galleryImages, onImagesChange]
  )

  const handleDragEnd = useCallback(() => {
    setDragSourceIndex(null)
    setDragOverIndex(null)
  }, [])

  const handleFileDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOverIndex(null)
      setDragSourceIndex(null)
      if (e.dataTransfer.files?.length) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [handleFiles]
  )

  const slots = Array.from({ length: MAX_GALLERY_PHOTOS }, (_, i) => i)
  const firstEmptyIndex = galleryImages.length

  return (
    <Card variant="static" className="overflow-hidden">
      <CardHeader className="bg-ring-cream/50">
        <CardTitle className="flex items-center gap-2">
          <Images className="size-5 text-paddock-green" />
          Gallery
        </CardTitle>
        <p className="font-body text-sm text-warm-gray">
          Showcase your best ringside moments. Profiles with photos get
          significantly more inquiries.
        </p>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {galleryImages.length === 0 ? (
          <EmptyState
            icon={Camera}
            message="Add 3+ ringside photos to increase your profile views by up to 4x. Show exhibitors your handling style, your wins, and the dogs you work with."
            actionLabel="Upload Photos"
            onAction={() => fileInputRef.current?.click()}
          />
        ) : null}

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {slots.map((slotIndex) => {
            const hasPhoto = slotIndex < galleryImages.length
            const isUploadTrigger = slotIndex === firstEmptyIndex
            const isEmpty = slotIndex > firstEmptyIndex

            if (hasPhoto) {
              const key = galleryImages[slotIndex]
              const isDragSource = dragSourceIndex === slotIndex
              const isDragTarget = dragOverIndex === slotIndex

              return (
                <div
                  key={key}
                  draggable
                  onDragStart={() => handleDragStart(slotIndex)}
                  onDragOver={(e) => handleDragOver(e, slotIndex)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleReorderDrop(e, slotIndex)}
                  onDragEnd={handleDragEnd}
                  className={cn(
                    'group relative aspect-square cursor-grab overflow-hidden rounded-xl border bg-white transition-all active:cursor-grabbing',
                    isDragTarget
                      ? 'border-2 border-solid border-paddock-green'
                      : 'border-sand',
                    isDragSource ? 'opacity-40' : 'opacity-100'
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getGalleryUrl(key)}
                    alt={`Gallery photo ${slotIndex + 1}`}
                    className="size-full object-cover"
                    draggable={false}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(slotIndex)}
                    className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-ringside-black/60 text-white opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    <svg
                      className="size-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  {slotIndex === 0 && (
                    <span className="absolute bottom-1 left-1 rounded bg-ringside-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                      Featured
                    </span>
                  )}
                </div>
              )
            }

            if (isUploadTrigger) {
              return (
                <div
                  key={`upload-trigger-${slotIndex}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      fileInputRef.current?.click()
                    }
                  }}
                  className="flex aspect-square cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-sand transition-colors hover:border-paddock-green"
                >
                  {uploading ? (
                    <SpinnerGap className="size-6 animate-spin text-paddock-green" />
                  ) : (
                    <svg
                      className="size-8 text-warm-gray"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  )}
                </div>
              )
            }

            if (isEmpty) {
              return (
                <div
                  key={`empty-${slotIndex}`}
                  className="aspect-square rounded-xl border-2 border-dashed border-sand"
                />
              )
            }

            return null
          })}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (e.target.files?.length) {
              handleFiles(e.target.files)
            }
          }}
          className="hidden"
        />

        <p className="font-body text-xs text-warm-gray">
          Upload up to 8 photos. Drag to reorder. First image is your featured
          photo.
        </p>

        <div className="flex justify-end">
          <button
            type="button"
            disabled={saving}
            onClick={() => onSave(galleryImages)}
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-body text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60',
              saved
                ? 'bg-gradient-to-b from-[#24845a] to-paddock-green'
                : 'bg-gradient-to-b from-[#2a2015] to-ringside-black'
            )}
          >
            {saving ? (
              <>
                <SpinnerGap className="size-4 animate-spin" />
                Saving...
              </>
            ) : saved ? (
              <>
                <CheckCircle weight="fill" className="size-4" />
                Saved
              </>
            ) : (
              <>
                <FloppyDisk className="size-4" />
                Save Gallery
              </>
            )}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

// -- Main Component --

export default function ProfileEditor({ user, profile }: ProfileEditorProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabId>('basic')
  const [savingSection, setSavingSection] = useState<string | null>(null)
  const [savedSections, setSavedSections] = useState<Set<string>>(new Set())

  // Form state, initialized from profile
  const [formData, setFormData] = useState({
    // Basic info
    fullName: profile?.fullName || user.name || '',
    businessName: profile?.businessName || '',
    bio: profile?.bio || '',
    yearsExperience: profile?.yearsExperience || '',
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
    breeds: (profile?.breeds || []) as string[],
    regions: (profile?.regions || []) as string[],
    services: (profile?.services || []) as string[],
    travelWillingness: (profile?.travelWillingness || []) as string[],

    // Pricing
    feeRangeMin: profile?.feeRangeMin || '',
    feeRangeMax: profile?.feeRangeMax || '',
    ratePerShow: profile?.ratePerShow || '',
    ratePerDay: profile?.ratePerDay || '',
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
      serviceType: (profile?.feeSchedule as any)?.serviceType || '',
    } as FeeScheduleData,
    serviceType: (profile?.feeSchedule as any)?.serviceType || '',
    registries: (profile?.registries || []) as string[],

    // Availability
    availability: profile?.availability || '',
    availabilityScheduleLink: profile?.availabilityScheduleLink || '',
    isAvailable: profile?.isAvailable ?? true,

    // Portfolio
    showHighlights: profile?.showHighlights || '',
    pastClients: profile?.pastClients || '',
    handlerResume: profile?.handlerResume || '',

    // Gallery
    galleryImages: (profile?.galleryImages || []) as string[],

    // Trust
    isInsured: profile?.isInsured || false,
    isBonded: profile?.isBonded || false,
    referencesAvailable: profile?.referencesAvailable || false,
    kennelClubMemberships: (profile?.kennelClubMemberships || []) as string[],
  })

  const toggleArrayItem = useCallback((field: string, value: string) => {
    setFormData((prev) => {
      const currentArray = (prev as any)[field] as string[]
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value]
      return { ...prev, [field]: newArray }
    })
  }, [])

  const saveSection = useCallback(
    async (sectionId: string, data: Record<string, unknown>) => {
      setSavingSection(sectionId)
      setSavedSections((prev) => {
        const next = new Set(prev)
        next.delete(sectionId)
        return next
      })

      try {
        const response = await fetch('/api/handler-profile', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          throw new Error('Failed to save')
        }

        toast.success('Section saved successfully')
        setSavedSections((prev) => new Set(prev).add(sectionId))
        router.refresh()

        // Clear saved state after 3s
        setTimeout(() => {
          setSavedSections((prev) => {
            const next = new Set(prev)
            next.delete(sectionId)
            return next
          })
        }, 3000)
      } catch {
        toast.error('Failed to save. Please try again.')
      } finally {
        setSavingSection(null)
      }
    },
    [router]
  )

  // -- Section Save Handlers --

  const saveBasicInfo = async (e: React.FormEvent) => {
    e.preventDefault()
    await saveSection('basic', {
      fullName: formData.fullName,
      businessName: formData.businessName,
      bio: formData.bio,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      website: formData.website,
      facebook: formData.facebook,
      instagram: formData.instagram,
      preferredContactMethod: formData.preferredContactMethod,
    })
  }

  const saveServicesRates = async (e: React.FormEvent) => {
    e.preventDefault()
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

    await saveSection('services', {
      services: formData.services,
      ratePerShow: formData.ratePerShow
        ? parseFloat(formData.ratePerShow as string)
        : null,
      ratePerDay: formData.ratePerDay
        ? parseFloat(formData.ratePerDay as string)
        : null,
      feeRangeMin: formData.feeRangeMin
        ? parseFloat(formData.feeRangeMin as string)
        : null,
      feeRangeMax: formData.feeRangeMax
        ? parseFloat(formData.feeRangeMax as string)
        : null,
      feeSchedule: feeSchedulePayload,
      registries: formData.registries,
      availability: formData.availability,
      availabilityScheduleLink: formData.availabilityScheduleLink,
      isAvailable: formData.isAvailable,
    })
  }

  const saveBreedsRegions = async (e: React.FormEvent) => {
    e.preventDefault()
    await saveSection('breeds', {
      breeds: formData.breeds,
      regions: formData.regions,
      travelWillingness: formData.travelWillingness,
    })
  }

  const saveExperience = async (e: React.FormEvent) => {
    e.preventDefault()
    await saveSection('experience', {
      yearsExperience: formData.yearsExperience
        ? parseInt(formData.yearsExperience as string)
        : null,
      showHighlights: formData.showHighlights,
      pastClients: formData.pastClients,
      handlerResume: formData.handlerResume,
    })
  }

  const saveTrust = async (e: React.FormEvent) => {
    e.preventDefault()
    await saveSection('trust', {
      isInsured: formData.isInsured,
      isBonded: formData.isBonded,
      referencesAvailable: formData.referencesAvailable,
      kennelClubMemberships: formData.kennelClubMemberships,
    })
  }

  const isSaving = (section: string) => savingSection === section
  const isSaved = (section: string) => savedSections.has(section)

  return (
    <div className="space-y-6">
      {/* Preview Profile Button */}
      {profile && (
        <div className="flex items-center justify-end">
          <a
            href={`/handlers/${user.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-5 py-2.5 font-body text-sm font-semibold text-ringside-black shadow-sm transition-all duration-200 hover:scale-[1.02] hover:border-tan hover:shadow-md"
          >
            <ArrowSquareOut className="size-4" />
            Preview Profile
          </a>
        </div>
      )}

      {/* Tabbed Editor */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabId)}>
        <TabsList className="flex h-auto w-full flex-wrap gap-1 rounded-2xl bg-light-sand p-1.5">
          {TABS.map((tab) => {
            const Icon = tab.icon
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-1.5 rounded-xl px-3 py-2 font-body text-sm font-medium text-warm-gray transition-all data-[state=active]:bg-white data-[state=active]:text-ringside-black data-[state=active]:shadow-sm sm:px-4"
              >
                <Icon className="size-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.mobileLabel}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {/* ========== BASIC INFO TAB ========== */}
        <TabsContent value="basic">
          <form onSubmit={saveBasicInfo}>
            <Card variant="static" className="overflow-hidden">
              <CardHeader className="bg-ring-cream/50">
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="size-5 text-paddock-green" />
                  Basic Information
                </CardTitle>
                <p className="font-body text-sm text-warm-gray">
                  Your name, bio, and contact details visible to exhibitors.
                </p>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* Name row */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="font-body text-sm font-semibold text-warm-brown"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="John Smith"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      required
                      className="rounded-xl border-sand focus:ring-paddock-green/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="businessName"
                      className="font-body text-sm font-semibold text-warm-brown"
                    >
                      Business Name
                    </Label>
                    <Input
                      id="businessName"
                      placeholder="Elite Dog Handlers LLC"
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessName: e.target.value,
                        })
                      }
                      className="rounded-xl border-sand focus:ring-paddock-green/30"
                    />
                  </div>
                </div>

                {/* Bio */}
                {!formData.bio ? (
                  <EmptyState
                    icon={PencilSimpleLine}
                    message="Write a 2-3 sentence intro. Exhibitors read this before booking, and profiles with strong bios get 3x more inquiries."
                    actionLabel="Write Your Bio"
                    onAction={() => {
                      const el = document.getElementById('bio')
                      el?.focus()
                    }}
                  />
                ) : null}
                <div className="space-y-2">
                  <Label
                    htmlFor="bio"
                    className="font-body text-sm font-semibold text-warm-brown"
                  >
                    Professional Bio
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell exhibitors about your experience, achievements, and handling style..."
                    rows={5}
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    className="rounded-xl border-sand focus:ring-paddock-green/30"
                  />
                </div>

                {/* Location */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label
                      htmlFor="city"
                      className="font-body text-sm font-semibold text-warm-brown"
                    >
                      City *
                    </Label>
                    <Input
                      id="city"
                      placeholder="Los Angeles"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      required
                      className="rounded-xl border-sand focus:ring-paddock-green/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="state"
                      className="font-body text-sm font-semibold text-warm-brown"
                    >
                      State *
                    </Label>
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
                      className="rounded-xl border-sand focus:ring-paddock-green/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="country"
                      className="font-body text-sm font-semibold text-warm-brown"
                    >
                      Country
                    </Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      className="rounded-xl border-sand focus:ring-paddock-green/30"
                    />
                  </div>
                </div>

                {/* Contact */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="contactEmail"
                      className="font-body text-sm font-semibold text-warm-brown"
                    >
                      Contact Email *
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="handler@example.com"
                      value={formData.contactEmail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactEmail: e.target.value,
                        })
                      }
                      required
                      className="rounded-xl border-sand focus:ring-paddock-green/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="contactPhone"
                      className="font-body text-sm font-semibold text-warm-brown"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.contactPhone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactPhone: e.target.value,
                        })
                      }
                      className="rounded-xl border-sand focus:ring-paddock-green/30"
                    />
                  </div>
                </div>

                {/* Preferred Contact */}
                <div className="space-y-2">
                  <Label
                    htmlFor="preferredContactMethod"
                    className="font-body text-sm font-semibold text-warm-brown"
                  >
                    Preferred Contact Method
                  </Label>
                  <Select
                    value={formData.preferredContactMethod}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        preferredContactMethod: value,
                      })
                    }
                  >
                    <SelectTrigger
                      id="preferredContactMethod"
                      className="rounded-xl border-sand"
                    >
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

                {/* Social links */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label
                      htmlFor="website"
                      className="font-body text-sm font-semibold text-warm-brown"
                    >
                      Website
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://yourwebsite.com"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                      className="rounded-xl border-sand focus:ring-paddock-green/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="facebook"
                      className="font-body text-sm font-semibold text-warm-brown"
                    >
                      Facebook
                    </Label>
                    <Input
                      id="facebook"
                      placeholder="facebook.com/yourpage"
                      value={formData.facebook}
                      onChange={(e) =>
                        setFormData({ ...formData, facebook: e.target.value })
                      }
                      className="rounded-xl border-sand focus:ring-paddock-green/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="instagram"
                      className="font-body text-sm font-semibold text-warm-brown"
                    >
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      placeholder="@yourhandle"
                      value={formData.instagram}
                      onChange={(e) =>
                        setFormData({ ...formData, instagram: e.target.value })
                      }
                      className="rounded-xl border-sand focus:ring-paddock-green/30"
                    />
                  </div>
                </div>

                {/* Save */}
                <div className="flex justify-end border-t border-sand pt-4">
                  <SaveButton
                    loading={isSaving('basic')}
                    saved={isSaved('basic')}
                  />
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        {/* ========== SERVICES & RATES TAB ========== */}
        <TabsContent value="services">
          <form onSubmit={saveServicesRates}>
            <Card variant="static" className="overflow-hidden">
              <CardHeader className="bg-ring-cream/50">
                <CardTitle className="flex items-center gap-2">
                  <CurrencyDollar className="size-5 text-paddock-green" />
                  Services & Rates
                </CardTitle>
                <p className="font-body text-sm text-warm-gray">
                  Define your services, pricing, and availability. Transparent
                  pricing attracts serious inquiries.
                </p>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* Services selection */}
                <div className="space-y-3">
                  <Label className="font-body text-sm font-semibold text-warm-brown">
                    Services Offered
                  </Label>
                  {formData.services.length === 0 ? (
                    <EmptyState
                      icon={CurrencyDollar}
                      message="Select the services you provide so exhibitors know exactly what you offer. Handlers with clear service listings get 40% more bookings."
                      actionLabel="Select Services Below"
                    />
                  ) : null}
                  <div className="flex flex-wrap gap-2">
                    {services.map((service) => (
                      <SelectablePill
                        key={service}
                        label={service}
                        selected={formData.services.includes(service)}
                        onToggle={() => toggleArrayItem('services', service)}
                      />
                    ))}
                  </div>
                </div>

                {/* Service Type */}
                <div className="space-y-3">
                  <Label className="font-body text-sm font-semibold text-warm-brown">
                    Service Type
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_TYPE_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, serviceType: option })
                        }
                        className={cn(
                          'rounded-full border px-4 py-2 font-body text-sm font-medium transition-all duration-200',
                          formData.serviceType === option
                            ? 'border-paddock-green bg-sage text-paddock-green shadow-sm'
                            : 'border-sand bg-white text-warm-brown hover:border-tan hover:bg-light-sand'
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Registries */}
                <div className="space-y-3">
                  <Label className="font-body text-sm font-semibold text-warm-brown">
                    Registries
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {REGISTRIES.map((registry) => (
                      <SelectablePill
                        key={registry}
                        label={registry}
                        selected={formData.registries.includes(registry)}
                        onToggle={() => toggleArrayItem('registries', registry)}
                      />
                    ))}
                  </div>
                </div>

                {/* Rate fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="ratePerShow"
                      className="font-body text-sm font-semibold text-warm-brown"
                    >
                      Rate Per Show ($)
                    </Label>
                    <Input
                      id="ratePerShow"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="150.00"
                      value={formData.ratePerShow}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ratePerShow: e.target.value,
                        })
                      }
                      className="rounded-xl border-sand focus:ring-paddock-green/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="ratePerDay"
                      className="font-body text-sm font-semibold text-warm-brown"
                    >
                      Rate Per Day ($)
                    </Label>
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
                      className="rounded-xl border-sand focus:ring-paddock-green/30"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="feeRangeMin"
                      className="font-body text-sm font-semibold text-warm-brown"
                    >
                      Fee Range Min ($)
                    </Label>
                    <Input
                      id="feeRangeMin"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="50.00"
                      value={formData.feeRangeMin}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          feeRangeMin: e.target.value,
                        })
                      }
                      className="rounded-xl border-sand focus:ring-paddock-green/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="feeRangeMax"
                      className="font-body text-sm font-semibold text-warm-brown"
                    >
                      Fee Range Max ($)
                    </Label>
                    <Input
                      id="feeRangeMax"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="300.00"
                      value={formData.feeRangeMax}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          feeRangeMax: e.target.value,
                        })
                      }
                      className="rounded-xl border-sand focus:ring-paddock-green/30"
                    />
                  </div>
                </div>

                {/* Detailed Fee Schedule */}
                <div className="space-y-4 rounded-2xl border border-sand bg-ring-cream/30 p-5">
                  <h4 className="font-display text-base font-semibold text-ringside-black">
                    Detailed Fee Schedule
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label className="font-body text-xs font-semibold text-warm-brown">
                        All-Breed Show ($)
                      </Label>
                      <Input
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
                        className="rounded-xl border-sand focus:ring-paddock-green/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-xs font-semibold text-warm-brown">
                        Specialty Show ($)
                      </Label>
                      <Input
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
                        className="rounded-xl border-sand focus:ring-paddock-green/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-xs font-semibold text-warm-brown">
                        National Specialty ($)
                      </Label>
                      <Input
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
                        className="rounded-xl border-sand focus:ring-paddock-green/30"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label className="font-body text-xs font-semibold text-warm-brown">
                        Board Rate ($/mo)
                      </Label>
                      <Input
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
                        className="rounded-xl border-sand focus:ring-paddock-green/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-xs font-semibold text-warm-brown">
                        Grooming ($/session)
                      </Label>
                      <Input
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
                        className="rounded-xl border-sand focus:ring-paddock-green/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-xs font-semibold text-warm-brown">
                        Mileage ($/mile)
                      </Label>
                      <Input
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
                        className="rounded-xl border-sand focus:ring-paddock-green/30"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="font-body text-xs font-semibold text-warm-brown">
                        Win Bonus: BIS ($)
                      </Label>
                      <Input
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
                        className="rounded-xl border-sand focus:ring-paddock-green/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-xs font-semibold text-warm-brown">
                        Win Bonus: Group ($)
                      </Label>
                      <Input
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
                        className="rounded-xl border-sand focus:ring-paddock-green/30"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body text-xs font-semibold text-warm-brown">
                      Fee Notes
                    </Label>
                    <Textarea
                      placeholder="Rates negotiable for multi-show campaigns..."
                      rows={2}
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
                      className="rounded-xl border-sand focus:ring-paddock-green/30"
                    />
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-4 rounded-2xl border border-sand bg-ring-cream/30 p-5">
                  <h4 className="font-display text-base font-semibold text-ringside-black">
                    Availability
                  </h4>
                  <div className="space-y-2">
                    <Label className="font-body text-xs font-semibold text-warm-brown">
                      Availability Notes
                    </Label>
                    <Textarea
                      placeholder="Available most weekends, booking 2-3 months in advance recommended..."
                      rows={2}
                      value={formData.availability}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          availability: e.target.value,
                        })
                      }
                      className="rounded-xl border-sand focus:ring-paddock-green/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body text-xs font-semibold text-warm-brown">
                      Schedule Link
                    </Label>
                    <Input
                      type="url"
                      placeholder="https://calendly.com/yourname"
                      value={formData.availabilityScheduleLink}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          availabilityScheduleLink: e.target.value,
                        })
                      }
                      className="rounded-xl border-sand focus:ring-paddock-green/30"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="isAvailable"
                      checked={formData.isAvailable}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          isAvailable: checked as boolean,
                        })
                      }
                    />
                    <Label
                      htmlFor="isAvailable"
                      className="cursor-pointer font-body text-sm text-warm-brown"
                    >
                      Currently accepting new bookings
                    </Label>
                  </div>
                </div>

                {/* Save */}
                <div className="flex justify-end border-t border-sand pt-4">
                  <SaveButton
                    loading={isSaving('services')}
                    saved={isSaved('services')}
                  />
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        {/* ========== GALLERY TAB ========== */}
        <TabsContent value="gallery">
          <GalleryTab
            userId={user.id}
            galleryImages={formData.galleryImages}
            onImagesChange={(images) =>
              setFormData((prev) => ({ ...prev, galleryImages: images }))
            }
            saving={isSaving('gallery')}
            saved={isSaved('gallery')}
            onSave={(images) =>
              saveSection('gallery', { galleryImages: images })
            }
          />
        </TabsContent>

        {/* ========== BREEDS & REGIONS TAB ========== */}
        <TabsContent value="breeds">
          <form onSubmit={saveBreedsRegions}>
            <Card variant="static" className="overflow-hidden">
              <CardHeader className="bg-ring-cream/50">
                <CardTitle className="flex items-center gap-2">
                  <Dog className="size-5 text-paddock-green" />
                  Breeds & Regions
                </CardTitle>
                <p className="font-body text-sm text-warm-gray">
                  Tell exhibitors which breeds you specialize in and where you
                  travel.
                </p>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* Breeds */}
                <div className="space-y-3">
                  <Label className="font-body text-sm font-semibold text-warm-brown">
                    Breed Specialties
                  </Label>
                  {formData.breeds.length === 0 ? (
                    <EmptyState
                      icon={Dog}
                      message="Select the breeds you specialize in. Exhibitors filter by breed when searching for handlers, so this directly affects whether they find you."
                      actionLabel="Select Breeds Below"
                    />
                  ) : null}
                  <div className="flex flex-wrap gap-2">
                    {dogBreeds.map((breed) => (
                      <SelectablePill
                        key={breed}
                        label={breed}
                        selected={formData.breeds.includes(breed)}
                        onToggle={() => toggleArrayItem('breeds', breed)}
                      />
                    ))}
                  </div>
                  {formData.breeds.length > 0 && (
                    <p className="font-body text-xs text-warm-gray">
                      {formData.breeds.length} breed
                      {formData.breeds.length !== 1 ? 's' : ''} selected
                    </p>
                  )}
                </div>

                {/* Regions */}
                <div className="space-y-3">
                  <Label className="font-body text-sm font-semibold text-warm-brown">
                    Regions Covered
                  </Label>
                  {formData.regions.length === 0 ? (
                    <EmptyState
                      icon={MapPin}
                      message="Select the regions you cover. Exhibitors search by location, so adding your regions helps you show up in their results."
                      actionLabel="Select Regions Below"
                    />
                  ) : null}
                  <div className="flex flex-wrap gap-2">
                    {regionsArray.map((region) => (
                      <SelectablePill
                        key={region}
                        label={region}
                        selected={formData.regions.includes(region)}
                        onToggle={() => toggleArrayItem('regions', region)}
                      />
                    ))}
                  </div>
                </div>

                {/* Travel Willingness */}
                <div className="space-y-3">
                  <Label className="font-body text-sm font-semibold text-warm-brown">
                    Travel Willingness
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {travelOptions.map((option) => (
                      <SelectablePill
                        key={option}
                        label={option}
                        selected={formData.travelWillingness.includes(option)}
                        onToggle={() =>
                          toggleArrayItem('travelWillingness', option)
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Save */}
                <div className="flex justify-end border-t border-sand pt-4">
                  <SaveButton
                    loading={isSaving('breeds')}
                    saved={isSaved('breeds')}
                  />
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        {/* ========== EXPERIENCE TAB ========== */}
        <TabsContent value="experience">
          <form onSubmit={saveExperience}>
            <Card variant="static" className="overflow-hidden">
              <CardHeader className="bg-ring-cream/50">
                <CardTitle className="flex items-center gap-2">
                  <Medal className="size-5 text-paddock-green" />
                  Experience
                </CardTitle>
                <p className="font-body text-sm text-warm-gray">
                  Highlight your achievements, history, and professional
                  credentials.
                </p>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="yearsExperience"
                    className="font-body text-sm font-semibold text-warm-brown"
                  >
                    Years of Experience
                  </Label>
                  <Input
                    id="yearsExperience"
                    type="number"
                    min="0"
                    placeholder="10"
                    value={formData.yearsExperience}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        yearsExperience: e.target.value,
                      })
                    }
                    className="max-w-[200px] rounded-xl border-sand focus:ring-paddock-green/30"
                  />
                </div>

                {/* Show Highlights */}
                {!formData.showHighlights ? (
                  <EmptyState
                    icon={Medal}
                    message="List your top show wins and titles. Exhibitors want to see a proven track record -- 'Westminster finalist, AKC Group Winner' tells them you deliver results."
                    actionLabel="Add Your Highlights"
                    onAction={() =>
                      document.getElementById('showHighlights')?.focus()
                    }
                  />
                ) : null}
                <div className="space-y-2">
                  <Label
                    htmlFor="showHighlights"
                    className="font-body text-sm font-semibold text-warm-brown"
                  >
                    Show Highlights & Titles
                  </Label>
                  <Textarea
                    id="showHighlights"
                    placeholder="Westminster finalist, AKC Group Winner, Regional Specialty Winner..."
                    rows={3}
                    value={formData.showHighlights}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        showHighlights: e.target.value,
                      })
                    }
                    className="rounded-xl border-sand focus:ring-paddock-green/30"
                  />
                </div>

                {/* Resume */}
                <div className="space-y-2">
                  <Label
                    htmlFor="handlerResume"
                    className="font-body text-sm font-semibold text-warm-brown"
                  >
                    Handler Resume / Detailed Bio
                  </Label>
                  <Textarea
                    id="handlerResume"
                    placeholder="Detailed professional history, training, certifications, notable accomplishments..."
                    rows={5}
                    value={formData.handlerResume}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        handlerResume: e.target.value,
                      })
                    }
                    className="rounded-xl border-sand focus:ring-paddock-green/30"
                  />
                </div>

                {/* Past Clients */}
                <div className="space-y-2">
                  <Label
                    htmlFor="pastClients"
                    className="font-body text-sm font-semibold text-warm-brown"
                  >
                    Past Clients / Kennels
                  </Label>
                  <Textarea
                    id="pastClients"
                    placeholder="List kennels or notable clients you've worked with (with their permission)..."
                    rows={3}
                    value={formData.pastClients}
                    onChange={(e) =>
                      setFormData({ ...formData, pastClients: e.target.value })
                    }
                    className="rounded-xl border-sand focus:ring-paddock-green/30"
                  />
                </div>

                {/* Save */}
                <div className="flex justify-end border-t border-sand pt-4">
                  <SaveButton
                    loading={isSaving('experience')}
                    saved={isSaved('experience')}
                  />
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        {/* ========== TRUST & CREDENTIALS TAB ========== */}
        <TabsContent value="trust">
          <form onSubmit={saveTrust}>
            <Card variant="static" className="overflow-hidden">
              <CardHeader className="bg-ring-cream/50">
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="size-5 text-paddock-green" />
                  Trust & Credentials
                </CardTitle>
                <p className="font-body text-sm text-warm-gray">
                  Build trust with exhibitors by sharing your credentials and
                  verification status.
                </p>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* Trust checkboxes */}
                {!formData.isInsured &&
                !formData.isBonded &&
                !formData.referencesAvailable ? (
                  <EmptyState
                    icon={Certificate}
                    message="Add your insurance status and references to earn trust badges on your profile. Exhibitors are 2x more likely to book verified handlers."
                    actionLabel="Add Credentials Below"
                  />
                ) : null}

                <div className="space-y-4 rounded-2xl border border-sand bg-ring-cream/30 p-5">
                  <h4 className="font-display text-base font-semibold text-ringside-black">
                    Verification Status
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="isInsured"
                        checked={formData.isInsured}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            isInsured: checked as boolean,
                          })
                        }
                      />
                      <Label
                        htmlFor="isInsured"
                        className="cursor-pointer font-body text-sm text-warm-brown"
                      >
                        I am insured
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="isBonded"
                        checked={formData.isBonded}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            isBonded: checked as boolean,
                          })
                        }
                      />
                      <Label
                        htmlFor="isBonded"
                        className="cursor-pointer font-body text-sm text-warm-brown"
                      >
                        I am bonded
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
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
                      <Label
                        htmlFor="referencesAvailable"
                        className="cursor-pointer font-body text-sm text-warm-brown"
                      >
                        References available upon request
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Kennel Club Memberships */}
                <div className="space-y-3">
                  <Label className="font-body text-sm font-semibold text-warm-brown">
                    Kennel Club Memberships
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {kennelClubs.map((club) => (
                      <SelectablePill
                        key={club}
                        label={club}
                        selected={formData.kennelClubMemberships.includes(club)}
                        onToggle={() =>
                          toggleArrayItem('kennelClubMemberships', club)
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Save */}
                <div className="flex justify-end border-t border-sand pt-4">
                  <SaveButton
                    loading={isSaving('trust')}
                    saved={isSaved('trust')}
                  />
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}
