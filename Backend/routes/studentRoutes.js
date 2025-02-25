const express = require("express");
const {
    getStudentProfile,
    updateStudentProfile,
    addStudent,
    deleteStudent
} = require("../controllers/studentController");
const { protect, checkRole, teacherOnly, teacherOrParent } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   GET /api/students/:id
// @desc    Get student profile
// @access  Private (Teacher, Parent, Admin)
router.get("/:id", protect, teacherOrParent, getStudentProfile);
router.get("/", protect, teacherOrParent, getStudentProfile);

// @route   PUT /api/students/:id
// @desc    Update student profile
// @access  Private (Only Admin & Teacher)
router.put("/:id", protect, teacherOnly, updateStudentProfile);

// @route   POST /api/students
// @desc    Add new student
// @access  Private (Only Teacher & Admin)
router.post("/add", protect, teacherOnly, addStudent);

// @route   DELETE /api/students/:id
// @desc    Delete student
// @access  Private (Only Admin & Teacher)
router.delete("/:id", protect, teacherOnly, deleteStudent);

module.exports = router;
