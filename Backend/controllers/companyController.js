const mongoose = require("mongoose"); // Import mongoose
const Company = require("../models/Company"); // Import the company model
const Notification = require("../models/Notification");
const { validationResult } = require("express-validator");

// Controller function to handle company form submission
const submitCompanyForm = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Create a new company document using data from the request
    const newCompany = new Company({
      companyName: req.body.companyName,
      industry: req.body.industry,
      location: req.body.location,
      companySize: req.body.companySize,
      contactPerson: req.body.contactPerson,
      contactEmail: req.body.contactEmail,
      contactPhone: req.body.contactPhone,
      partnershipInterests: req.body.partnershipInterests,
      additionalInfo: req.body.additionalInfo,
    });

    // Save the company document to the database
    await newCompany.save();

    // Create a notification for the form submission
    await Notification.create({
      type: "Company Form Submitted",
      message: `A new company form has been submitted by ${newCompany.companyName}.`,
    });
    // Send a success response
    res.status(201).send("Company details submitted successfully");
  } catch (error) {
    // Handle errors and send an error response
    console.error("Error submitting company details:", error);
    res.status(500).send("Error submitting company details");
  }
};

// Controller function to handle fetching all company forms
const getCompanyForms = async (req, res) => {
  try {
    // Retrieve all company documents from the database
    const company = await Company.find().sort({ createdAt: -1 }); 

    // Send the company as a JSON response
    res.status(200).json(company);
  } catch (error) {
    // Handle errors and send an error response
    console.error("Error fetching company forms:", error);
    res.status(500).send("Error fetching company forms");
  }
};

// Controller function to handle fetching a single company form by ID
const getcompanyFormById = async (req, res) => {
  try {
    // Retrieve a specific company document from the database by ID
    const company = await Company.findById(req.params.id);

    if (!company) {
      // If no company is found, send a 404 response
      return res.status(404).send("company form not found");
    }

    // Send the company as a JSON response
    res.status(200).json(company);
  } catch (error) {
    // Handle errors and send an error response
    console.error("Error fetching company form:", error);
    res.status(500).send("Error fetching company form");
  }
};

/// Controller function to handle deleting company forms by IDs
const deleteCompanyForm = async (req, res) => {
  const { ids } = req.body;

  // Log the incoming request body to debug
  console.log("Request body received:", req.body);

  // Check if ids are provided and if they are in array format
  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({
      error: "Invalid request: 'ids' is required and should be an array",
    });
  }

  try {
    // Convert ids to ObjectId if they are valid MongoDB ObjectIds
    const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));

    // Delete the colleges matching the provided ids
    const result = await Company.deleteMany({ _id: { $in: objectIds } });

    // Check if any documents were deleted
    if (result.deletedCount === 0) {
      return res.status(404).send("No company forms found with the given IDs");
    }

    res.status(200).send("Company forms deleted successfully");
  } catch (error) {
    console.error("Error deleting company forms:", error);
    res.status(500).send("Error deleting company forms");
  }
};

// Get the count 
const Count = async (req, res) => {
   try {    
     const count = await Company.countDocuments({ });
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
  submitCompanyForm,
  getCompanyForms,
  getcompanyFormById,
  deleteCompanyForm,
  Count,
};
