import React from 'react';
import { Search, Send } from 'lucide-react';

const UrgentBrowse = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Urgent Browse</h1>

      {/* Searchbar */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search Freelancers..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Freelancer Portfolios */}
        <div className="md:col-span-2 bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">Freelancer Portfolios</h2>
          <div className="space-y-3">
            {["Alice", "Bob", "Charlie"].map((name, idx) => (
              <div key={idx} className="p-3 border rounded-lg flex justify-between items-center">
                <span>{name} - Fullstack Dev</span>
                <button className="text-blue-600 border border-blue-600 px-3 py-1 rounded-md hover:bg-blue-50 transition text-sm">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="font-semibold text-md mb-2">Post Urgent Requirement</h3>
            <button className="flex items-center justify-center gap-2 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              <Send className="w-4 h-4" />
              Post Now
            </button>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="font-semibold text-md mb-2">Posted Requirements</h3>
            <ul className="list-disc ml-4 text-sm">
              <li>React Native Developer</li>
              <li>Backend for E-commerce</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrgentBrowse;
