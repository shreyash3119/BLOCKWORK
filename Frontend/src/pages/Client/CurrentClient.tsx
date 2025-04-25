import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Project = {
  _id: string;
  title: string;
  description: string;
  price: string;
  acceptedBy?: {
    name: string;
  };
  status: string; // Added status to handle open/accepted projects
};

const CurrentClient = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading state
  const [error, setError] = useState<string | null>(null); // State for handling errors

  const fetchProjects = async () => {
    const clientId = localStorage.getItem('userId');
    if (!clientId) return;

    try {
      setLoading(true); // Start loading
      // Fetch open and accepted projects
      const res = await axios.get(`/api/jobs/client-projects/${clientId}`);
      setProjects(res.data); // Set projects
    } catch (err) {
      console.error('Error fetching client projects:', err);
      setError('Error fetching projects. Please try again later.');
    } finally {
      setLoading(false); // Stop loading once the request is done
    }
  };

  useEffect(() => {
    fetchProjects(); // Initial fetch when the component is mounted
  }, []);

  // Handle refresh button click
  const handleRefresh = () => {
    setProjects([]); // Clear current projects
    fetchProjects(); // Re-fetch projects
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Accepted Projects</h1>
      <button
        className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded"
        onClick={handleRefresh}
      >
        Refresh Projects
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(project => (
          <div key={project._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h2 className="text-lg font-bold text-blue-700">{project.title}</h2>
            <p className="text-gray-600 mt-2">{project.description}</p>
            <p className="text-green-700 font-semibold mt-2">Budget: ₹{project.price}</p>
            {project.acceptedBy && (
              <p className="text-sm text-gray-500 mt-1">
                Assigned to: <strong>{project.acceptedBy.name}</strong>
              </p>
            )}
            <p className={`mt-2 text-sm ${project.status === 'accepted' ? 'text-green-600' : 'text-yellow-600'}`}>
              Status: {project.status === 'accepted' ? 'Accepted' : 'Open'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentClient;
