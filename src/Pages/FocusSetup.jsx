import { useEffect, useRef, useState } from "react";
import { Clock, Link, X, Plus, Brain, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "../Component/NavBar";
import { useTheme } from "../Context";

const FocusSetup = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [urls, setUrls] = useState([""]);
  const [time, setTime] = useState(30);
  const [error, setError] = useState("");
  const [customTimeActive, setCustomTimeActive] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(null);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const errorRef = useRef(null);

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [error]);

  const handleUrl = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);

    if (value && !value.includes(".") && !value.endsWith(".com")) {
      setActiveSuggestionIndex(index);
      setShowSuggestion(true);
    } else {
      setShowSuggestion(false);
    }
  };

  const addUrlField = () => {
    if (urls.length >= 3) {
      setError("Free version is limited to 3 websites.");
    } else {
      setUrls([...urls, ""]);
      setError("");
    }
  };

  const removeUrlField = (index) => {
    if (urls.length > 1) {
      const newUrls = urls.filter((_, i) => i !== index);
      setUrls(newUrls);
    } else {
      setUrls([""]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hiddenUrl = ["https://focuszen.vercel.app/", "http://localhost:5173/focus"];
    const validUserUrls = urls.filter(url => url.trim() !== "");
    
    if (validUserUrls.length === 0) {
      setError("Please enter at least one website URL to allow.");
      return;
    }
    
    if (!time || time <= 0) {
      setError("Session duration must be at least 1 minute.");
      setTime(1);
      return;
    }

    const allValidUrls = [...validUserUrls, ...hiddenUrl];
    const focusTime = parseInt(time);
    const startTime = Date.now();
    const endTime = startTime + focusTime * 60 * 1000;

    localStorage.setItem("Focus.url", JSON.stringify(allValidUrls));
    localStorage.setItem("Focus.time", focusTime);
    localStorage.setItem("Focus.StartTime", startTime);
    localStorage.setItem("Focus.EndTime", endTime);
    
    navigate("/focus");
  };

  const timeOptions = [30, 45, 60, 90, 120];

  // Theme-aware styles
  const bgClass = theme === 'light' ? 'bg-slate-50' : 'bg-gray-950';
  const textPrimary = theme === 'light' ? 'text-slate-800' : 'text-white';
  const textSecondary = theme === 'light' ? 'text-slate-600' : 'text-gray-400';
  const panelBg = theme === 'light' 
    ? 'bg-white/80 border-slate-200/50' 
    : 'bg-gray-900/50 border-white/10';
  const inputStyle = `w-full border rounded-lg px-4 py-3 transition-colors duration-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 ${
    theme === 'light' 
      ? 'bg-slate-100 text-slate-900 border-slate-300 placeholder-slate-500' 
      : 'bg-gray-900/50 text-white border-white/10 placeholder-gray-500'
  }`;
  const accentGradient = "from-green-400 via-cyan-400 to-purple-500";

  return (
    <div className={`min-h-screen ${bgClass} ${textPrimary} font-sans transition-colors duration-500`}>
      <NavBar />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {theme === 'dark' && (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </>
        )}
      </div>

      {/* Main Content - Properly positioned below navbar */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-24 pb-8">
        <motion.div 
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${textPrimary}`}>
              Design Your <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>Focus Zone</span>
            </h1>
            <p className={`${textSecondary} text-lg max-w-xl mx-auto`}>
              Configure your environment. The mind will follow.
            </p>
          </div>

          {/* Form Panel with Enhanced Styling */}
          <div className="relative group">
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${accentGradient} rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000`}></div>
            <div className={`relative ${panelBg} border rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden`}>
              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                
                {/* Allowed Websites Section */}
                <div className="space-y-4">
                  <h2 className={`text-xl font-bold flex items-center ${textPrimary}`}>
                    <Link size={20} className="mr-3 text-cyan-400" />
                    Allowed Websites
                  </h2>
                  <AnimatePresence>
                    {urls.map((url, index) => (
                      <motion.div
                        key={index}
                        className="relative flex items-center space-x-2"
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        <div className="flex-grow relative">
                          <input
                            className={inputStyle}
                            type="text"
                            placeholder="e.g., wikipedia.org"
                            value={url}
                            onChange={(e) => handleUrl(index, e.target.value)}
                            onFocus={() => {
                              if (url && !url.includes(".") && !url.endsWith(".com")) {
                                setActiveSuggestionIndex(index);
                                setShowSuggestion(true);
                              }
                            }}
                            onBlur={() => setTimeout(() => setShowSuggestion(false), 200)}
                            onKeyDown={(e) => {
                              const isSuggesting = showSuggestion && activeSuggestionIndex === index && !url.includes(".");
                              if (e.key === "Tab" && isSuggesting) {
                                e.preventDefault();
                                handleUrl(index, url + ".com");
                              }
                              if (e.key === "Enter" && isSuggesting) {
                                e.preventDefault();
                                handleUrl(index, url + ".com");
                              }
                            }}
                          />
                          {showSuggestion && activeSuggestionIndex === index && url && !url.includes('.') && (
                            <div className={`absolute top-full mt-2 w-full border text-sm px-3 py-2 rounded-md shadow-lg z-10 flex items-center justify-between ${
                              theme === 'light' 
                                ? 'bg-white border-slate-300 text-slate-800' 
                                : 'bg-gray-800 border-white/10 text-white'
                            }`}>
                              <span>Add <span className="font-semibold text-cyan-400">.com</span>?</span>
                              <span className={`text-xs px-2 py-1 rounded ${
                                theme === 'light' ? 'bg-slate-200 text-slate-600' : 'bg-gray-700 text-gray-300'
                              }`}>Tab</span>
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeUrlField(index)}
                          className={`p-2 rounded-full transition-all ${
                            theme === 'light' 
                              ? 'text-gray-500 hover:text-red-500 hover:bg-slate-200' 
                              : 'text-gray-500 hover:text-red-500 hover:bg-white/5'
                          }`}
                          aria-label="Remove URL"
                        >
                          <X size={18} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <button
                    type="button"
                    onClick={addUrlField}
                    disabled={urls.length >= 3}
                    className="flex items-center text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors disabled:text-gray-600 disabled:cursor-not-allowed"
                  >
                    <Plus size={16} className="mr-2" />
                    Add another website
                  </button>
                </div>

                {/* Session Duration Section */}
                <div className="space-y-4">
                  <h2 className={`text-xl font-bold flex items-center ${textPrimary}`}>
                    <Clock size={20} className="mr-3 text-cyan-400" />
                    Session Duration
                  </h2>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {timeOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`py-3 rounded-lg text-sm font-bold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 ${
                          theme === 'light' ? 'focus:ring-offset-slate-50' : 'focus:ring-offset-gray-950'
                        } ${
                          time === option && !customTimeActive
                            ? (theme === 'light' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900') + ' shadow-lg scale-105'
                            : (theme === 'light' ? 'bg-slate-200 text-gray-700 hover:bg-slate-300' : 'bg-gray-900/60 text-gray-300 hover:bg-gray-900/90')
                        }`}
                        onClick={() => { setTime(option); setCustomTimeActive(false); }}
                      >
                        {option} min
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <input
                      className={`${inputStyle} text-center`}
                      type="number"
                      placeholder="Or enter a custom time"
                      value={time || ''}
                      min="1"
                      onChange={(e) => setTime(Number(e.target.value))}
                      onFocus={() => setCustomTimeActive(true)}
                    />
                    <span className={`absolute right-4 top-1/2 -translate-y-1/2 ${textSecondary}`}>minutes</span>
                  </div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg flex items-center text-sm"
                      ref={errorRef}
                      tabIndex={-1}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <AlertTriangle size={18} className="mr-3 flex-shrink-0" />
                      <span>{error}</span>
                      <button onClick={() => setError("")} className="ml-auto p-1 rounded-full hover:bg-white/10">
                        <X size={16}/>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className={`w-full relative group inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 ${
                      theme === 'light' ? 'bg-gray-900 text-white' : 'bg-white/10 text-white'
                    }`}
                  >
                    <span className={`absolute -inset-0.5 rounded-full bg-gradient-to-r ${accentGradient} opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur-sm`}></span>
                    <span className="relative flex items-center">
                      <Brain size={20} className="mr-3" />
                      Start Focus Session
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default FocusSetup;
