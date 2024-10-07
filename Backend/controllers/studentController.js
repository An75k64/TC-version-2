const Resume = require("../models/Resume");
const { validationResult } = require("express-validator");
const ExcelJS = require("exceljs");
const path = require("path");
const mime = require("mime-types");
const fs = require("fs");


// Fetch all student resumes
const getAllStudents = async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.status(200).json(resumes);
  } catch (error) {
    console.error("Error fetching student resumes:", error);
    res.status(500).send("Error fetching student resumes");
  }
};

// Fetch a single student resume by ID
const getStudentById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).send("Resume not found");
    }
    res.status(200).json(resume);
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).send("Error fetching resume");
  }
};

// Serve resume for viewing
const viewResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).send("Resume not found");
    }

    const filePath = path.join(__dirname, "../", resume.resumePath);
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
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).send("Resume not found");
    }
    const filePath = path.join(__dirname, "../", resume.resumePath);
  
    res.download(filePath);
  } catch (error) {
    console.error("Error downloading resume:", error);
    res.status(500).send("Error downloading resume");
  }
};

// Export student data to Excel 
const exportToExcel = async (req, res) => {
  try {
    const studentIds = req.body.ids; // array of student IDs
    const resumes = await Resume.find({ _id: { $in: studentIds } });
    if (resumes.length === 0) {
      return res.status(404).send("No resumes found for the selected students");
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Students");

    worksheet.columns = [
      { header: "Name", key: "name", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 15 },
      { header: "Resume Path", key: "resumePath", width: 50 },
      { header: "Created At", key: "createdAt", width: 25 },
    ];

    resumes.forEach((resume) => {
      worksheet.addRow({
        name: resume.name,
        email: resume.email,
        phone: resume.phone,
        resumePath: resume.resumePath,
        createdAt: resume.createdAt,
      });
    });

    const filePath = path.join(__dirname, "../", "students.xlsx");
    await workbook.xlsx.writeFile(filePath);

    res.download(filePath, () => {
      fs.unlinkSync(filePath); // Remove the file after download
    });
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    res.status(500).send("Error exporting to Excel");
  }
};



// Delete resumes by IDs
const deleteResumes = async (req, res) => {
  try {
    const studentIds = req.body.ids; // Array of student IDs

    if (!Array.isArray(studentIds) || studentIds.length === 0) {
      return res.status(400).send("No IDs provided");
    }

    // Find resumes by IDs and remove them
    const result = await Resume.deleteMany({ _id: { $in: studentIds } });

    if (result.deletedCount === 0) {
      return res.status(404).send("No resumes found to delete");
    }

    // Optionally: delete files from the file system if needed
    // (Assuming you have a field resumePath storing file paths)
    for (const id of studentIds) {
      const resume = await Resume.findById(id);
      if (resume && resume.resumePath) {
        const filePath = path.join(__dirname, "../", resume.resumePath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); // Delete the file
        }
      }
    }

    res.status(200).send("Resumes deleted successfully");
  } catch (error) {
    console.error("Error deleting resumes:", error);
    res.status(500).send("Error deleting resumes");
  }
};


module.exports = {
  getAllStudents,
  getStudentById,
  viewResume,
  downloadResume,
  exportToExcel,
  deleteResumes,
};
