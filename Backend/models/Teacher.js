const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subject: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    classes: [{ type: String }], // List of classes assigned
    ratings: [
      {
        parent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: Number,
        feedback: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
