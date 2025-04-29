import { useEffect, useState } from 'react';
import axios from 'axios';

interface Job {
  _id: string;
  title: string;
  description: string;
  price: string;
  tags: string[];
  acceptedBy?: string | null;
}

const Browse = () => {
  const [availableJobs, setAvailableJobs] = useState<Job[]>([]);
  const [notification, setNotification] = useState('');
  const freelancerId = localStorage.getItem('userId');

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/jobs/available');
      const unacceptedJobs = res.data.filter((job: Job) => !job.acceptedBy);
      setAvailableJobs(unacceptedJobs);
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAccept = async (jobId: string) => {
    try {
      await axios.post(`http://localhost:5001/api/jobs/accept/${jobId}`, {
        freelancerId,
      });
      setNotification('✅ Job accepted successfully!');
      // Remove job from list immediately
      setAvailableJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error('Error accepting job', error);
      setNotification('❌ Failed to accept job.');
    }

    // Hide notification after 3 seconds
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="p-6">
      {notification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-100 border border-blue-400 text-blue-800 px-6 py-3 rounded shadow-md z-50">
          {notification}
        </div>
      )}
      <h1 className="text-2xl font-bold mb-6">Browse Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableJobs.map((job) => (
          <div key={job._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-indigo-700">{job.title}</h2>
            <p className="text-gray-700 mt-2">{job.description}</p>
            <p className="text-green-600 font-semibold mt-2">Budget: ₹{job.price}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {job.tags.map((tag, idx) => (
                <span key={idx} className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                  #{tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => handleAccept(job._id)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Accept Job
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;
