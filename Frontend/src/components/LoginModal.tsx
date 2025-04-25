import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role: "client" | "freelancer") => void;
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  // Handle login for either client or freelancer
  const handleLogin = async (role: "client" | "freelancer") => {
    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // ✅ Store user and userId
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("userId", result.user._id); // BONUS: Store user ID
        localStorage.setItem("role", role);
  
        onLogin(role); // Notify parent
        onClose();     // Close modal
        setError(null);
      } else {
        setError(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login request failed:", error);
      setError("Server error. Please try again.");
    }
  };
  

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Log in to <span className="text-green-600">BlockWork</span>
        </h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-4 p-3 border rounded-lg dark:bg-gray-800 dark:text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-4 p-3 border rounded-lg dark:bg-gray-800 dark:text-white"
        />

        <div className="flex gap-4 mt-4">
          <Button
            onClick={() => handleLogin("client")}
            className="w-1/2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
          >
            Client
          </Button>
          <Button
            onClick={() => handleLogin("freelancer")}
            className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            Freelancer
          </Button>
        </div>
      </div>
    </div>
  );
}
