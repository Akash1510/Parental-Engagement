const express = require("express");
const {getTeacherRatings,addRating} = require("../controllers/ratingController")


const router = express.Router();

// @route   POST /api/ratings
// @desc    Rate a teacher
// @access  Private (Students)
router.post("/",addRating );

// @route   GET /api/ratings/:teacherId
// @desc    Get ratings for a specific teacher
// @access  Public
router.get("/:teacherId", getTeacherRatings);

module.exports = router;
