import { Mail, MapPin } from 'lucide-react';
import { site } from '@/lib/site';
import ContactForm from '@/components/ContactForm';

export default function ContactSection() {
  return (
    <section id="contact" className="bg-ink text-on-ink py-(--section-gap-s)">
      <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12">
        {/* Left: heading, blurb and contact details. The gold focus ring reads on the navy band. */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start flex flex-col items-start [--color-focus:var(--color-accent-3)]">
          <h2>Submit a Problem</h2>
          <p className="lead mt-6 text-on-ink-muted">
            Have an unaddressed industry problem, a challenge you want properly investigated, or an organisation ready
            to partner with Problem Lab? Share the details and our team will be in touch.
          </p>

          <div className="mt-10 flex flex-col gap-4 border-t border-on-ink/20 pt-8 text-on-ink-muted">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-accent-2 shrink-0" aria-hidden="true" />
              {site.emailVerified ? (
                <a href={`mailto:${site.email}`} className="font-bold text-on-ink hover:underline">
                  {site.email}
                </a>
              ) : (
                <span className="font-bold text-on-ink">{site.email}</span>
              )}
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-0.5 text-accent-2 shrink-0" aria-hidden="true" />
              <address className="not-italic">
                {site.address.org}
                <br />
                {site.address.lines.join(', ')}
              </address>
            </div>
          </div>
        </div>

        {/* Right: custom intake form, sent to HubSpot */}
        <div className="lg:col-start-7 lg:col-span-6 rounded-card bg-paper text-ink p-6 sm:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
