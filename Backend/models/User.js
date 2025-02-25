const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, unique: true, required: true },
  role: { type: String, enum: ["parent", "teacher"], required: true },
  isVerified: { type: Boolean, default: false },
  otp: { type: String }, // Hashed OTP
  otpExpires: { type: Date }, // OTP Expiry Time
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
