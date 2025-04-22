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