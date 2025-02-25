const express = require("express");
const { 
    getAllTeachers, 
    getTeacherById, 
    rateTeacher, 
    getTeacherProfile, 
    updateTeacherProfile, 
    scheduleMeeting 
} = require("../controllers/teacherController");
const { protect, checkRole } = require("../middleware/authmiddleware");

const router = express.Router();

// @route   GET /api/teachers
// @desc    Get all teachers
// @access  Public
router.get("/", getAllTeachers);

// @route   GET /api/teachers/:id
// @desc    Get a teacher by ID
// @access  Public
router.get("/:id", getTeacherById);

// @route   POST /api/teachers/rate
// @desc    Rate a teacher
// @access  Private (Only Parents)
router.post("/rate", protect, checkRole("parent"), rateTeacher);

// @route   GET /api/teachers/profile
// @desc    Get teacher profile
// @access  Private (Only Teacher)
router.get("/profile", protect, checkRole("teacher"), getTeacherProfile);

// @route   PUT /api/teachers/profile
// @desc    Update teacher profile
// @access  Private (Only Teacher)
router.put("/profile", protect, checkRole("teacher"), updateTeacherProfile);

// @route   POST /api/teachers/meeting
// @desc    Schedule a meeting with parents
// @access  Private (Only Teacher)
router.post("/meeting", protect, checkRole("teacher"), scheduleMeeting);

module.exports = router;
