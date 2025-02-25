const express = require("express");
const { getAllEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/eventController");
const { protect, checkRole } = require("../middleware/authmiddleware");

const router = express.Router();

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get("/", getAllEvents);

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (Admin)
router.post("/", protect, checkRole("admin"), createEvent);

// @route   PUT /api/events/:id
// @desc    Update event details
// @access  Private (Admin)
router.put("/:id", protect, checkRole("admin"), updateEvent);

// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Private (Admin)
router.delete("/:id", protect, checkRole("admin"), deleteEvent);

module.exports = router;
