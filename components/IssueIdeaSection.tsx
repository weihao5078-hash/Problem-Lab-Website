import React from 'react';

const rows = [
  {
    id: undefined,
    word: 'Issue',
    rule: 'bg-accent-2',
    marker: 'marker:text-accent-2-ink',
    text: 'We investigate challenges across industries and communities, uncovering the root causes, constraints and user needs behind each issue.',
    items: [
      'Stakeholder Interviews & Field Research',
      'Root-Cause Analysis',
      'Assumption Testing & Review of Existing Solutions',
    ],
  },
  {
    id: 'idea',
    word: 'Idea',
    rule: 'bg-accent-3',
    marker: 'marker:text-ink',
    text: 'With a clearly defined problem, builders and project teams develop solution ideas. Each idea is tested against user needs, market fit and technical feasibility.',
    items: [
      'Evidence-Backed Problem Briefs',
      'Prototyping & Proof-of-Concept Testing',
      'Validation With Industry Partners',
    ],
  },
];

const steps = [
  {
    title: 'Problem Discovery',
    text: 'Gathering real-world problems from organisations, communities and industry partners.',
    rule: 'border-accent-2',
  },
  {
    title: 'Research & Framing',
    text: 'Investigating the scale, stakeholders and constraints of each problem, and framing it as a clear problem statement.',
    rule: 'border-accent-2',
  },
  {
    title: 'Solution Ideation',
    text: 'Bringing different disciplines together to explore practical approaches to the validated problem.',
    rule: 'border-accent-3',
  },
  {
    title: 'Partner Validation',
    text: 'Testing emerging solutions with partners for research support and real-world adoption.',
    rule: 'border-accent-3',
  },
];

export default function IssueIdeaSection() {
  return (
    <section id="issue" className="bg-paper-2 py-(--section-gap) border-b border-rule">
      <div className="wrap">
        {/* Head block, split: the claim left, its reason right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6 items-end">
          <h2 className="lg:col-span-7">From Problem Discovery to Real-World Solutions</h2>
          <p className="lead lg:col-span-5">
            Many ventures stall because they solve problems that were never properly validated. Problem Lab starts with
            the problem: we research and validate real-world issues first, so ideas are built where they create real
            value.
          </p>
        </div>

        {/* Issue and Idea as two ruled rows: the word at display size, what it means beside it */}
        <div className="mt-16 border-b border-rule">
          {rows.map((row) => (
            <div
              key={row.word}
              id={row.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6 border-t border-rule py-12 md:py-16"
            >
              <div className="lg:col-span-5 flex flex-col gap-5">
                <h3 className="text-2xl leading-none">{row.word}</h3>
                <span className={`block h-1.5 w-20 rounded-full ${row.rule}`} aria-hidden="true" />
              </div>
              <div className="lg:col-span-7 flex flex-col gap-6">
                <p className="lead">{row.text}</p>
                <ul className={`list-disc pl-5 grid gap-2 font-bold ${row.marker}`}>
                  {row.items.map((item) => (
                    <li key={item} className="pl-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* The four research stages, unnumbered: the only numbered steps on the page are the visitor's journey below */}
        <h3 className="mt-24 text-2xl">How we research a problem</h3>
        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {steps.map((s) => (
            <li key={s.title} className={`flex flex-col gap-3 border-t-2 pt-6 ${s.rule}`}>
              <h4 className="text-lg font-bold">{s.title}</h4>
              <p className="text-muted">{s.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
