import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "../Component/Timer";
import { useFocusSession } from "@/Context/FocusSessionProvider";

const Focus = () => {
  const navigate = useNavigate();
  const [wrongTab, setWrongTab] = useState(false);
  const { completeSession, urls, duration, status } = useFocusSession();

  console.log(" Focus component loaded:", { urls, duration, status });

  // Send focus session data to extension when component mounts or session changes
  useEffect(() => {
    if (urls.length > 0 && duration > 0) {
      const sessionData = {
        type: "FocusSessionData",
        allowedSites: urls,
        focusTime: duration,
        status: status
      };
      
      window.postMessage(sessionData, "*");
      console.log(" Posted focus session data to extension:", sessionData);
    }
  }, [urls, duration, status]);

  // Listen for messages from extension
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "FOCUS_SESSION_VIOLATED") {
        console.log("🚫 Focus session violation detected");
        setWrongTab(true);
        setTimeout(() => setWrongTab(false), 3000); // Auto-hide after 3 seconds
      } else if (event.data.type === "FOCUS_SESSION_COMPLIANT") {
        setWrongTab(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Check if current tab is allowed (backup check for in-app detection)
  useEffect(() => {
    if (urls.length === 0) return;
    
    const checkCurrentPage = () => {
      const currentUrl = window.location.href;
      const isAllowed = urls.some((url) => currentUrl.includes(url));
      
      // Only set wrongTab if we're not on an allowed page and not already showing the warning
      if (!isAllowed && !wrongTab) {
        console.log(" Current page not in allowed list:", currentUrl);
        // Don't automatically show wrong tab for the focus page itself
        // Let the extension handle this logic
      }
    };
    
    // Check immediately and then periodically
    checkCurrentPage();
    const interval = setInterval(checkCurrentPage, 5000); // Check every 5 seconds
    
    return () => clearInterval(interval);
  }, [urls, wrongTab]);

  // Handle session completion
  const handleTimerComplete = () => {
    try {
      console.log("Timer completed in Focus page");
      
      // Notify extension that session is ending
      window.postMessage({
        type: "EndFocusSession",
        reason: "completed"
      }, "*");

      // Play completion sound (with error handling)
      try {
        const audio = new Audio("/sound.wav");
        audio.play().catch(err => console.log("🔇 Audio play failed:", err.message));
      } catch (audioError) {
        console.log("Audio initialization failed:", audioError.message);
      }
      
      // this will trigger the route guard to redirect
      completeSession();
      
      console.log("✅ Session completion handled, route guard will redirect");
      
    } catch (error) {
      console.error(" Error handling timer completion:", error);
      
      // Fallback: direct navigation if completion fails
      setTimeout(() => {
        navigate("/success", { replace: true });
      }, 1000);
    }
  };


  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      // Only send end session if we're not completing normally
      if (status === 'active' || status === 'paused') {
        window.postMessage({
          type: "EndFocusSession",
          reason: "navigation"
        }, "*");
      }
    };
  }, []); 
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center text-white bg-[#030b13] overflow-hidden">
      {/* Dark Base Background */}
      <div className="absolute inset-0 bg-[#0d0d0d] z-0" />

      {/* Dotted Background */}
      <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:16px_16px] opacity-20 z-0" />

      {/* Timer Component */}
      <div className="w-full z-10">
        <Timer onComplete={handleTimerComplete} />
      </div>

      {/* Wrong Tab Overlay - Enhanced */}
      {wrongTab && (
        <div className="fixed inset-0 bg-red-900/80 backdrop-blur-sm flex flex-col justify-center items-center text-center z-50 p-8">
          <div className="bg-black/50 rounded-2xl p-8 border border-red-500/50">
            <div className="text-6xl mb-4">🚫</div>
            <h2 className="text-3xl font-bold mb-4">STAY FOCUSED!</h2>
            <p className="text-lg text-red-200 mb-6 max-w-md">
              You've navigated away from your allowed websites. 
              Return to your focus zone to continue your session.
            </p>
            <div className="flex items-center justify-center space-x-2 text-red-300">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Focus session still active</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Focus;