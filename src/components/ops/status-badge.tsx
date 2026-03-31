type StatusVariant =
  | 'pending'
  | 'accepted'
  | 'completed'
  | 'declined'
  | 'cancelled'
  | 'overdue'

interface StatusBadgeProps {
  status: StatusVariant
}

const variantStyles: Record<StatusVariant, string> = {
  pending: 'bg-[#F5EFA0] text-[#6B5400]',
  accepted: 'bg-[#D4EFE0] text-[#1A6640]',
  completed: 'bg-[#C2E4F5] text-[#1A4A7A]',
  declined: 'bg-[#F5E0CC] text-[#8A3A08]',
  cancelled: 'bg-[#E8E0D4] text-[#7A6E5E]',
  overdue: 'bg-[#FFC9C9] text-[#B52A2A]',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 font-sans text-xs font-medium ${variantStyles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
