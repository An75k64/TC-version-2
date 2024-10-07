const express = require("express");
const router = express.Router();
const {
  getNotifications,
  getUnreadCount,
  markAsRead,
  deleteNotifications,
} = require("../controllers/NotificationController"); // Import the controller functions

// Route to get all notifications
router.get("/", getNotifications);

// Route to get unread notifications count
router.get("/unread-count", getUnreadCount);

// Route to mark notifications as read
router.put("/mark-as-read", markAsRead);

router.delete("/delete", deleteNotifications); 

module.exports = router;
