'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ZigZagWave from './ZigZagWave';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-[#223d71]/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#223d71]/10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/images/problem-lab-logo.png"
                alt="Problem Lab logo"
                width={480}
                height={368}
                className="h-9 w-auto"
              />
              <span className="text-xl font-bold tracking-tight text-[#223d71]">
                Problem Lab
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#223d71]/70 max-w-sm leading-relaxed">
              Issue · Idea · Innovation. Bridging high-impact problem spaces with scalable scientific and market breakthroughs.
            </p>

            <div className="pt-1">
              <ZigZagWave width={150} height={32} color="#7f9af4" secondaryColor="#ffba56" />
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#223d71] mb-3">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#223d71]/75">
              <li>
                <Link href="#issue" className="hover:text-[#223d71] hover:underline transition-colors">
                  Issue Analysis
                </Link>
              </li>
              <li>
                <Link href="#idea" className="hover:text-[#223d71] hover:underline transition-colors">
                  Idea Generation
                </Link>
              </li>
              <li>
                <Link href="#innovation" className="hover:text-[#223d71] hover:underline transition-colors">
                  Innovation
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-[#223d71] hover:underline transition-colors">
                  Intake &amp; Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* GitHub Asset Architecture Note */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#223d71] mb-3">
              Media Architecture
            </h4>
            <p className="text-xs text-[#223d71]/70 leading-relaxed">
              Every asset hook is mapped directly to:
            </p>
            <code className="block mt-1.5 p-2 rounded-lg bg-[#223d71]/5 text-[#223d71] font-mono text-[11px] break-all border border-[#223d71]/10">
              /assets/images/[name].png
            </code>
            <p className="mt-2 text-[11px] text-[#223d71]/60">
              Hot-swappable on GitHub without altering layout code.
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#223d71]/60">
          <p>© {new Date().getFullYear()} Problem Lab. All rights reserved.</p>

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
