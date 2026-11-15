import React from 'react';
import {
  FileText,
  Users,
  MessagesSquare,
  Code2,
  ClipboardList,
  CalendarCheck,
  Reply,
  MessageSquareText,
  Eye,
  BadgeCheck,
  GraduationCap,
} from 'lucide-react';

interface Item {
  icon: React.ReactNode;
  title: string;
  text: string;
  tag?: string; // which tier it comes from
}

const youDo: Item[] = [
  {
    icon: <ClipboardList className="w-5 h-5" />,
    title: 'Share enough context',
    text: 'Give us the background, constraints and any data we need to understand the issue properly.',
  },
  {
    icon: <CalendarCheck className="w-5 h-5" />,
    title: 'Attend the consultation and interviews',
    text: 'Join the initial consultation and any interviews or check-ins agreed for your tier.',
  },
  {
    icon: <Reply className="w-5 h-5" />,
    title: 'Reply to students',
    text: 'Answer clarifying questions within an agreed timeframe so the work keeps moving.',
  },
  {
    icon: <MessageSquareText className="w-5 h-5" />,
    title: 'Give feedback',
    text: 'Review drafts and prototypes and tell us what works and what does not.',
  },
  {
    icon: <Eye className="w-5 h-5" />,
    title: 'Decide on publication',
    text: 'Tell us whether the final work can be shared publicly or must stay private.',
  },
  {
    icon: <BadgeCheck className="w-5 h-5" />,
    title: 'Write a short testimonial',
    text: 'For every successful engagement, provide the students involved with a LinkedIn testimonial.',
  },
];

const youGet: Item[] = [
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

function ItemList({ items, accent }: { items: Item[]; accent: string }) {
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
              <h3 className="text-base font-bold text-[#223d71]">{b.title}</h3>
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
    <section id="partnering" className="py-20 md:py-28 bg-[#faf8f3] border-b border-[#223d71]/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7f9af4]/15 border border-[#7f9af4]/30 text-xs font-bold tracking-wider uppercase text-[#223d71] mb-4">
            Partnering With Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#223d71]">
            What we need from you, and what you receive
          </h2>
        </div>

        <div className="bg-white rounded-3xl border border-[#223d71]/15 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#223d71]/15">
            {/* Left (top on mobile): partner responsibilities */}
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col items-start bg-gradient-to-br from-white to-[#fffcf7]/50">
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#223d71]">What You Do</h3>
              <p className="mt-4 text-base text-[#223d71]/80 leading-relaxed max-w-md">
                A good outcome depends on your involvement. As a partner, you agree to:
              </p>
              <ItemList items={youDo} accent="#ffba56" />
            </div>

            {/* Right (bottom on mobile): what the partner receives */}
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col items-start bg-gradient-to-br from-white to-[#f4f7fc]/50">
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#223d71]">What You Get</h3>
              <p className="mt-4 text-base text-[#223d71]/80 leading-relaxed max-w-md">
                Depending on the tier we agree on together, Problem Lab delivers:
              </p>
              <ItemList items={youGet} accent="#7f9af4" />
            </div>
          </div>

          {/* Brief note on why students stay committed */}
          <div className="border-t border-[#223d71]/15 bg-[#fafbfc] p-6 sm:p-8 flex items-start gap-3">
            <GraduationCap className="w-5 h-5 mt-0.5 shrink-0 text-[#223d71]" />
            <p className="text-sm text-[#223d71]/80 leading-relaxed">
              <span className="font-bold text-[#223d71]">Why students stay committed:</span> your project counts
              towards their SUTD coursework, programmes or club work, and becomes portfolio work backed by your
              testimonial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
