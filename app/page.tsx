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
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 w-full">
        {/* 1. Hero: the logo animation, with the claim and the main action at its base */}
        <HeroSection />

        {/* 2. Issue and Idea, then the four-stage process */}
        <IssueIdeaSection />

        {/* 3. Innovation: process diagram from first contact to delivery */}
        <InnovationSection />

        {/* 4. What you do and what you get */}
        <WhatYouGetSection />

        {/* 5. Submit a problem */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
