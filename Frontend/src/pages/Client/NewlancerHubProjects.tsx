import React from "react";

const ongoing = ["Landing Page Design", "API Integration"];
const past = ["Logo Design", "Server Setup"];

export default function NewlancerHubProjects() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-green-600">My Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl shadow-md p-4 space-y-2">
          <h2 className="text-xl font-semibold mb-2">Ongoing Projects</h2>
          {ongoing.map((proj, index) => (
            <div key={index} className="bg-green-100 p-3 rounded-md">
              {proj}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-2">Past Projects</h3>
            <ul className="text-sm">
              {past.map((proj, index) => (
                <li key={index} className="text-gray-600">
                  {proj}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold mb-2">Connect</h3>
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Go to Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
