import { cn } from '@/lib/utils'

interface MaterialIconProps {
  name: string
  className?: string
  /**
   * Matches Google's Material Symbols variable font axes.
   * Defaults: outlined (FILL 0) and medium weight.
   */
  fill?: 0 | 1
  weight?: number
  grade?: number
  opticalSize?: number
}

export function MaterialIcon({
  name,
  className,
  fill = 0,
  weight = 400,
  grade = 0,
  opticalSize = 24,
}: MaterialIconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('material-symbols-outlined leading-none', className)}
      style={{
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`,
      }}
    >
      {name}
    </span>
  )
}
