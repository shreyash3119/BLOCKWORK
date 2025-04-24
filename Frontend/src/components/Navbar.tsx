import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Sun, Moon, ChevronDown } from "lucide-react";
import { Button } from "../components/ui/button";
import wolfIcon from "../assets/wolf_favicon.ico";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onLoginClick: () => void;
  onSignUpClick: () => void;
}

export default function Navbar({ darkMode, setDarkMode, onLoginClick, onSignUpClick }: NavbarProps) {
  const [showFeaturesDropdown, setShowFeaturesDropdown] = useState(false);

  return (
    <>
      {/* Main Navbar */}
      <header 
        className={`fixed top-0 left-0 w-full flex items-center px-6 py-3 shadow-md 
        ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} z-50`}
      >
        <div className="flex items-center space-x-2">
          {/* Clickable BlockWork Name - Returns to Home Page */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={wolfIcon} alt="Wolf Icon" className="w-8 h-8" />
            <h1 className="text-2xl font-bold hover:opacity-80 transition">BLOCKWORK</h1>
          </Link>
        </div>

        <nav className="flex-1 ml-10">
          <ul className="flex space-x-6 relative">
            <li 
              className="relative cursor-pointer"
              onMouseEnter={() => setShowFeaturesDropdown(true)}
              onMouseLeave={() => setShowFeaturesDropdown(false)}
            >
              <div className="flex items-center hover:text-black dark:hover:text-white">
                Features <ChevronDown size={16} className="ml-1" />
              </div>
              {showFeaturesDropdown && (
                <ul className={`absolute left-0 top-full mt-2 w-48 shadow-lg rounded-md 
                ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
                  <li><Link to="/post-job" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Post Job</Link></li>
                  <li><Link to="/browse-jobs" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Browse Jobs</Link></li>
                  <li><Link to="/browse-freelancers" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Browse Freelancers</Link></li>
                </ul>
              )}
            </li>
            <li><Link to="/contact" className="hover:text-black dark:hover:text-white">Contact</Link></li>
            <li><Link to="/about" className="hover:text-black dark:hover:text-white">About</Link></li>
          </ul>
        </nav>

        <div className="flex items-center space-x-4">
          <button className="hover:underline" onClick={onLoginClick}>
            Log In
          </button>
          
          <button 
            onClick={onSignUpClick} 
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Sign up
          </button>

          {/* Dark Mode Toggle Button */}
          <Button onClick={() => setDarkMode(!darkMode)} className="ml-2">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
      </header>

      {/* Secondary Navbar */}
      <div className={`w-full mt-16 px-6 py-2 shadow-md 
        ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"}`}
      >
        <div className="container mx-auto flex justify-between text-sm font-medium">
          <Link to="/blockchain" className="hover:underline">Blockchain & Crypto</Link>
          <Link to="/web-dev" className="hover:underline">Web, Mobile & Software Dev</Link>
          <Link to="/design" className="hover:underline">Design & Creative</Link>
          <Link to="/nft" className="hover:underline">NFT</Link>
          <Link to="/sales" className="hover:underline">Sales & Marketing</Link>
          <Link to="/writing" className="hover:underline">Writing & Translation</Link>
          <Link to="/engineering" className="hover:underline">Engineering & Architecture</Link>
          <Link to="/more" className="hover:underline">More</Link>
        </div>
      </div>
    </>
  );
}
