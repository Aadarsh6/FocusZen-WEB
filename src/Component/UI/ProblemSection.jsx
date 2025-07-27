import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion"; // Import motion and the useInView hook

const ProblemSection = () => {
  // --- Framer Motion setup for scroll-triggered animations ---
  const sectionRef = useRef(null);
  // useInView hook will trigger 'true' when the section is in view.
  // { once: true } ensures it only triggers once.
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [totalTime, setTotalTime] = useState(0);

  // The counter animation now depends on the 'isInView' boolean from Framer Motion
  useEffect(() => {
    if (isInView) {
      let currentVal = 0;
      const interval = setInterval(() => {
        currentVal += 20;
        if (currentVal >= 1200) {
          setTotalTime(1200);
          clearInterval(interval);
        } else {
          setTotalTime(currentVal);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isInView]); // Dependency is now isInView

  const timeStat = [
    { name: "Social media checks", time: "76 min" },
    { name: "Email rabbit holes", time: "43 min" },
    { name: "YouTube distractions", time: "51 min" },
    { name: "News and articles", time: "29 min" },
  ];

  // --- Animation Variants for clean and reusable animations ---
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15, // Stagger the animation of children
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section 
      ref={sectionRef} // Attach ref for the useInView hook
      className="relative min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center text-center overflow-hidden py-24 sm:py-20"
    >
      {/* Background elements are unchanged */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg3.jpg')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.7))]"
        aria-hidden="true"
      />
    
      {/* Content now wrapped in a motion.div to orchestrate animations */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"} // Animate when in view
      >
        
        <motion.div variants={fadeUp}>
          <h2 className="text-4xl md:text-5xl font-jost text-white/60 font-semibold tracking-tight mb-4 leading-tight">
            The Hidden Cost of
            <br />
            <span className="bg-white bg-clip-text text-transparent font-bold">
              Digital Distraction
            </span>
          </h2> 
        </motion.div>

        <motion.div variants={fadeUp}>
          <h3 className="text-2xl md:text-3xl font-jost font-light text-white/90 mb-12 mt-12 text-center">
            A Typical Day's <span className="text-white font-medium">Interruptions</span>
          </h3>
        </motion.div>
          
        <div className="max-w-2xl mx-auto">
          <div className="space-y-4">
            {timeStat.map((stat) => (
              <motion.div key={stat.name} variants={fadeUp}>
                <div className="flex flex-col text-center space-y-1 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center py-2">
                  <span className="text-white/70 text-base md:text-lg font-light tracking-wide">
                    {stat.name}
                  </span>
                  <div className="hidden sm:flex items-center flex-1 mx-6">
                    <div className="flex-1 border-b border-dashed border-white/20"></div>
                  </div>
                  <span className="font-jost font-medium text-white text-lg md:text-xl tabular-nums">
                    {stat.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center pt-12 mt-8"
            variants={scaleIn}
          >
            <div>
              <div className="text-6xl md:text-7xl lg:text-8xl text-white font-jost font-light tabular-nums">
                {totalTime}
              </div>
              <div className="text-xl md:text-2xl text-white/70 font-light mt-1">Hours Lost</div>
              <p className="text-base text-white/50 mt-1">
                Annually, from <span className="text-white/70">~3.3 hours</span> of daily potential.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div className="mt-16" variants={fadeUp}>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            What could you create with <span className="text-white font-medium">1,200 focused hours</span>?
          </p>
          <p className="text-base md:text-lg text-white/50 mt-2">
            A new skill. A business. A masterpiece.
          </p>
        </motion.div>
      </motion.div>

      {/* Custom Styles can remain as they are for the font */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap');
        .font-jost {
          font-family: 'Jost', sans-serif;
        }
      `}</style>
    </section>
  );
};

export default ProblemSection;