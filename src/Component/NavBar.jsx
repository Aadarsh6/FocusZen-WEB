// import { useState, useEffect } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { useTheme } from "../Context";
// import { motion, AnimatePresence } from "framer-motion";
// import { Sun, Moon, Menu, X } from 'lucide-react';

// const NavBar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [hasScrolled, setHasScrolled] = useState(false);
//   const { theme, toggleMode } = useTheme();
//   const location = useLocation();

//   // Effect for scroll detection
//   useEffect(() => {
//     const handleScroll = () => {
//       setHasScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window. removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsMenuOpen(false);
//   }, [location.pathname]);

  // const navigationLinks = [
  //   { name: "Home", path: "/" },
  //   { name: "Focus Mode", path: "/focusMode" },
  //   { name: "Statics", path: "/Statics" },
  //   { name: "Settings", path: "/settings" }
  // ];

//   // --- Dynamic Style Variables for cleaner JSX ---
//   const navStyle = hasScrolled
//     ? (theme === 'light'
//       ? "bg-white/80 backdrop-blur-lg border-b border-slate-200/70"
//       : "bg-gray-950/80 backdrop-blur-lg border-b border-white/10")
//     : "bg-transparent border-b border-transparent";

//   const linkStyle = `relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
//     theme === 'light' ? 'text-gray-700 hover:text-cyan-600' : 'text-gray-300 hover:text-cyan-400'
//   }`;

//   const activeLinkStyle = theme === 'light' ? 'text-cyan-600' : 'text-cyan-400';
  
//   const accentGradient = "from-green-400 via-cyan-400 to-purple-500";

//   return (
//     <>
//       <nav 
//         role="navigation"
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navStyle}`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
//             {/* --- Logo --- */}
//             <NavLink to="/" className="flex items-center group">
//               <span className={`text-2xl font-extrabold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
//                 Focus
//               </span>
//               <span className={`text-2xl font-extrabold bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>
//                 Zen
//               </span>
//             </NavLink>

//             {/* --- Desktop Navigation --- */}
//             <div className="hidden md:flex items-center space-x-2">
              // {navigationLinks.map((item) => (
              //   <NavLink
              //     key={item.name}
              //     to={item.path}
              //     className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}
              //   >
              //     {item.path === location.pathname && (
              //       <motion.div
              //         layoutId="underline"
              //         className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${accentGradient}`}
              //       />
              //     )}
              //     {item.name}
              //   </NavLink>
              // ))}
//             </div>

//             {/* --- Actions & Mobile Menu Toggle --- */}
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={toggleMode}
//                 aria-label="Toggle theme"
//                 className={`p-2 rounded-full transition-colors duration-300 ${theme === 'light' ? 'hover:bg-slate-200' : 'hover:bg-white/10'}`}
//               >
//                 {theme === 'light' ? <Moon size={20} className="text-gray-700" /> : <Sun size={20} className="text-yellow-400" />}
//               </button>
              
//               <div className="md:hidden">
//                 <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open main menu" aria-expanded={isMenuOpen}>
//                   {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* --- Mobile Menu Panel (with animation) --- */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             <motion.div
//               initial={{ y: "-100%" }}
//               animate={{ y: "0%" }}
//               exit={{ y: "-100%" }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               className={`absolute top-0 left-0 right-0 pt-20 shadow-xl ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}
//               onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
//             >
//               <div className="flex flex-col items-center space-y-6 p-8">
//                 {navigationLinks.map((item, index) => (
//                   <motion.div
//                     key={item.name}
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 + index * 0.05 }}
//                   >
//                     <NavLink
//                       to={item.path}
//                       onClick={() => setIsMenuOpen(false)}
//                       className={({ isActive }) => `text-xl font-semibold transition-colors duration-300 ${
//                         isActive ? activeLinkStyle : theme === 'light' ? 'text-gray-800' : 'text-gray-200'
//                       }`}
//                     >
//                       {item.name}
//                     </NavLink>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default NavBar;
import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from "framer-motion";

const NavBar = () => {
  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Focus Mode", path: "/focusMode" },
    { name: "Statics", path: "/Statics" },
    { name: "Settings", path: "/settings" }
  ];

  return (
    <motion.nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex justify-between items-center 
                 h-20 w-[80%] px-8 md:px-12
                 bg-transparent backdrop-blur-xl 
                 shadow-xl rounded-xl border " // <-- Positioning changed here
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Logo */}
      <motion.div
        className="flex justify-start items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <NavLink to="/" className="flex items-center group">
          <div className="flex items-end">
            <span className="text-2xl md:text-3xl font-semibold font-jost text-white/90 group-hover:text-white transition-colors duration-300">
              Focus
            </span>
            <span className="text-2xl md:text-3xl font-semibold font-jost text-white/60 group-hover:text-white/80 transition-colors duration-300">
              Zen
            </span>
          </div>
        </NavLink>
      </motion.div>

      {/* Navigation Links */}
      <motion.div
        className="hidden md:flex items-center space-x-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        {navigationLinks.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={"text-white/70 hover:text-white/90 font-intel text-sm font-medium transition-colors duration-300 relative group"}
          >
            {item.name}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white/60 group-hover:w-full transition-all duration-300"></span>
            {item.path === location.pathname && (
              <motion.span
                layoutId="underline"
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-white"
              />
            )}
          </NavLink>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.div
        className="flex items-center space-x-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        <button className="hidden md:block px-5 py-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 font-intel font-medium hover:bg-white/20 hover:border-white/30 transition-all duration-300">
          Sign In
        </button>
        <button className="px-5 py-2.5 rounded-lg bg-white text-black font-intel font-medium hover:bg-white/90 transition-all duration-300 shadow-lg">
          Get Started
        </button>
      </motion.div>

      {/* Mobile Menu Button */}
      <motion.button
        className="md:hidden text-white/70 hover:text-white/90 transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </motion.button>
    </motion.nav>
  );
};

export default NavBar;