/* eslint-disable tailwindcss/classnames-order */
import Link from 'next/link'

export const metadata = {
  title: 'Cookie Policy',
}

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-12">
      <h1
        className="text-4xl font-light tracking-tight text-ringside-black md:text-5xl"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Cookie Policy
      </h1>
      <p className="mt-2 text-sm text-warm-gray">Last updated: April 1, 2026</p>

      <div
        className="mt-10 space-y-8 text-sm leading-relaxed text-ringside-black/80"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            1. What Are Cookies
          </h2>
          <p>
            Cookies are small text files that are stored on your device
            (computer, tablet, or mobile phone) when you visit a website. They
            allow the website to recognize your device and remember information
            about your visit, such as your preferences and login status.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            2. How HandlerHub Uses Cookies
          </h2>
          <p>HandlerHub uses cookies for the following purposes:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong>Essential cookies:</strong> These are required for the
              platform to function. They keep you logged in, maintain your
              session, and enable core features like messaging and service
              requests. Without these cookies, HandlerHub cannot operate
              properly.
            </li>
            <li>
              <strong>Authentication cookies:</strong> When you sign in via
              Google OAuth, email/password, or magic link, cookies are used to
              maintain your authenticated session so you do not need to sign in
              on every page.
            </li>
            <li>
              <strong>Analytics cookies:</strong> We use Google Analytics (GA4)
              to understand how visitors use HandlerHub, including which pages
              are visited, how long users spend on the site, and general traffic
              patterns. This data helps us improve the platform.
            </li>
            <li>
              <strong>Marketing cookies:</strong> We use Meta Pixel to measure
              the effectiveness of any advertising campaigns and to understand
              how users arrive at HandlerHub. This cookie may track interactions
              across other websites that participate in Meta&apos;s advertising
              network.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            3. Third-Party Cookies
          </h2>
          <p>
            Some cookies on HandlerHub are set by third-party services that
            appear on our pages. We do not control these cookies. The
            third-party services we use include:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong>Google Analytics (GA4):</strong> Collects anonymized usage
              data to help us understand traffic patterns and user behavior.
              Google&apos;s privacy policy applies to data collected through
              this service.
            </li>
            <li>
              <strong>Meta Pixel:</strong> Tracks conversions and advertising
              performance. Meta&apos;s data policy applies to data collected
              through this service.
            </li>
            <li>
              <strong>Stripe:</strong> When you interact with payment features,
              Stripe may set cookies related to fraud prevention and payment
              processing. Stripe&apos;s privacy policy applies to data collected
              through their service.
            </li>
            <li>
              <strong>Supabase:</strong> Our authentication provider may set
              cookies to manage your login session securely.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            4. Managing Your Cookie Preferences
          </h2>
          <p>
            You can control and manage cookies through your browser settings.
            Most browsers allow you to:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>View what cookies are stored on your device</li>
            <li>Delete cookies individually or in bulk</li>
            <li>Block cookies from specific or all websites</li>
            <li>
              Block third-party cookies while allowing first-party cookies
            </li>
          </ul>
          <p className="mt-3">
            Please note that disabling essential or authentication cookies will
            prevent you from signing in and using core features of HandlerHub.
            Disabling analytics and marketing cookies will not affect your
            ability to use the platform.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            5. Cookie Retention
          </h2>
          <p>Cookies have varying lifespans depending on their purpose:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong>Session cookies:</strong> These are temporary and are
              deleted when you close your browser.
            </li>
            <li>
              <strong>Persistent cookies:</strong> These remain on your device
              for a set period (typically between 30 days and 2 years, depending
              on the cookie) or until you delete them manually.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            6. Your Rights Under PIPEDA and GDPR
          </h2>
          <p>
            HandlerHub is operated from Victoria, British Columbia, Canada. We
            comply with the Personal Information Protection and Electronic
            Documents Act (PIPEDA) for Canadian users and the General Data
            Protection Regulation (GDPR) for users in the European Economic
            Area.
          </p>
          <p className="mt-3">
            Under these regulations, you have the right to know what data is
            being collected through cookies, to withdraw consent for
            non-essential cookies at any time, and to request deletion of data
            collected through cookies. For more information about how we handle
            your personal data, please see our{' '}
            <Link
              href="/legal/privacy-policy"
              className="text-paddock-green underline hover:text-forest"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            7. Changes to This Policy
          </h2>
          <p>
            We may update this Cookie Policy from time to time to reflect
            changes in the cookies we use or for legal, operational, or
            regulatory reasons. If we make significant changes, we will notify
            users through the platform. Continued use of HandlerHub after
            changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            8. Contact
          </h2>
          <p>
            If you have questions about our use of cookies, please contact us
            {/* TODO: contact@handlerhub.com is a placeholder email - revisit when real email is set up */}{' '}
            at{' '}
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
