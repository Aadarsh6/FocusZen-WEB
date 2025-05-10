// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Timer = ({ initialTimer, onComplete, onReset }) => {  //NEW PROP OnRest
//   const storeTimeLeft = localStorage.getItem("timeLeft")
//   const [timeLeft, setTimeLeft] = useState(storeTimeLeft ? Number(storeTimeLeft) : initialTimer);
//   const [isRunning, setIsRunning] = useState(true);

  
  
//   useEffect(()=>{
//     if(timeLeft >= 0) {
//       localStorage.setItem("timeLeft", timeLeft);
//   }
// },[timeLeft])

// useEffect(()=>{
//   setTimeLeft(initialTimer)
// },[initialTimer])

// // ⏳ Countdown logic

//   useEffect(() => {
//     let timer;
//     if (isRunning && timeLeft > 0) {
//       timer = setTimeout(() => {
//         setTimeLeft((prevValue) => prevValue - 1);
//       }, 1000);
//     }
//     if (timeLeft === 0) {
//       setIsRunning(false);
//       onComplete();
//     }

//     return () => clearTimeout(timer);
//   }, [isRunning, timeLeft, onComplete]);

//   const formatTime = (seconds) => {
//     const min = String(Math.floor(seconds / 60)).padStart(2, "0");
//     const sec = String(Math.floor(seconds % 60)).padStart(2, "0");
//     return `${min}:${sec}`;
//   };

//   return (
//     <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-green-200 via-white to-green-100">
//       <div className="bg-white/90 p-10 md:p-16 rounded-3xl shadow-2xl backdrop-blur-sm w-11/12 max-w-md transition-all">
//         {/* Timer Display */}
//         <h1 className="text-7xl font-black text-green-700 text-center mb-6 drop-shadow-lg tracking-wider">
//           {formatTime(timeLeft)}
//         </h1>
//         <p className="text-center text-gray-600 mb-10 text-lg">
//           Focus timer is {isRunning ? "running" : "paused"}
//         </p>

//         {/* Button Controls */}
//         <div className="flex flex-col md:flex-row justify-center gap-6">
//           {/* Pause Button */}
//           <Link
            
//             onClick={() => setIsRunning(true)}
//             to="/type"
//             className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center"
//           >
//             Pause & Exit
//           </Link>

//           {/* Reset Button */}
//           <button
//             onClick={() => {
//               setIsRunning(false);
//               localStorage.removeItem("timeLeft")
//               setTimeLeft(initialTimer);
//               onReset()   //OnRest
//             }}
//             className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
//           >
//             Reset
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Timer;




//v2.1 UI/UX responsive too


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Timer = ({ initialTimer, onComplete, onReset }) => {
  const storeTimeLeft = localStorage.getItem("timeLeft");
  const [timeLeft, setTimeLeft] = useState(
    storeTimeLeft && Number(storeTimeLeft) > 0 ? Number(storeTimeLeft) : initialTimer
  );
  const [isRunning, setIsRunning] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      window.postMessage({ type: "TIME_UPDATE", timeLeft }, "*"); // Update every second
    }, 1000);
  
    return () => clearInterval(interval);
  }, [timeLeft]);
  

  useEffect(() => {
    if (timeLeft >= 0) {
      localStorage.setItem("timeLeft", timeLeft);
    }
  }, [timeLeft]);

  useEffect(() => {
    if(!storeTimeLeft || storeTimeLeft <=0){
      setTimeLeft(initialTimer);
    }
  }, [initialTimer, storeTimeLeft]);


  //Countdown
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prevValue) => prevValue - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);


  //handel completion
  useEffect(()=>{
    if (timeLeft === 0) {
      setIsRunning(false);
      onComplete();
      // Trigger completion animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }
  },[isRunning, timeLeft, onComplete])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const progressPercentage = (timeLeft / initialTimer) * 100;
  
  // Calculate time-based color gradients - NEW COLOR SCHEME
  const getColorClass = () => {
    const percentage = (timeLeft / initialTimer) * 100;
    if (percentage > 60) return "from-teal-700 to-cyan-800";
    if (percentage > 25) return "from-cyan-700 to-blue-800";
    return "from-orange-700 to-red-800";
  };

  // Format for human-readable time left
  const getTimeLeftText = () => {
    if (timeLeft < 60) return `${timeLeft} seconds left`;
    if (timeLeft < 3600) return `${Math.ceil(timeLeft / 60)} minutes left`;
    return `${Math.floor(timeLeft / 3600)}h ${Math.floor((timeLeft % 3600) / 60)}m left`;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md p-8 rounded-3xl bg-slate-900 shadow-xl border border-slate-800 relative overflow-hidden">
      
      {/* Timer Header */}
      <div className="relative z-10 w-full flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${isRunning ? "bg-teal-400 animate-pulse" : "bg-amber-400"}`}></div>
          <p className="ml-2 text-sm font-medium text-slate-300">
            {isRunning ? "Focus in progress" : "Timer paused"}
          </p>
        </div>
        <div className="text-sm font-medium text-slate-300">{getTimeLeftText()}</div>
      </div>
      
      {/* Timer Display with Progress Ring */}
      <div className={`relative flex items-center justify-center mb-10 ${isAnimating ? "animate-bounce" : ""}`}>
        {/* Background ring */}
        <svg className="w-72 h-72" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#27374d"
            strokeWidth="8"
          />
          {/* Progress ring */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * progressPercentage) / 100}
            transform="rotate(-90 50 50)"
            className="transition-all duration-300 ease-in-out"
            style={{ filter: "drop-shadow(0 0 6px rgba(45, 212, 191, 0.5))" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
        </svg>

        {/* Timer Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-white tracking-tight">
            {formatTime(timeLeft)}
          </h1>
          <p className={`text-sm mt-2 font-semibold ${isRunning ? "text-teal-400" : "text-amber-400"}`}>
            {isRunning ? "Focus mode" : "Paused"}
          </p>
        </div>
      </div>

      {/* Motivation Message */}
      <div className={`w-full text-center text-sm font-medium px-5 py-3 rounded-xl mb-8 shadow-md transition-all duration-300 ${isRunning
        ? `bg-gradient-to-r ${getColorClass()} text-white`
        : "bg-amber-900 text-amber-200 border border-amber-800"
        }`}>
        {isRunning
          ? timeLeft > initialTimer * 0.75 
            ? "🚀 Great start! Stay in the zone and focus on your task."
            : timeLeft > initialTimer * 0.3
              ? "⏳ You're making excellent progress! Keep it up."
              : "🔥 Almost there! Push through to the finish line."
          : "⏸️ Your focus session is currently paused."}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 w-full relative z-10">
        {/* Pause & Exit */}
        <Link
          onClick={() => {
            setIsRunning(false);
            localStorage.setItem("timeLeft", timeLeft);
          }}
          
          to="/type"
          className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-4 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center transform hover:-translate-y-1"
        >
          <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Pause & Exit
        </Link>

        {/* Reset */}
        <button
          onClick={() => {
            setIsRunning(false);
            localStorage.removeItem("timeLeft");
            setTimeLeft(initialTimer);
            onReset();
          }}
          className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold py-4 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center transform hover:-translate-y-1"
        >
          <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>
      </div>
      
      {/* Additional controls - Play/Pause toggle (optional) */}
      {!isRunning && timeLeft > 0 && (
        <button
          onClick={() => setIsRunning(true)}
          className="mt-6 inline-flex items-center justify-center text-sm text-slate-400 hover:text-teal-400 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Resume Focus Session
        </button>
      )}
    </div>
  );
};

export default Timer;