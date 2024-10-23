// controllers/affiliateController.js

const Affiliate = require("../models/Affiliate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Optional: For generating tokens, if using JWT

exports.createAffiliate = async (req, res) => {
  const {
    fullName,
    email,
    password,
    phoneNumber,
    companyName,
    companyEmail,
    designation,
  } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const affiliate = new Affiliate({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      companyName,
      companyEmail,
      designation,
    });

    await affiliate.save();
    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// New login function
exports.loginAffiliate = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the affiliate by email
    const affiliate = await Affiliate.findOne({ email });
    if (!affiliate) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, affiliate.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Optional: Generate a token (if using JWT)
    const token = jwt.sign({ id: affiliate._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Adjust the expiration time as needed
    });

    res.status(200).json({
      message: "Login successful!",
      token, // Send the token in response (if applicable)
      affiliate: {
        id: affiliate._id,
        fullName: affiliate.fullName,
        email: affiliate.email,
        phoneNumber: affiliate.phoneNumber,
        companyName: affiliate.companyName,
        companyEmail: affiliate.companyEmail,
        designation: affiliate.designation,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};



exports.getAffiliateProfile = async (req, res) => {
  const affiliateId = req.params.id; // Extract affiliate ID from request parameters
  ///console.log("Received affiliateId:", affiliateId); // Log the affiliateId

  try {
    // Find affiliate by ID
    const affiliate = await Affiliate.findById(affiliateId);

    if (!affiliate) {
      return res.status(404).json({ message: "Affiliate not found" });
    }

    // Send affiliate details in response
    res.status(200).json({
      affiliate: {
        id: affiliate._id,
        fullName: affiliate.fullName,
        email: affiliate.email,
        phoneNumber: affiliate.phoneNumber,
        companyName: affiliate.companyName,
        companyEmail: affiliate.companyEmail,
        designation: affiliate.designation,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};



// Change Password Function
exports.changePassword = async (req, res) => {
  const { affiliateId, oldPassword, newPassword } = req.body;

  try {
    // Find the affiliate by ID
    const affiliate = await Affiliate.findById(affiliateId);

    if (!affiliate) {
      return res.status(404).json({ message: "Affiliate not found" });
    }

    // Check if the old password matches
    const isOldPasswordValid = await bcrypt.compare(oldPassword, affiliate.password);
    if (!isOldPasswordValid) {
      return res.status(401).json({ message: "Old password is incorrect." });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    affiliate.password = hashedNewPassword;
    await affiliate.save();

    res.status(200).json({ message: "Password changed successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Function to get the total count of registered affiliates
exports.getAffiliateCount = async (req, res) => {
  try {
    // Count the number of affiliates in the database
    const count = await Affiliate.countDocuments();
    
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching affiliate count:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


// Get all affiliates
exports.getAllAffiliates = async (req, res) => {
  try {
    const affiliates = await Affiliate.find(); // Fetch all affiliate users

    if (!affiliates || affiliates.length === 0) {
      return res.status(404).json({ message: "No affiliates found" });
    }

    // Send the list of affiliates
    res.status(200).json({ affiliates });
  } catch (error) {
    console.error("Error fetching affiliates:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete one or multiple affiliates
exports.deleteAffiliates = async (req, res) => {
  const { affiliateIds } = req.body; // Expect an array of affiliate _ids

  if (!affiliateIds || affiliateIds.length === 0) {
    return res.status(400).json({ message: "No affiliate IDs provided" });
  }

  try {
    // Delete the affiliates whose _id is in the affiliateIds array
    const result = await Affiliate.deleteMany({ _id: { $in: affiliateIds } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No affiliates found to delete" });
    }

    res.status(200).json({ message: `${result.deletedCount} affiliate(s) deleted successfully!` });
  } catch (error) {
    console.error("Error deleting affiliates:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

