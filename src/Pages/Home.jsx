import { Link } from "react-router-dom";
import NavBar from "../Component/NavBar";
import { useEffect } from "react";
import { useTheme } from "../Context";

// --- Custom SVG Icons for a more polished look ---
const FocusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18"></path>
    <path d="m19 9-5 5-4-4-3 3"></path>
  </svg>
);

const MasteryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="m9 12 2 2 4-4"></path>
  </svg>
);

const Home = () => {
  const { theme } = useTheme();

  useEffect(() => {
    localStorage.removeItem("Focus.url");
    localStorage.removeItem("Focus.time");
    localStorage.removeItem("Focus.EndTime");
    localStorage.removeItem("Focus.StartTime");
    localStorage.removeItem("timeLeft");
  }, []);

  // --- Aurora Theme Color Palette ---
  const bgClass = theme === "light" 
    ? "bg-slate-100" 
    : "bg-gray-950 text-white";
    
  const textPrimary = theme === "light" ? "text-gray-900" : "text-gray-100";
  const textSecondary = theme === "light" ? "text-gray-600" : "text-gray-400";
  const accentGradient = "bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500";
  
  const features = [
    {
      title: "Undisturbed Focus",
      desc: "Create a sanctuary for your mind. Our tools help you silence the noise and dive deep into your tasks.",
      icon: <FocusIcon />,
      accentClass: "text-green-500",
    },
    {
      title: "Insightful Analytics",
      desc: "Understand your workflow. Track your sessions to discover your peak productivity hours and habits.",
      icon: <AnalyticsIcon />,
      accentClass: "text-cyan-400",
    },
    {
      title: "Achieve Mastery",
      desc: "Turn consistent effort into tangible results. Set milestones and watch your goals become reality.",
      icon: <MasteryIcon />,
      accentClass: "text-purple-500",
    }
  ];

  return (
    <div className={`min-h-screen ${bgClass} font-sans relative overflow-hidden transition-colors duration-500`}>
      {/* Animated Aurora Background - only in dark mode */}
      {theme === 'dark' && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[80vh] bg-gradient-to-tr from-green-500/20 via-cyan-500/0 to-purple-500/20 blur-3xl opacity-50 animate-aurora-pulse"></div>
        </div>
      )}
      
      <NavBar />
      
      <main className="relative z-10 flex flex-col items-center px-6 py-24 sm:py-32">
        {/* --- Hero Section --- */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fadeInUp" style={{animationDelay: '100ms'}}>
            <h1 className={`text-5xl md:text-7xl font-extrabold mb-6 ${textPrimary} tracking-tight`}>
              Find Your Flow.
              <br />
              <span className={`${accentGradient} bg-clip-text text-transparent`}>
                Master Your Mind.
              </span>
            </h1>
          </div>
          
          <div className="animate-fadeInUp" style={{animationDelay: '300ms'}}>
            <p className={`text-lg md:text-xl ${textSecondary} mb-12 max-w-2xl mx-auto`}>
              FocusZen is your personal sanctuary for deep work, helping you eliminate distractions and unlock peak performance.
            </p>
          </div>

          {/* --- CTA Buttons Container --- */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp" style={{animationDelay: '500ms'}}>
            {/* Primary CTA */}
            <Link
              to="/focusMode"
              className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-lg font-bold text-white bg-gray-900 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
            >
              <span className={`absolute -inset-0.5 rounded-full ${accentGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur`}></span>
              <span className="relative">Start Your Session</span>
            </Link>

            {/* --- ADDED: Secondary CTA for Extension --- */}
            <a
              href="https://chrome.google.com/webstore" // <-- IMPORTANT: Replace with your actual extension link
              target="_blank"
              rel="noopener noreferrer"
              className={`relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 ${theme === 'light' ? 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50' : 'bg-gray-800/50 text-gray-200 border border-gray-700 hover:bg-gray-800'}`}
            >
              Get The Extension
            </a>
          </div>
        </div>

        {/* --- ADDED: 'How It Works' Tutorial Video Section --- */}
        <div className="w-full max-w-4xl mx-auto mt-32 animate-fadeInUp" style={{ animationDelay: `700ms` }}>
            <div className="text-center mb-12">
                <h2 className={`text-4xl font-bold ${textPrimary}`}>See It In Action</h2>
                <p className={`mt-4 text-lg ${textSecondary}`}>A quick walkthrough of how FocusZen helps you reclaim your attention.</p>
            </div>
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl bg-gray-900 ring-1 ring-white/10">
                <iframe 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" // <-- IMPORTANT: Replace with your video embed URL
                    title="FocusZen Tutorial" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
            </div>
        </div>


        {/* --- Features Section --- */}
        <div className="w-full max-w-5xl mx-auto mt-32">
          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group text-center animate-fadeInUp"
                // Adjusted animation delay to account for the new video section
                style={{ animationDelay: `${900 + index * 200}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${feature.accentClass} bg-white/5 backdrop-blur-sm border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className={`text-2xl font-bold mb-3 ${textPrimary}`}>{feature.title}</h3>
                <p className={`${textSecondary}`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-10 text-center">
        <p className={`text-sm ${textSecondary}`}>
          © 2025 FocusZen. Designed for clarity and calm.
        </p>
      </footer>

      {/* --- Keyframes for Animations --- */}
      {/* NOTE: You need Tailwind's aspect-ratio plugin for the video.
          If not already installed: npm install @tailwindcss/aspect-ratio
          Then add it to your tailwind.config.js: plugins: [require('@tailwindcss/aspect-ratio')] */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');
        
        .font-sans {
          font-family: 'Inter', sans-serif;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes aurora-pulse {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.4; }
          50% { transform: translateX(-50%) scale(1.1); opacity: 0.6; }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.7s ease-out forwards;
          opacity: 0; /* Start hidden */
        }
        
        .animate-aurora-pulse {
          animation: aurora-pulse 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
