const Teacher = require("../models/Teacher");

exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json({ success: true, teachers });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.rateTeacher = async (req, res) => {
    const { teacherId, rating, feedback } = req.body;
    try {
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) return res.status(404).json({ success: false, message: "Teacher not found" });

        teacher.ratings.push({ parent: req.user._id, rating, feedback });
        await teacher.save();

        res.status(200).json({ success: true, message: "Rating submitted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getTeachers = async (req, res, next) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json({ success: true, teachers });
    } catch (error) {
        next(error);
    }
};

exports.getTeacherById = async (req, res, next) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({ success: false, message: "Teacher not found" });
        }
        res.status(200).json({ success: true, teacher });
    } catch (error) {
        next(error);
    }
};
