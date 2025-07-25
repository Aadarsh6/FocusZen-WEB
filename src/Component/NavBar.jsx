import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from "framer-motion";

const NavBar = () => {
  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Focus Mode", path: "/focusMode" },
    { name: "Statics", path: "/Statics" },
    { name: "Settings", path: "/settings" }
  ];

  return (
    <nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex justify-between items-center 
                 h-20 w-[80%] px-8 md:px-12
                 bg-transparent backdrop-blur-xl 
                 shadow-xl rounded-xl " // <-- Positioning changed here
    >
      {/* Logo */}
      <div
        className="flex justify-start items-center"
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
      </div>

      {/* Navigation Links */}
      <div
        className="hidden md:flex items-center space-x-8"
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
      </div>

      {/* CTA Button */}
      <div
        className="flex items-center space-x-4"
      >
        <button className="hidden md:block px-5 py-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 font-intel font-medium hover:bg-white/20 hover:border-white/30 transition-all duration-300">
          Sign In
        </button>
        <Link
        to="/focusMode"
        >
        <button className="px-5 py-2.5 rounded-lg bg-white text-black font-intel font-medium hover:bg-white/90 transition-all duration-300 shadow-lg">
          Get Started
        </button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white/70 hover:text-white/90 transition-colors duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
};

export default NavBar;