import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Timer = ({ initialTimer, onComplete, onReset }) => {  //NEW PROP OnRest
  const storeTimeLeft = localStorage.getItem("timeLeft")
  const [timeLeft, setTimeLeft] = useState(storeTimeLeft ? Number(storeTimeLeft) : initialTimer);
  const [isRunning, setIsRunning] = useState(true);

  
  
  useEffect(()=>{
    if(timeLeft >= 0) {
      localStorage.setItem("timeLeft", timeLeft);
  }
},[timeLeft])

useEffect(()=>{
  setTimeLeft(initialTimer)
},[initialTimer])

// ⏳ Countdown logic

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prevValue) => prevValue - 1);
      }, 1000);
    }
    if (timeLeft === 0) {
      setIsRunning(false);
      onComplete();
    }

    return () => clearTimeout(timer);
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(Math.floor(seconds % 60)).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-green-200 via-white to-green-100">
      <div className="bg-white/90 p-10 md:p-16 rounded-3xl shadow-2xl backdrop-blur-sm w-11/12 max-w-md transition-all">
        {/* Timer Display */}
        <h1 className="text-7xl font-black text-green-700 text-center mb-6 drop-shadow-lg tracking-wider">
          {formatTime(timeLeft)}
        </h1>
        <p className="text-center text-gray-600 mb-10 text-lg">
          Focus timer is {isRunning ? "running" : "paused"}
        </p>

        {/* Button Controls */}
        <div className="flex flex-col md:flex-row justify-center gap-6">
          {/* Pause Button */}
          <Link
            onClick={() => setIsRunning(false)}
            to="/type"
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center"
          >
            Pause & Exit
          </Link>

          {/* Reset Button */}
          <button
            onClick={() => {
              setIsRunning(false);
              localStorage.removeItem("timeLeft")
              setTimeLeft(initialTimer);
              onReset()   //OnRest
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
