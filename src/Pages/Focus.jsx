import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "../Component/Timer";

const Focus = () => {
  const navigate = useNavigate();
  const [wrongTab, setWrongTab] = useState(false);

  const urls = JSON.parse(localStorage.getItem("Focus.url") || "[]");
  const time = parseInt(localStorage.getItem("Focus.time") || "0");
  // const endTime = parseInt(localStorage.getItem("Focus.EndTime") || "0");
  // const currentTime = Date.now();
  // const remainingSeconds = Math.floor((endTime - currentTime) / 1000);

  // 🔁 Send focus session data to extension
  useEffect(() => {
    window.postMessage(
      {
        type: "FocusSessionData",
        allowedSites: urls,
        focusTime: time,
      },
      "*"
    );
    console.log("📤 Posted focus session data to extension:", urls, time);
  }, []);

  // 🚫 Check if current tab is an allowed site (for in-app focus reminder)
  useEffect(() => {
    const checkTab = setInterval(() => {
      const currentTab = window.location.href;
      const isAllowed = urls.some((e) => currentTab.includes(e));
      setWrongTab(!isAllowed);
    }, 1000);
    return () => clearInterval(checkTab);
  }, [urls]);

  const handleSuccess = () => {
    window.postMessage({
      type: "EndFocusSession"
    }, "*");

    const audio = new Audio("/sound.wav");
    audio.play().catch(err => console.log("🔇 Audio play error:", err));

    navigate("/success");
  };

  const handleReset =() =>{  // ADDED OnRest HERE CREATED A SPECIAL FN
    window.postMessage({
      type: "EndFocusSession"
    }, "*")
  };

  return (
<div className="relative flex flex-col justify-center items-center min-h-screen gap-4 text-white bg-[#030b13] overflow-hidden">

  1. Gradient Glow Blobs
  <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-purple-700/20 rounded-full blur-3xl animate-pulse" />
  <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-cyan-400/20 rounded-full blur-2xl animate-pulse delay-1000" />
  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-emerald-500/10 rounded-full blur-2xl animate-pulse delay-500" />

  {/* 2. Starfield Layer (subtle flicker) */}
  <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:15px_15px] opacity-[0.05] z-0 animate-[pulse_6s_ease-in-out_infinite]" />

  {/* 3. Noise Overlay */}
  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 z-0 pointer-events-none" />

  {/* 4. Main Content (Timer) */}
  <div className="w-full mt-5 z-10">
    <Timer initialTimer={time * 60} onComplete={handleSuccess} onReset={handleReset} />
  </div>

  {/* 5. Tab Warning */}
  {wrongTab && (
    <div className="fixed top-0 left-0 w-full h-full bg-red-900/70 flex justify-center items-center text-3xl font-bold z-50">
      STAY FOCUSED!
    </div>
  )}
</div>

  );
};

export default Focus;