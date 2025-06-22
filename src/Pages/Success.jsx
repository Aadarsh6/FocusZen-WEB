import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Sparkles, Home, RotateCcw } from "lucide-react";
import { useTheme } from "../Context";
import ShootConfetti from "../Component/UI/ShootConfettie";

const Success = () => {
  const { theme } = useTheme();

  // Clear localStorage
  useEffect(() => {
    // Clear all localStorage items
    localStorage.removeItem("Focus.url");
    localStorage.removeItem("Focus.time");
    localStorage.removeItem("Focus.EndTime");
    localStorage.removeItem("Focus.StartTime");
    localStorage.removeItem("timeLeft");
  }, []);

  // Trigger confetti with enhanced timing
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        ShootConfetti();
      } catch (error) {
        console.error("Failed to shoot confetti:", error);
      }
    }, 500);
    
    // Second confetti burst
    const timer2 = setTimeout(() => {
      try {
        ShootConfetti();
      } catch (error) {
        console.error("Failed to shoot second confetti:", error);
      }
    }, 2000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  const bgClass = theme === 'light' ? 'bg-slate-50' : 'bg-gray-950';
  const textPrimary = theme === 'light' ? 'text-slate-800' : 'text-gray-100';
  const textSecondary = theme === 'light' ? 'text-slate-600' : 'text-gray-400';
  const accentGradient = "from-green-400 via-cyan-400 to-purple-500";

  return (
    <div className={`min-h-screen ${bgClass} font-sans flex flex-col items-center justify-center transition-colors duration-500 overflow-hidden relative`}>
      
      {/* Enhanced Aurora Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {theme === 'dark' && (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-3/4 left-3/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse delay-500"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-gradient-to-tr from-green-500/10 via-cyan-500/5 to-purple-500/10 rounded-full blur-3xl opacity-50 animate-spin-slow"></div>
          </>
        )}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-4xl px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        
        {/* Success Icon with Animation */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.3 }}
        >
          <div className="relative">
            <Trophy size={80} className={`${textPrimary} drop-shadow-2xl`} />
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={24} className="text-yellow-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className={`text-5xl md:text-6xl lg:text-7xl font-extrabold ${textPrimary} mb-6 tracking-tight`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Mission <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>Accomplished!</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className={`text-xl md:text-2xl ${textSecondary} mb-12 max-w-2xl leading-relaxed`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          You've successfully completed your focus session! Your dedication to deep work is building the foundation for extraordinary achievements.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {/* Primary CTA - Start New Session */}
          <Link
            to="/focusMode"
            className="flex-1 relative group inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 bg-gray-900/50 border border-white/10 text-white"
          >
            <span className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${accentGradient} opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur-sm`}></span>
            <span className="relative flex items-center">
              <RotateCcw size={20} className="mr-3" />
              Start New Session
            </span>
          </Link>

          {/* Secondary CTA - Back to Home */}
          <Link
            to="/"
            className={`flex-1 inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 ${
              theme === 'light' 
                ? 'bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-400 focus:ring-offset-slate-50' 
                : 'bg-white/10 text-white hover:bg-white/20 focus:ring-white/50 focus:ring-offset-gray-950'
            } border border-white/10`}
          >
            <Home size={20} className="mr-3" />
            Back to Home
          </Link>
        </motion.div>

        {/* Motivational Quote */}
        <motion.div
          className={`p-6 rounded-2xl border backdrop-blur-sm ${
            theme === 'light' 
              ? 'bg-white/50 border-slate-200/50' 
              : 'bg-gray-900/30 border-white/10'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <p className={`${textSecondary} text-center italic`}>
            "Success is the sum of small efforts repeated day in and day out."
          </p>
          <p className={`${textSecondary} text-center text-sm mt-2`}>
            — Robert Collier
          </p>
        </motion.div>
      </motion.div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 45s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Success;