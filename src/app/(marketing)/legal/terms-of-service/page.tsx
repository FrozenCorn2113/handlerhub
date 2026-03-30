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
      <p className="mt-2 text-sm text-warm-gray">
        Last updated: March 28, 2026
      </p>

      <div
        className="mt-10 space-y-8 text-sm leading-relaxed text-ringside-black/80"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            1. About HandlerHub
          </h2>
          <p>
            HandlerHub is a free online platform that connects dog show
            exhibitors with professional handlers, groomers, transporters, and
            other show professionals. We provide a directory, request board, and
            messaging tools to help users find and communicate with each other.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            2. Free Platform
          </h2>
          <p>
            HandlerHub is free to use for both exhibitors and handlers. There
            are no subscription fees, listing fees, or platform charges at this
            time. HandlerHub does not process payments between users. All
            financial arrangements, including fees and payment terms, are made
            directly between exhibitors and handlers.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            3. User Accounts
          </h2>
          <p>
            You must create an account to post requests, respond to requests, or
            send messages. You are responsible for maintaining the security of
            your account credentials. You agree to provide accurate information
            in your profile.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            4. User Content
          </h2>
          <p>
            You retain ownership of the content you post on HandlerHub,
            including profile information, requests, and messages. By posting
            content, you grant HandlerHub a non-exclusive license to display
            that content on the platform. You agree not to post content that is
            false, misleading, abusive, or in violation of any applicable laws.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            5. Profile and Request Removal
          </h2>
          <p>
            HandlerHub reserves the right to remove, suspend, or modify any user
            profile, request, or content that violates these terms or that we
            determine is harmful to the community. We may also remove inactive
            profiles at our discretion.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            6. Animal Liability Disclaimer
          </h2>
          <p>
            HandlerHub is a connection platform only. HandlerHub is not
            responsible for handler-dog interactions, outcomes at dog shows,
            injuries, or any incidents that occur between users or their
            animals. All arrangements made through HandlerHub are between the
            exhibitor and the handler. Users are responsible for conducting
            their own due diligence before entering into any service agreement.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            7. Limitation of Liability
          </h2>
          <p>
            HandlerHub is provided &quot;as is&quot; without warranties of any
            kind. We do not guarantee the accuracy of user profiles, the quality
            of services, or the outcome of any arrangement made through the
            platform. HandlerHub shall not be liable for any direct, indirect,
            incidental, or consequential damages arising from your use of the
            platform.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            8. Jurisdiction
          </h2>
          <p>
            These terms are governed by the laws of the United States and
            Canada, as applicable to the user&apos;s location. Any disputes
            arising from these terms or your use of HandlerHub will be resolved
            in the courts of the applicable jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ringside-black">
            9. Changes to These Terms
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
            10. Contact
          </h2>
          <p>
            If you have questions about these terms, please{' '}
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
  )
}
