import React from "react";


const PastProjects: React.FC = () => {
  return (
    <div className="w-full p-4 space-y-4">
         
      <div className="text-2xl font-bold">Past Projects</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 shadow-md rounded-lg md:col-span-2">
          <h2 className="font-semibold text-lg mb-2">Project History</h2>
          <p>Display all completed projects with details here.</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-gray-200 p-6 shadow-md rounded-lg">
            <h2 className="font-semibold text-lg">Completion Reports</h2>
            <p>Summary of project completion stats.</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="font-semibold text-lg">Feedbacks</h2>
            <p>Reviews and feedback from clients.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastProjects;