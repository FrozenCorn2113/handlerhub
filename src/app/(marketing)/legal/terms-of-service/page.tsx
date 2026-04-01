/* eslint-disable tailwindcss/classnames-order */
import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service | HandlerHub',
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-12">
      <h1
        className="text-4xl font-light tracking-tight text-ringside-black md:text-5xl"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-warm-gray">Last updated: April 1, 2026</p>

      <div
        className="mt-10 space-y-8 text-sm leading-relaxed text-ringside-black/80"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            1. About HandlerHub
          </h2>
          <p>
            HandlerHub is an online platform operated from Victoria, British
            Columbia, Canada that connects dog show exhibitors with professional
            handlers, groomers, transporters, and other show professionals. We
            provide a directory, request board, and messaging tools to help
            users find and communicate with each other. By accessing or using
            HandlerHub at{' '}
            <a
              href="https://handlerhub.com"
              className="text-paddock-green underline hover:text-forest"
            >
              https://handlerhub.com
            </a>
            , you agree to be bound by these Terms of Service.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            2. Eligibility
          </h2>
          <p>
            You must be at least 13 years of age to use HandlerHub. By creating
            an account, you represent that you meet this requirement and that
            all information you provide is accurate and complete.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            3. User Accounts
          </h2>
          <p>
            You must create an account to post requests, respond to requests, or
            send messages. You can sign up using Google OAuth, email and
            password, or magic link. You are responsible for maintaining the
            security of your account credentials and for all activity that
            occurs under your account. You agree to provide accurate information
            in your profile and to keep it up to date.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            4. Platform Services and Fees
          </h2>
          <p>
            HandlerHub offers both free and paid features. Certain features may
            require a paid subscription or one-time payment, processed securely
            through Stripe. All pricing will be clearly displayed before any
            purchase. HandlerHub does not process payments between exhibitors
            and handlers for services arranged through the platform. All
            financial arrangements for handling services are made directly
            between the parties involved.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            5. Payments and Refunds
          </h2>
          <p>
            Payments for HandlerHub subscriptions or features are processed by
            Stripe. By making a purchase, you agree to Stripe&apos;s terms of
            service. Subscription details, billing cycles, and refund policies
            will be communicated at the time of purchase. If you have questions
            about a charge, please contact us at{' '}
            {/* TODO: contact@handlerhub.com is a placeholder email - revisit when real email is set up */}
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
            6. User Content
          </h2>
          <p>
            You retain ownership of the content you post on HandlerHub,
            including profile information, photos, requests, and messages. By
            posting content, you grant HandlerHub a non-exclusive, royalty-free
            license to display that content on the platform for the purpose of
            operating the service. You agree not to post content that is false,
            misleading, abusive, defamatory, or in violation of any applicable
            laws.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            7. Prohibited Conduct
          </h2>
          <p>When using HandlerHub, you agree not to:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              Impersonate another person or misrepresent your qualifications
            </li>
            <li>Post false, misleading, or fraudulent information</li>
            <li>Harass, threaten, or abuse other users</li>
            <li>
              Use the platform for any purpose unrelated to dog show services
            </li>
            <li>
              Attempt to access other users&apos; accounts or private data
            </li>
            <li>
              Scrape, crawl, or use automated tools to collect data from
              HandlerHub without permission
            </li>
            <li>
              Interfere with or disrupt the platform&apos;s operation or
              security
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            8. Profile and Content Removal
          </h2>
          <p>
            HandlerHub reserves the right to remove, suspend, or modify any user
            profile, request, or content that violates these terms or that we
            determine is harmful to the community. We may also remove inactive
            profiles at our discretion. We will make reasonable efforts to
            notify affected users, but are not obligated to do so in cases of
            serious violations.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            9. Animal Liability Disclaimer
          </h2>
          <p>
            HandlerHub is a connection platform only. HandlerHub is not a party
            to any agreement between exhibitors and handlers, and is not
            responsible for handler-dog interactions, outcomes at dog shows,
            injuries, or any incidents that occur between users or their
            animals. All arrangements made through HandlerHub are between the
            exhibitor and the handler. Users are responsible for conducting
            their own due diligence before entering into any service agreement.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            10. Limitation of Liability
          </h2>
          <p>
            HandlerHub is provided &quot;as is&quot; and &quot;as
            available&quot; without warranties of any kind, whether express or
            implied. We do not guarantee the accuracy of user profiles, the
            quality of services offered by handlers, or the outcome of any
            arrangement made through the platform. To the fullest extent
            permitted by law, HandlerHub shall not be liable for any direct,
            indirect, incidental, special, or consequential damages arising from
            your use of the platform.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            11. Indemnification
          </h2>
          <p>
            You agree to indemnify and hold harmless HandlerHub, its operators,
            and affiliates from any claims, damages, losses, or expenses
            (including legal fees) arising from your use of the platform, your
            violation of these terms, or your interactions with other users.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            12. Privacy
          </h2>
          <p>
            Your use of HandlerHub is also governed by our{' '}
            <Link
              href="/legal/privacy-policy"
              className="text-paddock-green underline hover:text-forest"
            >
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link
              href="/legal/cookies-policy"
              className="text-paddock-green underline hover:text-forest"
            >
              Cookie Policy
            </Link>
            , which describe how we collect, use, and protect your personal
            information.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            13. Governing Law and Jurisdiction
          </h2>
          <p>
            These terms are governed by and construed in accordance with the
            laws of the Province of British Columbia and the federal laws of
            Canada applicable therein. Any disputes arising from these terms or
            your use of HandlerHub will be subject to the exclusive jurisdiction
            of the courts of British Columbia, Canada.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            14. Termination
          </h2>
          <p>
            We may suspend or terminate your access to HandlerHub at any time
            for violation of these terms or for any other reason at our
            discretion. You may delete your account at any time. Upon
            termination, your right to use the platform ceases immediately,
            though provisions that by their nature should survive (such as
            limitation of liability and indemnification) will remain in effect.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            15. Changes to These Terms
          </h2>
          <p>
            We may update these terms from time to time. If we make significant
            changes, we will notify users through the platform. Continued use of
            HandlerHub after changes constitutes acceptance of the updated
            terms.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            16. Contact
          </h2>
          <p>
            If you have questions about these terms, please contact us at{' '}
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
