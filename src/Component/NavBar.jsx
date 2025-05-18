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
import { Moon, Sun } from 'lucide-react';  // Optional icons for dark/light mode toggle
import { useTheme } from "../Context";
// import { useTheme } from "../Context/themeContext.js";  // Ensure you are importing the correct context

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
            ? 'bg-slate-100 text-gray-800 shadow-xl'
            : 'bg-white/80 shadow-md text-gray-800'
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
            
          <button
            onClick={toggleMode}
            className="ml-4 px-2 py-1 text-sm rounded-full font-medium transition-colors duration-200 
            bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center space-x-2"
          >
            {theme === 'light' ? (
              <>
                <Moon className="w-4 h-4" />
              </>
            ) : (
              <>
                <Sun className="w-4 h-4" />
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

     
{/* Mobile Menu Panel */}
{isMenuOpen && (
  <div className="md:hidden fixed inset-0 z-50 flex">
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={() => setIsMenuOpen(false)}
    />

    {/* Slide-in Menu Panel */}
    <div
      className={`ml-auto w-11/12 max-w-sm h-full flex flex-col z-50 transform transition-transform duration-300
      ${theme === 'dark' ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
      shadow-xl rounded-l-2xl`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold shadow">
            F
          </div>
          <span className="text-lg font-semibold">FocusZen</span>
        </div>
        <button
          onClick={() => setIsMenuOpen(false)}
          className="p-2 rounded-md hover:text-red-500"
          aria-label="Close Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        {navigationLinks.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => setIsMenuOpen(false)}
            className={`block px-4 py-3 rounded-xl text-base font-medium transition-all
              ${
                item.path === activeSection
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                  : theme === "dark"
                  ? "hover:bg-gray-700 text-white"
                  : "hover:bg-purple-100 text-gray-900"
              }`}
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* Theme Toggle Button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleMode}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span>{theme === 'dark' ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>
    </div>
  </div>
)}



    </nav>
  );
};

export default NavBar;



