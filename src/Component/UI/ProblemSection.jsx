import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ProblemSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate time wasted counter
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setTotalTime(prev => {
          if (prev >= 1200) {
            clearInterval(interval);
            return 1200;
          }
          return prev + 17;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const timeStat = [
    { name: "Social media quick checks", time: "76 min" }, 
    { name: "Email rabbit hole", time: "43 min" }, 
    { name: "YouTube distractions", time: "51 min" }, 
    { name: "News and articles", time: "29 min" },     
  ];

  return (
    <motion.section 
      ref={sectionRef}
      className="py-20 md:py-20 overflow-hidden relative h-screen w-full bg-[#0a0a0a] flex items-center justify-center text-center"
    >
        <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg3.jpg')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

      {/* Radial vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.65))]"
        aria-hidden="true"
      />
    
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        
        {/* Main Headline */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-5xl font-jost text-white/50 font-semibold tracking-tight mb-6 mt-14 leading-tight">
            The Hidden Cost of,
            <br />
            <span className="bg-white bg-clip-text text-transparent font-bold">
              Digital Distraction
            </span>
          </h2> 
          
        </motion.div>

        {/* Time Breakdown Card */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-10 mb-10"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <h3 className="text-2xl md:text-3xl font-light text-white mb-8">
            A Typical Day's <span className="text-blue-400">Interruptions</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Time Stats */}
            <div className="space-y-4">
              {timeStat.map((stat, index) => (
                <motion.div
                  key={stat.name}
                  className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                >
                  <span className="text-white/80 text-sm md:text-base">{stat.name}</span>
                  <span className="font-semibold text-blue-400 text-sm md:text-base">{stat.time}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Total Impact */}
            <div className="flex flex-col justify-center items-center">
              <motion.div 
                className="text-4xl md:text-6xl text-white/80 mb-4 font-semibold"
                initial={{ scale: 0 }}
                animate={isVisible ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                {totalTime}
              </motion.div>
              <div className="text-xl md:text-2xl text-white/90 ">Hours Lost</div>
              <div className="text-lg md:text-xl text-white/60 mb-6 text-balance">Every year</div>
              
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-6">
                <p className="text-sm md:text-base text-white/80">
                  That's <span className="text-blue-400 font-semibold">3.3 hours per day</span> of pure potential.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reflection Questions */}
        <motion.div
          className="space-y-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        >
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            What could you create with <span className="text-blue-400 font-semibold">1,200 focused hours</span>?
          </p>
          <p className="text-base md:text-lg text-white/50">
            A new skill. A business. A masterpiece. A better you.
          </p>
        </motion.div>

        {/* Call to Action */}
        {/* <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
        >
          <button className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all duration-300 text-sm md:text-base">
            Reclaim Your Time
          </button>
          <button className="px-8 py-4 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 text-sm md:text-base">
            Learn More
          </button>
        </motion.div> */}

      </div>
    </motion.section>
  );
};

export default ProblemSection;