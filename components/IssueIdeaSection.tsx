'use client';

import React, { useState } from 'react';
import { CheckCircle2, Search, ArrowRight, ShieldCheck } from 'lucide-react';

export default function IssueIdeaSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'issue' | 'idea'>('all');

  return (
    <section id="issue" className="py-20 md:py-28 bg-[#faf8f3] border-b border-[#223d71]/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7f9af4]/15 border border-[#7f9af4]/30 text-xs font-bold tracking-wider uppercase text-[#223d71] mb-4">
            The Foundation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#223d71]">
            From Problem Discovery to Innovation Breakthrough
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#223d71]/75 leading-relaxed">
            Most startups fail because they solve problems nobody has. Problem Lab shifts the paradigm: we identify and validate critical issues first, engineering ideas only where substantial value can be unlocked.
          </p>
        </div>

        {/* The Split Wireframe Card - Faithful to User's Sketch */}
        <div className="bg-white rounded-3xl border border-[#223d71]/15 shadow-sm overflow-hidden mb-16">
          
          {/* Row 1: "Issue" on Left | Description on Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#223d71]/15 border-b border-[#223d71]/15">
            <div className="p-8 sm:p-12 lg:p-16 flex items-center justify-center min-h-[220px] bg-gradient-to-br from-white to-[#f4f7fc]/50">
              <h3 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#223d71] text-center">
                Issue
              </h3>
            </div>
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start bg-[#fafbfc]">
              <p className="text-base text-[#223d71]/80 leading-relaxed max-w-md">
                We dissect complex industry, technological, and societal bottlenecks. We uncover the hidden friction points, regulatory shifts, and fundamental human constraints that dictate real-world necessity.
              </p>
              <div className="mt-6 space-y-2.5 w-full">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-[#223d71]">
                  <span className="w-2 h-2 rounded-full bg-[#7f9af4]" />
                  <span>Quantified Market Pain &amp; Total Cost of Inaction</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-[#223d71]">
                  <span className="w-2 h-2 rounded-full bg-[#7f9af4]" />
                  <span>Deep-Tech &amp; Operational Failure Analysis</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-[#223d71]">
                  <span className="w-2 h-2 rounded-full bg-[#7f9af4]" />
                  <span>Stakeholder Verification &amp; Customer Interviews</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Description on Left | "Idea" on Right */}
          <div id="idea" className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#223d71]/15 scroll-mt-24">
            <div className="order-2 md:order-1 p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start bg-[#fdfbf7]">
              <p className="text-base text-[#223d71]/80 leading-relaxed max-w-md">
                Armed with unambiguous problem clarity, our fellows and partner labs engineer breakthrough venture ideas. Every idea is stress-tested against market dynamics, IP viability, and technological feasibility.
              </p>
              <div className="mt-6 space-y-2.5 w-full">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-[#223d71]">
                  <span className="w-2 h-2 rounded-full bg-[#ffba56]" />
                  <span>Defensible Intellectual Property &amp; Architecture</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-[#223d71]">
                  <span className="w-2 h-2 rounded-full bg-[#ffba56]" />
                  <span>Rapid Prototyping &amp; Proof-of-Concept Benchmarking</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-[#223d71]">
                  <span className="w-2 h-2 rounded-full bg-[#ffba56]" />
                  <span>Commercial Alignment With Global Business Partners</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 p-8 sm:p-12 lg:p-16 flex items-center justify-center min-h-[220px] bg-gradient-to-br from-white to-[#fffcf7]/50">
              <h3 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#223d71] text-center">
                Idea
              </h3>
            </div>
          </div>
        </div>

        {/* 4-Step Systematic Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#223d71]/15 hover:border-[#7f9af4] hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#7f9af4]/15 text-[#223d71] font-mono font-bold flex items-center justify-center text-sm mb-4">
              01
            </div>
            <h4 className="text-lg font-bold text-[#223d71] mb-2">Issue Identification</h4>
            <p className="text-sm text-[#223d71]/70 leading-relaxed">
              Systematically gathering intractable friction points across technology, healthcare, infrastructure, and enterprise workflows.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#223d71]/15 hover:border-[#7f9af4] hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#7f9af4]/15 text-[#223d71] font-mono font-bold flex items-center justify-center text-sm mb-4">
              02
            </div>
            <h4 className="text-lg font-bold text-[#223d71] mb-2">Deep Rigor &amp; Framing</h4>
            <p className="text-sm text-[#223d71]/70 leading-relaxed">
              Auditing the economic scale, stakeholder dynamics, and systemic constraints behind every problem statement.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#ffba56]/40 hover:border-[#ffba56] hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#ffba56]/20 text-[#223d71] font-mono font-bold flex items-center justify-center text-sm mb-4">
              03
            </div>
            <h4 className="text-lg font-bold text-[#223d71] mb-2">Solution Ideation</h4>
            <p className="text-sm text-[#223d71]/70 leading-relaxed">
              Cross-pollinating technical domains to discover non-obvious, defensible approaches to the verified problem.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#ffba56]/40 hover:border-[#ffba56] hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#ffba56]/20 text-[#223d71] font-mono font-bold flex items-center justify-center text-sm mb-4">
              04
            </div>
            <h4 className="text-lg font-bold text-[#223d71] mb-2">Partner Validation</h4>
            <p className="text-sm text-[#223d71]/70 leading-relaxed">
              Connecting emerging solutions with Innovation Partners for research muscle and Business Partners for scale.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
