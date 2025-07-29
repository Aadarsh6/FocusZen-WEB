import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react'; // Icons for the mobile menu toggle

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Hook to get the current path

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Focus Setup", path: "/focusMode" }, 
    { name: "Statistics", path: "/Statics" }, 
    { name: "Settings", path: "/settings" }
  ];

  // Effect to handle body scroll when the menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function to reset scroll on component unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <>
      <nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex justify-between items-center 
                   h-20 w-[90%] md:w-[80%] px-6 md:px-12
                   bg-black/20 backdrop-blur-xl 
                   shadow-lg border border-white/10 rounded-2xl"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <div className="flex items-end">
            <span className="text-2xl md:text-3xl font-semibold font-jost text-white/90 group-hover:text-white transition-colors duration-300">
              Focus
            </span>
            <span className="text-2xl md:text-3xl font-semibold font-jost text-white/60 group-hover:text-white/80 transition-colors duration-300">
              Zen
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navigationLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={"text-white/70 hover:text-white/90 text-sm font-medium transition-colors duration-300 relative group"}
            >
              {item.name}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white/60 group-hover:w-full transition-all duration-300"></span>
              {/* Correctly checks for the active path now */}
              {location.pathname === item.path && (
                <motion.span
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-white"
                />
              )}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="px-5 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white/90 font-medium hover:bg-white/20 transition-all duration-300">
            Sign In
          </button>
          <Link to="/focusMode">
            <button className="px-5 py-2.5 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition-all duration-300 shadow-lg">
              Get Started
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white/80 hover:text-white transition-colors duration-300 z-50"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-lg z-40 pt-28 p-8"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navigationLinks.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className="text-white/80 hover:text-white text-2xl font-light transition-colors"
                  onClick={toggleMenu} // Close menu on link click
                >
                  {item.name}
                </NavLink>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="pt-8 flex flex-col items-center gap-4 w-full max-w-xs">
                <Link to="/focusMode" className="w-full" onClick={toggleMenu}>
                  <button className="w-full px-5 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition-all duration-300 shadow-lg">
                    Get Started
                  </button>
                </Link>
                <button className="w-full px-5 py-3 rounded-lg bg-white/10 border border-white/20 text-white/90 font-medium hover:bg-white/20 transition-all duration-300">
                  Sign In
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;