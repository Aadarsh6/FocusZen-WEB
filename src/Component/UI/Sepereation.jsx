import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ProblemToSolutionTransition = () => {
  const [isVisible, setIsVisible] = useState(false);
  const transitionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (transitionRef.current) {
      observer.observe(transitionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div 
      ref={transitionRef}
      className="relative w-full h-48 bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
    >
      {/* Gradient overlay for smooth blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      
      {/* Main transition visual */}
      <div className="relative z-10 flex items-center justify-center w-full max-w-2xl mx-auto px-6">
        
        {/* Problem side (chaos/scattered) */}
        <motion.div
          className="flex-1 flex items-center justify-end pr-8"
          initial={{ opacity: 0, x: -30 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative">
            {/* Scattered dots representing distraction */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-red-400/40 rounded-full"
                style={{
                  left: `${Math.random() * 60 - 30}px`,
                  top: `${Math.random() * 60 - 30}px`,
                }}
                animate={isVisible ? {
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.4, 0.8, 0.4]
                } : {}}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
            <div className="w-4 h-4 bg-red-400/60 rounded-full" />
          </div>
        </motion.div>

        {/* Center transition arrow */}
        <motion.div
          className="relative flex items-center justify-center px-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          {/* Flowing line with arrow */}
          <div className="relative flex items-center">
            <motion.div
              className="w-16 h-[1px] bg-gradient-to-r from-red-400/60 to-emerald-400/60"
              initial={{ scaleX: 0 }}
              animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            />
            <motion.div
              className="w-0 h-0 border-l-4 border-l-emerald-400/60 border-t-2 border-t-transparent border-b-2 border-b-transparent ml-1"
              initial={{ opacity: 0, x: -10 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.4, delay: 1.2, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Solution side (organized/focused) */}
        <motion.div
          className="flex-1 flex items-center justify-start pl-8"
          initial={{ opacity: 0, x: 30 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="relative">
            {/* Organized dots in formation */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-emerald-400/60 rounded-full"
                style={{
                  left: `${(i % 2) * 16}px`,
                  top: `${Math.floor(i / 2) * 16 - 8}px`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.8 + (i * 0.1),
                  ease: "easeOut"
                }}
              />
            ))}
            <div className="w-4 h-4 bg-emerald-400/80 rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* Subtle text hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
      >
        <div className="text-white/30 text-sm font-light tracking-wide">
          From chaos to clarity
        </div>
      </motion.div>

      {/* Ambient particles flowing from left to right */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{
              left: '10%',
              top: `${45 + i * 5}%`,
            }}
            animate={isVisible ? {
              x: [0, 300],
              opacity: [0, 0.6, 0]
            } : {}}
            transition={{
              duration: 4,
              delay: i * 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ProblemToSolutionTransition;