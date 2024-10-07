// Company.js

const mongoose = require("mongoose");

// Define College schema
const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  industry: { type: String, required: true },
  location: { type: String, required: true },
  companySize: { type: Number, required: true },
  contactPerson: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: Number, required: true },
  partnershipInterests: [{ type: String }],
  additionalInfo: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Create a model based on the schema
const Company = mongoose.model("Company", companySchema);

module.exports = Company;
