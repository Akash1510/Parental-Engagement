const User = require("../models/User");
const generateOTP = require("../utils/generateOTP");
const sendOTP = require("../utils/sendOTP");
const jwt = require("jsonwebtoken");

exports.sendOTP = async (req, res) => {
  const { mobile } = req.body;
  try {
    let user = await User.findOne({ mobile });
    if (!user) {
      user = await User.create({ mobile, role: "parent" });
    }

    const otp = generateOTP();
    user.otp = otp;
    await user.save();

    await sendOTP(mobile, otp);
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  const { mobile, otp } = req.body;
  try {
    const user = await User.findOne({ mobile });
    if (!user || user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
