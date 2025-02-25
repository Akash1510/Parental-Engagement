const Teacher = require("../models/Teacher");
const mongoose = require("mongoose");

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Public
exports.getAllTeachers = async (req, res, next) => {
    try {
        const teachers = await Teacher.find().select("-password");
        res.status(200).json({ success: true, teachers });
    } catch (error) {
        next(error);
    }
};

// @desc    Get teacher by ID
// @route   GET /api/teachers/:id
// @access  Public
exports.getTeacherById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid teacher ID" });
        }

        const teacher = await Teacher.findById(id).select("-password");
        if (!teacher) {
            return res.status(404).json({ success: false, message: "Teacher not found" });
        }

        res.status(200).json({ success: true, teacher });
    } catch (error) {
        next(error);
    }
};

// @desc    Rate a teacher
// @route   POST /api/teachers/rate
// @access  Private (Parents only)
exports.rateTeacher = async (req, res, next) => {
    try {
        const { teacherId, rating, feedback } = req.body;

        if (!mongoose.Types.ObjectId.isValid(teacherId)) {
            return res.status(400).json({ success: false, message: "Invalid teacher ID" });
        }

        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ success: false, message: "Teacher not found" });
        }

        teacher.ratings.push({ parent: req.user._id, rating, feedback });
        await teacher.save();

        res.status(200).json({ success: true, message: "Rating submitted successfully" });
    } catch (error) {
        next(error);
    }
};

// @desc    Get teacher profile (Authenticated teacher)
// @route   GET /api/teachers/profile
// @access  Private (Only for Teacher)
exports.getTeacherProfile = async (req, res, next) => {
    try {
        const teacher = await Teacher.findById(req.user._id).select("-password");
        if (!teacher) {
            return res.status(404).json({ success: false, message: "Teacher not found" });
        }

        res.status(200).json({ success: true, teacher });
    } catch (error) {
        next(error);
    }
};

// @desc    Update teacher profile
// @route   PUT /api/teachers/profile
// @access  Private (Only for Teacher)
exports.updateTeacherProfile = async (req, res, next) => {
    try {
        const teacher = await Teacher.findById(req.user._id);

        if (!teacher) {
            return res.status(404).json({ success: false, message: "Teacher not found" });
        }

        Object.assign(teacher, req.body);
        await teacher.save();

        res.status(200).json({ success: true, teacher });
    } catch (error) {
        next(error);
    }
};

// @desc    Schedule a meeting with parents
// @route   POST /api/teachers/meeting
// @access  Private (Only for Teachers)
exports.scheduleMeeting = async (req, res, next) => {
    try {
        const { parentId, date, time } = req.body;

        if (!mongoose.Types.ObjectId.isValid(parentId)) {
            return res.status(400).json({ success: false, message: "Invalid parent ID" });
        }

        // Assuming you have a Meeting model
        const meeting = await Meeting.create({
            teacher: req.user._id,
            parent: parentId,
            date,
            time,
        });

        res.status(201).json({ success: true, meeting });
    } catch (error) {
        next(error);
    }
};
