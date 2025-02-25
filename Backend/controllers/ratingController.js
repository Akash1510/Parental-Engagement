const Rating = require("../models/Rating");
const Teacher = require("../models/Teacher");

exports.getTeacherRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({ teacher: req.params.teacherId }).populate("parent", "name");
    
    if (!ratings.length) {
      return res.status(404).json({ success: false, message: "No ratings found for this teacher." });
    }

    res.status(200).json({ success: true, ratings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.rateTeacher = async (req, res) => {
  const { teacherId, rating, feedback } = req.body;

  try {
    // Validate if the teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ success: false, message: "Teacher not found." });
    }

    // Check if the user has already rated this teacher
    const existingRating = await Rating.findOne({ teacher: teacherId, parent: req.user._id });
    if (existingRating) {
      return res.status(400).json({ success: false, message: "You have already rated this teacher." });
    }

    // Create new rating
    const newRating = await Rating.create({
      teacher: teacherId,
      parent: req.user._id,
      rating,
      feedback,
    });

    res.status(201).json({ success: true, message: "Rating submitted successfully!", newRating });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
