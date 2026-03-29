import { NextRequest, NextResponse } from 'next/server'

// Lightweight middleware -- no NextAuth import (causes __dirname Edge error).
// Session check uses cookie presence only. Actual auth validation happens
// server-side in route handlers / page components via auth().

const publicRoutes = [
  '/',
  '/blog',
  '/pricing',
  '/handlers',
  '/requests',
  '/for-handlers',
  '/onboarding',
  '/contact',
  '/help',
  '/feedback',
  '/legal',
  '/learn',
  '/role-select',
  '/our-story',
]
const authRoutes = ['/login', '/register', '/auth-error']
const apiAuthPrefix = '/api/auth'
const DEFAULT_LOGIN_REDIRECT = '/dashboard'

export default function middleware(req: NextRequest) {
  const { nextUrl } = req

  // Check for session token cookie (set by NextAuth)
  const sessionToken =
    req.cookies.get('__Secure-authjs.session-token') ??
    req.cookies.get('authjs.session-token') ??
    req.cookies.get('__Secure-next-auth.session-token') ??
    req.cookies.get('next-auth.session-token')
  const isLoggedIn = !!sessionToken

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.some((route) => {
    if (route === '/') {
      return nextUrl.pathname === route
    } else {
      return nextUrl.pathname.startsWith(route)
    }
  })
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) return NextResponse.next()

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return NextResponse.next()
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicons|.*\\.png$|.*\\.jpg$|.*\\.svg$|favicon.ico).*)',
  ],
}
