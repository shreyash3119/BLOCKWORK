import React, { useEffect, useState } from 'react';
import axios from 'axios';

// 👇 Define the Job type
type Job = {
  _id: string;
  title: string;
  description: string;
  price: string;
};

const CurrentProjects = () => {
  const [projects, setProjects] = useState<Job[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const freelancerId = localStorage.getItem('userId');

    const fetchProjects = async () => {
      try {
        if (user?._id) {
          const res1 = await axios.get(`/api/jobs/my-projects/${user._id}`);
          setProjects(res1.data);
        } else if (freelancerId) {
          const res2 = await axios.get(`http://localhost:5000/api/jobs/freelancer-projects/${freelancerId}`);
          setProjects(res2.data);
        }
      } catch (err) {
        console.error('Failed to fetch current projects:', err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Current Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(project => (
          <div
            key={project._id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all"
          >
            <h2 className="text-lg font-bold text-blue-700">{project.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{project.description}</p>
            <p className="text-green-700 font-semibold mt-4">Budget: ₹{project.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentProjects;
