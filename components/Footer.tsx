'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ZigZagWave from './ZigZagWave';
import { ArrowUp, ExternalLink, Mail, MapPin } from 'lucide-react';
import { site } from '@/lib/site';

const exploreLinks = [
  { label: 'How we research', href: '/#issue' },
  { label: 'Tiers', href: '/#innovation' },
  { label: 'What you get', href: '/#partnering' },
  { label: 'Submit a Problem', href: '/#contact' },
];

const externalLinks = [
  { label: 'Previous projects', href: site.links.previousProjects },
  { label: 'GitHub', href: site.links.github },
].filter((l) => l.href);

const linkClass = 'hover:text-ink hover:underline transition-colors duration-150';

export default function Footer() {
  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <footer className="bg-paper pt-24 pb-12">
      <div className="wrap">
        {/* Mast: the wordmark set large over the links */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-12 border-b border-rule">
          <div className="flex items-center gap-5">
            <Image
              src="/assets/images/problem-lab-logo.png"
              alt="Problem Lab logo"
              width={480}
              height={368}
              className="h-16 md:h-20 w-auto"
            />
            <div>
              <div className="text-display-s font-bold tracking-tight text-ink leading-none">{site.name}</div>
              <div className="mt-2 text-lg font-bold text-accent-2-ink">{site.tagline}</div>
            </div>
          </div>
          <ZigZagWave width={150} height={32} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-b border-rule">
          {/* About */}
          <div className="space-y-2">
            <h2 className="text-base font-bold text-ink mb-3">About</h2>
            <p className="text-sm text-muted max-w-xs">
              Problem Lab is a student-led research collective based in SUTD. We find, investigate and frame
              real-world problems, then connect them with the builders best placed to solve them.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h2 className="text-base font-bold text-ink mb-3">Explore</h2>
            <ul className="space-y-2 text-sm text-muted">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-base font-bold text-ink mb-3">Contact</h2>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-accent-2-ink" aria-hidden="true" />
                {site.emailVerified ? (
                  <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
                    {site.email}
                  </a>
                ) : (
                  <span className="break-all">{site.email}</span>
                )}
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent-2-ink" aria-hidden="true" />
                <address className="not-italic leading-relaxed">
                  {site.address.org}
                  <br />
                  {site.address.lines.join(', ')}
                </address>
              </li>
            </ul>
          </div>

          {/* Projects, socials, legal */}
          <div>
            <h2 className="text-base font-bold text-ink mb-3">More</h2>
            <ul className="space-y-2 text-sm text-muted">
              {externalLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-1`}>
                    {l.label}
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li>
                <Link href="/privacy" className={linkClass}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>© {new Date().getFullYear()} Problem Lab · A student-led initiative based in SUTD.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex h-11 items-center gap-2 px-4 rounded-lg border border-ink/25 text-ink transition-colors duration-150 hover:border-ink hover:bg-paper-3 active:translate-y-px"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
