import { useRef, useState } from "react";
import { X, Plus, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "../Component/NavBar";

const FocusSetup = () => {
  const navigate = useNavigate();
  const [urls, setUrls] = useState([""]);
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [customTimeActive, setCustomTimeActive] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(null);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const errorRef = useRef(null);

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
    const hiddenUrl = ["https://focuszen.vercel.app/", "http://localhost:"];
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

  return (
    <>
      <NavBar />
      {/* Reduced top and bottom padding */}
      <section className="relative min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center text-center overflow-hidden pt-28 pb-16">
        
        {/* <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/bg3.jpg')" }}
          aria-hidden="true"
        /> */}

          <div className="absolute inset-0 bg-[#0d0d0d] z-0" />

      {/* Dotted Background */}
      <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:16px_16px] opacity-20 z-0" />
        <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.65))]"
          aria-hidden="true"
        />

        <motion.div 
          className="relative z-10 w-[80%] max-w-5xl mx-auto px-4 md:px-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >

          {/* Reduced margin bottom and font sizes */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <h1 className="font-jost text-3xl md:text-4xl font-semibold tracking-tight mb-3 leading-tight text-white/90">
              Design Your <span className="text-white font-bold">Focus Zone</span>
            </h1>
            <p className="text-base md:text-lg text-white/60 font-light leading-relaxed">
              Configure your environment. The mind will follow.
            </p>
          </motion.div>

          {/* Reduced space between form sections */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            
            {/* Reduced space inside section */}
            <div className="space-y-5">
              <h2 className="text-xl font-jost font-medium text-white/90 text-center">
                Allowed <span className="text-white font-medium">Websites</span>
              </h2>
              
              <div className="space-y-3">
                <AnimatePresence>
                  {urls.map((url, index) => (
                    <motion.div
                      key={index}
                      className="relative"
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <input
                        // Reduced vertical padding (py-2.5)
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 pr-10 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300"
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
                      <button
                        type="button"
                        onClick={() => removeUrlField(index)}
                        className="absolute top-1/2 right-2.5 -translate-y-1/2 p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all"
                        aria-label="Remove URL"
                      >
                        <X size={16} />
                      </button>

                      {showSuggestion && activeSuggestionIndex === index && url && !url.includes('.') && (
                        <div className="absolute top-full mt-2 w-full bg-black/80 border border-white/20 text-sm px-3 py-2 rounded-md backdrop-blur-sm z-10 flex items-center justify-between">
                          <span className="text-white/80">Add <span className="font-semibold text-white">.com</span>?</span>
                          <span className="text-xs px-2 py-1 rounded bg-white/10 text-white/60">Tab</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <button
                  type="button"
                  onClick={addUrlField}
                  disabled={urls.length >= 3}
                  className="flex items-center text-white/60 hover:text-white/90 text-sm font-light transition-colors disabled:text-white/30 disabled:cursor-not-allowed mx-auto pt-1"
                >
                  <Plus size={14} className="mr-1.5" />
                  Add another website
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <h2 className="text-xl font-jost font-medium text-white/90 text-center">
                Session <span className="text-white font-medium">Duration</span>
              </h2>
              
              <div className="mx-auto">
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 mb-3">
                  {timeOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      // Reduced padding and font size
                      className={`py-2.5 rounded-lg text-xs font-medium transition-all duration-300 focus:outline-none ${
                        time === option && !customTimeActive
                          ? 'bg-white text-black font-semibold'
                          : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white/90 border border-white/10'
                      }`}
                      onClick={() => { setTime(option); setCustomTimeActive(false); }}
                    >
                      {option} min
                    </button>
                  ))}
                </div>
                
                <div className="relative">
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-center text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                    type="number"
                    placeholder="Custom minutes"
                    value={time || ''}
                    min="1"
                    onChange={(e) => setTime(Number(e.target.value))}
                    onFocus={() => setCustomTimeActive(true)}
                  />
                </div>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-2.5 rounded-lg flex items-center text-sm mx-auto"
                  ref={errorRef}
                  tabIndex={-1}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
                  <span className="flex-1 text-left">{error}</span>
                  <button type="button" onClick={() => setError("")} className="ml-2 p-1 rounded-full hover:bg-white/10">
                    <X size={14}/>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.div
              className="pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <button
                type="submit"
                // Reduced padding and font size
                className="w-full px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all duration-300 text-base shadow-lg shadow-white/10 hover:scale-105"
              >
                Start Focus Session
              </button>
            </motion.div>
          </motion.form>
        </motion.div>
      </section>
    </>
  );
};

export default FocusSetup;