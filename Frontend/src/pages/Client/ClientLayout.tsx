import React, { useState, useRef, useEffect } from "react";
import ClientNavbar from "./ClientNavbar";
import { HelpCircle, Bell, Mail, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import BlockW from "../../assets/blockwork_logo.jpg"; // adjust if needed
import wolfIcon from "../../assets/wolf_favicon.ico";

type Props = {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout: () => void;
};

const ClientLayout: React.FC<Props> = ({
  children,
  darkMode,
  setDarkMode,
  onLogout,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex">
      <ClientNavbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLogout={onLogout}
      />
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="border-b border-gray-200 flex items-center justify-between px-6 py-4 bg-white shadow-sm">
          <div className="flex items-center space-x-2">
            <img src={wolfIcon} alt="Wolf Icon" className="w-8 h-8" />
            <h1
              className={`text-2xl font-bold hover:opacity-80 transition ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              BLOCKWORK
            </h1>
          </div>

          {/* Topbar with Help, Notifications, Messages, and Account Dropdown */}
          <div className="flex items-center gap-6 text-sm text-gray-700">
            <button className="flex items-center gap-1">
              <HelpCircle size={20} />
              <span>Help</span>
            </button>
            <button className="flex items-center gap-1">
              <Bell size={20} />
              <span>Notifications</span>
            </button>
            <button className="flex items-center gap-1">
              <Mail size={20} />
              <span>Messages</span>
            </button>

            {/* Account Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-2"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              >
                <User size={20} />
                <span>client@email.com</span>
                <ChevronDown size={16} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded-md text-sm text-gray-700 z-50">
                  <Link
                    to="/client/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Setting
                  </button>
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Section */}
        <main className="p-6 bg-gray-50 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default ClientLayout;
