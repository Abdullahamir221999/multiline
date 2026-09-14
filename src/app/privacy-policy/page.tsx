import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Multiline Engineering Co.',
  description:
    'How Multiline Engineering Co. collects, uses and protects personal information '
    + 'submitted through our website and WhatsApp service.',
};

const UPDATED = '13 September 2026';

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: {UPDATED}</p>

      <div className="mt-10 space-y-8 text-gray-700 leading-relaxed">
        <section>
          <p>
            Multiline Engineering Co. (&ldquo;Multiline&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;) provides power infrastructure, solar energy and EV
            charging products and services in Pakistan. This policy explains what
            personal information we collect when you contact us, why we collect it,
            and what rights you have over it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            Information we collect
          </h2>
          <p className="mt-3">
            When you contact us through our WhatsApp business number or the forms on
            our website, we may collect:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>Your name</li>
            <li>Your WhatsApp or telephone number</li>
            <li>Your address and city</li>
            <li>Your vehicle make, where relevant to an EV charging enquiry</li>
            <li>
              A location pin, if you choose to share one so that our engineers can
              locate an installation site
            </li>
            <li>
              Details of any product you own and any fault you report to us
            </li>
            <li>The content of messages you send us</li>
          </ul>
          <p className="mt-3">
            Sharing a location pin is optional. You can decline and still complete
            an enquiry.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            How we use this information
          </h2>
          <p className="mt-3">We use the information you provide to:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>Respond to your enquiry and contact you about it</li>
            <li>Recommend and quote for suitable products</li>
            <li>Arrange site visits and installations</li>
            <li>Investigate and resolve faults you report</li>
            <li>Keep a record of our dealings with you</li>
          </ul>
          <p className="mt-3">
            We do not sell your information, and we do not use it for advertising.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            Automated messaging
          </h2>
          <p className="mt-3">
            Our WhatsApp business number uses an automated system to collect the
            details of your enquiry or complaint. A member of our team then contacts
            you directly, usually by telephone. Messages sent to this number are
            handled through the WhatsApp Business Platform, which is operated by
            Meta and subject to Meta&rsquo;s own privacy terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            Where your information is held
          </h2>
          <p className="mt-3">
            Enquiries and complaints are stored in a secured database and in internal
            records accessible to authorised Multiline staff. We use third-party
            service providers to host this data. We take reasonable measures to
            protect it against unauthorised access, but no system can be guaranteed
            entirely secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            Sharing your information
          </h2>
          <p className="mt-3">
            We share your information only with our own staff and with contractors
            engaged to carry out work for you, and where we are required to do so by
            law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            How long we keep it
          </h2>
          <p className="mt-3">
            We retain your information for as long as is necessary to provide our
            services, to meet our legal and accounting obligations, and to resolve
            any disputes. You may ask us to delete it sooner.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Your choices</h2>
          <p className="mt-3">You may contact us at any time to:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>Ask what information we hold about you</li>
            <li>Ask us to correct anything that is inaccurate</li>
            <li>Ask us to delete your information</li>
            <li>Ask us to stop contacting you</li>
          </ul>
          <p className="mt-3">
            You can also stop messaging our WhatsApp number at any time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Children</h2>
          <p className="mt-3">
            Our services are intended for adults. We do not knowingly collect
            information from children.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            Changes to this policy
          </h2>
          <p className="mt-3">
            We may update this policy from time to time. The date at the top of this
            page shows when it was last revised.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Contact us</h2>
          <p className="mt-3">
            For any question about this policy, or to make any of the requests above,
            write to us at{' '}
            <a
              href="mailto:info@multiline.com.pk"
              className="font-medium text-blue-700 underline underline-offset-2"
            >
              info@multiline.com.pk
            </a>
            .
          </p>
          <p className="mt-3">
            Multiline Engineering Co.
            <br />
            3-A 1, Off Airport Road, Opposite Toyota Airport Motors,
            <br />
            Lahore Cantt, 54810, Pakistan
          </p>
        </section>
      </div>
    </main>
  );
}