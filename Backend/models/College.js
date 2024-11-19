const mongoose = require("mongoose");

// Define College schema
const collegeSchema = new mongoose.Schema({
  polytechnicCourses: [{ type: String, required: true }],
  ugCourses: [{ type: String, required: true }],
  pgCourses: [{ type: String, required: true }],
  collegeName: { type: String, required: true },
  location: {
    street: { type: String, required: true },
    landmark: { type: String },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  studentsStrengthPolytechnic: { type: Number },
  studentsStrengthUG: { type: Number },
  studentsStrengthPG: { type: Number },
  collegeEmail: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  placementSeasonDuration: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  upcomingEvents: { type: String },
  partnershipInterests: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

// Create a model based on the schema
const College = mongoose.model("College", collegeSchema);

module.exports = College;
