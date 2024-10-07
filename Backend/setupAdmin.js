require("dotenv").config(); // Ensure environment variables are loaded

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin"); // Path to your Admin model

const createAdmin = async () => {
  try {
    const saltRounds = 10;
    const password = "t@l{ntc0nnecT42"; // Change this to your desired password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const admin = new Admin({
      username: "talentconnectadmin", // Change this to your desired username
      password: hashedPassword,
      email: "hr.talentconnect111@gmail.com",
    });

    await admin.save();
    console.log("Admin user created successfully");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error creating admin user:", err);
  }
};

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("MongoDB URI is not defined. Please check your .env file.");
  process.exit(1);
}

mongoose
  .connect(mongoURI, {})
  .then(createAdmin)
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
