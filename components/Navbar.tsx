'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, PenLine } from 'lucide-react';
import ZigZagWave from './ZigZagWave';

// Destinations, not brand words: the brand words stay as the section headings.
const navLinks = [
  { label: 'How we research', href: '/#issue' },
  { label: 'Tiers', href: '/#innovation' },
  { label: 'What you get', href: '/#partnering' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[300] w-full bg-paper border-b border-rule">
      <div className="wrap">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand Logo */}
          <Link href="/" aria-label="Problem Lab, home" className="flex items-center gap-3 rounded-lg p-1">
            <Image
              src="/assets/images/problem-lab-logo.png"
              alt=""
              width={480}
              height={368}
              className="h-10 w-auto"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-ink leading-none whitespace-nowrap">Problem Lab</span>
              <span className="mt-1 text-sm italic text-accent-2-ink leading-none">Issue 2 Idea</span>
            </div>
          </Link>

          {/* Desktop nav: three destinations, parted by rules */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link, idx) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-lg px-4 py-2 font-bold text-muted transition-colors duration-150 hover:text-ink hover:bg-paper-3"
                >
                  {link.label}
                </Link>
                {idx < navLinks.length - 1 && (
                  <span className="h-5 w-px bg-rule" aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Stays visible on phones, shortened to "Submit" */}
            <Link href="/#contact" className="btn-primary h-11 px-4 text-sm">
              <PenLine className="w-4 h-4 text-accent-3" aria-hidden="true" />
              <span>
                Submit<span className="hidden sm:inline"> a Problem</span>
              </span>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink transition-colors duration-150 hover:bg-paper-3"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-paper border-t border-rule pt-3 pb-6">
          <div className="wrap flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-lg font-bold text-ink transition-colors duration-150 hover:bg-paper-3"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-2 pt-4 border-t border-rule flex flex-col gap-4">
              <div className="flex justify-center pt-1">
                <ZigZagWave width={140} height={32} />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
