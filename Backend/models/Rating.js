const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
    {
        teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
        parent: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
        feedback: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Rating", ratingSchema);
