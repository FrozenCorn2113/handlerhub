import {
  Check,
  Circle,
  Clock,
  Prohibit,
  Warning,
  X,
} from '@phosphor-icons/react'

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
      'bg-[#6B5400] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_1px_3px_rgba(107,84,0,0.3)]',
    medium:
      'bg-[#F5EFA0] text-[#6B5400] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_1px_2px_rgba(28,18,8,0.06)]',
    light: 'bg-[#F5EFA0]/40 text-[#6B5400] border border-[#F5EFA0]/60',
    icon: Clock,
  },
  accepted: {
    filled:
      'bg-[#1A6640] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_1px_3px_rgba(26,102,64,0.3)]',
    medium:
      'bg-[#D4EFE0] text-[#1A6640] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_1px_2px_rgba(28,18,8,0.06)]',
    light: 'bg-[#D4EFE0]/40 text-[#1A6640] border border-[#D4EFE0]/60',
    icon: Check,
  },
  completed: {
    filled:
      'bg-[#1A4A7A] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_1px_3px_rgba(26,74,122,0.3)]',
    medium:
      'bg-[#C2E4F5] text-[#1A4A7A] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_1px_2px_rgba(28,18,8,0.06)]',
    light: 'bg-[#C2E4F5]/40 text-[#1A4A7A] border border-[#C2E4F5]/60',
    icon: Check,
  },
  declined: {
    filled:
      'bg-[#8A3A08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_1px_3px_rgba(138,58,8,0.3)]',
    medium:
      'bg-[#F5E0CC] text-[#8A3A08] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_1px_2px_rgba(28,18,8,0.06)]',
    light: 'bg-[#F5E0CC]/40 text-[#8A3A08] border border-[#F5E0CC]/60',
    icon: X,
  },
  cancelled: {
    filled:
      'bg-[#7A6E5E] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_1px_3px_rgba(122,110,94,0.3)]',
    medium:
      'bg-[#E8E0D4] text-[#7A6E5E] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_1px_2px_rgba(28,18,8,0.06)]',
    light: 'bg-[#E8E0D4]/40 text-[#7A6E5E] border border-[#E8E0D4]/60',
    icon: Prohibit,
  },
  overdue: {
    filled:
      'bg-[#B52A2A] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_1px_3px_rgba(181,42,42,0.3)]',
    medium:
      'bg-[#FFC9C9] text-[#B52A2A] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_1px_2px_rgba(28,18,8,0.06)]',
    light: 'bg-[#FFC9C9]/40 text-[#B52A2A] border border-[#FFC9C9]/60',
    icon: Warning,
  },
}

// For light weight, use a dot icon; for others use the status-specific icon
const lightIcons: Record<StatusVariant, typeof Circle> = {
  pending: Circle,
  accepted: Check,
  completed: Check,
  declined: X,
  cancelled: Prohibit,
  overdue: Warning,
}

export function StatusBadge({ status, weight = 'medium' }: StatusBadgeProps) {
  const config = variantConfig[status]
  const Icon = weight === 'light' ? lightIcons[status] : config.icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-xs font-semibold ${config[weight]}`}
    >
      <Icon size={13} weight={weight === 'filled' ? 'bold' : 'regular'} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
