import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Clock, Shield, FileText, BarChart3 } from "lucide-react";
import { Cover } from "@/components/ui/cover";
import { Link } from "react-router-dom";

const FeatureSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const features = [
    {
      icon: Clock,
      title: "Smart Time Sessions",
      description: "Custom focus durations with intelligent break reminders",
      color: "#3b82f6"    
    },
    {
      icon: Shield,
      title: "URL Blocking",
      description: "Block distracting websites during your focus time",
      color: "#ef4444"
    },
    {
      icon: FileText,
      title: "Commitment Barrier",
      description: "Thoughtful exit process prevents mindless clicking",
      color: "#f59e0b"
    },
    {
      icon: BarChart3,
      title: "Focus Analytics",
      description: "Track productivity patterns and celebrate progress",
      color: "#10b981"
    }
  ];

  return (
    <motion.section 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center p-4 py-25 relative overflow-hidden"
    >
      {/* Background Image */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg3.jpg')" }}
        aria-hidden="true"
      />
       */}

          {/* Dark Base Background */}
            <div className="absolute inset-0 bg-[#000000] z-0" />

            {/* Dotted Background */}
            <div className="absolute inset-0 bg-[radial-gradient(white_2px,transparent_1px)] [background-size:16px_16px] opacity-20 z-0" />



      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

      {/* Radial vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.65))]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        
        {/* Section Header */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* <h2 className="text-4xl md:text-6xl lg:text-5xl font-jost text-white/50 font-semibold tracking-tight leading-tight">
            Built for
            <br /> */}
            {/* <span className="bg-white bg-clip-text text-transparent font-bold">
              Deep Work
            </span> */}
            <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Build amazing websites <br /> at <Cover>Deep work</Cover>
      </h1>
          {/* </h2> */}
          {/* <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
            Every feature designed to eliminate distractions and amplify your focus
          </p> */}
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <h3 className="text-2xl md:text-3xl font-jost font-light text-white/90 mb-16 text-center">
            Everything You Need for <span className="text-white font-medium">Focused Work</span>
          </h3>
          
          {/* Features List */}
          <div className="max-w-2xl mx-auto space-y-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group relative text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.5 + (index * 0.2), ease: "easeOut" }}
              >
                <div className="flex flex-col items-center space-y-4">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300 mb-2">
                    <feature.icon className="w-7 h-7 text-white/80" strokeWidth={1.5} style={{color: feature.color}}/>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h4 className="text-xl md:text-2xl font-jost font-medium text-white tracking-tight">
                      {feature.title}
                    </h4>
                    <p className="text-base text-white/60 font-light leading-relaxed max-w-md">
                      {feature.description}
                    </p>
                  </div>
                </div>
                
                {/* Subtle separator line */}
                {index < features.length - 1 && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -mb-6" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        >
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Ready to reclaim your <span className="text-white font-medium">1,200 hours</span>?
          </p>
          <p className="text-base md:text-lg text-white/50 mb-8">
            Start your focused work journey today.
          </p>
          <Link
          to="/focusMode"
          >
          <motion.button 
            className="px-8 py-4 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Free
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeatureSection;