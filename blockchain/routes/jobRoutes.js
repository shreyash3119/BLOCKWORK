const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// ✅ POST a new job (Client side)
router.post('/post', async (req, res) => {
  const { title, description, price, tags, clientId } = req.body;

  try {
    const newJob = new Job({
      title,
      description,
      price,
      tags,
      clientId,
    });

    const savedJob = await newJob.save();
    res.status(201).json({ message: 'Job posted successfully', job: savedJob });
  } catch (err) {
    res.status(500).json({ message: 'Error posting job', err });
  }
});

// ✅ GET available jobs for freelancers (only jobs with status 'open')
router.get('/available', async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'open' });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching available jobs', err });
  }
});

// ✅ PUT accept job by freelancer
router.post('/accept/:jobId', async (req, res) => {
  const { freelancerId } = req.body;
  const { jobId } = req.params;

  try {
    const job = await Job.findByIdAndUpdate(
      jobId,
      {
        acceptedBy: freelancerId,
        status: 'accepted'
      },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job accepted', job });
  } catch (err) {
    res.status(500).json({ message: 'Job acceptance failed', err });
  }
});

// ✅ GET current projects for freelancer
router.get('/freelancer-projects/:freelancerId', async (req, res) => {
  try {
    const jobs = await Job.find({ acceptedBy: req.params.freelancerId });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching freelancer projects', err });
  }
});

// ✅ FIXED: GET current projects for client (only accepted jobs)
router.get('/client-projects/:clientId', async (req, res) => {
  try {
    const jobs = await Job.find({
      clientId: req.params.clientId,
      acceptedBy: { $ne: null },
    }).populate('acceptedBy', 'name email'); // ✅ Populates accepted freelancer

    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching client projects:", err);
    res.status(500).json({ message: 'Error fetching client projects', error: err.message });
  }
});

// ✅ GET jobs posted by a client (including unaccepted ones)
router.get('/my-projects/:clientId', async (req, res) => {
  try {
    const jobs = await Job.find({ clientId: req.params.clientId });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posted jobs', err });
  }
});

module.exports = router;
