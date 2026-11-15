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
        <p>When you submit a problem or contact us, we collect what you enter in the form, for example:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>your name, email address and organisation (optional for general issues);</li>
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
      </>
    ),
  },
  {
    heading: 'Publishing project outcomes',
    body: (
      <p>
        For general issues, we may publish the outcome on our website, socials or GitHub without identifying you.
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
    <div className="min-h-screen flex flex-col bg-white text-[#223d71]">
      <Navbar />
      <main className="flex-1 w-full py-16 md:py-24">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-sm text-[#223d71]/60">Last updated: November 2026</p>
          <div className="mt-10 space-y-8">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-lg font-bold">{s.heading}</h2>
                <div className="mt-2 space-y-3 text-sm sm:text-base text-[#223d71]/80 leading-relaxed">{s.body}</div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
