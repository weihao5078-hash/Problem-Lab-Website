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
            Why Problems First
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#223d71]">
            From Problem Discovery to Real-World Solutions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#223d71]/75 leading-relaxed">
            Many ventures stall because they solve problems that were never properly validated. Problem Lab starts with the problem: we research and validate real-world issues first, so ideas are built where they create real value.
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
                We investigate challenges across industries and communities, uncovering the root causes, constraints and user needs behind each issue.
              </p>
              <div className="mt-6 space-y-2.5 w-full">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-[#223d71]">
                  <span className="w-2 h-2 rounded-full bg-[#7f9af4]" />
                  <span>Stakeholder Interviews &amp; Field Research</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-[#223d71]">
                  <span className="w-2 h-2 rounded-full bg-[#7f9af4]" />
                  <span>Root-Cause Analysis</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-[#223d71]">
                  <span className="w-2 h-2 rounded-full bg-[#7f9af4]" />
                  <span>Assumption Testing &amp; Review of Existing Solutions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Description on Left | "Idea" on Right */}
          <div id="idea" className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#223d71]/15 scroll-mt-24">
            <div className="order-2 md:order-1 p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start bg-[#fdfbf7]">
              <p className="text-base text-[#223d71]/80 leading-relaxed max-w-md">
                With a clearly defined problem, builders and project teams develop solution ideas. Each idea is tested against user needs, market fit and technical feasibility.
              </p>
              <div className="mt-6 space-y-2.5 w-full">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-[#223d71]">
                  <span className="w-2 h-2 rounded-full bg-[#ffba56]" />
                  <span>Evidence-Backed Problem Briefs</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-[#223d71]">
                  <span className="w-2 h-2 rounded-full bg-[#ffba56]" />
                  <span>Prototyping &amp; Proof-of-Concept Testing</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-[#223d71]">
                  <span className="w-2 h-2 rounded-full bg-[#ffba56]" />
                  <span>Validation With Industry Partners</span>
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
            <h4 className="text-lg font-bold text-[#223d71] mb-2">Problem Discovery</h4>
            <p className="text-sm text-[#223d71]/70 leading-relaxed">
              Gathering real-world problems from organisations, communities and industry partners.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#223d71]/15 hover:border-[#7f9af4] hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#7f9af4]/15 text-[#223d71] font-mono font-bold flex items-center justify-center text-sm mb-4">
              02
            </div>
            <h4 className="text-lg font-bold text-[#223d71] mb-2">Research &amp; Framing</h4>
            <p className="text-sm text-[#223d71]/70 leading-relaxed">
              Investigating the scale, stakeholders and constraints of each problem, and framing it as a clear problem statement.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#ffba56]/40 hover:border-[#ffba56] hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#ffba56]/20 text-[#223d71] font-mono font-bold flex items-center justify-center text-sm mb-4">
              03
            </div>
            <h4 className="text-lg font-bold text-[#223d71] mb-2">Solution Ideation</h4>
            <p className="text-sm text-[#223d71]/70 leading-relaxed">
              Bringing different disciplines together to explore practical approaches to the validated problem.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#ffba56]/40 hover:border-[#ffba56] hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#ffba56]/20 text-[#223d71] font-mono font-bold flex items-center justify-center text-sm mb-4">
              04
            </div>
            <h4 className="text-lg font-bold text-[#223d71] mb-2">Partner Validation</h4>
            <p className="text-sm text-[#223d71]/70 leading-relaxed">
              Testing emerging solutions with partners for research support and real-world adoption.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
