import { Check, Clock, Prohibit, Warning, X } from '@phosphor-icons/react'

type StatusVariant =
  | 'pending'
  | 'accepted'
  | 'completed'
  | 'declined'
  | 'cancelled'
  | 'overdue'

type BadgeWeight = 'filled' | 'medium' | 'light'

interface StatusBadgeProps {
  status: StatusVariant
  weight?: BadgeWeight
}

const variantConfig: Record<
  StatusVariant,
  {
    filled: string
    medium: string
    light: string
    icon: typeof Clock
  }
> = {
  pending: {
    filled:
      'bg-[#6B5400] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]',
    medium:
      'bg-[#F5EFA0] text-[#6B5400] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]',
    light: 'bg-[#F5EFA0]/40 text-[#6B5400]',
    icon: Clock,
  },
  accepted: {
    filled:
      'bg-[#1A6640] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]',
    medium:
      'bg-[#D4EFE0] text-[#1A6640] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]',
    light: 'bg-[#D4EFE0]/40 text-[#1A6640]',
    icon: Check,
  },
  completed: {
    filled:
      'bg-[#1A4A7A] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]',
    medium:
      'bg-[#C2E4F5] text-[#1A4A7A] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]',
    light: 'bg-[#C2E4F5]/40 text-[#1A4A7A]',
    icon: Check,
  },
  declined: {
    filled:
      'bg-[#8A3A08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]',
    medium:
      'bg-[#F5E0CC] text-[#8A3A08] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]',
    light: 'bg-[#F5E0CC]/40 text-[#8A3A08]',
    icon: X,
  },
  cancelled: {
    filled:
      'bg-[#7A6E5E] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]',
    medium:
      'bg-[#E8E0D4] text-[#7A6E5E] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]',
    light: 'bg-[#E8E0D4]/40 text-[#7A6E5E]',
    icon: Prohibit,
  },
  overdue: {
    filled:
      'bg-[#B52A2A] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]',
    medium:
      'bg-[#FFC9C9] text-[#B52A2A] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]',
    light: 'bg-[#FFC9C9]/40 text-[#B52A2A]',
    icon: Warning,
  },
}

export function StatusBadge({ status, weight = 'medium' }: StatusBadgeProps) {
  const config = variantConfig[status]
  const Icon = config.icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-medium ${config[weight]}`}
    >
      <Icon size={12} weight={weight === 'filled' ? 'bold' : 'regular'} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
