const User = require("../models/User");
const generateOTP = require("../utils/generateOTP");
const sendOTP = require("../utils/sendOTP");
const jwt = require("jsonwebtoken");


exports.sendOTP = async (req, res) => {
  const { name, mobile, role } = req.body;

  try {
    console.log("Received mobile number:", mobile); // Debugging

    // Ensure mobile is a valid 10-digit string
    if (!mobile || typeof mobile !== "string" || !/^\d{10}$/.test(mobile.trim())) {
      return res.status(400).json({ success: false, message: "Invalid mobile number format. Must be 10 digits." });
    }

    // const formattedMobile = `+91${mobile.trim()}`; // Remove spaces and format correctly

    let user = await User.findOne({ mobile });

    if (!user) {
      if (!role || !["parent", "teacher"].includes(role)) {
        return res.status(400).json({ success: false, message: "Invalid role. Must be 'parent' or 'teacher'." });
      }
      user = await User.create({ name, mobile, role });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.isVerified = false;
    await user.save();

    // Send OTP
    await sendOTP(mobile, otp);

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};


// Verify OTP and Login
exports.verifyOTP = async (req, res) => {
  const { mobile, otp } = req.body;

  try {
    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    if (!user.otp) {
      return res.status(400).json({ success: false, message: "OTP expired. Please request a new one." });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP!" });
    }

    // Mark user as verified and clear OTP
    user.isVerified = true;
    user.otp = null;
    await user.save();

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ success: true, token, user });
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
