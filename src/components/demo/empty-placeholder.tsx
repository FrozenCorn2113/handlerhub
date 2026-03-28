import { Icons } from '@/components/shared/icons'

export function EmptyPlaceholder({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 ${className}`}
    >
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  )
}

EmptyPlaceholder.Icon = function EmptyPlaceHolderIcon({
  name,
  className,
}: {
  name: keyof typeof Icons
  className?: string
}) {
  const Icon = Icons[name]
  return (
    <div
      className={`flex size-20 items-center justify-center rounded-full bg-muted ${className}`}
    >
      <Icon className="size-10" />
    </div>
  )
}

EmptyPlaceholder.Title = function EmptyPlaceholderTitle({
  children,
}: {
  children?: React.ReactNode
}) {
  return <h3 className="mt-4 text-lg font-semibold">{children}</h3>
}

EmptyPlaceholder.Description = function EmptyPlaceholderDescription({
  children,
}: {
  children?: React.ReactNode
}) {
  return <p className="mb-4 mt-2 text-sm text-muted-foreground">{children}</p>
}

export default EmptyPlaceholder
