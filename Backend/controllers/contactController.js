// controllers/contactController.js
const mongoose = require("mongoose"); // Import mongoose
const Notification = require("../models/Notification");
const Contact = require("../models/contact");

exports.createContact = async (req, res) => {
  try {
    const { userType, name, email, message } = req.body;
    const newContact = new Contact({ userType, name, email, message });
    await newContact.save();
    
    // Create a notification for the new contact message
    await Notification.create({
      type: "Contact Message",
      message: `New contact message from ${name} (${email}): ${message}`,
    });
    res.status(201).json({ message: "Contact message saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving contact message", error });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); 
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts", error });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact", error });
  }
};

exports.deleteContacts = async (req, res) => {
  const { ids } = req.body;

  // Log the incoming request body to debug
  console.log("Request body received:", req.body);

  if (!ids || !Array.isArray(ids)) {
    return res
      .status(400)
      .json({
        error: "Invalid request: 'ids' is required and should be an array",
      });
  }

  try {
    const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));

    const result = await Contact.deleteMany({ _id: { $in: objectIds } });

    if (result.deletedCount === 0) {
      return res.status(404).send("No contacts found with the given IDs");
    }

    res.status(200).send("Contacts deleted successfully");
  } catch (error) {
    console.error("Error deleting contacts:", error);
    res.status(500).send("Error deleting contacts");
  }
};

// Get the count 
exports.Count = async (req, res) => {
   try {    
     const count = await Contact.countDocuments({ });
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
