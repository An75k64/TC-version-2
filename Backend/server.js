require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Import routes
const resumeRouter = require("./routes/resumeRoutes");
const collegeRouter = require("./routes/collegeRoutes");
const companyRouter = require("./routes/companyRoutes");
const contactRouter = require("./routes/contactRoutes");
const jobApplicationRoutes = require("./routes/jobApplicationRoutes");
const studentRoutes = require("./routes/studentRoutes");
const cardRoutes = require("./routes/cardRoutes");
const loginRoutes = require("./routes/admin");
const notificationRoutes = require("./routes/notificationRoutes");
const affiliateRoutes = require("./routes/affiliateRoutes");
const affiliateJobRoutes = require("./routes/affiliateJobRoutes");
const referredStudentRoutes = require("./routes/referredStudentRoutes");


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for CORS
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*'); // Allow all origins
  next();
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files from uploads directory

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("Mongo URI:", process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    app.listen(PORT, "0.0.0.0", () => {
     console.log(`Server is running on port ${PORT}`);
   });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });


// API Routes
app.use("/api/resumes", resumeRouter);
app.use("/api/college", collegeRouter);
app.use("/api/company", companyRouter);
app.use("/api/contact", contactRouter);
// Use job application routes
app.use('/api/job-applications', jobApplicationRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/affiliate", affiliateRoutes);
// Use routes
app.use('/api/affiliateJob', affiliateJobRoutes);

app.use("/api", loginRoutes);

// Use routes
app.use('/api/notifications', notificationRoutes);

app.use('/api', referredStudentRoutes); // Add the route for referred students

// Default route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to TalentConnect API");
});


