import { StitchLandingShell } from '@/app/(marketing)/_components/stitch-landing-shell'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return <StitchLandingShell>{children}</StitchLandingShell>
}
