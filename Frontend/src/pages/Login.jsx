import { FaMobileAlt, FaLock, FaUserGraduate, FaUserTie } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../utils/api";  // Import API file

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isValidMobile, setIsValidMobile] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("parent"); // "parent" or "teacher"

  const navigate = useNavigate();

  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);
    setIsValidMobile(/^\d{10}$/.test(value)); // Validates 10-digit mobile number
  };

  // ✅ Send OTP API Call
  const handleSendOtp = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await API.post("/auth/send-otp", { mobile });
      if (response.data.success) {
        setIsOtpSent(true);
      } else {
        setError(response.data.error || "Failed to send OTP.");
      }
    } catch (err) {
      setError("Number is Not vaild.");
    }

    setLoading(false);
  };

  // ✅ Verify OTP API Call
  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await API.post("/auth/verify-otp", { mobile, otp, role: userType });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token); // Store JWT token
        navigate("/dashboard"); // Redirect to dashboard
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
      {/* Login Box */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl transform transition-all duration-300 hover:scale-105"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-blue-700 mb-4 sm:mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 text-sm sm:text-lg font-medium mb-4 sm:mb-6">
          "Just a tap away from your child's day, <br className="hidden sm:block" /> Making parent-teacher talks child's play."
        </p>

        {/* Parent/Teacher Toggle */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <motion.div 
            className="flex bg-gray-200 p-1 rounded-full shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button 
              className={`px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg font-bold rounded-full flex items-center gap-2 transition-all duration-300 
                ${userType === "parent" ? "bg-blue-500 text-white shadow-lg" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setUserType("parent")}
            >
              <FaUserTie className="text-lg sm:text-xl" /> Parent
            </button>
            <button 
              className={`px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg font-bold rounded-full flex items-center gap-2 transition-all duration-300 
                ${userType === "teacher" ? "bg-purple-500 text-white shadow-lg" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setUserType("teacher")}
            >
              <FaUserGraduate className="text-lg sm:text-xl" /> Teacher
            </button>
          </motion.div>
        </div>

        {/* Mobile Number Input */}
        <motion.div 
          whileHover={{ scale: 1.02, borderColor: "#3b82f6" }}
          className="flex items-center bg-gray-100 p-3 sm:p-4 rounded-xl mb-3 sm:mb-4 shadow-inner border-2 border-transparent hover:border-blue-500 transition-all"
        >
          <FaMobileAlt className="text-gray-500 mr-2 sm:mr-3 text-lg sm:text-xl" />
          <input 
            type="text" 
            placeholder="Enter your mobile number" 
            className="w-full bg-transparent focus:outline-none text-sm sm:text-lg" 
            value={mobile}
            onChange={handleMobileChange}
          />
        </motion.div>

        {/* Send OTP Button */}
        {!isOtpSent && (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-3 sm:py-4 rounded-xl font-bold text-lg sm:text-xl shadow-lg transition
              ${!isValidMobile ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            onClick={handleSendOtp}
            disabled={!isValidMobile || loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </motion.button>
        )}

        {/* OTP Input (Only if OTP Sent) */}
        {isOtpSent && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center bg-gray-100 p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 shadow-inner"
          >
            <FaLock className="text-gray-500 mr-2 sm:mr-3 text-lg sm:text-xl" />
            <input 
              type="text" 
              placeholder="Enter OTP" 
              className="w-full bg-transparent focus:outline-none text-sm sm:text-lg" 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </motion.div>
        )}

        {/* Verify OTP Button */}
        {isOtpSent && (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-3 sm:py-4 rounded-xl font-bold text-lg sm:text-xl shadow-lg transition
              ${otp.length !== 6 ? 'opacity-50 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
            onClick={handleVerifyOtp}
            disabled={otp.length !== 6 || loading}
          >
            {loading ? "Verifying..." : `Login as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
          </motion.button>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        {/* Signup Link */}
        <p className="text-center text-gray-600 text-sm sm:text-md mt-4 sm:mt-6">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline font-medium">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;