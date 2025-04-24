import React from "react";

import {
  Bell,
  ChevronDown,
  CircleAlert,
  Filter,
  HelpCircle,
  Mail,
  Star,
  User,
} from "lucide-react";

const ClientDashboard: React.FC = () => {
  return (
    <div className="p-6 flex-1">
      
      {/* Jobs section */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <button className="bg-[#2557a7] text-white px-4 py-2 rounded font-medium">Post a job</button>
      </div>

      <div className="flex gap-2 mb-4">
        <button className="bg-[#2d2d2d] text-white px-4 py-2 rounded">All Jobs</button>
        <button className="bg-white border border-gray-300 px-4 py-2 rounded">Tags</button>
      </div>

      {/* <div className="bg-[#f9f8f8] border border-[#f3d1d1] rounded p-4 mb-4 flex items-start gap-3">
        <CircleAlert className="text-[#c03939] mt-1" size={20} />
        <div>
          <p>
            <span className="font-bold">Action required:</span> Your Frontend Engineer Sponsored Job isn't on Indeed
            yet.
            <a href="#" className="text-[#2557a7] ml-1">Add payment information</a> or
            <a href="#" className="text-[#2557a7] ml-1">remove the budget</a> to post your job.
          </p>
        </div>
      </div> */}

      <div className="flex gap-2 mb-4">
        {["Status", "Title", "Location"].map((label) => (
          <button key={label} className="border border-gray-300 rounded px-3 py-2 flex items-center gap-1">
            <span>{label}</span>
            <ChevronDown size={16} />
          </button>
        ))}
        <button className="border border-gray-300 rounded p-2">
          <Star size={20} />
        </button>
        <button className="border border-gray-300 rounded px-3 py-2 flex items-center gap-1">
          <Filter size={16} />
          <span>More filters</span>
        </button>

        
      </div>

      <div className="border border-gray-300 rounded overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f9f8f8] border-b border-gray-300">
              <th className="p-3 text-left w-8">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="p-3 text-left font-medium">Job title</th>
              <th className="p-3 text-left font-medium">Candidates</th>
              <th className="p-3 text-left font-medium">Sponsorship status</th>
              <th className="p-3 text-left font-medium">Date posted</th>
              <th className="p-3 text-left font-medium">Email</th>
              <th className="p-3 text-left font-medium">Job status</th>
              <th className="p-3 text-left w-8"></th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Billing section */}
      <div className="mt-8 border border-gray-300 rounded p-6">
        <h2 className="font-medium mb-4">Manage billing details </h2>
        <hr className="mb-4" />
        <div className="space-y-4">
          <button className="text-[#2557a7] font-medium">View billing history</button>
          <button className="text-[#2557a7] font-medium">Update payment method</button>
          <button className="text-[#2557a7] font-medium">View performance report</button>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
