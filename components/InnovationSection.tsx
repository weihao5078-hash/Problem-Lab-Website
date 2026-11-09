'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  CheckCircle2,
  Globe,
  MessagesSquare,
  PenLine,
  Code2,
  ExternalLink,
  Users,
  BadgeCheck,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Process data                                                        */
/* ------------------------------------------------------------------ */

type StepNo = 4 | 5 | 6;

interface Cell {
  path?: string; // e.g. "Domain experts", "Both paths"
  note?: string; // lead-in sentence above the items
  items?: React.ReactNode[];
  done?: boolean; // this path finishes here
  spacer?: boolean; // keeps paths aligned when one path has nothing at this step
  highlight?: boolean; // final deliverable
}

interface Tier {
  key: string;
  name: string;
  title: string;
  summary: string;
  accent: string; // hex colour used for the tier's badge and rail
  steps?: Record<StepNo, Cell[]>; // Tier 0 has no steps
}

const SUTD_CLUBS_URL = 'https://root.sutd.edu.sg/student-life/stu-org-directory';

const sutdClubsItem = (
  <div className="space-y-1.5">
    <div className="font-semibold">SUTD student clubs</div>
    <p className="text-xs text-[#223d71]/75 leading-relaxed">
      Student-run clubs and interest groups at SUTD. Browse the directory to see which groups fit your project;
      their members can take it on as a club initiative.
    </p>
    <a
      href={SUTD_CLUBS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 mt-1 px-3 py-1.5 rounded-lg text-xs font-bold text-[#223d71] bg-[#ffba56]/25 hover:bg-[#ffba56]/45 border border-[#ffba56] transition-colors"
    >
      <Users className="w-3.5 h-3.5" />
      Browse SUTD student clubs
      <ExternalLink className="w-3.5 h-3.5" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  </div>
);

const tiers: Tier[] = [
  {
    key: 'tier-0',
    name: 'Tier 0',
    title: 'Theme',
    summary:
      'The typical offering: a very brief theme rather than a detailed problem statement. Tiers 1–3 go further, and we agree on the right one with you at the initial consultation.',
    accent: '#c5cbd8',
  },
  {
    key: 'tier-1',
    name: 'Tier 1',
    title: 'Literature Review',
    summary: 'We review the literature on our end and deliver a 2-page report.',
    accent: '#7f9af4',
    steps: {
      4: [{ items: ['We conduct a literature review on our end'] }],
      5: [{ items: ['We prepare a 2-page report for you'] }],
      6: [{ done: true }],
    },
  },
  {
    key: 'tier-2',
    name: 'Tier 2',
    title: 'Asynchronous',
    summary: 'Asynchronous link-up with relevant domain experts and/or end users.',
    accent: '#223d71',
    steps: {
      4: [
        { path: 'Domain experts', items: ['We find and propose relevant domain experts'] },
        { path: 'End users', items: ['We find and propose relevant end-user groups'] },
      ],
      5: [{ path: 'Both paths', items: ['We arrange an approved communication protocol / link-up'] }],
      6: [{ done: true }],
    },
  },
  {
    key: 'tier-3',
    name: 'Tier 3',
    title: 'Interview or Ongoing Support',
    summary:
      'Either one interview, focus group (FGD) or event with experts and end users, or ongoing support where Problem Lab manages the product and acts as your point of contact.',
    accent: '#ffba56',
    steps: {
      4: [
        {
          path: 'Interview / FGD',
          items: [
            'We help coordinate a domain expert / end-user appearance at one event, interview or focus group discussion',
          ],
        },
        {
          path: 'Ongoing support',
          items: ['We identify suitable SUTD students to work with and create a proposal'],
        },
      ],
      5: [
        { path: 'Interview / FGD', done: true },
        {
          path: 'Ongoing support',
          note: 'Development through the channels below, with Problem Lab managing the product and acting as your point of contact for ongoing clarification:',
          items: [
            'SUTD students completing school projects or programmes',
            sutdClubsItem,
            'SUTD- or 42 Singapore-hosted hackathons',
          ],
        },
      ],
      6: [
        { spacer: true },
        { path: 'Ongoing support', items: ['Your custom software'], highlight: true },
      ],
    },
  },
];

const laterSteps: StepNo[] = [4, 5, 6];

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function StepBadge({ no, label }: { no: number; label: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="w-7 h-7 rounded-full bg-[#223d71] text-white text-xs font-bold flex items-center justify-center shrink-0">
        {no}
      </span>
      <span className="text-xs font-bold uppercase tracking-wider text-[#223d71]">{label}</span>
    </div>
  );
}

function Connector({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-3" aria-hidden="true">
      <span className="w-px h-6 bg-[#223d71]/25" />
      <ArrowDown className="w-4 h-4 text-[#223d71]/40 -mt-1" />
      {label && (
        <span className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-[#223d71]/50">{label}</span>
      )}
    </div>
  );
}

function CellView({ cell, accent }: { cell: Cell; accent: string }) {
  if (cell.spacer) return <div className="hidden md:block" />;

  if (cell.done) {
    return (
      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#223d71]/50 py-1">
        <CheckCircle2 className="w-4 h-4" />
        <span>{cell.path ? `${cell.path} complete` : 'Complete'}</span>
      </div>
    );
  }

  return (
    <div
      className={
        cell.highlight
          ? 'rounded-xl p-3 border-2 bg-[#fff8ec]'
          : 'rounded-xl p-3 bg-white border border-[#223d71]/10'
      }
      style={cell.highlight ? { borderColor: accent } : undefined}
    >
      {cell.path && (
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#223d71]/50 mb-1.5">{cell.path}</div>
      )}
      {cell.note && <p className="text-xs text-[#223d71]/75 leading-relaxed mb-2">{cell.note}</p>}
      {cell.highlight ? (
        <div className="flex items-center gap-2 text-sm font-bold text-[#223d71]">
          <Code2 className="w-4 h-4 shrink-0" style={{ color: accent }} />
          <span>{cell.items?.[0]}</span>
        </div>
      ) : (
        <ul className="space-y-2">
          {cell.items?.map((item, i) => (
            <li key={i} className="flex gap-2 text-xs sm:text-sm text-[#223d71] leading-snug">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
              <div className="min-w-0">{item}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StepCells({ cells, accent }: { cells: Cell[]; accent: string }) {
  if (cells.length === 0) return null;
  return (
    <div className={cells.length > 1 ? 'grid grid-cols-1 md:grid-cols-2 gap-2 items-start' : ''}>
      {cells.map((cell, i) => (
        <CellView key={i} cell={cell} accent={accent} />
      ))}
    </div>
  );
}

function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span
      className="px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider whitespace-nowrap shrink-0"
      style={{ backgroundColor: tier.accent, color: tier.accent === '#223d71' ? '#fff' : '#223d71' }}
    >
      {tier.name}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Tier tabs (steps 3–6)                                               */
/* ------------------------------------------------------------------ */

function TierTabs() {
  const [active, setActive] = useState(1); // open on Tier 1, the first real offering
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tier = tiers[active];

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next = index;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % tiers.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index - 1 + tiers.length) % tiers.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tiers.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <StepBadge no={3} label="Choose a tier" />

      <div role="tablist" aria-label="Tiers" className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {tiers.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={t.key}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${t.key}-tab`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${t.key}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`text-left rounded-2xl p-4 border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7f9af4] focus-visible:ring-offset-2 ${
                selected ? 'bg-white shadow-md' : 'bg-[#fafbfc] border-transparent hover:border-[#223d71]/15'
              }`}
              style={selected ? { borderColor: t.accent } : undefined}
            >
              <div className="flex flex-wrap items-center gap-2">
                <TierBadge tier={t} />
                {t.key === 'tier-0' && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#223d71]/45">
                    Typical
                  </span>
                )}
              </div>
              <div
                className={`mt-2 text-sm font-bold leading-snug ${
                  selected ? 'text-[#223d71]' : 'text-[#223d71]/70'
                }`}
              >
                {t.title}
              </div>
            </button>
          );
        })}
      </div>

      <div
        id={`${tier.key}-panel`}
        role="tabpanel"
        aria-labelledby={`${tier.key}-tab`}
        tabIndex={0}
        className="mt-4 rounded-2xl bg-[#fafbfc] border border-[#223d71]/10 border-l-4 p-5 sm:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7f9af4]"
        style={{ borderLeftColor: tier.accent }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <TierBadge tier={tier} />
          <h3 className="text-lg font-bold text-[#223d71]">{tier.title}</h3>
        </div>
        <p className="mt-2 text-sm text-[#223d71]/75 leading-relaxed max-w-3xl">{tier.summary}</p>

        {tier.steps ? (
          <ol className="mt-6 space-y-5">
            {laterSteps.map((no) => (
              <li key={no} className="grid grid-cols-1 md:grid-cols-[6.5rem_1fr] gap-2 md:gap-4">
                <div className="md:pt-2">
                  <StepBadge no={no} label={`Step ${no}`} />
                </div>
                <StepCells cells={tier.steps![no]} accent={tier.accent} />
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#223d71]/45">
            Select Tier 1, 2 or 3 to see what we deliver
          </p>
        )}
      </div>

      {/* Applies to every successful engagement, whichever tier */}
      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#7f9af4]/40 bg-[#7f9af4]/10 p-4 sm:p-5">
        <BadgeCheck className="w-5 h-5 mt-0.5 shrink-0 text-[#223d71]" />
        <p className="text-sm text-[#223d71] leading-relaxed">
          <span className="font-bold">Partner requirement:</span> for every successful engagement, at any tier, you
          provide the students involved with a LinkedIn testimonial.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function InnovationSection() {
  return (
    <section id="innovation" className="py-20 md:py-28 bg-white border-b border-[#223d71]/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7f9af4]/15 border border-[#7f9af4]/30 text-xs font-bold tracking-wider uppercase text-[#223d71] mb-4">
            How We Work
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#223d71]">Innovation</h2>
          <p className="mt-4 text-base sm:text-lg text-[#223d71]/75 leading-relaxed">
            From first contact to custom software: how an issue moves through Problem Lab.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Step 1: Make contact */}
          <StepBadge no={1} label="Make contact" />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="#contact"
              className="group rounded-2xl border border-dashed border-[#223d71]/25 bg-[#fafbfc] p-5 hover:border-[#7f9af4] transition-colors"
            >
              <div className="flex items-center gap-2 text-[#223d71]">
                <span className="text-xs font-bold text-[#223d71]/50">A</span>
                <Globe className="w-4 h-4 text-[#7f9af4]" />
                <h3 className="font-bold">Submit a General Issue</h3>
              </div>
              <p className="mt-2 text-sm text-[#223d71]/75 leading-relaxed">
                Contact details optional. We publish the outcome on our website, socials or GitHub when complete.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#223d71]/50">
                <CheckCircle2 className="w-4 h-4" />
                Flow ends here
              </div>
            </Link>

            <Link
              href="#contact"
              className="group rounded-2xl border-2 border-[#223d71] bg-white p-5 hover:bg-[#f4f7fc] transition-colors"
            >
              <div className="flex items-center gap-2 text-[#223d71]">
                <span className="text-xs font-bold text-[#223d71]/50">B</span>
                <PenLine className="w-4 h-4 text-[#ffba56]" />
                <h3 className="font-bold">Submit Your Issue</h3>
              </div>
              <p className="mt-2 text-sm text-[#223d71]/75 leading-relaxed">
                Work with us directly on your issue, from consultation through to delivery.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#223d71]">
                <ArrowDown className="w-4 h-4" />
                Continues to Step 2
              </div>
            </Link>
          </div>

          <Connector label="Path B" />

          {/* Step 2: Initial consultation */}
          <div className="rounded-2xl border border-[#223d71]/15 bg-[#f4f7fc] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <StepBadge no={2} label="Initial consultation" />
            <div className="flex items-start gap-2 sm:ml-auto sm:max-w-md">
              <MessagesSquare className="w-4 h-4 mt-0.5 text-[#7f9af4] shrink-0" />
              <p className="text-sm text-[#223d71]/80 leading-relaxed">
                We meet to understand your issue and decide together which tier fits.
              </p>
            </div>
          </div>

          <Connector />

          {/* Steps 3–6: tier tabs */}
          <TierTabs />
        </div>
      </div>
    </section>
  );
}
