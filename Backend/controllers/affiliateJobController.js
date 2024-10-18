// controllers/jobController.js
const Job = require("../models/AffiliateJob");
const mongoose = require("mongoose");

// Create a new job posting
const createJob = async (req, res) => {
  try {
    const { jobTitle, skillset, experience, location, domain, salary } = req.body;
    const affiliateId = req.body.affiliateId; // Assume affiliateId is sent in the request body

    const job = new Job({
      jobTitle,
      skillset,
      experience,
      location,
      domain,
      salary,
      affiliateId,
    });
    await job.save();

    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Fetch all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Fetch a job by Affiliate ID
const getJobByAffiliateId = async (req, res) => {
  try {
    const affiliateId = req.params.id;

    // Check if the provided affiliateId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(affiliateId)) {
      return res.status(400).json({ message: "Invalid Affiliate ID format" });
    }

    const jobs = await Job.find({
      affiliateId: new mongoose.Types.ObjectId(affiliateId),
    }); // Use 'new' keyword to create ObjectId

    if (jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found for this affiliate ID" });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a job posting
const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    await Job.findByIdAndDelete(jobId);
    res.status(204).send(); // No content response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};




// Edit a job by ID
const editJobById = async (req, res) => {
  const { jobId } = req.params;
  const updates = req.body;

  try {
    const job = await Job.findByIdAndUpdate(jobId, updates, {
      new: true, // return the updated document
      runValidators: true // ensure validation rules are applied
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Count jobs by affiliateId
const countJobsByAffiliateId = async (req, res) => {
  const { affiliateId } = req.params;

  try {
    // Check if the provided affiliateId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(affiliateId)) {
      return res.status(400).json({ message: "Invalid Affiliate ID format" });
    }

    const count = await Job.countDocuments({ affiliateId: new mongoose.Types.ObjectId(affiliateId) });

    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Fetch a job by jobId
const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Check if the provided jobId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid Job ID format" });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {
  createJob,
  getJobs,
  getJobByAffiliateId, // Export the new function
  deleteJob,
  editJobById,
  countJobsByAffiliateId,
  getJobById
};
