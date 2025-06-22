import confetti from "canvas-confetti";

export const ShootConfetti = () => {
  const duration = 4000; // 4 seconds
  const end = Date.now() + duration;

  const colors = ["#34d399", "#22d3ee", "#a78bfa", "#fbbf24", "#f87171"]; // Aurora theme colors
  const defaults = {
    zIndex: 9999, // Higher z-index to ensure visibility
    startVelocity: 45,
    spread: 120,
    ticks: 500,
    colors,
    gravity: 0.8, // More natural fall
    drift: 0.1, // Slight drift for more realistic movement
  };

  let intervalId = null;
  let isActive = true;

  // Function to stop confetti immediately
  const stopConfetti = () => {
    isActive = false;
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    // Clear any remaining confetti particles
    confetti.reset();
  };

  // Enhanced confetti patterns
  const shootConfetti = () => {
    if (!isActive) return;

    // Check if still on success page
    if (window.location.pathname !== "/success") {
      stopConfetti();
      return;
    }

    const timeLeft = end - Date.now();
    if (timeLeft <= 0) {
      stopConfetti();
      return;
    }

    // Multiple burst patterns for better effect
    const patterns = [
      // Center burst
      {
        particleCount: 50,
        origin: { x: 0.5, y: 0.6 },
        spread: 100,
      },
      // Left side burst
      {
        particleCount: 30,
        origin: { x: 0.2, y: 0.7 },
        spread: 80,
        angle: 60,
      },
      // Right side burst
      {
        particleCount: 30,
        origin: { x: 0.8, y: 0.7 },
        spread: 80,
        angle: 120,
      },
      // Random burst
      {
        particleCount: 40,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.6,
        },
        spread: 90,
      },
    ];

    // Randomly select and execute a pattern
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    confetti({
      ...defaults,
      ...pattern,
    });
  };

  // Start the confetti effect
  intervalId = setInterval(shootConfetti, 200); // Slightly faster for more dynamic effect

  // Listen for navigation changes (for SPAs)
  const handleRouteChange = () => {
    if (window.location.pathname !== "/success") {
      stopConfetti();
    }
  };

  // Add event listeners for route changes
  window.addEventListener("popstate", handleRouteChange);
  
  // For React Router, we can also listen to the history object if available
  if (window.history && window.history.pushState) {
    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      setTimeout(handleRouteChange, 0);
    };
  }

  // Cleanup function (return this if you need to call it manually)
  return {
    stop: stopConfetti,
    cleanup: () => {
      stopConfetti();
      window.removeEventListener("popstate", handleRouteChange);
      // Restore original pushState if we modified it
      // if (window.history && originalPushState) {
      //   window.history.pushState = originalPushState;
      // }
    }
  };
};

export default ShootConfetti;
