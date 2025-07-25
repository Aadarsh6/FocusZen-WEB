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

  // Animate time wasted counter - Made faster and smoother
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setTotalTime(prev => {
          if (prev >= 1200) {
            clearInterval(interval);
            return 1200;
          }
          return prev + 25; // Increased increment for faster counting
        });
      }, 30); // Reduced interval for smoother animation
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
    <section 
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
        
        {/* Main Headline - Faster animation */}
        <div
          className={`mb-5 mt-15 transition-all duration-500 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-6xl lg:text-5xl font-jost text-white/50 font-semibold tracking-tight mb-6 leading-tight">
            The Hidden Cost of,
            <br />
            <span className="bg-white bg-clip-text text-transparent font-bold">
              Digital Distraction
            </span>
          </h2> 
        </div>

        {/* Time Breakdown Section - Reduced delay */}
        <div
          className={`mb-16 transition-all duration-500 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: isVisible ? '0.1s' : '0s' }}
        >
          <h3 className="text-2xl md:text-3xl font-jost font-light text-white/90 mb-16 text-center">
            A Typical Day's <span className="text-white font-medium">Interruptions</span>
          </h3>
          
          {/* Flowing layout */}
          <div className="max-w-2xl mx-auto space-y-12">
            {/* Time Stats - Clean List with staggered but fast animations */}
            <div className="space-y-4">
              {timeStat.map((stat, index) => (
                <div
                  key={stat.name}
                  className={`group relative text-center transition-all duration-400 ease-out ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ 
                    transitionDelay: isVisible ? `${0.2 + (index * 0.08)}s` : '0s' 
                  }}
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
                </div>
              ))}
            </div>
            
            {/* Total Impact - Much faster reveal */}
            <div 
              className={`text-center pt-8 transition-all duration-500 ease-out ${
                isVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: isVisible ? '0.5s' : '0s' }}
            >
              {/* Large number with breathing space */}
              <div>
                <div className="text-6xl md:text-8xl text-white font-jost font-light tabular-nums">
                  {totalTime}
                </div>
                <div className="text-xl md:text-2xl text-white/70 font-light">Hours Lost</div>
                <div className="text-base text-white/40">Every year</div>
              </div>
              
              {/* Simple statement */}
              <p className="text-base md:text-lg text-white/50 font-light leading-relaxed max-w-md mx-auto">
                That's <span className="text-white/80">3.3 hours daily</span> of untapped potential
              </p>
            </div>
          </div>
        </div>

        {/* Reflection Questions - Quick final reveal */}
        <div
          className={`space-y-2 mb-12 transition-all duration-400 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: isVisible ? '0.4s' : '0s' }}
        >
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            What could you create with <span className="text-white font-medium">1,200 focused hours</span>?
          </p>
          <p className="text-base md:text-lg text-white/50">
            A new skill. A business. A masterpiece. A better you.
          </p>
        </div>
      </div>

      {/* Custom Styles */}
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