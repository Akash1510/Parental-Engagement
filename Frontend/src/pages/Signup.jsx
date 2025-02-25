import { useState } from "react";
import { FaMobileAlt, FaLock, FaUser, FaUserGraduate, FaUserTie } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "../utils/api"

const SignUp = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isValidMobile, setIsValidMobile] = useState(false);
  const [userType, setUserType] = useState("parent");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Handle Mobile Input Change
  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);
    setIsValidMobile(/^\d{10}$/.test(value));
  };

  // ✅ Send OTP to the mobile number
  const handleSendOtp = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/auth/send-otp", { mobile });
      if (response.data.success) {
        setIsOtpSent(true);
      } else {
        setError(response.data.error || "Failed to send OTP.");
      }
    } catch (err) {
      setError("Error sending OTP. Please try again.");
    }

    setLoading(false);
  };

  // ✅ Verify OTP and Signup
  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/auth/verify-otp", { mobile, otp, name, role: userType });
      if (response.data.success) {
        setIsVerified(true);
        alert("Signup Successful!");
      } else {
        setError(response.data.error || "Invalid OTP.");
      }
    } catch (err) {
      setError("Error verifying OTP.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white text-gray-900 font-inter px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl transform transition-all duration-300 hover:scale-105"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-700 mb-4">Create Account</h2>

        <div className="flex justify-center mb-4">
          <div className="flex bg-gray-200 p-1 rounded-full shadow-md">
            <button 
              className={`px-4 py-2 font-bold rounded-full flex items-center gap-2 transition-all 
                ${userType === "parent" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setUserType("parent")}
            >
              <FaUserTie className="text-lg" /> Parent
            </button>
            <button 
              className={`px-4 py-2 font-bold rounded-full flex items-center gap-2 transition-all 
                ${userType === "teacher" ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setUserType("teacher")}
            >
              <FaUserGraduate className="text-lg" /> Teacher
            </button>
          </div>
        </div>

        {/* Name Input */}
        <div className="flex items-center bg-gray-100 p-3 rounded-xl mb-3 shadow-inner">
          <FaUser className="text-gray-500 mr-2 text-lg" />
          <input 
            type="text" 
            placeholder="Enter your name" 
            className="w-full bg-transparent focus:outline-none text-lg" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Mobile Number Input */}
        <div className="flex items-center bg-gray-100 p-3 rounded-xl mb-3 shadow-inner">
          <FaMobileAlt className="text-gray-500 mr-2 text-lg" />
          <input 
            type="text" 
            placeholder="Enter your mobile number" 
            className="w-full bg-transparent focus:outline-none text-lg" 
            value={mobile}
            onChange={handleMobileChange}
          />
        </div>

        {/* OTP Input (Shown After OTP is Sent) */}
        {isOtpSent && (
          <div className="flex items-center bg-gray-100 p-3 rounded-xl mb-3 shadow-inner">
            <FaLock className="text-gray-500 mr-2 text-lg" />
            <input 
              type="text" 
              placeholder="Enter OTP" 
              className="w-full bg-transparent focus:outline-none text-lg" 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        {/* Send OTP Button */}
        {!isOtpSent ? (
          <motion.button 
            onClick={handleSendOtp}
            whileHover={{ scale: 1.05 }}
            className="w-full py-3 rounded-xl font-bold text-lg bg-blue-500 text-white hover:bg-blue-600 transition"
            disabled={!isValidMobile || loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </motion.button>
        ) : (
          <motion.button 
            onClick={handleVerifyOtp}
            whileHover={{ scale: 1.05 }}
            className="w-full py-3 rounded-xl font-bold text-lg bg-green-500 text-white hover:bg-green-600 transition"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify & Sign Up"}
          </motion.button>
        )}

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account? <Link to="/" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;