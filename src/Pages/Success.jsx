import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Sparkles, Home, RotateCcw, CheckCircle, Star } from "lucide-react";
import ShootConfetti from "@/Component/UI/ShootConfettie";
import { useFocusSession } from "@/Context/FocusSessionProvider";

const Success = () => {
  const confettiRef = useRef(null);
  const { resetSession } = useFocusSession();


  useEffect(() => {

    const audio = new Audio("./sound.wav");
    audio.play().catch(e => {
      console.error("Audio paly failed", e)
    });


    const timer = setTimeout(() => {
      try {
        confettiRef.current = ShootConfetti();
      } catch (error) {
        console.error("Failed to shoot confetti:", error);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (confettiRef.current?.cleanup) {
        confettiRef.current.cleanup();
      }
    };
  }, []);

  return (
    <div className="min-h-screen text-white font-light flex flex-col items-center justify-center overflow-hidden relative p-4">
      
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg2.png')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* Main Content with faster animations */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-4xl px-4 md:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        
        {/* Icon Complex - Slightly smaller and refined */}
        <motion.div
          className="mb-10 relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", stiffness: 120, damping: 15, delay: 0.2, duration: 1 
          }}
        >
          <div className="relative flex items-center justify-center">
            {/* Background Circle - Resized */}
            <div className="absolute w-28 h-28 rounded-full bg-white/5 backdrop-blur-sm border border-white/10" />
            
            {/* Main Trophy with Amber Accent */}
            <Trophy size={56} className="text-amber-400 relative z-10" strokeWidth={1.25} />
            
            {/* Floating elements are kept */}
            <motion.div
              className="absolute -top-3 -right-3"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ 
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Sparkles size={18} className="text-amber-400/80" strokeWidth={1.5} />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-2 -left-4"
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Star size={14} className="text-white/60" strokeWidth={1.5} />
            </motion.div>
          </div>
        </motion.div>

        {/* Main Title - Resized and with Amber accent */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl font-light text-white mb-2 tracking-tight">
            Mission
          </h1>
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tight">
            {/* Amber gradient for a premium feel */}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Accomplished
            </span>
          </h2>
        </motion.div>

        {/* Subtitle with Stats - More compact */}
        <motion.div
          className="mb-10 space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
            You've successfully completed your focus session. Dedication to deep work is the foundation for extraordinary achievements.
          </p>
          
          {/* Achievement Indicators - Resized */}
          <div className="flex items-center justify-center space-x-6 pt-2">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-1.5 mx-auto">
                <CheckCircle size={18} className="text-white/80" />
              </div>
              <p className="text-xs text-white/60">Complete</p>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-1.5 mx-auto">
                <Star size={18} className="text-white/80" />
              </div>
              <p className="text-xs text-white/60">Excellence</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons - Resized */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <Link
            to="/focusMode"
            className="flex-1 group inline-flex items-center justify-center px-6 py-3.5 text-base font-medium rounded-xl transition-all duration-300 focus:outline-none bg-white text-black hover:bg-gray-200"
            onClick={() => resetSession()}
          >
            <RotateCcw size={18} className="mr-2.5 transition-transform group-hover:-rotate-45" />
            Start New Session
          </Link>
          <Link
            to="/"
            className="flex-1 inline-flex items-center justify-center px-6 py-3.5 text-base font-medium rounded-xl transition-colors duration-300 focus:outline-none bg-white/5 text-white/80 hover:bg-white/10 border border-white/10"
          >
            <Home size={18} className="mr-2.5" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>

      {/* Subtle Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
};

export default Success;