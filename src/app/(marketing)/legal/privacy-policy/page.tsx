/* eslint-disable tailwindcss/classnames-order */
import Link from 'next/link'

import { StitchLandingShell } from '@/app/(marketing)/_components/stitch-landing-shell'

export const metadata = {
  title: 'Privacy Policy | HandlerHub',
}

export default function PrivacyPolicyPage() {
  return (
    <StitchLandingShell>
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-12">
        <h1
          className="text-4xl font-light tracking-tight text-ringside-black md:text-5xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-warm-gray">
          Last updated: March 28, 2026
        </p>

        <div
          className="mt-10 space-y-8 text-sm leading-relaxed text-ringside-black/80"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <section>
            <h2 className="mb-3 text-lg font-semibold text-ringside-black">
              1. What We Collect
            </h2>
            <p>
              When you create an account on HandlerHub, we collect the following
              information:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Account information:</strong> your name and email
                address
              </li>
              <li>
                <strong>Profile information:</strong> business name, bio,
                specialties, regions, fee schedule, and profile photo
              </li>
              <li>
                <strong>Request information:</strong> details you include when
                posting or responding to service requests
              </li>
              <li>
                <strong>Messages:</strong> content of messages sent through the
                HandlerHub messaging system
              </li>
              <li>
                <strong>Usage data:</strong> basic analytics such as pages
                visited and time on site, collected through cookies
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-ringside-black">
              2. How We Use Your Information
            </h2>
            <p>We use your information to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Display your profile in our handler directory so exhibitors can
                find you
              </li>
              <li>
                Show your requests on the Request Board so handlers can respond
              </li>
              <li>Enable messaging between exhibitors and handlers</li>
              <li>Improve the platform and fix bugs</li>
              <li>
                Send you important account notifications (e.g., new messages,
                responses to your requests)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-ringside-black">
              3. We Do Not Sell Your Data
            </h2>
            <p>
              HandlerHub does not sell, rent, or share your personal information
              with third parties for marketing purposes. We will never monetize
              your data. Your information is used solely to operate the
              HandlerHub platform.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-ringside-black">
              4. Cookies
            </h2>
            <p>
              HandlerHub uses cookies to keep you logged in and to collect basic
              usage analytics. We do not use tracking cookies for advertising.
              You can disable cookies in your browser settings, but this may
              affect your ability to use the platform.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-ringside-black">
              5. Data Storage and Security
            </h2>
            <p>
              Your data is stored securely using industry-standard encryption
              and hosting practices. We use trusted third-party providers for
              hosting and authentication. While we take reasonable measures to
              protect your data, no system is completely secure.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-ringside-black">
              6. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccurate information in your profile</li>
              <li>Request deletion of your account and associated data</li>
              <li>Export your profile data</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please{' '}
              <Link
                href="/contact"
                className="text-paddock-green underline hover:text-forest"
              >
                contact us
              </Link>
              . We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-ringside-black">
              7. Children&apos;s Privacy
            </h2>
            <p>
              HandlerHub is not intended for use by anyone under the age of 13.
              We do not knowingly collect information from children. If you
              believe a child has provided us with personal data, please contact
              us and we will remove it.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-ringside-black">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. If we make
              significant changes, we will notify users through the platform.
              Continued use of HandlerHub after changes constitutes acceptance
              of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-ringside-black">
              9. Contact
            </h2>
            <p>
              If you have questions about this Privacy Policy or want to request
              data deletion, please{' '}
              <Link
                href="/contact"
                className="text-paddock-green underline hover:text-forest"
              >
                contact us
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </StitchLandingShell>
  )
}
