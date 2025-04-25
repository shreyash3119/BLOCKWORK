const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  tags: [String],
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // ✅ should be 'User'
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // ✅ populate will only work if this is correct
    default: null,
  },
  status: {
    type: String,
    enum: ['open', 'accepted', 'completed'],
    default: 'open',
  },
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
