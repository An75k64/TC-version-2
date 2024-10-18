// models/Job.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    skillset: { type: String, required: true },
    experience: { type: String, required: true },
    location: { type: String, required: true },
    domain: { type: String, required: true },
    salary: { type: String, required: true },
    affiliateId: { type: String, required: true }, // Add affiliateId field
  },
  { timestamps: true }
);

module.exports = mongoose.model("AffiliateJob", jobSchema);
