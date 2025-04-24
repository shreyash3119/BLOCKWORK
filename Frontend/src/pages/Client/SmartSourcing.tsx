import React from "react";


const SmartSourcing: React.FC = () => {
  return (
    <div className="p-6 flex-1">
     
      <h1 className="text-2xl font-semibold mb-4">Smart Sourcing</h1>

      <div className="flex gap-4 mb-6">
        <button className="px-4 py-2 bg-[#2d2d2d] text-white rounded">Match candidates by job</button>
        <button className="px-4 py-2 border border-gray-300 rounded">Search for candidates</button>
        <button className="px-4 py-2 border border-gray-300 rounded">Projects</button>
        <button className="px-4 py-2 border border-gray-300 rounded">Saved searches</button>
      </div>

      <div className="flex gap-2 mb-4">
        <label className="flex flex-col text-sm">
          Job
          <input
            type="text"
            placeholder="Select a job"
            className="px-3 py-2 border border-gray-300 rounded mt-1"
          />
        </label>
        <button className="px-3 py-2 bg-[#2d2d2d] text-white rounded mt-auto">Add</button>

        <label className="flex flex-col text-sm">
          Location
          <input
            type="text"
            placeholder="City, county or postcode"
            className="px-3 py-2 border border-gray-300 rounded mt-1"
          />
        </label>
        <button className="px-4 py-2 bg-blue-600 text-white rounded mt-auto">Find</button>
      </div>

      <div className="mt-6 bg-[#f9f9f9] p-8 rounded border border-gray-300 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-[#eee] rounded-full flex items-center justify-center">
            {/* Replace with real icon if needed */}
            <span className="text-2xl">📂</span>
          </div>
        </div>
        <h2 className="text-lg font-semibold mb-2">No job selected</h2>
        <p className="mb-2">
          Select a <strong>Job</strong> to see candidates that match your job description, or you can{" "}
          <a href="#" className="text-blue-600 font-medium">post a job</a>.
        </p>
        <p>You can also search for candidates using <strong>Location</strong> and <strong>Keywords</strong>.</p>

        <button className="mt-4 px-5 py-2 bg-blue-600 text-white rounded">Search for candidates</button>
      </div>
    </div>
  );
};

export default SmartSourcing;
