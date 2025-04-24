import React from 'react';
import { MessageSquare } from 'lucide-react';

const projects = [
  { name: "UI Redesign", status: "Ongoing" },
  { name: "Payment Integration", status: "Ongoing" },
  { name: "Landing Page", status: "Completed" },
];

const UrgentMyProjects = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Urgent - My Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ongoing Projects */}
        <div className="md:col-span-2 bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">Ongoing Projects</h2>
          {projects.filter(p => p.status === "Ongoing").map((p, i) => (
            <div key={i} className="p-3 border rounded-lg mb-2">{p.name}</div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="font-semibold text-md mb-2">Past Projects</h3>
            {projects.filter(p => p.status === "Completed").map((p, i) => (
              <div key={i} className="text-sm">{p.name}</div>
            ))}
          </div>

          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="font-semibold text-md mb-2">Connect</h3>
            <button className="flex items-center justify-center gap-2 w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
              <MessageSquare className="w-4 h-4" />
              Go to Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrgentMyProjects;
