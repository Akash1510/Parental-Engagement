const express = require("express");
const { 
    getAllTeachers, 
    getTeacherById, 
    rateTeacher, 
    getTeacherProfile, 
    updateTeacherProfile, 
    scheduleMeeting 
} = require("../controllers/teacherController");


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
// @access  Private (Parent)
router.post("/rate",rateTeacher);

// @route   GET /api/teachers/profile
// @desc    Get teacher profile
// @access  Private (Teacher)
// router.get("/profile", getTeacherProfile);

// @route   PUT /api/teachers/profile
// @desc    Update teacher profile
// // @access  Private (Teacher)
// router.put("/profile", updateTeacherProfile);

// // @route   POST /api/teachers/meeting
// // @desc    Schedule a meeting with parents
// // @access  Private (Teacher)
// router.post("/meeting", scheduleMeeting);

module.exports = router;
