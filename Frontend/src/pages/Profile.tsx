import React from "react";

type User = {
  name: string;
  email: string;
};

const Profile = () => {
  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      {user ? (
        <>
          <p className="text-lg">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {user.email}
          </p>
        </>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default Profile;
