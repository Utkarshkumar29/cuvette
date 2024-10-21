const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ['Fresher','Junior', 'Mid', 'Senior'],
  },
  candidates: [
    {
      type: String,
      required: true,
    }
  ],
  endDate: {
    type: Date,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
