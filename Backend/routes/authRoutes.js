const express = require("express");
const { sendOTP, verifyOTP } = require("../controllers/authController");

const router = express.Router();

// @route   POST /api/auth/send-otp
// @desc    Send OTP to user's mobile
router.post("/send-otp", sendOTP);

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP and authenticate user
router.post("/verify-otp", verifyOTP);

module.exports = router;
