// models/Affiliate.js

const mongoose = require("mongoose");

const affiliateSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyEmail: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Affiliate", affiliateSchema);
