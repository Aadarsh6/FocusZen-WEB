import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../Context";
import { Pause, Play, RotateCcw, Home, Zap } from "lucide-react";

const Timer = ({ initialTimer, onComplete, onReset }) => {
  const { theme } = useTheme();
  const storeTimeLeft = localStorage.getItem("timeLeft");
  const [timeLeft, setTimeLeft] = useState(
    storeTimeLeft && Number(storeTimeLeft) > 0 ? Number(storeTimeLeft) : initialTimer
  );
  const [isRunning, setIsRunning] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showMotivation, setShowMotivation] = useState(true);

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

  const getMotivationMessage = () => {
    const percentage = progressPercentage;
    if (!isRunning) return { icon: "⏸️", message: "Take a breath. Resume when ready." };
    if (percentage > 80) return { icon: "🚀", message: "Excellent start! You're in the zone." };
    if (percentage > 60) return { icon: "💪", message: "Strong focus! Keep the momentum going." };
    if (percentage > 40) return { icon: "⚡", message: "Halfway there! You're doing amazing." };
    if (percentage > 20) return { icon: "🔥", message: "Final stretch! Push through to victory." };
    return { icon: "🏆", message: "Almost done! Finish strong!" };
  };

  const getTimeLeftText = () => {
    if (timeLeft < 60) return `${timeLeft}s remaining`;
    if (timeLeft < 3600) return `${Math.ceil(timeLeft / 60)}m remaining`;
    return `${Math.floor(timeLeft / 3600)}h ${Math.floor((timeLeft % 3600) / 60)}m remaining`;
  };

  const motivation = getMotivationMessage();

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative">


      {/* Aurora Background Container */}
      <div className="relative w-full p-8 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl bg-gray-900/60 overflow-hidden">
        
        {/* Enhanced Aurora Background Effects */}
        {theme === 'dark' && (
          <>
            <div className="absolute -top-30 -left-20 w-96 h-96 bg-gradient-to-br from-green-400/20 to-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-purple-500/20 to-violet-600/10 rounded-full blur-3xl animate-pulse delay-100"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-400/8 to-blue-500/8 rounded-full blur-2xl animate-pulse delay-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-900/20 to-transparent"></div>
          </>
        )}

        {/* Status Header */}
        <div className="relative z-10 w-full flex items-center justify-between mb-1">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className={`w-4 h-4 rounded-full transition-all duration-500 ${
                isRunning 
                  ? "bg-gradient-to-r from-green-400 to-cyan-400 shadow-lg shadow-cyan-400/50" 
                  : "bg-gradient-to-r from-amber-400 to-orange-400 shadow-lg shadow-amber-400/50"
              }`}></div>
              {isRunning && (
                <div className="absolute inset-0 w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 animate-ping opacity-75"></div>
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                {isRunning ? "Deep Focus Active" : "Session Paused"}
              </p>
              <p className="text-xs text-gray-400">
                {getTimeLeftText()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-full border border-white/10">
            <Zap size={14} className="text-cyan-400" />
            <span className="text-sm font-medium text-gray-300">
              {Math.round(progressPercentage)}%
            </span>
          </div>
        </div>

        {/* Main Timer Display */}
        <div className={`relative flex items-center justify-center mb-10 transition-all duration-500 ${
          isAnimating ? "animate-pulse scale-110" : ""
        }`}>
          
          {/* Enhanced Progress Ring */}
          <div className="relative">
            <svg className="w-60 h-60 transform -rotate-90" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="aurora-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="30%" stopColor="#22d3ee" />
                  <stop offset="70%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
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
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="6"
              />
              
              {/* Progress ring */}
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="url(#aurora-gradient)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
                filter="url(#glow)"
              />
              
              {/* Inner glow ring */}
              <circle
                cx="50" cy="50" r="38"
                fill="none"
                stroke="rgba(34, 211, 238, 0.1)"
                strokeWidth="1"
                className="animate-pulse"
              />
            </svg>

            {/* Timer Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-5xl font-black text-white tracking-tighter drop-shadow-2xl mb-2">
                {formatTime(timeLeft)}
              </h1>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  isRunning ? "bg-cyan-400 animate-pulse" : "bg-amber-400"
                }`}></div>
                <p className={`text-sm font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isRunning ? "text-cyan-400" : "text-amber-400"
                }`}>
                  {isRunning ? "Focusing" : "Paused"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Motivation Section */}
        {showMotivation && (
          <div className={`w-full text-center mb-6   p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500 ${
            isRunning
              ? "bg-gradient-to-r from-green-500/15 via-cyan-500/15 to-purple-500/15 border-cyan-400/20 shadow-lg shadow-cyan-400/10"
              : "bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-500/20 shadow-lg shadow-amber-400/10"
          }`}>
            <div className="flex items-center justify-center space-x-2 ">
              <span className="text-2xl">{motivation.icon}</span>
              <h3 className={`text-lg font-bold ${isRunning ? "text-white" : "text-amber-100"}`}>
                {isRunning ? "Stay Strong" : "Take Your Time"}
              </h3>
            </div>
            <p className={`text-sm font-medium ${isRunning ? "text-gray-200" : "text-amber-200"}`}>
              {motivation.message}
            </p>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex gap-4 w-full relative z-10 mb-6">
          
          {/* Play/Pause Button */}
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex-1 relative group inline-flex items-center justify-center px-6 py-4 text-white font-bold rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 bg-gray-800/50 border border-white/10 hover:border-cyan-400/30"
          >
            <span className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-sm"></span>
            <span className="relative flex items-center">
              {isRunning ? (
                <Pause className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
              ) : (
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
              )}
              {isRunning ? "Pause" : "Resume"}
            </span>
          </button>

          {/* Reset Button */}
          <button
            onClick={() => {
              setIsRunning(false);
              localStorage.removeItem("timeLeft");
              setTimeLeft(initialTimer);
              onReset();
            }}
            className="px-6 py-4 bg-gray-800/50 hover:bg-gray-700/50 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 group border border-white/10 hover:border-red-400/30"
          >
            <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>

        {/* Exit Button */}
        <Link
          onClick={() => {
            setIsRunning(false);
            localStorage.setItem("timeLeft", timeLeft);
          }}
          to="/type"
          className="w-full relative group inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 bg-gray-900/50 border border-white/10 text-white"
        >
          <span className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur-sm"></span>
          <span className="relative flex items-center">
            <Home size={20} className="mr-3" />
            Exit Focus Mode
          </span>
        </Link>

        {/* Dismiss Motivation Toggle */}
        <button
          onClick={() => setShowMotivation(!showMotivation)}
          className="mt-4 text-xs text-gray-500 hover:text-gray-400 transition-colors"
        >
          {showMotivation ? "Hide motivation" : "Show motivation"}
        </button>
      </div>
    </div>
  );
};

export default Timer;
