import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user || !user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { profileId } = await req.json()

    if (!profileId || typeof profileId !== 'string') {
      return NextResponse.json(
        { error: 'Profile ID is required' },
        { status: 400 }
      )
    }

    // Check if profile exists and is unclaimed
    const profile = await prisma.handlerProfile.findUnique({
      where: { id: profileId },
      select: { id: true, isClaimed: true, userId: true },
    })

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    if (profile.isClaimed) {
      return NextResponse.json(
        { error: 'This profile has already been claimed' },
        { status: 409 }
      )
    }

    // Check if user already has a handler profile
    const existingProfile = await prisma.handlerProfile.findUnique({
      where: { userId: user.id },
    })

    if (existingProfile) {
      return NextResponse.json(
        {
          error:
            'You already have a handler profile. Contact support to merge profiles.',
        },
        { status: 409 }
      )
    }

    // Claim the profile: update userId, set claimed flags, update user role
    await prisma.$transaction([
      prisma.handlerProfile.update({
        where: { id: profileId },
        data: {
          userId: user.id,
          isClaimed: true,
          claimedAt: new Date(),
          claimedBy: user.id,
        },
      }),
      // Ensure user has HANDLER role
      prisma.user.update({
        where: { id: user.id },
        data: { role: 'HANDLER' },
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Claim error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
