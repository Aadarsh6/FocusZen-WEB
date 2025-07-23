  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import { Pause, Play, RotateCcw, Home, Zap } from "lucide-react";
  import { motion, AnimatePresence } from "framer-motion";

  const Timer = ({ initialTimer, onComplete }) => {
    const storeTimeLeft = localStorage.getItem("timeLeft");
    const [timeLeft, setTimeLeft] = useState(
      storeTimeLeft && Number(storeTimeLeft) > 0 ? Number(storeTimeLeft) : initialTimer
    );
    const [isRunning, setIsRunning] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);

    // Core functionality - enhanced and cleaned up
    useEffect(() => {
      const interval = setInterval(() => {
        window.postMessage({ type: "TIME_UPDATE", timeLeft }, "*");
      }, 1000);
      return () => clearInterval(interval);
    }, [timeLeft]);

    useEffect(() => {
      if (timeLeft >= 0) {
        localStorage.setItem("timeLeft", timeLeft);
      }
    }, [timeLeft]);

    useEffect(() => {
      if (!storeTimeLeft || storeTimeLeft <= 0) {
        setTimeLeft(initialTimer);
      }
    }, [initialTimer, storeTimeLeft]);

    useEffect(() => {
      let timer;
      if (isRunning && timeLeft > 0) {
        timer = setTimeout(() => {
          setTimeLeft((prevValue) => prevValue - 1);
        }, 1000);
      }
      return () => clearTimeout(timer);
    }, [isRunning, timeLeft]);

    useEffect(() => {
      if (timeLeft === 0) {
        setIsRunning(false);
        onComplete();
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 3000);
      }
    }, [timeLeft, onComplete]);

    // Enhanced utility functions
    const formatTime = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = Math.floor(seconds % 60);
      
      if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
      }
      return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const progressPercentage = initialTimer > 0 ? (timeLeft / initialTimer) * 100 : 0;
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (circumference * progressPercentage) / 100;

    const getTimeLeftText = () => {
      if (timeLeft < 60) return `${timeLeft}s remaining`;
      if (timeLeft < 3600) return `${Math.ceil(timeLeft / 60)}m remaining`;
      return `${Math.floor(timeLeft / 3600)}h ${Math.floor((timeLeft % 3600) / 60)}m remaining`;
    };

    return (
      <div className="relative w-full flex flex-col items-center justify-center text-center">
        {/* Main Content Container */}
        <motion.div 
          className="relative z-10 w-[80%] max-w-4xl mx-auto px-8 md:px-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >

          {/* Status Section */}
       {/* Status Section */}
        <motion.div
          className="max-w-md mx-auto mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center space-x-4 bg-white/10 px-4 py-2 rounded-full">
            <div className="relative flex-shrink-0">
              <div
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  isRunning ? "bg-white shadow-md shadow-white/50" : "bg-white/40"
                }`}
              />
              {isRunning && (
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-white animate-ping opacity-75"></div>
              )}
            </div>
            <div className="text-left">
              <p className="text-sm md:text-base font-medium">
                {isRunning ? "Deep Focus Active" : "Session Paused"}
              </p>
              <p className="text-xs md:text-sm text-white/60 font-light">{getTimeLeftText()}</p>
            </div>
          </div>
        </motion.div>

          {/* Main Timer Display */}
          <motion.div 
            className={`relative flex items-center justify-center mb-12 transition-all duration-500 ${
              isAnimating ? "animate-pulse scale-110" : ""
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            
            {/* Enhanced Progress Ring */}
            <div className="relative">
              <svg className="w-72 h-72 transform -rotate-90" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="timer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
                  </linearGradient>
                  <filter id="timer-glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Background ring */}
                <circle
                  cx="50" cy="50" r="45"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="3"
                />
                
                {/* Progress ring */}
                <circle
                  cx="50" cy="50" r="45"
                  fill="none"
                  stroke="url(#timer-gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-out"
                  filter="url(#timer-glow)"
                />
                
                {/* Inner accent ring */}
                <circle
                  cx="50" cy="50" r="38"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="1"
                  className="animate-pulse"
                />
              </svg>

              {/* Timer Text Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h1 className="text-6xl md:text-7xl font-jost font-bold text-white tracking-tight drop-shadow-2xl mb-3">
                  {formatTime(timeLeft)}
                </h1>
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isRunning ? "bg-white animate-pulse" : "bg-white/60"
                  }`}></div>
                  <p className={`text-sm font-jost font-light uppercase tracking-[0.3em] transition-colors duration-300 ${
                    isRunning ? "text-white/90" : "text-white/60"
                  }`}>
                    {isRunning ? "Focusing" : "Paused"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Control Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          >
            
            {/* Play/Pause Button */}
            {/* <button
              onClick={() => setIsRunning(!isRunning)}
              className="flex-1 relative group inline-flex items-center justify-center px-8 py-4 text-white font-jost font-medium rounded-2xl transition-all duration-300 transform hover:scale-105 bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30"
            >
              {isRunning ? (
                <Pause className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
              ) : (
                <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
              )}
              {isRunning ? "Pause Session" : "Resume Session"}
            </button> */}

            {/* Reset Button */}
            {/* <button
              onClick={() => {
                setIsRunning(false);
                localStorage.removeItem("timeLeft");
                setTimeLeft(initialTimer);
                onReset();
              }}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-jost font-medium rounded-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 group border border-white/10 hover:border-white/20"
            >
              <RotateCcw className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-300" />
              Reset Timer
            </button> */}
          </motion.div>

          {/* Exit Button */}
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        >
          <Link
            onClick={() => {
              setIsRunning(false);
              localStorage.setItem("timeLeft", timeLeft);
            }}
            to="/type"
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-white/10"
          >
            <Home size={20} className="mr-3" />
            Exit Focus Mode
          </Link>
        </motion.div>
      </motion.div>
      </div>
    );
  };

  export default Timer;