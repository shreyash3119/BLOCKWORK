import React, { useEffect, useState } from "react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: "client" | "freelancer";
  country: string;
  skills?: string[];
  bio?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h1 className="text-2xl font-bold mb-4">👤 Profile</h1>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Country:</strong> {user.country}</p>

      {user.role === "freelancer" && (
        <>
          <p><strong>Skills:</strong> {user.skills?.join(", ")}</p>
          <p><strong>Bio:</strong> {user.bio}</p>
        </>
      )}
    </div>
  );
};

export default Profile;
