// src/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Define the User type
interface User {
  _id: string;
  name: string;
  email: string;
  role: "client" | "freelancer";
  // Add any other fields you store for users
}

// Define the UserContext type
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userRole: "client" | "freelancer" | null;
  setUserRole: React.Dispatch<React.SetStateAction<"client" | "freelancer" | null>>;
}

// Create the UserContext
export const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider component to wrap your app with this context
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<"client" | "freelancer" | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    axios.get(`/api/user/${userId}`)
      .then(res => {
        setUser(res.data);
        setUserRole(res.data.role);
      })
      .catch(err => console.error("Error fetching user:", err));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
