'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { toast } from 'sonner'

interface RoleOption {
  role: 'EXHIBITOR' | 'HANDLER'
  title: string
  description: string
  icon: React.ReactNode
}

const roleOptions: RoleOption[] = [
  {
    role: 'EXHIBITOR',
    title: "I'm looking for a handler",
    description:
      'Browse professional handlers, request bookings, and manage your dogs.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 256 256"
        fill="currentColor"
      >
        <path d="M229.12,142.65a22.43,22.43,0,0,0-19.55-3.88l-45.24,10.4a22.16,22.16,0,0,0-19.43-11.63l-51.1-.52A37.76,37.76,0,0,0,67.62,148L48,165.37a6,6,0,0,0,0,8.73l.18.15,56,40A6,6,0,0,0,107.7,215l.24-.06,96-28a6,6,0,0,0,1.94-.93l24-18a22.58,22.58,0,0,0-1-25.36ZM225,161.34l-23.22,17.41L106.6,206.5,54.49,169.32l17.89-15.83a25.88,25.88,0,0,1,17-6.46l.62,0,51.1.52a10.12,10.12,0,0,1,9.88,10.36,10.28,10.28,0,0,1-10.34,9.63H112a6,6,0,0,0,0,12h28.66a22.38,22.38,0,0,0,22.08-17.34l51.41-11.82a10.57,10.57,0,0,1,9.11,1.79A10.48,10.48,0,0,1,225,161.34ZM128,90a30,30,0,1,0-30-30A30,30,0,0,0,128,90Zm0-48a18,18,0,1,1-18,18A18,18,0,0,1,128,42Z" />
      </svg>
    ),
  },
  {
    role: 'HANDLER',
    title: 'I am a handler / I offer services',
    description:
      'Create your professional profile, get discovered by exhibitors, and manage bookings.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 256 256"
        fill="currentColor"
      >
        <path d="M237.2,151.87v0a47.1,47.1,0,0,0-2.35-5.45L193.26,51.8a18,18,0,0,0-33,1.55L142.06,110H113.94L95.76,53.35a18,18,0,0,0-33-1.55L21.15,146.42a47.1,47.1,0,0,0-2.35,5.45v0A46,46,0,1,0,102,174.92V166h52v8.92A46,46,0,1,0,237.2,151.87ZM56,206a34,34,0,1,1,31.42-47.08,6,6,0,0,0,5.54,3.72H96V166a6,6,0,0,0,6-6V138h8v16a6,6,0,0,0,6,6v-6h24v6a6,6,0,0,0,6-6V138h8v22a6,6,0,0,0,6,6v-3.36h2.84a6,6,0,0,0,5.62-3.88A34,34,0,1,1,200,206a33.68,33.68,0,0,1-27.18-13.73A6,6,0,0,0,168,190a6,6,0,0,0-4.63-2.18A46.07,46.07,0,0,0,154,178.92V166H102v12.92a46.07,46.07,0,0,0-9.37,8.9A6,6,0,0,0,88,190a6,6,0,0,0-4.82,2.27A33.68,33.68,0,0,1,56,206Z" />
      </svg>
    ),
  },
]

export default function RoleSelectPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  async function handleRoleSelect(role: 'EXHIBITOR' | 'HANDLER') {
    setLoading(true)
    setSelectedRole(role)

    try {
      const response = await fetch('/api/user/role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      })

      if (!response.ok) {
        throw new Error('Failed to set role')
      }

      if (role === 'HANDLER') {
        router.push('/dashboard/profile?onboarding=true')
      } else {
        router.push('/handlers')
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
      setLoading(false)
      setSelectedRole(null)
    }
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl text-center">
        <h1
          className="mb-2 text-4xl tracking-tight text-ringside-black md:text-5xl"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
        >
          Welcome to HandlerHub
        </h1>
        <p
          className="mb-10 text-lg text-warm-gray"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          How would you like to use HandlerHub?
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {roleOptions.map((option) => (
            <button
              key={option.role}
              onClick={() => handleRoleSelect(option.role)}
              disabled={loading}
              className={`group relative rounded-2xl border-2 bg-white p-8 text-left transition-all hover:border-paddock-green hover:shadow-lg ${
                selectedRole === option.role
                  ? 'border-paddock-green shadow-lg'
                  : 'border-sand'
              } ${loading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
            >
              <div className="mb-4 text-paddock-green">{option.icon}</div>
              <h2
                className="mb-2 text-xl font-semibold text-ringside-black"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
              >
                {option.title}
              </h2>
              <p
                className="text-sm leading-relaxed text-warm-gray"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {option.description}
              </p>

              {selectedRole === option.role && loading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80">
                  <svg
                    className="size-8 animate-spin text-paddock-green"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
