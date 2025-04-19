import confetti from "canvas-confetti";

export const ShootConfetti = () => {
  const duration = 4000; // 4 seconds
  const end = Date.now() + duration;

  const colors = ["#00C9A7", "#FEC260", "#FF6B6B", "#FFD93D", "#6A67CE"];
  const defaults = {
    zIndex: 999,
    startVelocity: 45,
    spread: 120, // fills wider
    ticks: 500, // longer travel time
    colors,
  };

  const interval = setInterval(() => {
    const timeLeft = end - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    // Random bursts all over the screen
    confetti({
      ...defaults,
      particleCount: 100,
      origin: {
        x: Math.random(), // full screen width
        y: Math.random() * 0.6, // upper 60% of screen
      },
    });
  }, 250);
};


export default ShootConfetti