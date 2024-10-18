const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    jobId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    location: String,
    salary: String,
    experience: String,
    jobDescription: String,
    jobRole: String,
    department: String,
    roleCategory: String,
    employmentType: String,
    education: String,
    englishLevel: String,
    gender: String,
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);
