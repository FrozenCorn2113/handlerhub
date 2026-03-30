import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { withTimeout } from '@/lib/with-timeout'

import {
  type FeeSchedule,
  type ProfileHandler,
  WebmakerProfilePage,
} from '@/components/webmaker/pages/profile-page'

export const dynamic = 'force-dynamic'

interface HandlerProfilePageProps {
  params: {
    id: string
  }
}

function inferServiceType(
  services: string[]
): 'Campaign' | 'Ringside' | 'Both' | 'Grooming' {
  const lower = services.map((s) => s.toLowerCase())
  const hasGrooming = lower.some((s) => s.includes('groom'))
  const hasCampaign = lower.some((s) => s.includes('campaign'))
  const hasRingside = lower.some((s) => s.includes('ringside'))
  if (hasCampaign && hasRingside) return 'Both'
  if (hasCampaign) return 'Campaign'
  if (hasRingside) return 'Ringside'
  if (hasGrooming) return 'Grooming'
  return 'Both'
}

function parseFeeSchedule(raw: unknown): FeeSchedule | null {
  if (!raw || typeof raw !== 'object') return null
  const obj = raw as Record<string, unknown>
  const num = (key: string) => {
    const v = obj[key]
    return typeof v === 'number' && Number.isFinite(v) ? v : null
  }
  const str = (key: string) => {
    const v = obj[key]
    return typeof v === 'string' && v.trim().length > 0 ? v : null
  }
  return {
    allBreedShow: num('allBreedShow'),
    specialtyShow: num('specialtyShow'),
    nationalSpecialty: num('nationalSpecialty'),
    boardAndTrain: num('boardAndTrain'),
    grooming: num('grooming'),
    mileage: num('mileage'),
    winBonusBIS: num('winBonusBIS'),
    winBonusGroup: num('winBonusGroup'),
    notes: str('notes'),
  }
}

async function fetchHandler(id: string) {
  try {
    const dbHandler = await withTimeout(
      prisma.user.findUnique({
        where: { id, role: 'HANDLER' },
        select: {
          id: true,
          name: true,
          image: true,
          handlerProfile: {
            select: {
              profileImage: true,
              coverImage: true,
              galleryImages: true,
              bio: true,
              yearsExperience: true,
              breeds: true,
              regions: true,
              services: true,
              registries: true,
              kennelClubMemberships: true,
              ratePerShow: true,
              feeSchedule: true,
              city: true,
              state: true,
              isInsured: true,
              isBonded: true,
              totalCompletedBookings: true,
              businessName: true,
              createdAt: true,
            },
          },
        },
      }),
      800,
      'HandlerProfilePage timed out'
    )

    if (!dbHandler?.handlerProfile) return null

    const p = dbHandler.handlerProfile
    const allRegistries = [
      ...(p.registries ?? []),
      ...(p.kennelClubMemberships ?? []),
    ]
    const registries = Array.from(new Set(allRegistries)).filter(Boolean)
    const location = [p.city, p.state].filter(Boolean).join(', ') || null

    return {
      id: dbHandler.id,
      name: dbHandler.name ?? 'Professional Handler',
      profileImage: p.profileImage ?? dbHandler.image ?? null,
      coverImage: p.coverImage ?? null,
      galleryImages: p.galleryImages ?? [],
      bio: p.bio ?? null,
      tagline: p.businessName ?? null,
      yearsExperience: p.yearsExperience ?? null,
      location,
      breeds: p.breeds ?? [],
      regions: p.regions ?? [],
      serviceType: inferServiceType(p.services ?? []),
      registries,
      feeSchedule: parseFeeSchedule(p.feeSchedule),
      ratePerShow: p.ratePerShow ?? null,
      isInsured: p.isInsured ?? false,
      isBonded: p.isBonded ?? false,
      kennelClubMemberships: p.kennelClubMemberships ?? [],
      totalCompletedBookings: p.totalCompletedBookings ?? 0,
      isFoundingHandler: true,
    }
  } catch {
    return null
  }
}

function generateJsonLd(
  handler: {
    name: string
    profileImage: string | null
    bio: string | null
    location: string | null
    breeds: string[]
    yearsExperience: number | null
    feeSchedule: FeeSchedule | null
    ratePerShow: number | null
    registries: string[]
  },
  id: string
) {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: handler.name,
    description:
      handler.bio ||
      `Professional dog handler specializing in ${handler.breeds.slice(0, 3).join(', ') || 'multiple breeds'}`,
    url: `https://handlerhub.com/handlers/${id}`,
    ...(handler.profileImage && { image: handler.profileImage }),
    ...(handler.location && {
      address: {
        '@type': 'PostalAddress',
        addressLocality: handler.location.split(', ')[0],
        addressRegion: handler.location.split(', ')[1],
        addressCountry: 'US',
      },
    }),
    ...(handler.ratePerShow && {
      priceRange: `$${handler.ratePerShow}+`,
    }),
    serviceType: 'Professional Dog Handling',
    areaServed:
      handler.breeds.length > 0
        ? handler.breeds.map((breed) => ({ '@type': 'Text', name: breed }))
        : undefined,
    ...(handler.yearsExperience && {
      foundingDate: new Date(
        new Date().getFullYear() - handler.yearsExperience,
        0,
        1
      )
        .toISOString()
        .split('T')[0],
    }),
    additionalType: 'https://schema.org/AnimalShelter',
    knowsAbout: handler.breeds,
    memberOf: handler.registries.map((reg) => ({
      '@type': 'Organization',
      name: reg,
    })),
  }

  // Clean undefined values
  return JSON.parse(JSON.stringify(jsonLd))
}

export async function generateMetadata({
  params,
}: HandlerProfilePageProps): Promise<Metadata> {
  const handler = await fetchHandler(params.id)

  if (!handler) {
    return {
      title: 'Handler Not Found | HandlerHub',
    }
  }

  const breeds =
    handler.breeds.length > 0
      ? handler.breeds.slice(0, 3).join(', ')
      : 'multiple breeds'
  const region =
    handler.regions.length > 0
      ? handler.regions[0]
      : (handler.location ?? 'various regions')

  const description = `${handler.name} is a professional dog handler specializing in ${breeds}, based in ${region}. View fee schedule, experience, and book on HandlerHub.`

  const canonicalUrl = `https://handlerhub.com/handlers/${params.id}`

  return {
    title: `${handler.name} - Professional Dog Handler | HandlerHub`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${handler.name} - Professional Dog Handler`,
      description,
      url: canonicalUrl,
      siteName: 'HandlerHub',
      type: 'profile',
      images: handler.profileImage
        ? [
            {
              url: handler.profileImage,
              width: 400,
              height: 400,
              alt: `${handler.name} - Professional Dog Handler`,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary',
      title: `${handler.name} - Professional Dog Handler`,
      description,
      images: handler.profileImage ? [handler.profileImage] : [],
    },
  }
}

export default async function HandlerProfilePage({
  params,
}: HandlerProfilePageProps) {
  const [user, handler] = await Promise.all([
    getCurrentUser().catch(() => null),
    fetchHandler(params.id),
  ])

  if (!handler) {
    notFound()
  }

  const messageTarget = '/dashboard/messages'
  const messageHref = user
    ? messageTarget
    : `/login?next=${encodeURIComponent(messageTarget)}`

  const profileHandler: ProfileHandler = {
    ...handler,
    messageHref,
  }

  const jsonLd = generateJsonLd(handler, params.id)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WebmakerProfilePage handler={profileHandler} />
    </>
  )
}
