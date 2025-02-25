const mongoose = require("mongoose");

// Define the Marks Schema
const MarksSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  score: { type: Number, min: 0, max: 100, required: true }, // Validation for scores (0-100)
});

// Define the Achievements Schema
const AchievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
});

// Define the Student Schema
const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    grade: { type: String, required: true, trim: true },
    rollNo: { type: String, unique: true, required: true, index: true }, // Indexed for fast search
    section: { type: String, required: true, trim: true },
    parent: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      index: true // Indexed for optimized queries
    },
    attendance: { type: Number, default: 100, min: 0, max: 100 }, // Attendance % range
    marks: [MarksSchema], // Embedded Marks Schema
    achievements: [AchievementSchema], // Embedded Achievements Schema
  },
  { timestamps: true }
);

// Pre-delete middleware to handle cascading deletions (if needed)
StudentSchema.pre("remove", async function (next) {
  try {
    // Here you can add logic to handle any references before deletion.
    console.log(`Removing student ${this._id}`);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Student", StudentSchema);
