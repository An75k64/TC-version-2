// College.js

const mongoose = require("mongoose");

// Define College schema
const collegeSchema = new mongoose.Schema({
  polytechnicCourses: [{ type: String }],
  ugCourses: [{ type: String }],
  pgCourses: [{ type: String }],
  collegeName: { type: String, required: true },
  location: { type: String, required: true },
  studentsStrengthPolytechnic: { type: Number},
  studentsStrengthUG: { type: Number },
  studentsStrengthPG: { type: Number },
  collegeEmail: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  placementSeason: { type: String, required: true },
  upcomingEvents: { type: String },
  partnershipInterests: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

// Create a model based on the schema
const College = mongoose.model("College", collegeSchema);

module.exports = College;
