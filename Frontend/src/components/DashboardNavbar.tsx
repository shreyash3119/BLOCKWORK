import React from "react";
import { Link } from "react-router-dom";
import { LogOut, Bell, User, MessageSquare } from "lucide-react";
import { Button } from "../components/ui/button";
import wolfIcon from "../assets/wolf_favicon.ico";

interface DashboardNavbarProps {
  userRole: "client" | "freelancer";
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  onLogout: () => void;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ userRole, darkMode, setDarkMode, onLogout }) => {
  return (
    <header className={`fixed top-0 left-0 w-full shadow-md z-50 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={wolfIcon} alt="Wolf Icon" className="w-8 h-8" />
          <h1 className="text-2xl font-bold hover:opacity-80 transition">BLOCKWORK</h1>
        </Link>

        {/* Navbar Links */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex space-x-6">
            {userRole === "client" ? (
              <>
                <li><Link to="/client-dashboard" className="hover:text-black dark:hover:text-white">Dashboard</Link></li>
                <li><Link to="/post-job" className="hover:text-black dark:hover:text-white">Post a Job</Link></li>
                <li><Link to="/client-jobs" className="hover:text-black dark:hover:text-white">My Jobs</Link></li>
                <li><Link to="/freelancer-search" className="hover:text-black dark:hover:text-white">Find Freelancers</Link></li>
                <li><Link to="/billing" className="hover:text-black dark:hover:text-white">Billing & Payments</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/freelancer-dashboard" className="hover:text-black dark:hover:text-white">Dashboard</Link></li>
                <li><Link to="/find-jobs" className="hover:text-black dark:hover:text-white">Find Jobs</Link></li>
                <li><Link to="/freelancer-jobs" className="hover:text-black dark:hover:text-white">My Contracts</Link></li>
                <li><Link to="/earnings" className="hover:text-black dark:hover:text-white">Earnings</Link></li>
              </>
            )}
          </ul>
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          <Link to="/messages"><MessageSquare size={22} className="hover:opacity-80" /></Link>
          <Link to="/notifications"><Bell size={22} className="hover:opacity-80" /></Link>
          <Link to="/profile"><User size={22} className="hover:opacity-80" /></Link>

          {/* Dark Mode Toggle */}
          <Button onClick={() => setDarkMode(!darkMode)} className="ml-2">
            {darkMode ? "🌞" : "🌙"}
          </Button>

          {/* Logout Button */}
          <Button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1">
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
