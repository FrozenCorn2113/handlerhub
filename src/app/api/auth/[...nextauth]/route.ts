import { NextRequest } from 'next/server'

// Use a lazy import so that if the auth module fails to initialise
// (e.g. env validation or a missing dependency blows up) we still
// get a visible log line in Vercel instead of a silent 500.
let _handlers: { GET: Function; POST: Function } | null = null
let _initError: unknown = null

async function getHandlers() {
  if (_handlers) return _handlers
  if (_initError) throw _initError
  try {
    const mod = await import('@/lib/auth/auth')
    _handlers = { GET: mod.GET, POST: mod.POST }
    return _handlers
  } catch (err) {
    _initError = err
    console.error('[auth/route] auth module failed to load:', err)
    throw err
  }
}

export async function GET(req: NextRequest) {
  try {
    const handlers = await getHandlers()
    return await handlers.GET(req)
  } catch (err) {
    console.error('[auth/route] GET error:', err)
    // Redirect to error page so the user sees something meaningful
    const url = new URL('/auth-error?error=Configuration', req.url)
    return Response.redirect(url.toString())
  }
}

export async function POST(req: NextRequest) {
  try {
    const handlers = await getHandlers()
    return await handlers.POST(req)
  } catch (err) {
    console.error('[auth/route] POST error:', err)
    return Response.json(
      { error: 'Internal auth configuration error' },
      { status: 500 }
    )
  }
}
