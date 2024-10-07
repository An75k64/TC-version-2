const Notification = require("../models/Notification"); // Import the Notification model

// Controller function to fetch all notifications with search and filters
const getNotifications = async (req, res) => {
  try {
    
    const { searchTerm, filterType, filterStatus } = req.query;

    // Build the query object
    let query = {};

    if (searchTerm) {
      query.message = { $regex: searchTerm, $options: 'i' }; // Case-insensitive search
    }

    if (filterType) {
      query.type = { $regex: filterType, $options: 'i' };
    }

    if (filterStatus) {
      query.read = filterStatus === 'read';
    }

    const notifications = await Notification.find(query).sort({ createdAt: -1 }); // Sort notifications by creation date
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

// Controller function to fetch unread notifications count
const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({ read: false });
    res.status(200).json({ count });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching unread notifications count", error });
  }
};

// Controller function to mark notifications as read
const markAsRead = async (req, res) => {
  try {
    const { ids } = req.body; // Expecting an array of notification IDs
    if (!Array.isArray(ids)) {
      return res
        .status(400)
        .json({ message: "Invalid input, 'ids' should be an array" });
    }
    await Notification.updateMany({ _id: { $in: ids } }, { read: true });
    res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error marking notifications as read", error });
  }
};

// Controller function to delete notifications
const deleteNotifications = async (req, res) => {
  try {
    const { ids } = req.body; // Expecting an array of notification IDs
    if (!Array.isArray(ids)) {
      return res.status(400).json({ message: "Invalid input, 'ids' should be an array" });
    }
    await Notification.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting notifications", error });
  }
};


module.exports = {
  getNotifications,
  getUnreadCount,
  markAsRead,
  deleteNotifications,
};
