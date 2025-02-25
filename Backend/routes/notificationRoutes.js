const express = require("express");
const { getNotifications, markAsRead, markAllAsRead } = require("../controllers/notificationController");
const { protect } = require("../middleware/authmiddleware");

const router = express.Router();

// @route   GET /api/notifications
// @desc    Get notifications for a user
// @access  Private
router.get("/", protect, getNotifications);

// @route   PUT /api/notifications/:id/read
// @desc    Mark a specific notification as read
// @access  Private
router.put("/:id/read", protect, markAsRead);

// @route   PUT /api/notifications/read-all
// @desc    Mark all notifications as read
// @access  Private
router.put("/read-all", protect, markAllAsRead);

module.exports = router;
