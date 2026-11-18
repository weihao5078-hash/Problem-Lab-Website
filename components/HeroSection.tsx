'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { PenLine } from 'lucide-react';

const ANIMATION_SRC = '/assets/aistudio/problem-lab-animation2__1__9fdfd872.html';

export default function HeroSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);

  // The iframe can finish loading before React hydrates and attaches onLoad, so check once on mount too.
  useEffect(() => {
    try {
      const win = iframeRef.current?.contentWindow;
      if (win && win.location.href !== 'about:blank' && win.document.readyState === 'complete') setLoaded(true);
    } catch {
      /* cross-origin: rely on onLoad */
    }
  }, []);

  return (
    <section aria-labelledby="hero-title" className="border-b border-rule">
      {/* Ledge: the animation fills the screen above, the claim and the action rest at its base.
          On phones the animation takes about half the screen so the claim and button stay in view. */}
      <div className="wrap grid md:min-h-[calc(100svh-5rem)] md:grid-rows-[minmax(15rem,1fr)_auto] gap-8 pt-6 pb-10 md:pb-12">
        <div className="relative h-[50svh] md:h-auto min-h-60 overflow-hidden rounded-card bg-paper outline outline-1 -outline-offset-1 outline-ink/10">
          {/* Static fallback: shown until the animation loads, and stays if it never does (blocked, no JS, error).
              Hidden from assistive tech once the animation is there, so the logo isn't announced twice. */}
          <div
            aria-hidden={loaded || undefined}
            className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: 'url(/assets/images/hero-fallback-bg.jpg)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/hero-fallback-logo.png"
              alt="Problem Lab — Issue 2 Idea"
              width={1000}
              height={1000}
              className="h-[70%] w-auto max-w-[85%] object-contain"
            />
          </div>

          <iframe
            ref={iframeRef}
            src={ANIMATION_SRC}
            title="Problem Lab Hero Animation - Issue 2 Idea"
            aria-label="Problem Lab interactive hero animation transforming Issue, Idea, Innovation into the Problem Lab logo"
            onLoad={() => setLoaded(true)}
            className={`absolute inset-0 w-full h-full border-0 select-none block focus:outline-2 focus:outline-focus focus:-outline-offset-4 transition-opacity duration-500 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="eager"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6 items-end">
          <h1 id="hero-title" className="lg:col-span-7">
            We start with the problem
          </h1>
          <div className="lg:col-span-5 flex flex-col gap-6">
            <p className="lead">
              Organisations bring us a real problem. SUTD students research and frame it, then match it with the
              builders best placed to solve it.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/#contact" className="btn-primary">
                <PenLine className="w-5 h-5 shrink-0 text-accent-3" aria-hidden="true" />
                Submit a Problem
              </Link>
              <Link
                href="/#innovation"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-ink/25 px-6 font-bold text-ink transition-colors duration-150 hover:border-ink hover:bg-paper-3 active:translate-y-px"
              >
                How it works
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
