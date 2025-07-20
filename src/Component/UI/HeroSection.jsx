import { motion } from "framer-motion";


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
       <motion.div
        className="relative z-10 max-w-xl px-4 text-white/90"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.h1
          className="font-jost text-4xl md:text-6xl font-semibold tracking-tight mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          Enter Deep Focus
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl leading-relaxed font-intel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          Silence the noise. <br /> Let your higher mind take over.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        >
         <div className="flex flex-col gap-3 items-center">
  <button className="px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition">
    Start a Focus Session
  </button>
  <a href="#" className="text-sm text-white/70 hover:text-white/90 underline">
    Download Extension
  </a>
</div>

        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
