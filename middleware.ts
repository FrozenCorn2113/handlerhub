import { NextRequest } from 'next/server'

import NextAuth, { Session } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

// All config inlined here -- @/ path alias imports break Vercel Edge bundling
const authConfig = {
  providers: [
    Google({
      id: 'google',
      name: 'Google',
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      id: 'github',
      name: 'GitHub',
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
}

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
]
const authRoutes = ['/login', '/register', '/auth-error']
const apiAuthPrefix = '/api/auth'
const DEFAULT_LOGIN_REDIRECT = '/dashboard'

const { auth: middleware } = NextAuth(authConfig)

export default middleware(
  (req: NextRequest & { auth: Session | null }): Response | void => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.some((route) => {
      if (route === '/') {
        return nextUrl.pathname === route
      } else {
        return nextUrl.pathname.startsWith(route)
      }
    })

    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) return

    if (isAuthRoute) {
      if (isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
      }
      return
    }

    if (!isLoggedIn && !isPublicRoute) {
      let callbackUrl = nextUrl.pathname
      if (nextUrl.search) {
        callbackUrl += nextUrl.search
      }

      const encodedCallbackUrl = encodeURIComponent(callbackUrl)

      return Response.redirect(
        new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
      )
    }

    return
  }
)

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
}
