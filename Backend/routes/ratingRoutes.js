const express = require("express");
const { rateTeacher, getTeacherRatings } = require("../controllers/ratingController");
const { protect, checkRole } = require("../middleware/authmiddleware");

const router = express.Router();

// @route   POST /api/ratings
// @desc    Rate a teacher (Only Parents & Students)
// @access  Private
router.post("/", protect, checkRole("parent", "student"), rateTeacher);

// @route   GET /api/ratings/:teacherId
// @desc    Get ratings for a specific teacher
// @access  Public
router.get("/:teacherId", getTeacherRatings);

module.exports = router;
