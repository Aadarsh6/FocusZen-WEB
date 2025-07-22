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
      className="relative min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center text-center overflow-hidden"
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
          className="mb-5 mt-15"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-5xl font-jost text-white/50 font-semibold tracking-tight mb-6 leading-tight">
            The Hidden Cost of,
            <br />
            <span className="bg-white bg-clip-text text-transparent font-bold">
              Digital Distraction
            </span>
          </h2> 
        </motion.div>

        {/* Time Breakdown Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <h3 className="text-2xl md:text-3xl font-jost font-light text-white/90 mb-16 text-center">
            A Typical Day's <span className="text-white font-medium">Interruptions</span>
          </h3>
          
          {/* Flowing layout */}
          <div className="max-w-2xl mx-auto space-y-12">
            {/* Time Stats - Clean List */}
            <div className="space-y-4">
              {timeStat.map((stat, index) => (
                <motion.div
                  key={stat.name}
                  className="group relative text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.5 + (index * 0.2), ease: "easeOut" }}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2">
                    <span className="text-white/60 text-base md:text-lg font-light tracking-wide">
                      {stat.name}
                    </span>
                    
                    {/* Connecting dots */}
                    <div className="hidden sm:flex items-center flex-1 mx-8">
                      <div className="flex-1 border-b border-dotted border-white/20"></div>
                    </div>
                    
                    <span className="font-jost font-normal text-white text-lg md:text-xl tabular-nums">
                      {stat.time}
                    </span>
                  </div>
                  
                  {/* Subtle separator line */}
                  {index < timeStat.length - 1 && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Total Impact */}
            <motion.div 
              className="text-center pt-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            >
              {/* Large number with breathing space */}
              <div className="mb-1">
                <div className="text-6xl md:text-8xl text-white font-jost font-light tabular-nums mb-2">
                  {totalTime}
                </div>
                <div className="text-xl md:text-2xl text-white/70 font-light">Hours Lost</div>
                <div className="text-base text-white/40">Every year</div>
              </div>
              
              {/* Simple statement */}
              <p className="text-base md:text-lg text-white/50 font-light leading-relaxed max-w-md mx-auto">
                That's <span className="text-white/80">3.3 hours daily</span> of untapped potential
              </p>
            </motion.div>
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
            What could you create with <span className="text-white font-medium">1,200 focused hours</span>?
          </p>
          <p className="text-base md:text-lg text-white/50">
            A new skill. A business. A masterpiece. A better you.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProblemSection;
