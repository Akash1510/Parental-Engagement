const Student = require("../models/Student");
const mongoose = require("mongoose");

// @desc    Get student profile
// @route   GET /api/students/:id
// @access  Private
exports.getStudentProfile = async (req, res, next) => {
    try {
        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: "Invalid student ID" });
        }

        const student = await Student.findById(req.params.id).populate("parent", "name mobile");

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        res.status(200).json({ success: true, student });
    } catch (error) {
        next(error); // Pass error to middleware
    }
};

// @desc    Update student profile
// @route   PUT /api/students/:id
// @access  Private
exports.updateStudentProfile = async (req, res, next) => {
    try {
        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: "Invalid student ID" });
        }

        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true, // Ensures validation checks are enforced
        });

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        res.status(200).json({ success: true, student });
    } catch (error) {
        next(error); // Pass error to middleware
    }
};
