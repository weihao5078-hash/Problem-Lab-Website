import React from 'react';
import {
  FileText,
  Users,
  MessagesSquare,
  Code2,
  GraduationCap,
  BadgeCheck,
  FolderKanban,
} from 'lucide-react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  text: string;
  tag?: string; // which tier it comes from
}

const youGet: Benefit[] = [
  {
    icon: <FileText className="w-5 h-5" />,
    title: 'Literature review & 2-page report',
    text: 'A researched view of your issue, condensed into a 2-page report.',
    tag: 'Tier 1',
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Domain experts & end users',
    text: 'Introductions to the right people, linked up through an approved communication channel.',
    tag: 'Tier 2',
  },
  {
    icon: <MessagesSquare className="w-5 h-5" />,
    title: 'Interviews & focus groups',
    text: 'A coordinated interview, focus group or event with experts and end users.',
    tag: 'Tier 3',
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    title: 'Custom software',
    text: 'Built with SUTD students, with Problem Lab managing the product and acting as your point of contact.',
    tag: 'Tier 3',
  },
];

const studentsGet: Benefit[] = [
  {
    icon: <GraduationCap className="w-5 h-5" />,
    title: 'Mandatory curriculum projects',
    text: 'Real partner projects that fulfil the mandatory projects in their SUTD curriculum and programmes.',
  },
  {
    icon: <BadgeCheck className="w-5 h-5" />,
    title: 'LinkedIn testimonial',
    text: 'Partners provide the students involved with a LinkedIn testimonial for every successful engagement.',
  },
  {
    icon: <FolderKanban className="w-5 h-5" />,
    title: 'Club builds & portfolio',
    text: 'Meaningful builds for SUTD student clubs, and portfolio-ready work for every student involved.',
  },
];

function BenefitList({ items, accent }: { items: Benefit[]; accent: string }) {
  return (
    <ul className="mt-8 space-y-5 w-full">
      {items.map((b) => (
        <li key={b.title} className="flex gap-4">
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-[#223d71]"
            style={{ backgroundColor: `${accent}33` }}
          >
            {b.icon}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-base font-bold text-[#223d71]">{b.title}</h4>
              {b.tag && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#223d71]/[0.07] text-[#223d71]/60">
                  {b.tag}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-[#223d71]/75 leading-relaxed">{b.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function WhatYouGetSection() {
  return (
    <section id="what-you-get" className="py-20 md:py-28 bg-[#faf8f3] border-b border-[#223d71]/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#223d71]/15 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#223d71]/15">
            {/* Left (top on mobile): What You Get */}
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col items-start bg-gradient-to-br from-white to-[#f4f7fc]/50">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#223d71]">What You Get</h2>
              <p className="mt-4 text-base text-[#223d71]/80 leading-relaxed max-w-md">
                Depending on the tier we agree on together, Problem Lab delivers:
              </p>
              <BenefitList items={youGet} accent="#7f9af4" />
            </div>

            {/* Right (bottom on mobile): What Students Get */}
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col items-start bg-gradient-to-br from-white to-[#fffcf7]/50">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#223d71]">What Students Get</h2>
              <p className="mt-4 text-base text-[#223d71]/80 leading-relaxed max-w-md">
                SUTD students who work on your project build real work for real organisations:
              </p>
              <BenefitList items={studentsGet} accent="#ffba56" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
