// models/jobApplication.js
const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  resume: {
    type: String, // Store the path to the uploaded resume file
    required: true,
  },
  jobId: {
    type: String,
    ref: "Card", // Assuming you have a Job model
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("jobApplication", JobApplicationSchema);
