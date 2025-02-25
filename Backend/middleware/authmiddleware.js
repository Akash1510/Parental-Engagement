const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes with authentication
const protect = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // Read token from cookies

        if (!token) {
            return res.status(401).json({ success: false, message: "Not authorized, token missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-otp");

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        req.user = user; // Attach user info to req
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

// Role-based access control middleware
const checkRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }
        next();
    };
};

// Middleware for teacher-only access
const teacherOnly = checkRole("teacher");

// Middleware for parent-only access
const parentOnly = checkRole("parent");

// Middleware for both teachers and parents
const teacherOrParent = checkRole("teacher", "parent");

module.exports = { protect, teacherOnly, parentOnly, teacherOrParent, checkRole };
