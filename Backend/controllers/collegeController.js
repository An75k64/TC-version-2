const mongoose = require("mongoose"); // Import mongoose
const College = require("../models/College"); // Import the College model
const Notification = require("../models/Notification");
const { validationResult } = require("express-validator");

// Controller function to handle college form submission
const submitCollegeForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newCollege = new College({
      polytechnicCourses: req.body.polytechnicCourses,
      ugCourses: req.body.ugCourses,
      pgCourses: req.body.pgCourses,
      collegeName: req.body.collegeName,
      location: req.body.location,
      studentsStrengthPolytechnic: req.body.studentsStrengthPolytechnic,
      studentsStrengthUG: req.body.studentsStrengthUG,
      studentsStrengthPG: req.body.studentsStrengthPG,
      collegeEmail: req.body.collegeEmail,
      mobileNumber: req.body.mobileNumber,
      placementSeason: req.body.placementSeason,
      upcomingEvents: req.body.upcomingEvents,
      partnershipInterests: req.body.partnershipInterests,
    });

    await newCollege.save();

    // Create a notification for the form submission
    await Notification.create({
      type: "College Form Submitted",
      message: `A new college form has been submitted by ${newCollege.collegeName}.`,
    });
    
    res.status(201).send("College details submitted successfully");
  } catch (error) {
    console.error("Error submitting college details:", error);
    res.status(500).send("Error submitting college details");
  }
};

// Controller function to handle fetching all college forms
const getCollegeForms = async (req, res) => {
  try {
    const colleges = await College.find().sort({ createdAt: -1 });
    res.status(200).json(colleges);
  } catch (error) {
    console.error("Error fetching college forms:", error);
    res.status(500).send("Error fetching college forms");
  }
};

// Controller function to handle fetching a single college form by ID
const getCollegeFormById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).send("College form not found");
    }

    res.status(200).json(college);
  } catch (error) {
    console.error("Error fetching college form:", error);
    res.status(500).send("Error fetching college form");
  }
};

/// Controller function to handle deleting college forms by IDs
const deleteCollegeForm = async (req, res) => {
  const { ids } = req.body;

  // Log the incoming request body to debug
  console.log("Request body received:", req.body);

  // Check if ids are provided and if they are in array format
  if (!ids || !Array.isArray(ids)) {
    return res
      .status(400)
      .json({
        error: "Invalid request: 'ids' is required and should be an array",
      });
  }

  try {
    // Convert ids to ObjectId if they are valid MongoDB ObjectIds
    const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));

    // Delete the colleges matching the provided ids
    const result = await College.deleteMany({ _id: { $in: objectIds } });

    // Check if any documents were deleted
    if (result.deletedCount === 0) {
      return res.status(404).send("No college forms found with the given IDs");
    }

    res.status(200).send("College forms deleted successfully");
  } catch (error) {
    console.error("Error deleting college forms:", error);
    res.status(500).send("Error deleting college forms");
  }
};

// Get the count 
const Count = async (req, res) => {
   try {    
     const count = await College.countDocuments({ });
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
  submitCollegeForm,
  getCollegeForms,
  getCollegeFormById,
  deleteCollegeForm,
  Count,
};
