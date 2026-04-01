'use client'

import { useCallback, useState } from 'react'

import { useRouter } from 'next/navigation'

import { OnboardingNav } from './onboarding-nav'
import { Phase, ProgressBar } from './progress-bar'
import { StepComplete } from './steps/complete'
import { StepBio } from './steps/step-bio'
import { StepBreeds } from './steps/step-breeds'
import { StepCredentials } from './steps/step-credentials'
import { StepExperience } from './steps/step-experience'
import { StepGallery } from './steps/step-gallery'
import { StepLocation } from './steps/step-location'
import { StepName } from './steps/step-name'
import { StepPhoto } from './steps/step-photo'
import { StepRates } from './steps/step-rates'
import { StepRegions } from './steps/step-regions'
import { StepRole } from './steps/step-role'
import { StepServices } from './steps/step-services'
import { StepWelcome } from './steps/welcome'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'sonner'

// ---- Types ----

export interface OnboardingFormData {
  role?: 'HANDLER' | 'EXHIBITOR'
  fullName?: string
  businessName?: string
  city?: string
  state?: string
  contactEmail?: string
  services?: string[]
  breeds?: string[]
  yearsExperience?: number
  kennelClubMemberships?: string[]
  isInsured?: boolean
  isBonded?: boolean
  profileImage?: string
  galleryImages?: string[]
  ratePerShow?: number
  ratePerDay?: number
  regions?: string[]
  travelWillingness?: string[]
  bio?: string
}

interface StepConfig {
  id: string
  phase: string | null
  skippable: boolean
  fields: (keyof OnboardingFormData)[]
}

const STEPS: StepConfig[] = [
  { id: 'role', phase: null, skippable: false, fields: ['role'] },
  { id: 'welcome', phase: null, skippable: false, fields: [] },
  {
    id: 'name',
    phase: 'Who You Are',
    skippable: false,
    fields: ['fullName', 'businessName'],
  },
  {
    id: 'location',
    phase: 'Who You Are',
    skippable: false,
    fields: ['city', 'state', 'contactEmail'],
  },
  {
    id: 'services',
    phase: 'What You Do',
    skippable: false,
    fields: ['services'],
  },
  {
    id: 'breeds',
    phase: 'What You Do',
    skippable: true,
    fields: ['breeds'],
  },
  {
    id: 'experience',
    phase: 'What You Do',
    skippable: false,
    fields: ['yearsExperience'],
  },
  {
    id: 'credentials',
    phase: 'What You Do',
    skippable: true,
    fields: ['kennelClubMemberships', 'isInsured', 'isBonded'],
  },
  {
    id: 'photo',
    phase: 'Show Your Work',
    skippable: true,
    fields: ['profileImage'],
  },
  {
    id: 'gallery',
    phase: 'Show Your Work',
    skippable: true,
    fields: ['galleryImages'],
  },
  {
    id: 'rates',
    phase: 'Rates & Reach',
    skippable: false,
    fields: ['ratePerShow', 'ratePerDay'],
  },
  {
    id: 'regions',
    phase: 'Rates & Reach',
    skippable: false,
    fields: ['regions', 'travelWillingness'],
  },
  {
    id: 'bio',
    phase: 'Rates & Reach',
    skippable: true,
    fields: ['bio'],
  },
  { id: 'complete', phase: null, skippable: false, fields: [] },
]

const PHASES: Phase[] = [
  { id: 'who', label: 'Who You Are', steps: [2, 3] },
  { id: 'what', label: 'What You Do', steps: [4, 5, 6, 7] },
  { id: 'show', label: 'Show Your Work', steps: [8, 9] },
  { id: 'rates', label: 'Rates & Reach', steps: [10, 11, 12] },
]

interface OnboardingWizardProps {
  user: {
    id: string
    name?: string | null
    email?: string | null
    role?: string | null
    image?: string | null
  }
  existingProfile?: Record<string, unknown> | null
}

export function OnboardingWizard({
  user,
  existingProfile,
}: OnboardingWizardProps) {
  const router = useRouter()

  // Determine starting step: skip role if already set to HANDLER
  const initialStep = user.role === 'HANDLER' ? 1 : 0

  const [currentStep, setCurrentStep] = useState(initialStep)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [saving, setSaving] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  // Initialize form data from existing profile
  const [formData, setFormData] = useState<OnboardingFormData>(() => {
    const data: OnboardingFormData = {
      role: (user.role as 'HANDLER' | 'EXHIBITOR') ?? undefined,
      fullName: user.name ?? '',
      contactEmail: user.email ?? '',
    }

    if (existingProfile) {
      return {
        ...data,
        fullName: (existingProfile.fullName as string) ?? data.fullName,
        businessName: (existingProfile.businessName as string) ?? '',
        city: (existingProfile.city as string) ?? '',
        state: (existingProfile.state as string) ?? '',
        contactEmail:
          (existingProfile.contactEmail as string) ?? data.contactEmail,
        services: (existingProfile.services as string[]) ?? [],
        breeds: (existingProfile.breeds as string[]) ?? [],
        yearsExperience:
          (existingProfile.yearsExperience as number) ?? undefined,
        kennelClubMemberships:
          (existingProfile.kennelClubMemberships as string[]) ?? [],
        isInsured: (existingProfile.isInsured as boolean) ?? false,
        isBonded: (existingProfile.isBonded as boolean) ?? false,
        profileImage: (existingProfile.profileImage as string) ?? '',
        galleryImages: (existingProfile.galleryImages as string[]) ?? [],
        ratePerShow: (existingProfile.ratePerShow as number) ?? undefined,
        ratePerDay: (existingProfile.ratePerDay as number) ?? undefined,
        regions: (existingProfile.regions as string[]) ?? [],
        travelWillingness:
          (existingProfile.travelWillingness as string[]) ?? [],
        bio: (existingProfile.bio as string) ?? '',
      }
    }

    return data
  })

  const step = STEPS[currentStep]

  const updateFormData = useCallback((updates: Partial<OnboardingFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }, [])

  // Save current step data to API
  const saveStepData = useCallback(
    async (stepIndex: number) => {
      const stepConfig = STEPS[stepIndex]

      // Role step uses a different API
      if (stepConfig.id === 'role') {
        if (!formData.role) return
        const res = await fetch('/api/user/role', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: formData.role }),
        })
        if (!res.ok) throw new Error('Failed to set role')
        return
      }

      // Welcome and complete steps don't save data
      if (stepConfig.id === 'welcome' || stepConfig.id === 'complete') {
        return
      }

      // Build partial payload from this step's fields
      const payload: Record<string, unknown> = {}
      for (const field of stepConfig.fields) {
        const value = formData[field]
        if (value !== undefined) {
          payload[field] = value
        }
      }

      // Only save if there's data to save
      if (Object.keys(payload).length === 0) return

      const res = await fetch('/api/handler-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || 'Failed to save')
      }
    },
    [formData]
  )

  const goNext = useCallback(async () => {
    if (currentStep >= STEPS.length - 1) return

    // Read step config directly from the array to avoid stale closures
    const currentStepConfig = STEPS[currentStep]

    setSaving(true)
    try {
      await saveStepData(currentStep)

      // If role is EXHIBITOR, redirect to handlers page
      if (currentStepConfig.id === 'role' && formData.role === 'EXHIBITOR') {
        router.push('/handlers')
        return
      }

      setCompletedSteps((prev) =>
        prev.includes(currentStep) ? prev : [...prev, currentStep]
      )
      setDirection(1)
      setCurrentStep((prev) => prev + 1)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }, [currentStep, saveStepData, formData.role, router])

  const goBack = useCallback(() => {
    if (currentStep <= 0) return
    setDirection(-1)
    setCurrentStep((prev) => prev - 1)
  }, [currentStep])

  const goSkip = useCallback(() => {
    if (currentStep >= STEPS.length - 1) return
    setDirection(1)
    setCurrentStep((prev) => prev + 1)
  }, [currentStep])

  // Show progress bar only for handler wizard steps (not role, welcome, or complete)
  const showProgressBar = currentStep >= 2 && currentStep <= 12

  const showNav = step.id !== 'complete'

  // Slide animation variants
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  }

  const userName = user.name?.split(' ')[0] || 'there'

  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-col">
      {showProgressBar && (
        <ProgressBar
          phases={PHASES}
          currentStep={currentStep}
          completedSteps={completedSteps}
        />
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex flex-1 flex-col"
          >
            {step.id === 'role' && (
              <StepRole
                userName={userName}
                value={formData.role}
                onChange={(role) => updateFormData({ role })}
                onContinue={goNext}
              />
            )}
            {step.id === 'welcome' && (
              <StepWelcome userName={userName} onContinue={goNext} />
            )}
            {step.id === 'name' && (
              <StepName
                fullName={formData.fullName ?? ''}
                businessName={formData.businessName ?? ''}
                onChange={(name, biz) =>
                  updateFormData({ fullName: name, businessName: biz })
                }
              />
            )}
            {step.id === 'location' && (
              <StepLocation
                city={formData.city ?? ''}
                state={formData.state ?? ''}
                contactEmail={formData.contactEmail ?? ''}
                onChange={(city, state, email) =>
                  updateFormData({ city, state, contactEmail: email })
                }
              />
            )}
            {step.id === 'services' && (
              <StepServices
                value={formData.services ?? []}
                onChange={(services) => updateFormData({ services })}
              />
            )}
            {step.id === 'breeds' && (
              <StepBreeds
                value={formData.breeds ?? []}
                onChange={(breeds) => updateFormData({ breeds })}
              />
            )}
            {step.id === 'experience' && (
              <StepExperience
                value={formData.yearsExperience}
                onChange={(yearsExperience) =>
                  updateFormData({ yearsExperience })
                }
              />
            )}
            {step.id === 'credentials' && (
              <StepCredentials
                memberships={formData.kennelClubMemberships ?? []}
                isInsured={formData.isInsured ?? false}
                isBonded={formData.isBonded ?? false}
                onChange={(memberships, isInsured, isBonded) =>
                  updateFormData({
                    kennelClubMemberships: memberships,
                    isInsured,
                    isBonded,
                  })
                }
              />
            )}
            {step.id === 'photo' && (
              <StepPhoto
                value={formData.profileImage ?? ''}
                onChange={(profileImage) => updateFormData({ profileImage })}
              />
            )}
            {step.id === 'gallery' && (
              <StepGallery
                value={formData.galleryImages ?? []}
                onChange={(galleryImages) => updateFormData({ galleryImages })}
              />
            )}
            {step.id === 'rates' && (
              <StepRates
                ratePerShow={formData.ratePerShow}
                ratePerDay={formData.ratePerDay}
                onChange={(ratePerShow, ratePerDay) =>
                  updateFormData({ ratePerShow, ratePerDay })
                }
              />
            )}
            {step.id === 'regions' && (
              <StepRegions
                regions={formData.regions ?? []}
                travelWillingness={formData.travelWillingness ?? []}
                onChange={(regions, travelWillingness) =>
                  updateFormData({ regions, travelWillingness })
                }
              />
            )}
            {step.id === 'bio' && (
              <StepBio
                value={formData.bio ?? ''}
                onChange={(bio) => updateFormData({ bio })}
              />
            )}
            {step.id === 'complete' && <StepComplete formData={formData} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom nav bar */}
      {showNav && step.id !== 'role' && step.id !== 'welcome' && (
        <OnboardingNav
          onBack={currentStep > 2 ? goBack : undefined}
          onSkip={step.skippable ? goSkip : undefined}
          onContinue={goNext}
          showBack={currentStep > 2}
          showSkip={step.skippable}
          saving={saving}
        />
      )}

      {/* Spacer for fixed bottom nav */}
      {showNav && step.id !== 'role' && step.id !== 'welcome' && (
        <div className="h-20" />
      )}
    </div>
  )
}
