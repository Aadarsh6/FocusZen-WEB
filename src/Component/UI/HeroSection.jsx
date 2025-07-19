const HeroSection = () => {
  return (
    <section
      className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden"
      role="banner"
      aria-label="FocusZen hero section"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg2.png')" }}
        aria-hidden="true"
      />

      {/* Dim overlay */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* Radial vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.65))]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl px-6 text-white/90">
        <h1 className="font-jost text-5xl md:text-7xl font-semibold tracking-tight mb-5 leading-tight drop-shadow-lg">
          Enter Deep Focus
        </h1>

        <p className="text-lg md:text-2xl leading-relaxed font-intel text-white/80 max-w-lg mx-auto mb-8">
          Silence the noise.<br className="hidden md:block" />  
          Let your higher mind take over.
        </p>

        {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
  <button className="px-6 py-3 rounded-lg bg-white/85 text-black font-medium hover:bg-white/90 transition">
    Start a Focus Session
  </button>
  <button className="px-6 py-3 rounded-lg bg-transparent border border-white/20 text-white font-medium hover:bg-white/10 transition">
    Download Extension
  </button>
</div>

      </div>
    </section>
  );
};

export default HeroSection;
