interface OpsShellProps {
  children: React.ReactNode
}

export function OpsShell({ children }: OpsShellProps) {
  return <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
}
