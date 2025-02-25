const User = require("../models/User");
const generateOTP = require("../utils/generateOTP");
const sendOTP = require("../utils/sendOTP");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// 🔹 Send OTP
exports.sendOTP = async (req, res) => {
  const { name, mobile, role } = req.body;

  try {
    console.log("Received mobile number:", mobile);

    // Validate mobile number
    if (!mobile || !/^\d{10}$/.test(mobile.trim())) {
      return res.status(400).json({ success: false, message: "Invalid mobile number format. Must be 10 digits." });
    }

    let user = await User.findOne({ mobile });

    // If user does not exist, create a new user
    if (!user) {
      if (!role || !["parent", "teacher"].includes(role)) {
        return res.status(400).json({ success: false, message: "Invalid role. Must be 'parent' or 'teacher'." });
      }
      user = await User.create({ name, mobile, role });
    }

    // Prevent multiple OTP requests within 60 seconds
    if (user.otpExpires && user.otpExpires > Date.now()) {
      return res.status(429).json({ success: false, message: "OTP already sent. Please wait a minute." });
    }

    const otp = generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);

    user.otp = hashedOTP;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // Expires in 5 minutes
    user.isVerified = false;
    await user.save();

    await sendOTP(mobile, otp);

    console.log(`OTP Sent: ${otp} (Valid until ${new Date(user.otpExpires)})`);
    res.status(200).json({ success: true, message: "OTP sent successfully" });

  } catch (error) {
    console.error("Error sending OTP:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


exports.verifyOTP = async (req, res) => {
  const { mobile, otp } = req.body;

  try {
    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    // ✅ Check if OTP exists and is valid
    if (!user.otp || !user.otpExpires || user.otpExpires < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP expired. Please request a new one." });
    }

    // ✅ Compare OTP
    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid OTP!" });
    }

    // ✅ OTP is correct - update user
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;

    // ✅ Ensure role is correctly assigned (fallback if missing)
    if (!user.role) {
      user.role = "parent"; // Default role (modify as per your requirement)
    }

    await user.save();

    // ✅ Generate JWT Token with role & userId
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Store token securely in HTTP-Only Cookie
    res.cookie("authToken", token, {
      httpOnly: true, // ❗ Prevents XSS attacks
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ✅ Send Single Response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        mobile: user.mobile,
        role: user.role, // ✅ Ensure correct role is returned
        isVerified: user.isVerified,
      },
    });

  } catch (error) {
    console.error("Error verifying OTP:", error);

    // ✅ Ensure only one response is sent
    if (!res.headersSent) {
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
};


exports.logout = async (req, res) => {
  try {
    // ❗ Clear authentication token from HTTP-only cookie
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    // ❗ Send success response
    return res.status(200).json({ success: true, message: "Logged out successfully" });

  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
