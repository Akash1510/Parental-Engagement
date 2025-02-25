const Student = require("../models/Student");
const mongoose = require("mongoose");

// @desc    Get student profile
// @route   GET /api/students/:id
// @access  Private (Parent, Student, Admin)
exports.getStudentProfile = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid student ID" });
        }

        const student = await Student.findById(id).populate("parent", "name mobile");

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        // Authorization: Only admin, student themselves, or their parent can access
        if (
            req.user.role !== "admin" &&
            req.user._id.toString() !== student._id.toString() &&
            req.user._id.toString() !== student.parent.toString()
        ) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        res.status(200).json({ success: true, student });
    } catch (error) {
        next(error);
    }
};

// @desc    Update student profile
// @route   PUT /api/students/:id
// @access  Private (Only Admin & Student Themselves)
exports.updateStudentProfile = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid student ID" });
        }

        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        // Authorization: Only admin or the student themselves can update
        if (req.user.role !== "admin" && req.user._id.toString() !== student._id.toString()) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ success: true, student: updatedStudent });
    } catch (error) {
        next(error);
    }
};
