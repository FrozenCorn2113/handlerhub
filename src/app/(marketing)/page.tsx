import LandingHome from '@/app/(marketing)/_components/landing-home'
import { StitchLandingShell } from '@/app/(marketing)/_components/stitch-landing-shell'

export default function IndexPage() {
  return (
    <StitchLandingShell>
      <LandingHome />
    </StitchLandingShell>
  )
}
