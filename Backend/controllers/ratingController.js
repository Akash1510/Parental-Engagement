const Rating = require("../models/Rating");

exports.getTeacherRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({ teacher: req.params.teacherId }).populate("parent", "name");
    res.status(200).json({ success: true, ratings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.addRating = async (req, res) => {
  const { teacherId, rating, feedback } = req.body;
  try {
    const newRating = await Rating.create({
      teacher: teacherId,
      parent: req.user._id,
      rating,
      feedback,
    });
    res.status(201).json({ success: true, newRating });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
