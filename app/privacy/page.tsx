import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy — Problem Lab',
  description: 'How Problem Lab collects, uses and protects the information you share with us.',
};

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: 'Who we are',
    body: (
      <p>
        Problem Lab is a student-led initiative at the Singapore University of Technology and Design (SUTD). This
        policy explains what we do with the information you give us through this website.
      </p>
    ),
  },
  {
    heading: 'What we collect',
    body: (
      <>
        <p>
          If you choose &ldquo;Just share a problem&rdquo;, we collect only the description you write. We do not ask
          who you are, and we do not pass your IP address or cookies on to HubSpot with it.
        </p>
        <p>If you choose &ldquo;Work with us&rdquo;, we collect what you enter in the form:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>your name, email address and organisation, and, if you choose, your phone number and job title;</li>
          <li>a description of the issue and any details you choose to share.</li>
        </ul>
      </>
    ),
  },
  {
    heading: 'How we use it',
    body: (
      <ul className="list-disc pl-5 space-y-1">
        <li>to understand your issue and reply to you;</li>
        <li>to match your project with suitable student developers and builders;</li>
        <li>to coordinate consultations, interviews and feedback during the engagement.</li>
      </ul>
    ),
  },
  {
    heading: 'Who we share it with',
    body: (
      <>
        <p>
          We share project details only with the Problem Lab team and the students working on your project. We do
          not sell your information.
        </p>
        <p>
          Our forms are provided by HubSpot, which stores submissions on our behalf. Your use of the form is also
          subject to HubSpot&apos;s privacy policy.
        </p>
        <p>
          To keep out spam, the form uses Cloudflare Turnstile, which checks that a real person is submitting it.
          This check is subject to Cloudflare&apos;s privacy policy.
        </p>
      </>
    ),
  },
  {
    heading: 'Publishing project outcomes',
    body: (
      <p>
        For problems shared without contact details, we may publish the problem and its outcome on our website,
        socials or GitHub.
        For partner projects, you decide whether the final work can be made public; we will not publish it without
        your agreement.
      </p>
    ),
  },
  {
    heading: 'How long we keep it',
    body: (
      <p>
        We keep your information for as long as needed to run the engagement and follow up on it, and delete it when
        it is no longer needed or when you ask us to.
      </p>
    ),
  },
  {
    heading: 'Your choices',
    body: (
      <p>
        You can ask us to access, correct or delete the information you have given us at any time by contacting us at{' '}
        {site.emailVerified ? (
          <a href={`mailto:${site.email}`} className="font-semibold underline">
            {site.email}
          </a>
        ) : (
          <span className="font-semibold">{site.email}</span>
        )}
        . We handle personal data in line with Singapore&apos;s Personal Data Protection Act (PDPA).
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full pt-24 pb-(--section-gap)">
        <article className="wrap">
          <header className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-4 items-end pb-16 border-b border-rule">
            <h1 className="lg:col-span-8">Privacy Policy</h1>
            <p className="lg:col-span-4 lg:text-right text-muted">Last updated: November 2026</p>
          </header>
          {/* Long document: each heading sits in the margin beside its text */}
          {sections.map((s) => (
            <section
              key={s.heading}
              className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-3 border-b border-rule py-10"
            >
              <h2 className="lg:col-span-4 text-title">{s.heading}</h2>
              <div className="lg:col-span-8 space-y-3 text-lg text-ink leading-relaxed max-w-[65ch]">{s.body}</div>
            </section>
          ))}
        </article>
      </main>
      <Footer />
    </div>
  );
}
