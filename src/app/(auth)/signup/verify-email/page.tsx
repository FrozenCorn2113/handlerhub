import { type Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Verify Email',
  description: 'Verify your email address',
}

interface VerifyEmailPageProps {
  searchParams?: {
    token?: string
  }
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps): Promise<JSX.Element> {
  const token = searchParams?.token

  if (!token) {
    return (
      <div className="mx-auto w-full max-w-[420px]">
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
          Invalid link
        </h1>
        <p className="mb-8 text-sm text-gray-500">
          The verification link is missing or invalid. Please request a new one.
        </p>
        <Link
          href="/register/reverify-email"
          className="font-semibold text-paddock-green hover:underline"
        >
          Resend verification email
        </Link>
      </div>
    )
  }

  try {
    const user = await prisma.user.findUnique({
      where: { emailVerificationToken: token },
    })

    if (!user) {
      return (
        <div className="mx-auto w-full max-w-[420px]">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
            Invalid or expired link
          </h1>
          <p className="mb-8 text-sm text-gray-500">
            This verification link is no longer valid. Please request a new one.
          </p>
          <Link
            href="/register/reverify-email"
            className="font-semibold text-paddock-green hover:underline"
          >
            Resend verification email
          </Link>
        </div>
      )
    }

    if (user.emailVerified) {
      redirect('/login')
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        emailVerificationToken: null,
      },
    })
  } catch (error) {
    // redirect() throws a special error in Next.js - let it propagate
    throw error
  }

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
        Email verified
      </h1>
      <p className="mb-8 text-sm text-gray-500">
        Your email has been verified successfully. You can now sign in to your
        account.
      </p>
      <Link
        href="/login"
        className="inline-flex h-10 items-center justify-center rounded-md bg-paddock-green px-6 text-sm font-medium text-white transition-colors hover:bg-paddock-green/90"
      >
        Sign in
      </Link>
    </div>
  )
}
