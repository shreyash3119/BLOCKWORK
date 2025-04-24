import React from "react";


const Urgent: React.FC = () => {
  return (
    <div className="w-full p-4 space-y-4">
         
      <div className="text-2xl font-bold">Urgent Tasks</div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 shadow-md rounded-lg col-span-1 md:col-span-1">
          <h2 className="font-semibold text-lg mb-2">Browse</h2>
          <p>List of available urgent tasks to pick from.</p>
        </div>
        <div className="flex flex-col gap-4 col-span-1">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="font-semibold text-lg">Your Rank</h2>
            <p>Efficiency metrics and rank stats.</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="font-semibold text-lg">Connect</h2>
            <p>Quick access to connect options.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Urgent;
