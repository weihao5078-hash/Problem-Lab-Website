import React from 'react';
import Link from 'next/link';
import { FileText, Users, MessagesSquare, Code2, Check, GraduationCap, PenLine } from 'lucide-react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  text: string;
  tag: string; // which tier it comes from
}

const youGet: Benefit[] = [
  {
    icon: <FileText className="w-5 h-5" />,
    title: 'Literature review & 2-page report',
    text: 'A researched view of your issue in two pages.',
    tag: 'Tier 1',
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Domain experts & end users',
    text: 'Introductions to the right people.',
    tag: 'Tier 2',
  },
  {
    icon: <MessagesSquare className="w-5 h-5" />,
    title: 'Interviews & focus groups',
    text: 'One coordinated session with experts and users.',
    tag: 'Tier 3',
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    title: 'Custom solution',
    text: 'Built by students, managed by Problem Lab.',
    tag: 'Tier 3',
  },
];

const youDo = [
  'Share the background, constraints and data we need',
  'Attend the consultation and any agreed check-ins',
  'Reply to students’ questions within an agreed time',
  'Give feedback on drafts and prototypes',
  'Decide whether the final work can be published',
  'Give the students a LinkedIn testimonial after a successful engagement',
];

export default function WhatYouGetSection() {
  return (
    <section id="partnering" className="bg-paper-2 py-(--section-gap) border-b border-rule">
      <div className="wrap">
        <h2 className="max-w-[18ch]">What you get</h2>

        {/* Benefits first, one line each */}
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {youGet.map((b) => (
            <li key={b.title} className="flex flex-col gap-2 rounded-card bg-paper p-6">
              <div className="flex items-center justify-between gap-3 text-ink">
                <span aria-hidden="true">{b.icon}</span>
                <span className="px-2 py-0.5 rounded-md bg-paper-3 text-sm font-bold whitespace-nowrap">{b.tag}</span>
              </div>
              <h3 className="text-lg font-bold">{b.title}</h3>
              <p className="text-ink">{b.text}</p>
            </li>
          ))}
        </ul>

        {/* Obligations as a one-line checklist */}
        <h3 className="mt-16 text-2xl">What we ask of you</h3>
        <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
          {youDo.map((item) => (
            <li key={item} className="flex items-start gap-3 text-ink">
              <Check className="w-5 h-5 mt-0.5 shrink-0 text-accent-2-ink" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        {/* Why students stay committed, then the action */}
        <div className="mt-16 flex items-start gap-4">
          <GraduationCap className="w-6 h-6 mt-1 shrink-0 text-ink" aria-hidden="true" />
          <p className="lead max-w-[60ch]">
            <span className="font-bold">Why students stay committed:</span> your project counts towards their project
            work, programmes or club work, and becomes part of their portfolio.
          </p>
        </div>
        <Link href="#contact" className="btn-primary mt-10 w-full sm:w-auto">
          <PenLine className="w-5 h-5 shrink-0 text-accent-3" aria-hidden="true" />
          Submit a Problem
        </Link>
      </div>
    </section>
  );
}
