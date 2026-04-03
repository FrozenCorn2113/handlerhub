import { PrismaClient } from '@prisma/client'
import 'server-only'

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient
}

function getDatabaseUrl(): string | undefined {
  const url =
    process.env.POSTGRES_DATABASE_URL ??
    process.env.POSTGRES_DATABASE_URL_UNPOOLED

  if (!url) return undefined

  // Supabase requires SSL; make local dev more forgiving if omitted.
  if (url.includes('supabase.co') && !url.includes('sslmode=')) {
    const joiner = url.includes('?') ? '&' : '?'
    return `${url}${joiner}sslmode=require`
  }

  // When using Supabase's connection pooler (pgbouncer), Prisma needs
  // pgbouncer=true and a low connection_limit for serverless environments.
  if (
    process.env.NODE_ENV === 'production' &&
    url.includes('pooler.supabase.com')
  ) {
    const u = new URL(url)
    if (!u.searchParams.has('pgbouncer')) {
      u.searchParams.set('pgbouncer', 'true')
    }
    if (!u.searchParams.has('connection_limit')) {
      u.searchParams.set('connection_limit', '1')
    }
    return u.toString()
  }

  return url
}

export let prisma: PrismaClient
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
  })
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({
      datasources: {
        db: {
          url: getDatabaseUrl(),
        },
      },
    })
  }
  prisma = global.cachedPrisma
}
