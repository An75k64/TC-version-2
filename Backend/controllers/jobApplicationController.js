// controllers/JobApplicationController.js
const jobApplication = require("../models/jobApplication");
const Notification = require("../models/Notification");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");
const Card = require('../models/Card');


// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/JobResume/"); // Specify the directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a timestamp as the file name
  },
});

const upload = multer({ storage });

const createJobApplication = async (req, res) => {
  try {
    const { name, email, phone, jobId, affiliateId, jobTitle } = req.body;
    const resume = req.file ? req.file.filename : null;

    if (!resume) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const newApplication = new jobApplication({
      name,
      email,
      phone,
      resume,
      jobId,
      affiliateId,
      jobTitle,
    });

    await newApplication.save();
    // Create a notification for the new job application
    await Notification.create({
      type: "Job Application",
      message: `New job application received for job ID ${jobId} (${jobTitle}) from ${name} (${email})`,
    });

    res.status(201).json({ message: "Job application submitted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting job application", error });
  }
};

const getJobApplications = async (req, res) => {
  try {
    const applications = await jobApplication
      .find()
      .populate("jobId", "title")
      .sort({ appliedAt: -1 }); 
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job applications", error });
  }
};

// Get the count of applications for a specific job
const getApplicationsCount = async (req, res) => {
   try {
     const jobId = req.params.jobId;
     const count = await jobApplication.countDocuments({ jobId });
     res.status(200).json({ jobId, count });
   } catch (error) {
     console.error("Error fetching application count:", error);
     res
       .status(500)
       .json({
         message: "Error fetching application count",
         error: error.message,
       });
   }
};

// Get all applications for a specific job
const getJobApplicationsByJobId = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // Find applications with the matching jobId
    const applications = await jobApplication.find({ jobId });

    // If you need to get the title, manually query the Card model
    const job = await Card.findOne({ jobId });

    // Attach the title to each application (if necessary)
    const applicationsWithTitle = applications.map((application) => ({
      ...application._doc,
      jobTitle: job ? job.title : "Title not found",
    }));

    res.status(200).json(applicationsWithTitle);
  } catch (error) {
    console.error("Error fetching job applications by jobId:", error);
    res.status(500).json({
      message: "Error fetching job applications",
      error: error.message,
    });
  }
};


// Delete resumes by IDs
const deleteJobApplication = async (req, res) => {
  try {
    const studentIds = req.body.ids; // Array of student IDs

    if (!Array.isArray(studentIds) || studentIds.length === 0) {
      return res.status(400).send("No IDs provided");
    }

    // Find resumes by IDs and remove them from the file system
    for (const id of studentIds) {
      const resu = await jobApplication.findById(id);
      if (resu && resu.resumePath) {
        const filePath = path.join(__dirname, "../uploads/JobResume", resu.resumePath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); // Delete the file
        }
      }
    }

    // Delete the database records
    const result = await jobApplication.deleteMany({ _id: { $in: studentIds } });

    if (result.deletedCount === 0) {
      return res.status(404).send("No resumes found to delete");
    }

    res.status(200).send("Resumes and associated files deleted successfully");
  } catch (error) {
    console.error("Error deleting resumes:", error);
    res.status(500).send("Error deleting resumes");
  }
};




// Serve resume for viewing
const viewResume = async (req, res) => {
  try {
    const resu = await jobApplication.findById(req.params.id);
    if (!resu) {
      return res.status(404).send("Resume not found");
    }

    const filePath = path.join(__dirname, "../uploads/JobResume", resu.resume);
    const mimeType = mime.lookup(filePath);

    if (!mimeType) {
      return res.status(400).send("Unsupported file type");
    }

    // Set the Content-Type header to the correct MIME type
    res.setHeader("Content-Type", mimeType);

    // For PDFs, you can send the file directly to be viewed in the browser.
    if (mimeType === "application/pdf") {
      res.sendFile(filePath);
    }
    // For DOCX, you can attempt to display it in the browser or offer it for download.
    else if (
      mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // You can use content disposition to force it to be downloaded or just open in the browser
      res.setHeader(
        "Content-Disposition",
        "inline; filename=" + path.basename(filePath)
      );
      res.sendFile(filePath);
    } else {
      return res.status(400).send("Unsupported file type for viewing");
    }
  } catch (error) {
    console.error("Error viewing resume:", error);
    res.status(500).send("Error viewing resume");
  }
};

// Download resume as PDF
const downloadResume = async (req, res) => {
  try {
    const resu = await jobApplication.findById(req.params.id);
    if (!resu) {
      return res.status(404).send("Resume not found");
    }
    const filePath = path.join(
      __dirname,
      "../uploads/JobResume",
      resu.resume
    );
  
    res.download(filePath);
  } catch (error) {
    console.error("Error downloading resume:", error);
    res.status(500).send("Error downloading resume");
  }
};

// Get the count 
const Count = async (req, res) => {
   try {    
     const count = await jobApplication.countDocuments({ });
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

module.exports = {
  createJobApplication,
  getJobApplications,
  upload,
  getApplicationsCount,
  getJobApplicationsByJobId,
  viewResume,
  downloadResume,
  deleteJobApplication,
  Count,
};
