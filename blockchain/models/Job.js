const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: String,
  tags: [String],
  status: { type: String, enum: ['open', 'accepted', 'completed'], default: 'open' },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer', default: null }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
