const Student = require("../models/Student");
const mongoose = require("mongoose");

// @desc    Get student profile
// @route   GET /api/students/:id
// @access  Private (Teacher, Parent, Admin)
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

        // Authorization: Teacher, Admin, or Parent of the student
        if (
            req.user.role !== "teacher" &&
            req.user.role !== "admin" &&
            req.user._id.toString() !== student.parent?.toString()
        ) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        res.status(200).json({ success: true, student });
    } catch (error) {
        console.error("Error fetching student profile:", error);
        next(error);
    }
};

// @desc    Update student profile
// @route   PUT /api/students/:id
// @access  Private (Only Admin & Teacher)
exports.updateStudentProfile = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid student ID" });
        }

        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        // Only Admin and Teachers can update student details
        if (req.user.role !== "teacher" && req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        // Update student fields
        const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ success: true, student: updatedStudent });
    } catch (error) {
        console.error("Error updating student profile:", error);
        next(error);
    }
};

// @desc    Add new student
// @route   POST /api/students
// @access  Private (Only Teacher & Admin)
exports.addStudent = async (req, res, next) => {
    try {
        if (req.user.role !== "teacher" && req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        const { name, grade, section, attendance, parent, rollNo } = req.body;

        // 🔹 Check required fields
        if (!name || !grade || !section || !attendance || !rollNo) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        let parentId = null;
        if (parent) {
            // 🔹 If parent is given as name, find its ObjectId
            const foundParent = await Parent.findOne({ name: parent });
            if (!foundParent) {
                return res.status(400).json({ success: false, message: "Parent not found" });
            }
            parentId = foundParent._id;
        }

        // 🔹 Create new student
        const student = new Student({ 
            name, 
            grade, 
            section, 
            attendance, 
            parent: parentId,  // Store ObjectId
            rollNo
        });

        await student.save();
        res.status(201).json({ success: true, student });
    } catch (error) {
        console.error("Error adding student:", error);
        next(error);
    }
};
// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private (Only Admin & Teacher)
exports.deleteStudent = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid student ID" });
        }

        if (req.user.role !== "teacher" && req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        res.status(200).json({ success: true, message: "Student deleted successfully" });
    } catch (error) {
        console.error("Error deleting student:", error);
        next(error);
    }
};
