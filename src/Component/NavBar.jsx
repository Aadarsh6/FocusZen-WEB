import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        
        {/* Logo or Title */}
        <NavLink
        to="/"
        >
        <h1 className="text-4xl font-extrabold text-white">FocusZen</h1>
        </NavLink>

        {/* Navigation Links */}
        <div className="space-x-8">
          <NavLink
            to="/"
            className="text-white text-lg font-medium hover:text-yellow-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Home
          </NavLink>
          <NavLink
            to="/focusMode"
            className="text-white text-lg font-medium hover:text-yellow-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            FocusMode
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
