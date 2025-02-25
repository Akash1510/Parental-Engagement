const express = require("express");
const { getStudentProfile, updateStudentProfile } = require("../controllers/studentController");
const { protect, checkRole } = require("../middleware/authmiddleware");

const router = express.Router();

// @route   GET /api/students/:id
// @desc    Get student profile
// @access  Private (Parent, Student, Admin)
router.get("/:id", protect, checkRole("teacher", "student", "parent"), getStudentProfile);

// @route   PUT /api/students/:id
// @desc    Update student profile
// @access  Private (Only Admin & Student Themselves)
router.put("/:id", protect, checkRole("teacher", "student"), updateStudentProfile);

module.exports = router;
