export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white border-b border-[#223d71]/10">
      {/* Interactive Hero Animation Container */}
      <div className="relative w-full h-[78vh] min-h-[540px] max-h-[820px] bg-white">
        <iframe
          src="/assets/aistudio/problem-lab-animation2__1__9fdfd872.html"
          title="Problem Lab Hero Animation - Issue 2 Idea"
          aria-label="Problem Lab interactive hero animation transforming Issue, Idea, Innovation into the Problem Lab logo"
          className="w-full h-full border-0 select-none block"
          loading="eager"
        />

        {/* Ambient subtle gradient overlay for seamless blending */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
