import React from "react";

const freelancers = [
  { name: "Amit R.", skills: ["React", "Node.js"], rating: 4.8 },
  { name: "Sara D.", skills: ["UI/UX", "Figma"], rating: 4.6 },
  { name: "Jay P.", skills: ["Python", "Django"], rating: 4.9 },
];

export default function NewlancerHubBrowse() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-600">Browse Freelancers</h1>

      <input
        className="w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="Search freelancers..."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {freelancers.map((freelancer, index) => (
            <div
              key={index}
              className="p-4 border rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{freelancer.name}</h2>
              <p className="text-sm text-gray-600">
                Skills: {freelancer.skills.join(", ")}
              </p>
              <p className="text-sm">⭐ {freelancer.rating}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="p-4 border rounded-xl bg-blue-50">
            <h3 className="text-lg font-semibold mb-2">Post a Requirement</h3>
            <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Post Now
            </button>
          </div>

          <div className="p-4 border rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">My Posted Jobs</h3>
            <ul className="text-sm text-gray-600">
              <li>UI Design Task</li>
              <li>React Bug Fix</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
