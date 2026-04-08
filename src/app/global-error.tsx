'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            fontFamily: 'system-ui, sans-serif',
            background: '#fafaf8',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/handler-hub-logo-dark.png"
            width={48}
            height={48}
            alt="HandlerHub"
          />
          <h1
            style={{ marginTop: '1.5rem', fontSize: '1.5rem', color: '#111' }}
          >
            Something went wrong
          </h1>
          <p
            style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.875rem' }}
          >
            An unexpected error occurred. Please try again.
          </p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => reset()}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                background: '#4a3728',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              Try Again
            </button>
            <a
              href="/"
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                border: '1px solid #d4c9b8',
                color: '#4a3728',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              Back to Home
            </a>
          </div>
          {error.digest && (
            <p
              style={{
                marginTop: '2.5rem',
                fontSize: '0.75rem',
                color: '#999',
              }}
            >
              Ref: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  )
}
