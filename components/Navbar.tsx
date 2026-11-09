'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowUpRight, PenLine } from 'lucide-react';
import ZigZagWave from './ZigZagWave';

const navLinks = [
  { label: 'Issue', href: '#issue' },
  { label: 'Idea', href: '#idea' },
  { label: 'Innovation', href: '#innovation' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#223d71]/10 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Brand Logo */}
          <Link
            href="#"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7f9af4] rounded-lg p-1"
          >
            {/* Brand Logo Mark */}
            <Image
              src="/assets/images/problem-lab-logo.png"
              alt="Problem Lab logo"
              width={480}
              height={368}
              priority
              className="h-10 w-auto"
            />
            
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#223d71] leading-none">
                Problem Lab
              </span>
              <span className="text-xs italic text-[#7f9af4] font-medium tracking-wide mt-0.5">
                Issue 2 Idea
              </span>
            </div>
          </Link>

          {/* Desktop Nav - Matching Sketch Wireframe with Dividers & Wave Accents */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link, idx) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className="px-3.5 py-2 text-base font-semibold text-[#223d71]/80 hover:text-[#223d71] hover:bg-[#7f9af4]/10 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  {link.label}
                </Link>
                {idx < navLinks.length - 1 && (
                  <span className="text-[#223d71]/25 select-none font-light px-1">|</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#223d71] hover:bg-[#2c4d8e] active:scale-98 rounded-xl shadow-xs transition-all duration-150 gap-2 border border-[#223d71]"
            >
              <PenLine className="w-4 h-4 text-[#ffba56]" />
              <span>Submit Issue</span>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#223d71] hover:bg-[#7f9af4]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#7f9af4]"
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
        <div className="lg:hidden bg-white border-b border-[#223d71]/15 px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-base font-semibold text-[#223d71] hover:bg-[#7f9af4]/10 rounded-xl transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#7f9af4]" />
              </Link>
            ))}

            <div className="pt-3 border-t border-[#223d71]/10 flex flex-col gap-3">
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 text-sm font-bold text-white bg-[#223d71] hover:bg-[#2c4d8e] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <PenLine className="w-4 h-4 text-[#ffba56]" />
                Submit a Problem Statement
              </Link>
              <div className="flex justify-center pt-1">
                <ZigZagWave width={140} height={32} color="#7f9af4" secondaryColor="#ffba56" />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
