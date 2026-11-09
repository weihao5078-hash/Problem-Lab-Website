import Script from 'next/script';
import { Mail, MapPin } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-[#fdf8f9] border-b border-[#223d71]/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact intro + embedded HubSpot form */}
        <div className="bg-white rounded-3xl border border-[#223d71]/15 shadow-sm overflow-clip">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#223d71]/15">
            
            {/* Left Box: "Contact" Title */}
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-start items-start md:self-start md:sticky md:top-24">
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#223d71]">
                Contact
              </h2>
              <p className="mt-4 text-base text-[#223d71]/80 leading-relaxed max-w-md">
                Have an unaddressed industry issue, an ambitious venture hypothesis, or an institution ready to partner with Problem Lab? Connect directly with our team.
              </p>

              <div className="mt-6 flex flex-col gap-3 text-xs sm:text-sm text-[#223d71]/80">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#7f9af4]" />
                  <span className="font-semibold text-[#223d71]">inquiries@problemlab.org</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#7f9af4]" />
                  <span>Waterloo Innovation Hub, Ontario, Canada</span>
                </div>
              </div>
            </div>

            {/* Right Box: Embedded HubSpot intake form */}
            <div className="p-6 sm:p-10 lg:p-12 bg-[#fdfbfb] min-h-[220px]">
              <div
                className="hs-form-frame"
                data-region="na2"
                data-form-id="924e2cb5-0470-4c29-8b16-0a9a9e4bb18c"
                data-portal-id="247551294"
              />
              <Script
                src="https://js-na2.hsforms.net/forms/embed/247551294.js"
                strategy="afterInteractive"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
