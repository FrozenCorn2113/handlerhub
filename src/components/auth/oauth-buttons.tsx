'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

import { Icons } from '@/components/shared/icons'

import { signIn } from 'next-auth/react'
import { toast } from 'sonner'

function useSearchParam(key: string): string | null {
  const [paramValue, setParamValue] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      setParamValue(urlParams.get(key))
    }
  }, [key])

  return paramValue
}

export function OAuthButtons(): JSX.Element {
  const nextUrl = useSearchParam('next')
  const fromUrl = useSearchParam('from')
  const callbackUrl = nextUrl || fromUrl
  const [isLoading, setIsLoading] = useState(false)

  async function handleGoogleSignIn(): Promise<void> {
    try {
      setIsLoading(true)
      await signIn('google', {
        callbackUrl: callbackUrl || '/onboarding',
      })
      toast.success('Redirecting...')
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
      console.error(error)
      throw new Error('Error signing in with Google')
    }
    setIsLoading(false)
  }

  return (
    <div className="grid gap-2">
      <Button
        aria-label="Sign in with Google"
        variant="outline"
        onClick={() => void handleGoogleSignIn()}
        className="w-full"
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 size-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 size-4" />
        )}
        Continue with Google
      </Button>
    </div>
  )
}
