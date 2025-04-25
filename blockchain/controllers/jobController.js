const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: 'Job posted successfully!', job });
  } catch (err) {
    res.status(400).json({ message: 'Failed to post job', error: err });
  }
};

exports.getJobs = async (req, res) => {
  const jobs = await Job.find({ status: 'open' });
  res.status(200).json(jobs);
};

exports.acceptJob = async (req, res) => {
  const { jobId, freelancerId } = req.body;
  try {
    const updatedJob = await Job.findByIdAndUpdate(jobId, {
      status: 'accepted',
      freelancerId,
    }, { new: true });

    res.status(200).json({ message: 'Job accepted', job: updatedJob });
  } catch (err) {
    res.status(400).json({ message: 'Failed to accept job', error: err });
  }
};
