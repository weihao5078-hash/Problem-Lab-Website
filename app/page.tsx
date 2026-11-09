import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import IssueIdeaSection from '@/components/IssueIdeaSection';
import InnovationSection from '@/components/InnovationSection';
import WhatYouGetSection from '@/components/WhatYouGetSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#223d71] selection:bg-[#7f9af4] selection:text-white">
      {/* MD3 Top App Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* 1. Hero Section with Interactive Morphing Animation */}
        <HeroSection />

        {/* 2. Issue · Idea Split Section from Wireframe Sketch */}
        <IssueIdeaSection />

        {/* 3. Innovation: process diagram from first contact to delivery */}
        <InnovationSection />

        {/* 4. What You Get | What Students Get split */}
        <WhatYouGetSection />

        {/* 5. Contact Section from Wireframe Sketch */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
