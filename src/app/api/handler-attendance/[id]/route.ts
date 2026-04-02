import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/lib/auth/auth'
import { prisma } from '@/lib/db'

/**
 * DELETE /api/handler-attendance/[id]
 * Remove an attendance declaration.
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Verify ownership
    const attendance = await prisma.handlerShowAttendance.findUnique({
      where: { id: params.id },
    })

    if (!attendance) {
      return NextResponse.json(
        { error: 'Attendance record not found' },
        { status: 404 }
      )
    }

    if (attendance.handlerId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.handlerShowAttendance.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Handler attendance delete error:', error)
    return NextResponse.json(
      { error: 'Failed to remove attendance' },
      { status: 500 }
    )
  }
}
