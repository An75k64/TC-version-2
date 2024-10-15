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
