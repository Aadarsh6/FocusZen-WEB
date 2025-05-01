// import { NavLink } from "react-router-dom";

// const NavBar = () => {
//   return (
//     <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 shadow-lg">
//       <div className="max-w-screen-xl mx-auto flex items-center justify-between">
//         {/* Logo or Title */}
//         <NavLink to="/">
//           <h1 className="text-4xl font-extrabold text-white">FocusZen</h1>
//         </NavLink>

//         {/* Navigation Links */}
//         <div className="space-x-8">
//           <NavLink
//             to="/"
//             className="text-white text-lg font-medium hover:text-yellow-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/focusMode"
//             className="text-white text-lg font-medium hover:text-yellow-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//           >
//             FocusMode
//           </NavLink>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;



//v2.1 UI/UX responsive too

import { NavLink } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo or Title */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">Focus</span>
              <span className="text-2xl font-bold text-purple-200">Zen</span>
            </NavLink>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) => 
                `px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive 
                    ? "text-white bg-purple-700/50 rounded-lg" 
                    : "text-purple-100 hover:text-white hover:bg-purple-700/30 rounded-lg"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/focusMode"
              className={({ isActive }) => 
                `px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive 
                    ? "text-white bg-purple-700/50 rounded-lg" 
                    : "text-purple-100 hover:text-white hover:bg-purple-700/30 rounded-lg"
                }`
              }
            >
              Focus Mode
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-200 hover:text-white hover:bg-purple-700/30 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-indigo-800 shadow-lg rounded-b-lg">
            <NavLink
              to="/"
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive 
                    ? "text-white bg-purple-600" 
                    : "text-purple-200 hover:text-white hover:bg-purple-600/70"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/focusMode"
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive 
                    ? "text-white bg-purple-600" 
                    : "text-purple-200 hover:text-white hover:bg-purple-600/70"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Focus Mode
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;


//v2.2 BOLT
// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { Focus, Menu, X, Brain } from "lucide-react";

// const NavBar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav 
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled 
//           ? "bg-white/80 backdrop-blur-md shadow-sm py-4" 
//           : "bg-transparent py-6"
//       }`}
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between">
//           <NavLink 
//             to="/" 
//             className="flex items-center space-x-2 group"
//           >
//             <div className="relative">
//               <div className="absolute inset-0 bg-purple-200 rounded-lg blur group-hover:blur-md transition-all duration-300"></div>
//               <Brain className="w-8 h-8 text-purple-600 relative z-10" />
//             </div>
//             <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
//               FocusZen
//             </span>
//           </NavLink>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-6">
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
//                   isActive
//                     ? "bg-purple-100 text-purple-700 shadow-sm"
//                     : "text-gray-600 hover:text-purple-700 hover:bg-purple-50"
//                 }`
//               }
//             >
//               Home
//             </NavLink>
//             <NavLink
//               to="/focusMode"
//               className={({ isActive }) =>
//                 `px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
//                   isActive
//                     ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
//                     : "bg-white/80 backdrop-blur-sm text-purple-700 border border-purple-200 hover:bg-purple-50 hover:border-purple-300"
//                 }`
//               }
//             >
//               Focus Mode
//             </NavLink>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-purple-50 transition-colors"
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? (
//               <X className="w-6 h-6" />
//             ) : (
//               <Menu className="w-6 h-6" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg border-t border-purple-100 mt-2 animate-fadeIn">
//             <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
//               <NavLink
//                 to="/"
//                 className={({ isActive }) =>
//                   `px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
//                     isActive
//                       ? "bg-purple-100 text-purple-700"
//                       : "text-gray-600 hover:text-purple-700 hover:bg-purple-50"
//                   }`
//                 }
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Home
//               </NavLink>
//               <NavLink
//                 to="/focusMode"
//                 className={({ isActive }) =>
//                   `px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
//                     isActive
//                       ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
//                       : "bg-purple-50 text-purple-700 hover:bg-purple-100"
//                   }`
//                 }
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Focus Mode
//               </NavLink>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default NavBar;