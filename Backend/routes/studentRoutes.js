const express = require("express");
const { getStudentProfile, updateStudentProfile } = require("../controllers/studentController");


const router = express.Router();

// Student Profile Routes
router.get("/:id", getStudentProfile);  // Get student profile by ID
router.put("/:id", updateStudentProfile);  // Update student profile by ID

module.exports = router;
