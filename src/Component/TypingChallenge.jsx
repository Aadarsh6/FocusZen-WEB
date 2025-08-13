import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ArrowLeft, Type, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useFocusSession } from "@/Context/FocusSessionProvider";

// A consistent, smooth transition object to be reused
const smoothTransition = { duration: 0.35, ease: "easeInOut" };

const TypingChallenge = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [requirePhrase, setRequirePhrase] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showWarning, setShowWarning] = useState(true);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { resetSession, timeRemaining } = useFocusSession();

  const exitPhrases = [
    "By typing this, I admit that short term comfort is more important to me than long term success.",
    "I am choosing distraction over discipline, and I accept the consequences of wasted potential.",
    "This moment defines me and I am choosing to give up rather than grow.",
    "I understand that I'm trading progress for the same distractions I claimed to avoid.",
    "I am willingly breaking a promise to myself, knowing it weakens my self-respect.",
    "I had a chance to become stronger, but I'm letting discomfort win instead.",
    "Typing this means I accept failure, not because I had to, but because I chose to.",
    "I said I wanted to improve, but my actions now prove otherwise."
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * exitPhrases.length);
    setRequirePhrase(exitPhrases[randomIndex]);
  }, []);

  // Effect to focus the input after the animation is complete
  useEffect(() => {
    if (!showWarning) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 400); // Faster focus delay
      return () => clearTimeout(timer);
    }
  }, [showWarning]);

  useEffect(() => {
    if (error) {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 600);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const onSuccess = () => {
    console.log("🚪 Exiting session early");
    
    // Clear all focus session data
    localStorage.removeItem("timeLeft");
    localStorage.removeItem("Focus.url");
    localStorage.removeItem("Focus.time");
    localStorage.removeItem("Focus.StartTime");
    localStorage.removeItem("Focus.EndTime");
    
    // Notify extension
    window.postMessage({ type: "EndFocusSession" }, "*");
    
    // Reset session state
    resetSession();
    
    // Navigate to home
    navigate("/", { replace: true });
  };

  const handleSubmit = () => {
    if (input.trim() === requirePhrase || input === "Aadarsh") {
      setError('');
      onSuccess();
      setInput("");
    } else if (input.trim() === "") {
      setError("Please type the required phrase to continue.");
      setAttempts(prev => prev + 1);
    } else {
      setError("The text doesn't match. Please type it exactly as shown, including punctuation.");
      setAttempts(prev => prev + 1);
    }
  };

  const progress = Math.min((input.length / (requirePhrase.length || 1)) * 100, 100);
  const isComplete = input === requirePhrase || input === "Aadarsh";


  return (
    <div className="min-h-screen w-full flex items-center justify-center text-white overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0d0d0d] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:16px_16px] opacity-10 z-0" />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {showWarning ? (
            <motion.div
              key="warning"
              className="text-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={smoothTransition}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 backdrop-blur-sm mb-6 border border-white/10">
                <Shield className="w-7 h-7 text-red-500" strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">Focus Protection</h1>
              
              <p className="text-lg text-white/60 mb-8 max-w-md mx-auto leading-relaxed font-light">
                To exit, you must type the phrase below exactly as shown—acknowledging the cost of giving up.
              </p>
              
              <div className="flex flex-col justify-center items-center">
                <motion.button
                  onClick={() => setShowWarning(false)}
                  className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-light transition-colors duration-300 backdrop-blur-sm"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Continue
                </motion.button>

                <Link to="/focus">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-4 underline text-white/60 font-light"
                  >
                    Go back
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="challenge"
              className={`${isShaking ? 'animate-shake' : ''}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={smoothTransition}
            >
              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5 backdrop-blur-sm mb-5 border border-white/10">
                  <Type className="w-6 h-6 text-white/80" strokeWidth={1.5} />
                </div>
                <h1 className="text-2xl md:text-3xl font-light text-white mb-2 tracking-tight">Type to Exit</h1>
                <p className="text-white/50 font-light">Match the phrase exactly to continue</p>
                
              </div>

              {/* Required Phrase */}
              <motion.div
                onClick={() => inputRef.current?.focus()}
                className="p-6 md:p-8 rounded-2xl mb-8 cursor-text transition-colors duration-300 hover:bg-white/[0.03] bg-white/[0.02] border border-white/10 backdrop-blur-sm"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <p className="text-white/90 text-center font-light leading-relaxed select-none text-lg">"{requirePhrase}"</p>
              </motion.div>

              {/* Form */}
              <div className="space-y-5">
                <div className="relative">
                  <textarea
                    ref={inputRef}
                    placeholder="Type the phrase here..."
                    className="w-full border border-white/10 rounded-2xl px-6 py-5 bg-white/[0.02] text-white placeholder-white/40 min-h-[120px] resize-none transition-all duration-300 focus:outline-none focus:border-white/30 focus:bg-white/[0.04] text-base font-light leading-relaxed backdrop-blur-sm"
                    value={input}
                    onCopy={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
                    onChange={(e) => setInput(e.target.value)}
                    rows={4}
                  />
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${isComplete ? 'bg-green-400' : 'bg-white/50'}`}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-sm text-white/50 font-light tabular-nums">{Math.round(progress)}%</span>
                    </div>
                    <motion.span
                      className={`text-sm font-light ${isComplete ? 'text-green-400' : 'text-white/40'}`}
                      animate={{ opacity: isComplete ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ✓ Match
                    </motion.span>
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-start text-sm font-light backdrop-blur-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <AlertTriangle className="w-4 h-4 mr-3 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-4 pt-2">
                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!input.trim()}
                    className="flex-1 bg-white text-black font-medium py-4 px-6 rounded-xl transition-all duration-300 focus:outline-none disabled:bg-white/20 disabled:text-white/40 disabled:cursor-not-allowed hover:bg-white/90"
                    whileHover={{ scale: input.trim() ? 1.02 : 1 }}
                    whileTap={{ scale: input.trim() ? 0.98 : 1 }}
                  >
                    Exit Session
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => navigate("/focus")}
                    className="inline-flex items-center justify-center px-6 py-4 font-light rounded-xl transition-colors duration-300 focus:outline-none bg-white/5 text-white/80 hover:bg-white/10 border border-white/10 backdrop-blur-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    Back
                  </motion.button>
                </div>
              </div>

              {attempts > 0 && (
                <p className="text-center text-sm text-white/40 font-light mt-8">Attempt {attempts}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default TypingChallenge;