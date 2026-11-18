import React from 'react';
import Link from 'next/link';
import { Code2, ExternalLink, MessagesSquare, PenLine } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Tier data                                                           */
/* ------------------------------------------------------------------ */

interface Path {
  name?: string; // e.g. "Interview / FGD"; omitted when a tier has one path
  items: React.ReactNode[];
}

interface Tier {
  key: string;
  name: string;
  title: string; // named by what the partner gets
  summary: string;
  accent: string; // colour token used for the tier's badge and border
  paths: Path[];
  result?: string; // final deliverable, shown under the steps
}

const SUTD_CLUBS_URL = 'https://root.sutd.edu.sg/student-life/stu-org-directory';

const sutdClubsLink = (
  <a
    href={SUTD_CLUBS_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:text-ink-2"
  >
    SUTD student clubs
    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
    <span className="sr-only">(opens in a new tab)</span>
  </a>
);

const tiers: Tier[] = [
  {
    key: 'tier-1',
    name: 'Tier 1',
    title: '2-page literature report',
    summary: 'We review the literature on your problem and condense it into a 2-page report.',
    accent: 'var(--color-accent-2)',
    paths: [{ items: ['We conduct a literature review on our end', 'We prepare a 2-page report for you'] }],
  },
  {
    key: 'tier-2',
    name: 'Tier 2',
    title: 'Introductions to experts and users',
    summary: 'We link you up with relevant domain experts and/or end users through an approved channel.',
    accent: 'var(--color-ink)',
    paths: [
      {
        items: [
          'We find and propose relevant domain experts, end-user groups, or both',
          'We arrange an approved communication protocol / link-up',
        ],
      },
    ],
  },
  {
    key: 'tier-3',
    name: 'Tier 3',
    title: 'An interview, or a built solution',
    summary:
      'Either one interview, focus group (FGD) or event with experts and end users, or ongoing support where Problem Lab manages the product and acts as your point of contact.',
    accent: 'var(--color-accent-3)',
    paths: [
      {
        name: 'Interview / FGD',
        items: ['We coordinate an expert or end-user appearance at one event, interview or focus group'],
      },
      {
        name: 'Ongoing support',
        items: [
          'We identify suitable builders and developers and create a proposal',
          <>
            Development through active student projects and ventures, {sutdClubsLink}, or SUTD- or 42
            Singapore-hosted hackathons
          </>,
        ],
      },
    ],
    result: 'Your custom solution',
  },
];

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function StepBadge({ no, label }: { no: number; label: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="w-8 h-8 rounded-full bg-accent text-accent-ink text-sm font-bold tabular-nums flex items-center justify-center shrink-0">
        {no}
      </span>
      <span className="font-bold text-ink">{label}</span>
    </div>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  return (
    <li className="flex flex-col gap-4 rounded-card bg-paper p-6 border-t-4" style={{ borderTopColor: tier.accent }}>
      <span
        className="self-start px-2 py-0.5 rounded-md text-sm font-bold text-ink whitespace-nowrap"
        style={{ backgroundColor: `color-mix(in oklab, ${tier.accent} 30%, var(--color-paper))` }}
      >
        {tier.name}
      </span>
      <h3 className="text-xl leading-snug">{tier.title}</h3>
      <p className="text-ink">{tier.summary}</p>

      {tier.paths.map((path, i) => (
        <div key={i}>
          {path.name && <div className="text-sm font-bold text-muted mb-1">{path.name}</div>}
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-ink">
            {path.items.map((item, j) => (
              <li key={j} className="pl-1">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {tier.result && (
        <div className="flex items-center gap-2 border-t-2 pt-3 font-bold text-ink" style={{ borderColor: tier.accent }}>
          <Code2 className="w-5 h-5 shrink-0" aria-hidden="true" />
          {tier.result}
        </div>
      )}

      <Link href="#contact" className="btn-primary mt-auto w-full">
        <PenLine className="w-4 h-4 shrink-0 text-accent-3" aria-hidden="true" />
        Submit a Problem
      </Link>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function InnovationSection() {
  return (
    <section id="innovation" className="bg-paper py-(--section-gap-l) border-b border-rule">
      <div className="wrap">
        <div className="flex flex-col gap-5 max-w-[60ch]">
          <h2>Innovation: how we work with you</h2>
          <p className="lead">From first contact to a custom solution, in three steps.</p>
        </div>

        {/* One journey: steps 1 and 2 as a slim row, the tiers as step 3 */}
        <ol className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="rounded-card bg-paper-3 p-6 flex flex-col gap-3">
            <StepBadge no={1} label="Make contact" />
            <p className="text-ink">
              Share a problem anonymously, with no details needed; if we take it on, we publish the outcome on our
              website, socials or GitHub. Or choose &ldquo;Work with us&rdquo; in the form and leave your details to
              go on to step 2.
            </p>
          </li>
          <li className="rounded-card bg-paper-3 p-6 flex flex-col gap-3">
            <StepBadge no={2} label="Initial consultation" />
            <p className="flex items-start gap-2 text-ink">
              <MessagesSquare className="w-5 h-5 mt-0.5 shrink-0" aria-hidden="true" />
              We meet to understand your issue and decide together which tier fits.
            </p>
          </li>
        </ol>

        <div className="mt-12">
          <StepBadge no={3} label="Pick what you need" />
          <p className="mt-4 max-w-[65ch] text-ink">
            Most partners start with a theme: a short brief rather than a detailed problem statement. The tiers go
            further, and we agree on the right one with you at the consultation.
          </p>
          <ul className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 rounded-card bg-paper-3 p-4">
            {tiers.map((t) => (
              <TierCard key={t.key} tier={t} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
