// controllers/referredStudentController.js

const ReferredStudent = require("../models/ReferredStudent");

// Create and refer a student
exports.referStudent = async (req, res) => {
  try {
    const { studentName, email, status, jobTitle, jobId, affiliateId } =
      req.body;
    const referredStudent = new ReferredStudent({
      studentName,
      email,
      status,
      jobTitle,
      jobId,
      affiliateId,
    });

    const savedStudent = await referredStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: "Error referring student", error });
  }
};

// Fetch all referred students for a specific job
exports.getReferredStudentsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const referredStudents = await ReferredStudent.find({ jobId });
    res.status(200).json(referredStudents);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching referred students", error });
  }
};

// Fetch a referred student by ID
exports.getReferredStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const referredStudent = await ReferredStudent.findById(id);
    if (!referredStudent) {
      return res.status(404).json({ message: "Referred student not found" });
    }
    res.status(200).json(referredStudent);
  } catch (error) {
    res.status(500).json({ message: "Error fetching referred student", error });
  }
};

// Update the status of a referred student
exports.updateReferredStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedStudent = await ReferredStudent.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Referred student not found" });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Error updating referred student", error });
  }
};

// Count the number of referred students for a job
exports.getReferredCountByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const count = await ReferredStudent.countDocuments({ jobId });
    res.status(200).json({ referredCount: count });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error counting referred students", error });
  }
};


// Count the number of referred students for a specific affiliate
exports.getReferredCountByAffiliate = async (req, res) => {
  try {
    const { affiliateId } = req.params;
    const count = await ReferredStudent.countDocuments({ affiliateId });
    res.status(200).json({ referredCount: count });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error counting referred students", error });
  }
};
