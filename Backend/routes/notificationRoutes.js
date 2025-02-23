const express = require("express");
const { getNotifications, markAsRead } = require("../controllers/notificationController");


const router = express.Router();

// @route   GET /api/notifications
// @desc    Get notifications for a user
// @access  Private
router.get("/",  getNotifications);

// @route   PUT /api/notifications/:id/read
// @desc    Mark a notification as read
// @access  Private
router.put("/:id/read",markAsRead);

module.exports = router;
