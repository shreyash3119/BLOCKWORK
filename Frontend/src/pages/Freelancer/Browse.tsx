import React, { useEffect, useState } from "react";
import axios from "axios";

type Job = {
  _id: string;
  title: string;
  description: string;
  budget: number;
  acceptedBy?: string | null;
};

const Browse: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    axios.get("http://localhost:5000/api/jobs/available")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs", err));
  }, []);

  const handleAccept = async (jobId: string) => {
    try {
      await axios.post(`http://localhost:5000/api/jobs/accept/${jobId}`, {
        freelancerId: user._id,
      });
      setJobs(prev => prev.filter(job => job._id !== jobId));
    } catch (err) {
      console.error("Error accepting job", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Available Jobs</h2>
      <div className="grid grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div key={job._id} className="p-4 border rounded shadow bg-white">
            <h3 className="font-semibold">{job.title}</h3>
            <p className="text-sm mt-1">{job.description}</p>
            <p className="text-green-600 font-bold mt-2">₹{job.budget}</p>
            <button
              onClick={() => handleAccept(job._id)}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
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
