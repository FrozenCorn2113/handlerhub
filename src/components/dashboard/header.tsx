interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-display text-3xl font-light text-ringside-black md:text-4xl">
          {heading}
        </h1>
        {text && <p className="font-body text-lg text-warm-gray">{text}</p>}
      </div>
      {children}
    </div>
  )
}
