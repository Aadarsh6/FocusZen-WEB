import { motion } from "framer-motion";
import NavBar from "@/Component/NavBar";
import { Link } from "react-router-dom";
import { Download } from "lucide-react"; // Added an icon for visual enhancement

const HeroSection = () => {
  return (
    <section
      className="relative h-screen w-full bg-[#0a0a0a] flex items-center justify-center text-center overflow-hidden"
      role="banner"
      aria-label="FocusZen hero section"
    >
      <NavBar />

      {/* Background elements remain unchanged */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: "url('/bg2.png')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.75))]"
        aria-hidden="true"
      />

      {/* Content with faster, snappier animations */}
      <motion.div
        className="relative z-10 max-w-2xl px-4 text-white" // Increased max-w slightly for better balance
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }} // Faster load
      >
        <motion.h1
          className="font-jost text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-tight text-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          Enter Deep Focus
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl leading-relaxed text-gray-300 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          Silence the noise. <br /> Let your higher mind take over.
        </motion.p>

        {/* Slightly cleaner and more robust CTA structure */}
        <motion.div
          className="mt-8 flex flex-col items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        >
          <Link to="/focusMode" className="w-full max-w-xs sm:max-w-none">
            <button className="w-full px-8 py-3.5 rounded-xl bg-white text-black text-base font-semibold hover:bg-gray-200 transition-colors duration-300 shadow-lg">
              Start a Focus Session
            </button>
          </Link>
          
          <a 
            href="#" // Replace with your actual download link
            className="group inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors duration-300"
          >
            <Download size={14} className="mr-2 opacity-70 transition-opacity group-hover:opacity-100" />
            Download Extension
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;