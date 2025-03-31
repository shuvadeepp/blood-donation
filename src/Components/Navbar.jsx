import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-lg font-bold text-white hover:text-red-500 transition duration-300">
          BloodBank.com
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link to="/" className="text-white hover:text-red-500 transition duration-300">
            Home
          </Link>
          <Link to="/Form" className="text-white hover:text-red-500 transition duration-300">
            Donor
          </Link>
          <Link to="/AboutUs" className="text-white hover:text-red-500 transition duration-300">
            About Us
          </Link>
          <Link to="/Lists" className="text-white hover:text-red-500 transition duration-300">
            Lists
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
