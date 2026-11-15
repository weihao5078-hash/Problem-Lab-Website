'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ZigZagWave from './ZigZagWave';
import { ArrowUp, ExternalLink, Mail, MapPin } from 'lucide-react';
import { site } from '@/lib/site';

const exploreLinks = [
  { label: 'Issue', href: '/#issue' },
  { label: 'Idea', href: '/#idea' },
  { label: 'Innovation', href: '/#innovation' },
  { label: 'Partner With Us', href: '/#partnering' },
  { label: 'Submit a Problem', href: '/#contact' },
];

const externalLinks = [
  { label: 'Previous projects', href: site.links.previousProjects },
  { label: 'GitHub', href: site.links.github },
].filter((l) => l.href);

const linkClass = 'hover:text-[#223d71] hover:underline transition-colors';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-[#223d71]/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-10 border-b border-[#223d71]/10">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/images/problem-lab-logo.png"
              alt="Problem Lab logo"
              width={480}
              height={368}
              className="h-10 w-auto"
            />
            <div>
              <div className="text-xl font-bold tracking-tight text-[#223d71] leading-none">{site.name}</div>
              <div className="mt-1 text-sm text-[#7f9af4] font-semibold tracking-wide">{site.tagline}</div>
            </div>
          </div>
          <ZigZagWave width={150} height={32} color="#7f9af4" secondaryColor="#ffba56" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 py-10 border-b border-[#223d71]/10">
          {/* About */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#223d71] mb-3">About</h2>
            <p className="text-xs sm:text-sm text-[#223d71]/75 leading-relaxed max-w-xs">
              Problem Lab is a student-led research collective based in SUTD. We find, investigate and frame
              real-world problems, then connect them with the builders best placed to solve them.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#223d71] mb-3">Explore</h2>
            <ul className="space-y-2 text-xs sm:text-sm text-[#223d71]/75">
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#223d71] mb-3">Contact</h2>
            <ul className="space-y-3 text-xs sm:text-sm text-[#223d71]/75">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[#7f9af4]" />
                {site.emailVerified ? (
                  <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
                    {site.email}
                  </a>
                ) : (
                  <span className="break-all">{site.email}</span>
                )}
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#7f9af4]" />
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#223d71] mb-3">More</h2>
            <ul className="space-y-2 text-xs sm:text-sm text-[#223d71]/75">
              {externalLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-1`}>
                    {l.label}
                    <ExternalLink className="w-3 h-3" />
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#223d71]/60">
          <p>© {new Date().getFullYear()} Problem Lab · A student-led initiative based in SUTD.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#223d71]/15 hover:bg-[#7f9af4]/10 text-[#223d71] transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
