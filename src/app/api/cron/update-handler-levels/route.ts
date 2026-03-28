import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'
import { updateHandlerMetrics } from '@/lib/handler-metrics'

/**
 * Cron endpoint to update all handler levels daily
 *
 * This should be called by a cron service (like Vercel Cron, GitHub Actions, or external service)
 * to periodically recalculate handler metrics and levels.
 *
 * To secure this endpoint in production, you should:
 * 1. Use Vercel Cron (automatic authentication)
 * 2. Add Authorization header check with secret token
 * 3. Restrict to specific IP addresses
 *
 * Example cron schedule: 0 2 * * * (daily at 2 AM)
 */

export async function GET(req: Request) {
  try {
    // Optional: Check for authorization token
    // const authHeader = req.headers.get("authorization")
    // const cronSecret = process.env.CRON_SECRET
    // if (authHeader !== `Bearer ${cronSecret}`) {
    //   return new NextResponse("Unauthorized", { status: 401 })
    // }

    console.log('[Cron] Starting handler level update job...')

    // Get all handlers
    const handlers = await prisma.user.findMany({
      where: {
        role: 'HANDLER',
        handlerProfile: {
          isNot: null,
        },
      },
      select: {
        id: true,
        name: true,
      },
    })

    console.log(`[Cron] Found ${handlers.length} handlers to update`)

    const results = {
      total: handlers.length,
      updated: 0,
      leveledUp: 0,
      errors: 0,
      levelChanges: [] as any[],
    }

    // Update each handler's metrics
    for (const handler of handlers) {
      try {
        const result = await updateHandlerMetrics(handler.id)

        if (result) {
          results.updated++

          if (result.levelChanged) {
            results.leveledUp++
            results.levelChanges.push({
              handlerId: handler.id,
              name: handler.name,
              oldLevel: result.oldLevel,
              newLevel: result.newLevel,
            })

            console.log(
              `[Cron] Handler ${handler.name} (${handler.id}) leveled up: ${result.oldLevel} → ${result.newLevel}`
            )
          }
        }
      } catch (error) {
        results.errors++
        console.error(`[Cron] Error updating handler ${handler.id}:`, error)
      }
    }

    console.log('[Cron] Handler level update job completed:', results)

    return NextResponse.json({
      success: true,
      message: 'Handler levels updated successfully',
      ...results,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[Cron] Handler level update job failed:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// Allow POST as well for flexibility with different cron services
export async function POST(req: Request) {
  return GET(req)
}
