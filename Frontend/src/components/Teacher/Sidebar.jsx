
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaCalendarAlt, FaClipboardList, FaCheckCircle, FaBullhorn, FaVideo, FaSignOutAlt } from "react-icons/fa";
import axios from "D:/Parental_Engagement/Frontend/src/utils/api"; // ✅ Import Axios

const Sidebar = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate(); // 🚀 Used for redirection after logout

  const handleLogout = async () => {
    try {
      const response = await axios.post("/auth/logout", {}, { withCredentials: true }); // ✅ Calls the Logout API

      if (response.data.success) {
        // ❗ Remove auth token & user data from storage
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        sessionStorage.clear();

        // ❗ Redirect to login page
        navigate("/");
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error.response?.data?.message || error.message);
    }
  };

  const menuItems = [
    { name: "Dashboard", path: "/teacher", icon: <FaHome /> },
    { name: "Students", path: "/teacher/students", icon: <FaUsers /> },
    { name: "Schedule", path: "/teacher/schedule", icon: <FaCalendarAlt /> },
    { name: "Assignments", path: "/teacher/assignments", icon: <FaClipboardList /> },
    { name: "Attendance Tracker", path: "/teacher/attendance", icon: <FaCheckCircle /> },
    { name: "Important Notice", path: "/teacher/notice", icon: <FaBullhorn /> },
    { name: "Meeting Scheduler", path: "/teacher/meeting", icon: <FaVideo /> },
  ];

  return (
    <nav className="h-full flex flex-col">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Teacher Panel</h2>

      <ul className="space-y-4 flex-1">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 p-3 rounded-lg text-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-white text-[#00B6BA] font-semibold"
                  : "text-white hover:bg-[#00E6E9]/20"
              }`}
            >
              {item.icon} {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* 🔥 Logout Button - Calls handleLogout API */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-lg text-lg transition-all duration-200 bg-red-500 text-white hover:bg-red-600 w-full"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
