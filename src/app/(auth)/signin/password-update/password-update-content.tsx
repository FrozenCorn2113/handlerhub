'use client'

import * as React from 'react'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import {
  type PasswordUpdateFormInput,
  passwordUpdateSchema,
} from '@/lib/validations/auth'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { PasswordInput } from '@/components/forms/password-input'
import { Icons } from '@/components/shared/icons'

import { updatePassword } from '@/actions/auth/update-password'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

type UpdateState = 'idle' | 'submitting' | 'success' | 'error'

export function PasswordUpdateContent(): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')
  const [state, setState] = React.useState<UpdateState>('idle')
  const [errorMessage, setErrorMessage] = React.useState<string>('')

  const form = useForm<PasswordUpdateFormInput>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  // Auto-redirect after success
  React.useEffect(() => {
    if (state === 'success') {
      const timer = setTimeout(() => {
        router.push('/login')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [state, router])

  // No token state
  if (!token) {
    return (
      <div className="mx-auto w-full max-w-[420px]">
        <h1
          className="mb-2 text-4xl font-bold tracking-tight text-gray-900"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Invalid link
        </h1>
        <p className="mb-8 text-sm text-gray-500">
          The password reset link is missing or invalid. Please request a new
          one.
        </p>
        <Link
          href="/login/password-reset"
          className="font-semibold text-paddock-green hover:underline"
        >
          Request a new reset link
        </Link>
      </div>
    )
  }

  // Success state
  if (state === 'success') {
    return (
      <div className="mx-auto w-full max-w-[420px]">
        <h1
          className="mb-2 text-4xl font-bold tracking-tight text-gray-900"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Password updated
        </h1>
        <p className="mb-8 text-sm text-gray-500">
          Your password has been changed successfully. Redirecting you to sign
          in...
        </p>
        <Link
          href="/login"
          className="inline-flex h-10 items-center justify-center rounded-md bg-paddock-green px-6 text-sm font-medium text-white transition-colors hover:bg-paddock-green/90"
        >
          Sign in now
        </Link>
      </div>
    )
  }

  function onSubmit(formData: PasswordUpdateFormInput) {
    setState('submitting')
    setErrorMessage('')

    void (async () => {
      try {
        const result = await updatePassword({
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          resetPasswordToken: token!,
        })

        switch (result) {
          case 'success':
            setState('success')
            break
          case 'not-found':
          case 'expired':
            setState('error')
            setErrorMessage(
              'This reset link has expired or is no longer valid. Please request a new one.'
            )
            break
          case 'invalid-input':
            setState('idle')
            setErrorMessage(
              'Please check your password meets the requirements and both fields match.'
            )
            break
          default:
            setState('error')
            setErrorMessage(
              'Something went wrong. Please try again or request a new reset link.'
            )
        }
      } catch {
        setState('error')
        setErrorMessage(
          'Something went wrong. Please try again or request a new reset link.'
        )
      }
    })()
  }

  // Error state (expired/invalid token)
  if (state === 'error') {
    return (
      <div className="mx-auto w-full max-w-[420px]">
        <h1
          className="mb-2 text-4xl font-bold tracking-tight text-gray-900"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Unable to reset password
        </h1>
        <p className="mb-8 text-sm text-gray-500">{errorMessage}</p>
        <Link
          href="/login/password-reset"
          className="font-semibold text-paddock-green hover:underline"
        >
          Request a new reset link
        </Link>
      </div>
    )
  }

  // Form state (idle or submitting)
  return (
    <div className="mx-auto w-full max-w-[420px]">
      <h1
        className="mb-2 text-4xl font-bold tracking-tight text-gray-900"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Set new password
      </h1>
      <p className="mb-8 text-sm text-gray-500">
        Enter your new password below. It must contain at least 8 characters,
        including uppercase, lowercase, a number, and a special character.
      </p>

      {errorMessage && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <Form {...form}>
        <form
          className="grid w-full gap-4"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="********" {...field} />
                </FormControl>
                <FormMessage className="pt-2 sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="********" {...field} />
                </FormControl>
                <FormMessage className="pt-2 sm:text-sm" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={state === 'submitting'}
            className="w-full bg-forest text-white hover:bg-forest/90"
          >
            {state === 'submitting' ? (
              <>
                <Icons.spinner
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
                <span>Updating password...</span>
              </>
            ) : (
              <span>Set new password</span>
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-sm font-medium text-paddock-green hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  )
}
