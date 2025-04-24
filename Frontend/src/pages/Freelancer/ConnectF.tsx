import { Video, PhoneCall, MessageSquare } from "lucide-react";

import React from "react";
import { Link } from "react-router-dom";

const ConnectPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full p-6 gap-6">
      
      {/* Top Navbar */}
      <header className="border-b border-gray-200 flex items-center justify-between pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Connect</h1>
      </header>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Upcoming Schedules */}
        <section className="flex-1 bg-white border border-gray-200 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Upcoming Schedules</h2>
          <p className="text-gray-600">
            You don’t have any meetings scheduled right now.
          </p>
        </section>

        {/* Right Side Buttons */}
        <section className="w-full lg:w-1/2 flex flex-col gap-4">
          {/* Schedule a Meet */}
          <div className="bg-white border border-gray-200 p-4 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-md font-semibold mb-2">Schedule a Meet</h3>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              Create Meeting
            </button>
          </div>

          {/* History */}
          <div className="bg-white border border-gray-200 p-4 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-md font-semibold mb-2">History</h3>
            <p className="text-gray-500">
              View your past meetings and interactions.
            </p>
          </div>

          {/* All Connections */}
          <div className="bg-white border border-gray-200 p-4 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-md font-semibold mb-2">All Connections</h3>
            <p className="text-gray-500">
              Manage people you've connected with.
            </p>
          </div>
        </section>
      </div>

      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
        <Link to="/freelancer/connect/messages">
          <button className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition">
            <MessageSquare size={18} /> Message
          </button>
        </Link>

        <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition">
          <PhoneCall size={18} /> Voice Chat
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
          <Video size={18} /> Video Chat
        </button>
      </div>
    </div>
  );
};

export default ConnectPage;
