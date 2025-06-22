import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ArrowLeft, Type, Shield } from "lucide-react";
import { useTheme } from "../Context";

const TypingChallenge = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [requirePhrase, setRequirePhrase] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showWarning, setShowWarning] = useState(true);
  const inputRef = useRef(null);

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
    
    // Auto-focus input after a delay
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle error animation
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (input.trim() === requirePhrase) {
      setError('');
      onSuccess();
      setInput("");
    } else if (input === "") {
      setError("Please type the required phrase to continue");
      setAttempts(prev => prev + 1);
    } else if (input === "Aadarsh") { // Developer bypass
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

  // Theme-aware styles
  const bgClass = theme === 'light' ? 'bg-slate-50' : 'bg-gray-950';
  const textPrimary = theme === 'light' ? 'text-slate-800' : 'text-gray-100';
  const textSecondary = theme === 'light' ? 'text-slate-600' : 'text-gray-400';
  const cardBg = theme === 'light' ? 'bg-white/80 border-slate-200/50' : 'bg-gray-900/50 border-white/10';
  const inputStyle = `w-full border rounded-xl px-4 py-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400/50 ${
    theme === 'light' 
      ? 'bg-slate-100 text-slate-900 border-slate-300 placeholder-slate-500' 
      : 'bg-gray-900/50 text-white border-white/10 placeholder-gray-500'
  }`;

  return (
    <div className={`min-h-screen ${bgClass} font-sans flex flex-col items-center justify-center transition-all duration-500 px-4 py-8`}>
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {theme === 'dark' && (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </>
        )}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        
        {/* Warning Header */}
        <AnimatePresence>
          {showWarning && (
            <motion.div
              className="mb-8 p-6 rounded-2xl border backdrop-blur-sm bg-red-500/10 border-red-500/20 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Shield size={32} className="text-red-400 mr-3" />
                <h2 className={`text-2xl font-bold ${textPrimary}`}>Focus Protection Active</h2>
              </div>
              <p className={`${textSecondary} mb-4`}>
                To exit your focus session, you must acknowledge the cost of giving up by typing the phrase below exactly as shown.
              </p>
              <button
                onClick={() => setShowWarning(false)}
                className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
              >
                I understand, continue →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Challenge Card */}
        {!showWarning && (
          <motion.div
            className={`${cardBg} border rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden ${
              isShaking ? 'animate-shake' : ''
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-8">
              
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Type size={24} className="text-red-5 00 mr-3" />
                  <h1 className={`text-2xl font-bold ${textPrimary}`}>
                    Type to Exit Focus Mode
                  </h1>
                </div>
                <p className={`${textSecondary}`}>
                  Type the phrase below exactly as shown to exit your session
                </p>
              </div>

              {/* Required Phrase Display */}
              <div
                onClick={handlePhraseClick}
                className={`p-6 rounded-xl mb-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  theme === 'light' 
                    ? 'bg-slate-100 hover:bg-slate-200 border border-slate-300' 
                    : 'bg-gray-800/50 hover:bg-gray-800/70 border border-white/10'
                }`}
              >
                <p className={`${textPrimary} text-center font-medium leading-relaxed select-none`}>
                  "{requirePhrase}"
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <textarea
                    ref={inputRef}
                    placeholder="Type the phrase exactly as shown above..."
                    className={`${inputStyle} min-h-[120px] resize-none`}
                    value={input}
                    onCopy={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                    onCut={(e) => e.preventDefault()}
                    onChange={(e) => setInput(e.target.value)}
                    rows={4}
                  />
                  
                  {/* Character Count */}
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-xs ${textSecondary}`}>
                      {input.length} / {requirePhrase.length} characters
                    </span>
                    <span className={`text-xs ${
                      input === "Aadarsh" ? 'text-green-500' : input === requirePhrase ? 'text-green-500' : textSecondary
                    }`}>
                      {input === "Aadarsh" ? "Welcome sir" : input === requirePhrase ? '✓ Match!' : 'Keep typing...'}
                    </span>
                  </div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg flex items-center text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <AlertTriangle size={18} className="mr-3 flex-shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/50"
                  >
                    Exit Focus Session
                  </button>
                  
                  <Link
                    to="/focus"
                    className={`inline-flex items-center justify-center px-6 py-4 font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 ${
                      theme === 'light' 
                        ? 'bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-400 focus:ring-offset-slate-50' 
                        : 'bg-white/10 text-white hover:bg-white/20 focus:ring-white/50 focus:ring-offset-gray-950'
                    } border border-white/10`}
                  >
                    <ArrowLeft size={20} className="mr-2" />
                    Go Back
                  </Link>
                </div>
              </form>

              {/* Attempt Counter */}
              {attempts > 0 && (
                <div className="mt-6 text-center">
                  <p className={`text-sm ${textSecondary}`}>
                    Attempts: {attempts}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default TypingChallenge;
