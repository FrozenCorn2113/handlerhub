/* eslint-disable tailwindcss/classnames-order */
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-12">
      <h1
        className="text-4xl font-light tracking-tight text-ringside-black md:text-5xl"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-warm-gray">Last updated: April 1, 2026</p>

      <div
        className="mt-10 space-y-8 text-sm leading-relaxed text-ringside-black/80"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            1. Introduction
          </h2>
          <p>
            This Privacy Policy explains how HandlerHub (&quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;) collects, uses, and protects
            your personal information when you use our platform at{' '}
            <a
              href="https://handlerhub.com"
              className="text-paddock-green underline hover:text-forest"
            >
              https://handlerhub.com
            </a>
            . HandlerHub connects dog show exhibitors with professional
            handlers. Users create profiles, browse handlers, submit service
            requests, and communicate through the platform.
          </p>
          <p className="mt-3">
            HandlerHub is operated from Victoria, British Columbia, Canada. We
            comply with the Personal Information Protection and Electronic
            Documents Act (PIPEDA) and the General Data Protection Regulation
            (GDPR) where applicable.
          </p>
          <p className="mt-3">
            {/* TODO: contact@handlerhub.com is a placeholder email - revisit when real email is set up */}
            If you have questions about this policy, you can reach us at{' '}
            <a
              href="mailto:contact@handlerhub.com"
              className="text-paddock-green underline hover:text-forest"
            >
              contact@handlerhub.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            2. What We Collect
          </h2>
          <p>
            When you create an account and use HandlerHub, we collect the
            following categories of information:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong>Account information:</strong> Your name and email address,
              provided directly or through Google OAuth.
            </li>
            <li>
              <strong>Profile information:</strong> Business name, bio,
              specialties, breed specializations, regions served, fee schedule,
              and profile photos.
            </li>
            <li>
              <strong>Location and region data:</strong> Geographic regions you
              serve or are searching within, used to match exhibitors with
              nearby handlers.
            </li>
            <li>
              <strong>Service preferences:</strong> The types of services you
              offer or are looking for (handling, grooming, transport, etc.).
            </li>
            <li>
              <strong>Request information:</strong> Details you include when
              posting or responding to service requests on the Request Board.
            </li>
            <li>
              <strong>Messages:</strong> Content of messages sent through the
              HandlerHub messaging system.
            </li>
            <li>
              <strong>Payment information:</strong> When you make payments
              through HandlerHub, payment details are collected and processed by
              Stripe. We do not store your full credit card number or payment
              credentials on our servers.
            </li>
            <li>
              <strong>Usage and analytics data:</strong> Pages visited, time on
              site, browser type, device information, and general traffic
              patterns, collected through Google Analytics (GA4) and Meta Pixel.
            </li>
            <li>
              <strong>Cookies:</strong> Small text files stored on your device
              for authentication, session management, and analytics. See our{' '}
              <Link
                href="/legal/cookies-policy"
                className="text-paddock-green underline hover:text-forest"
              >
                Cookie Policy
              </Link>{' '}
              for details.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            3. How We Collect Your Information
          </h2>
          <p>We collect information in the following ways:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong>Directly from you:</strong> When you create an account,
              fill out your profile, post requests, or send messages.
            </li>
            <li>
              <strong>Through authentication providers:</strong> When you sign
              in using Google OAuth, email/password, or magic link (sent via
              Resend), your name and email are shared with us to create or
              access your account.
            </li>
            <li>
              <strong>Automatically:</strong> Through cookies, Google Analytics
              (GA4), and Meta Pixel when you browse the platform.
            </li>
            <li>
              <strong>From payment processing:</strong> Stripe shares limited
              transaction data with us (such as payment status and amount) to
              manage subscriptions and billing.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            4. How We Use Your Information
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
            <li>Process payments and manage subscriptions through Stripe</li>
            <li>
              Send account notifications (e.g., new messages, responses to your
              requests, payment confirmations)
            </li>
            <li>Analyze usage patterns to improve the platform and fix bugs</li>
            <li>Measure advertising effectiveness through Meta Pixel</li>
            <li>
              Comply with legal obligations under PIPEDA, GDPR, and other
              applicable laws
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            5. We Do Not Sell Your Data
          </h2>
          <p>
            HandlerHub does not sell, rent, or share your personal information
            with third parties for marketing purposes. We will never monetize
            your data. Your information is used solely to operate the HandlerHub
            platform and as described in this policy.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            6. Third-Party Service Providers
          </h2>
          <p>
            We share your information with the following trusted third-party
            providers, only as necessary to operate HandlerHub:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong>Supabase:</strong> Hosts our database (PostgreSQL) and
              provides authentication services. Your account data, profile
              information, messages, and requests are stored in Supabase.
            </li>
            <li>
              <strong>Cloudflare R2:</strong> Stores uploaded files such as
              profile photos.
            </li>
            <li>
              <strong>Stripe:</strong> Processes payments securely. Stripe
              receives your payment information directly and is subject to their
              own privacy policy.
            </li>
            <li>
              <strong>Resend:</strong> Delivers transactional emails, including
              magic link sign-in emails and account notifications.
            </li>
            <li>
              <strong>Google Analytics (GA4):</strong> Collects anonymized usage
              data for traffic analysis.
            </li>
            <li>
              <strong>Meta Pixel:</strong> Tracks advertising conversions and
              measures campaign effectiveness.
            </li>
            <li>
              <strong>Vercel:</strong> Hosts the HandlerHub website and
              application.
            </li>
          </ul>
          <p className="mt-3">
            Each of these providers is bound by their own privacy policies and
            data protection obligations. We select providers that maintain
            appropriate security standards.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            7. Data Storage and Security
          </h2>
          <p>
            Your data is stored in Supabase (PostgreSQL) for structured data and
            Cloudflare R2 for uploaded files. These services use
            industry-standard encryption for data in transit and at rest.
          </p>
          <p className="mt-3">
            We take reasonable measures to protect your personal information,
            including secure authentication methods (Google OAuth,
            email/password with hashing, and magic links via Resend). However,
            no system is completely secure, and we cannot guarantee absolute
            security.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            8. Data Retention
          </h2>
          <p>
            We retain your personal information for as long as your account is
            active or as needed to provide services to you. If you request
            account deletion, we will remove your personal data within 30 days,
            except where we are required by law to retain certain records.
          </p>
          <p className="mt-3">
            Analytics data collected through Google Analytics and Meta Pixel is
            retained according to those services&apos; default retention
            policies.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            9. International Data Transfers
          </h2>
          <p>
            HandlerHub is operated from Canada. Some of our third-party service
            providers (such as Stripe, Google, Meta, and Vercel) may process
            data in the United States or other countries. When data is
            transferred outside of Canada or the European Economic Area, we
            ensure that appropriate safeguards are in place, such as standard
            contractual clauses or the service provider&apos;s certification
            under recognized data protection frameworks.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            10. Your Rights
          </h2>
          <p>Under PIPEDA and GDPR, you have the right to:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Access the personal information we hold about you</li>
            <li>
              Correct inaccurate or incomplete information in your profile
            </li>
            <li>Request deletion of your account and associated data</li>
            <li>
              Withdraw consent for non-essential data processing (such as
              analytics cookies) at any time
            </li>
            <li>Object to processing based on our legitimate interests</li>
            <li>Request a portable copy of your data</li>
            <li>
              Lodge a complaint with the Office of the Privacy Commissioner of
              Canada or your local data protection authority
            </li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, please contact us at{' '}
            {/* TODO: contact@handlerhub.com is a placeholder email - revisit when real email is set up */}
            <a
              href="mailto:contact@handlerhub.com"
              className="text-paddock-green underline hover:text-forest"
            >
              contact@handlerhub.com
            </a>{' '}
            or visit our{' '}
            <Link
              href="/contact"
              className="text-paddock-green underline hover:text-forest"
            >
              contact page
            </Link>
            . We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            11. Children&apos;s Privacy
          </h2>
          <p>
            HandlerHub is not intended for use by anyone under the age of 13. We
            do not knowingly collect information from children. If you believe a
            child has provided us with personal data, please contact us and we
            will remove it promptly.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            12. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. If we make
            significant changes, we will notify users through the platform.
            Continued use of HandlerHub after changes constitutes acceptance of
            the updated policy.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            13. Contact
          </h2>
          <p>
            If you have questions about this Privacy Policy or want to request
            data access or deletion, please contact us at{' '}
            {/* TODO: contact@handlerhub.com is a placeholder email - revisit when real email is set up */}
            <a
              href="mailto:contact@handlerhub.com"
              className="text-paddock-green underline hover:text-forest"
            >
              contact@handlerhub.com
            </a>{' '}
            or visit our{' '}
            <Link
              href="/contact"
              className="text-paddock-green underline hover:text-forest"
            >
              contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
