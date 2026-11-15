'use client';

import { useEffect, useRef, useState } from 'react';

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
    <section className="relative w-full overflow-hidden bg-white border-b border-[#223d71]/10">
      <div className="relative w-full h-[78vh] min-h-[540px] max-h-[820px] bg-white">
        {/* Static fallback: shown until the animation loads, and stays if it never does (blocked, no JS, error). */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-white bg-cover bg-center"
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
          className={`absolute inset-0 w-full h-full border-0 select-none block transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="eager"
        />

        {/* Ambient subtle gradient overlay for seamless blending */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
