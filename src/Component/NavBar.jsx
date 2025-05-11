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
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
// import { useTheme } from "../Context/themeContext.js";  // Ensure you are importing the correct context
import { Moon, Sun } from 'lucide-react';  // Optional icons for dark/light mode toggle
import { useTheme } from "../Context";
// import { text } from "framer-mtion/client";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("/");

  const { toggleMode, theme } = useTheme();  // Added theme here

  const location = useLocation();

  // Handle scroll effects to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update active section when location changes
  useEffect(() => {
    setActiveSection(location.pathname);
  }, [location.pathname]);

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Focus Mode", path: "/focusMode" },
    { name: "Statistics", path: "/statistics" },
    { name: "Settings", path: "/settings" }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${theme === 'light'
          ? scrolled
            ? 'bg-slate-200 text-gray-800 shadow-xl'
            : 'bg-white text-gray-800'
          : scrolled
            ? 'bg-gray-900 text-white shadow-xl'
            : 'bg-gray-800 text-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div className="flex items-baseline">
                <span className={`text-xl font-bold transition-colors duration-300 ${theme === "dark" ? "transform duration-500 text-white" : scrolled ? "text-gray-800" : "text-gray-800"}`}>Focus</span>
                <span className={`text-xl font-bold transition-colors duration-300 ${scrolled ? "text-purple-600" : "text-purple-500"}`}>Zen</span>
              </div>
            </NavLink>
          </div>

          {/* Mode Button */}
          {/* <div >
          <button
            onClick={toggleMode}
            className="ml-4 px-4 py-2 text-sm rounded-full font-medium transition-colors duration-200 
            bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center space-x-2"
          >
            {theme === 'light' ? (
              <>
                <Moon className="w-4 h-4" />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4" />
                <span>Light Mode</span>
              </>
            )}
          </button>
          </div> */}
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={`px-4 py-2 mx-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  item.path === activeSection
                    ? "text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md"
                    : `${
                        theme === "dark" ? "transform duration-500 text-white" : scrolled ? "text-gray-700" : "text-gray-700"
                      } hover:bg-purple-50 hover:text-purple-700`}
                `}
                
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Action Button */}
          <div className="hidden md:flex items-center">
            {/* <button className="ml-6 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full shadow-md hover:shadow-lg transform hover:translate-y-px transition-all duration-200">
              Get Started
            </button> */}
          <button
            onClick={toggleMode}
            className="ml-4 px-4 py-2 text-sm rounded-full font-medium transition-colors duration-200 
            bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center space-x-2"
          >
            {theme === 'light' ? (
              <>
                <Moon className="w-4 h-4" />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4" />
                <span>Light Mode</span>
              </>
            )}
          </button>



          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-lg focus:outline-none transition-colors duration-200 ${
                scrolled ? "text-gray-700 hover:bg-gray-100" : "text-gray-700 hover:bg-white/20"
              }`}
              aria-expanded={isMenuOpen}
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

      {/* Mobile menu */}
      <div className={`md:hidden fixed inset-0 z-40 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
        <div className="absolute right-0 top-0 bottom-0 w-full max-w-xs bg-white shadow-xl flex flex-col h-full">
          <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-800">Focus</span>
                <span className="text-xl font-bold text-purple-600">Zen</span>
              </div>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="space-y-3">
              {navigationLinks.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                    item.path === activeSection
                      ? "text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-sm"
                      : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:translate-y-px transition-all duration-200">
              Get Started
            </button>
          </div>
        </div>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setIsMenuOpen(false)}></div>
      </div>
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