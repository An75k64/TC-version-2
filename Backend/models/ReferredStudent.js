// models/ReferredStudent.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReferredStudentSchema = new Schema({
  studentName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "AffiliateJob", // Reference to the Affiliate Job model
    required: true,
  },
  affiliateId: {
    type: Schema.Types.ObjectId,
    ref: "Affiliate", // Reference to the Affiliate model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ReferredStudent", ReferredStudentSchema);
