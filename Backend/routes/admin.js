// routes/admin.js

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/email");
const Admin = require("../models/Admin");
const router = express.Router();
const sendMail = require("../config/email");

// Environment variables
require("dotenv").config();

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Forgot Password Route
router.post("/forgot-password", async (req, res) => {
  const { username } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    console.log(admin);
    if (!admin) return res.status(404).json({ message: "Username not found" });

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generates a 6-digit OTP
    admin.otp = otp;
    admin.otpExpiration = Date.now() + 600000; // 10 minutes expiration
    await admin.save();

    // Construct the email content
    const htmlContent = `<p>Your OTP for password reset is: <strong>${otp}</strong>. It will expire in 10 minutes.</p>`;

    // Send email
    await sendMail(admin.email, "Password Reset OTP", htmlContent);

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Verify OTP and Reset Password Route
router.post("/reset-password", async (req, res) => {
  const { username, otp, newPassword } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ message: "Username not found" });

    // Verify OTP and check if it's expired
    if (admin.otp !== otp || admin.otpExpiration < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Update password
    admin.password = await bcrypt.hash(newPassword, 10);
    admin.otp = undefined;
    admin.otpExpiration = undefined;
    await admin.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
