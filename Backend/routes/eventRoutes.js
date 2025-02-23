const express = require("express");
const { getAllEvents, createEvent} = require("../controllers/eventController");


const router = express.Router();

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get("/", getAllEvents);

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (Admin)
router.post("/",  createEvent);

// @route   PUT /api/events/:id
// @desc    Update event details
// @access  Private (Admin)
// router.put("/:id", authMiddleware, updateEvent);

// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Private (Admin)
// router.delete("/:id", authMiddleware, deleteEvent);

module.exports = router;
