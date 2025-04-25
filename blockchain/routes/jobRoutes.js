const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// 🔍 Get all available (unassigned) jobs
router.get('/available', async (req, res) => {
  try {
    const jobs = await Job.find({ freelancerId: null });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching jobs', err });
  }
});

// ✅ Accept a job by freelancer
router.post('/accept/:jobId', async (req, res) => {
  const { freelancerId } = req.body;
  const { jobId } = req.params;

  try {
    const job = await Job.findByIdAndUpdate(
      jobId,
      {
        freelancerId,
        status: 'accepted'
      },
      { new: true }
    );
    res.status(200).json({ message: 'Job accepted', job });
  } catch (err) {
    res.status(500).json({ message: 'Job acceptance failed', err });
  }
});

// 📦 Get all jobs accepted by a freelancer
router.get('/my-projects/:freelancerId', async (req, res) => {
  try {
    const jobs = await Job.find({ freelancerId: req.params.freelancerId });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch freelancer jobs", error: err });
  }
});

module.exports = router;
