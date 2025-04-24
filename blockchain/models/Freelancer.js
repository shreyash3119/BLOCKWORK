const mongoose = require('mongoose');

const FreelancerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { // ← You were missing this!
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model('Freelancer', FreelancerSchema);
