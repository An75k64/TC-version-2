const Resume = require("../models/Resume"); // Import the Resume model
const Notification = require('../models/Notification'); // Import the Notification model
const { validationResult } = require("express-validator");

// Controller function to handle resume submission
const submitResume = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check for existing resume with the same email or phone number
    const existingResume = await Resume.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });

    if (existingResume) {
      return res.status(400).json({
        message: "A resume with this email or phone number already exists.",
      });
    }

    // Create a new resume document using data from the request
    const newResume = new Resume({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      resumePath: req.file.path, // Path of the uploaded resume file
    });

    // Save the resume document to the database
    await newResume.save();

    // Create a notification for the new resume submission
    await Notification.create({
      type: "Resume Submission",
      message: `New resume submitted by ${req.body.name} (${req.body.email})`,
    });
    
    // Send a success response
    res.status(201).send("Resume uploaded successfully");
  } catch (error) {
    // Handle errors and send an error response
    console.error("Error uploading resume:", error);
    res.status(500).send("Error uploading resume");
  }
};

// Controller function to handle fetching all resumes
const getResumes = async (req, res) => {
  try {
    // Retrieve all resume documents from the database
    const resumes = await Resume.find().sort({ createdAt: -1 }); 

    // Send the resumes as a JSON response
    res.status(200).json(resumes);
  } catch (error) {
    // Handle errors and send an error response
    console.error("Error fetching resumes:", error);
    res.status(500).send("Error fetching resumes");
  }
};

// Controller function to handle fetching a single resume by ID
const getResumeById = async (req, res) => {
  try {
    // Retrieve a specific resume document from the database by ID
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      // If no resume is found, send a 404 response
      return res.status(404).send("Resume not found");
    }

    // Send the resume as a JSON response
    res.status(200).json(resume);
  } catch (error) {
    // Handle errors and send an error response
    console.error("Error fetching resume:", error);
    res.status(500).send("Error fetching resume");
  }
};


// Get the count 
const Count = async (req, res) => {
   try {    
     const count = await Resume.countDocuments({ });
     res.status(200).json({count });
   } catch (error) {
     console.error("Error fetching the number of count:", error);
     res
       .status(500)
       .json({
         message: "Error fetching the number of count",
         error: error.message,
       });
   }
};

// Export the controller functions to be used in routes
module.exports = {
  submitResume,
  getResumes,
  getResumeById,
  Count
};
