import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "../Component/Timer";
import { useFocusSession } from "@/Context/FocusSessionProvider";

const Focus = () => {
  const navigate = useNavigate();
  const [wrongTab, setWrongTab] = useState(false);
  const { completeSession, urls, duration, status } = useFocusSession();

  console.log("🎯 Focus component loaded:", { urls, duration, status });

  // Send focus session data to extension
  useEffect(() => {
    if (urls.length > 0 && duration > 0) {
      window.postMessage({
        type: "FocusSessionData",
        allowedSites: urls,
        focusTime: duration,
      }, "*");
      console.log("📤 Posted focus session data to extension:", urls, duration);
    }
  }, [urls, duration]);

  // Check if current tab is allowed (for in-app focus reminder)
  useEffect(() => {
    if (urls.length === 0) return;
    
    const checkTab = setInterval(() => {
      const currentTab = window.location.href;
      const isAllowed = urls.some((url) => currentTab.includes(url));
      setWrongTab(!isAllowed);
    }, 1000);
    
    return () => clearInterval(checkTab);
  }, [urls]);

  // Handle session completion
  const handleTimerComplete = () => {
    try {
      console.log("⏰ Timer completed");
      
      // Notify extension
      window.postMessage({
        type: "EndFocusSession"
      }, "*");

      // Play completion sound
      const audio = new Audio("/sound.wav");
      audio.play().catch(err => console.log("🔇 Audio play error:", err));
      
      // Update session state to complete - this will trigger route guard
      completeSession();
      
      console.log("✅ Session completed, route guard should handle redirect");
      
    } catch (error) {
      console.error("❌ Error completing session:", error);
      // Fallback navigation
      navigate("/success", { replace: true });
    }
  };

  const handleTimerReset = () => {
    window.postMessage({
      type: "EndFocusSession"
    }, "*");
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center text-white bg-[#030b13] overflow-hidden">
      {/* Dark Base Background */}
      <div className="absolute inset-0 bg-[#0d0d0d] z-0" />

      {/* Dotted Background */}
      <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:16px_16px] opacity-20 z-0" />

      {/* Timer Component */}
      <div className="w-full z-10">
        <Timer 
          initialTimer={duration * 60} 
          onComplete={handleTimerComplete} 
          onReset={handleTimerReset} 
        />
      </div>

      {/* Wrong Tab Overlay */}
      {wrongTab && (
        <div className="fixed top-0 left-0 w-full h-full bg-red-900/70 flex justify-center items-center text-3xl font-bold z-50">
          STAY FOCUSED!
        </div>
      )}
    </div>
  );
};

export default Focus;