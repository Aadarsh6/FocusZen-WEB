// hooks/useFocusTimer.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useFocusTimer = () => {
  const [timeLeft, setTimeLeft] = useState(null); // in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const storedMinutes = parseInt(localStorage.getItem("Focus.time"));
    if (!storedMinutes || isNaN(storedMinutes)) return;

    const totalSeconds = storedMinutes * 60;
    setTimeLeft(totalSeconds);
  }, []);

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      navigate("/success");
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = Math.floor((timeLeft ?? 0) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = ((timeLeft ?? 0) % 60).toString().padStart(2, "0");

  return { minutes, seconds };
};

export default useFocusTimer;
