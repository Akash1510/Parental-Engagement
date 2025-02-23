const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    grade: { type: String, required: true },
    rollNo: { type: String, unique: true, required: true },
    section: { type: String, required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    attendance: { type: Number, default: 100 }, // Percentage
    marks: [
      {
        subject: String,
        score: Number,
      },
    ],
    achievements: [{ type: String }], // List of achievements
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
