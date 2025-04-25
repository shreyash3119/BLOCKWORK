const Job = require('../models/Job');

// ✅ Create a new job
exports.createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: 'Job posted successfully!', job });
  } catch (err) {
    res.status(400).json({ message: 'Failed to post job', error: err });
  }
};

// ✅ Get all available (open) jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'open' });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(400).json({ message: 'Failed to fetch jobs', error: err });
  }
};

// ✅ Accept a job by a freelancer
exports.acceptJob = async (req, res) => {
  const { jobId, freelancerId } = req.body;
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        status: 'accepted',
        acceptedBy: freelancerId, // ✅ Fixed to match the Job schema
      },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job accepted', job: updatedJob });
  } catch (err) {
    res.status(400).json({ message: 'Failed to accept job', error: err });
  }
};
