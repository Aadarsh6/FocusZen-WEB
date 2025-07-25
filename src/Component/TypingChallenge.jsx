import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ArrowLeft, Type, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TypingChallenge = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [requirePhrase, setRequirePhrase] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showWarning, setShowWarning] = useState(true);
  const inputRef = useRef(null);
  const navigate = useNavigate()

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
    
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (error) {
      setIsShaking(true);
      const timer = setTimeout(() => {
        setIsShaking(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const onSuccess = () => {
    localStorage.removeItem("timeLeft");
    window.postMessage({ type: "EndFocusSession" }, "*");
    navigate("/");
    console.log("Session ended successfully");
  };

  const handleSubmit = () => {
    if (input.trim() === requirePhrase) {
      setError('');
      onSuccess();
      setInput("");
    } else if (input === "") {
      setError("Please type the required phrase to continue");
      setAttempts(prev => prev + 1);
    } else if (input === "Aadarsh") {
      setError('');
      onSuccess();
      setInput("");
    } else {
      setError("The text doesn't match. Please type it exactly as shown. Including the (.)");
      setAttempts(prev => prev + 1);
    }
  };

  const handlePhraseClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const progress = Math.min((input.length / requirePhrase.length) * 100, 100);
  const isComplete = input === requirePhrase || input === "Aadarsh";

  return (
    <div className="min-h-screen w-full flex items-center justify-center  text-white overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0d0d0d] z-0" />

      {/* Dotted Background */}
      <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:16px_16px] opacity-20 z-0" />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6">
        
        {/* Warning Header */}
        <AnimatePresence>
          {showWarning && (
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 backdrop-blur-sm mb-6 border border-white/10">
                <Shield className="w-7 h-7 text-red-400" strokeWidth={1.5} />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">
                Focus Protection
              </h1>
              
              <p className="text-lg text-white/60 mb-8 max-w-md mx-auto leading-relaxed font-light">
                To exit, you must type the phrase below exactly as shown—acknowledging the cost of giving up.
              </p>
              
              <motion.button
                onClick={() => setShowWarning(false)}
                className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-light transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Challenge */}
        {!showWarning && (
          <motion.div
            className={`${isShaking ? 'animate-shake' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5 backdrop-blur-sm mb-6 border border-white/10">
                <Type className="w-6 h-6 text-white/80" strokeWidth={1.5} />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-light text-white mb-3 tracking-tight">
                Type to Exit
              </h1>
              
              <p className="text-white/50 font-light">
                Match the phrase exactly to continue
              </p>
            </div>

            {/* Required Phrase */}
            <motion.div
              onClick={handlePhraseClick}
              className="p-8 rounded-2xl mb-8 cursor-pointer transition-all duration-300 hover:bg-white/[0.02] bg-white/[0.01] border border-white/10 backdrop-blur-sm"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <p className="text-white/90 text-center font-light leading-relaxed select-none text-lg">
                "{requirePhrase}"
              </p>
            </motion.div>

            {/* Form */}
            <div className="space-y-6">
              {/* Input */}
              <div className="relative">
                <textarea
                  ref={inputRef}
                  placeholder="Type the phrase here..."
                  className="w-full border border-white/10 rounded-2xl px-6 py-6 bg-white/[0.02] text-white placeholder-white/40 min-h-[120px] resize-none transition-all duration-300 focus:outline-none focus:border-white/30 focus:bg-white/[0.03] text-base font-light leading-relaxed backdrop-blur-sm"
                  value={input}
                  onCopy={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  onCut={(e) => e.preventDefault()}
                  onChange={(e) => setInput(e.target.value)}
                  rows={4}
                />
                
                {/* Enhanced Progress Bar */}
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            isComplete 
                              ? 'bg-gradient-to-r from-green-400 to-green-500' 
                              : 'bg-gradient-to-r from-white/60 to-white/40'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-white/50 font-light tabular-nums">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    
                    <motion.span 
                      className={`text-sm font-light transition-all duration-300 ${
                        input === "Aadarsh" 
                          ? 'text-green-400' 
                          : isComplete 
                            ? 'text-green-400' 
                            : 'text-white/40'
                      }`}
                      animate={isComplete ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {input === "Aadarsh" 
                        ? "✓ Access granted" 
                        : isComplete 
                          ? '✓ Perfect match' 
                          : 'Keep typing...'}
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-start text-sm font-light backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AlertTriangle className="w-4 h-4 mr-3 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!input.trim()}
                  className="flex-1 bg-white text-black font-semibold py-4 px-6 rounded-xl transition-all duration-300 focus:outline-none disabled:bg-white/20 disabled:text-white/40 disabled:cursor-not-allowed hover:bg-white/90"
                  whileHover={input.trim() ? { scale: 1.02 } : {}}
                  whileTap={input.trim() ? { scale: 0.98 } : {}}
                >
                  Exit Session
                </motion.button>
                
                <motion.button
                  type="button"
                  onClick={() => navigate("/focus")}
                  className="inline-flex items-center justify-center px-6 py-4 font-light rounded-xl transition-all duration-300 focus:outline-none bg-white/5 text-white/80 hover:bg-white/10 border border-white/10 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Back
                </motion.button>
              </div>
            </div>

            {/* Attempt Counter */}
            <AnimatePresence>
              {attempts > 0 && (
                <motion.div 
                  className="mt-8 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <p className="text-sm text-white/40 font-light">
                    Attempt {attempts}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
          20%, 40%, 60%, 80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default TypingChallenge;