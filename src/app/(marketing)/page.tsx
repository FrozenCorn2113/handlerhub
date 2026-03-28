import LandingHome from '@/app/(marketing)/_components/landing-home'
import { StitchLandingShell } from '@/app/(marketing)/_components/stitch-landing-shell'

export const dynamic = 'force-dynamic'

export default function IndexPage() {
  return (
    <StitchLandingShell>
      <LandingHome />
    </StitchLandingShell>
  )
}
