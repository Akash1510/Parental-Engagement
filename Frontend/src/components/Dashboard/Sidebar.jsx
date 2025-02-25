
// import { Link, useLocation } from "react-router-dom";
// import { FaHome, FaUser, FaChartLine, FaCalendarAlt, FaClipboardList, FaBell, FaStar, FaVideo, FaSignOutAlt } from "react-icons/fa";

// const Sidebar = ({ onClose }) => {
//   const location = useLocation();

//   const menuItems = [
//     { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
//     { name: "Academic Performance", path: "/dashboard/performance", icon: <FaChartLine /> },
//     { name: "Upcoming Events", path: "/dashboard/events", icon: <FaCalendarAlt /> },
//     { name: "Important Notices", path: "/dashboard/notices", icon: <FaClipboardList /> },
//     { name: "Reminders & Alerts", path: "/dashboard/alerts", icon: <FaBell /> },
//     { name: "Teacher Ratings", path: "/dashboard/ratings", icon: <FaStar /> },
//     { name: "Meeting Scheduler", path: "/dashboard/meetings", icon: <FaVideo /> },
//     { name: "Logout", path: "/", icon: <FaSignOutAlt /> },
//   ];

//   return (
//     <nav className="h-full flex flex-col">
//       {/* Sidebar Header */}
//       <h2 className="text-2xl font-bold text-white mb-6 text-center">Student Panel</h2>

//       {/* Menu Items */}
//       <ul className="space-y-4">
//         {menuItems.map((item) => (
//           <li key={item.name}>
//             <Link
//               to={item.path}
//               onClick={onClose} // Closes sidebar when clicking on an item (for mobile)
//               className={`flex items-center gap-3 p-3 rounded-lg text-lg transition-all duration-200 ${
//                 location.pathname === item.path
//                   ? "bg-white text-[#00B6BA] font-semibold"
//                   : "text-white hover:bg-[#00E6E9]/20"
//               }`}
//             >
//               {item.icon} {item.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Sidebar;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaChartLine, FaCalendarAlt, FaClipboardList, FaBell, FaStar, FaVideo, FaSignOutAlt } from "react-icons/fa";
import axios from "D:/Parental_Engagement/Frontend/src/utils/api"; // ✅ Import Axios

const Sidebar = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate(); // 🚀 For redirection after logout

  const handleLogout = async () => {
    try {
      const response = await axios.post("/auth/logout", {}, { withCredentials: true }); // ✅ Axios handles JSON automatically

      if (response.data.success) {
        // ❗ Remove token from localStorage
        localStorage.removeItem("authToken");

        // ❗ Remove user data from localStorage/sessionStorage
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
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Academic Performance", path: "/dashboard/performance", icon: <FaChartLine /> },
    { name: "Upcoming Events", path: "/dashboard/events", icon: <FaCalendarAlt /> },
    { name: "Important Notices", path: "/dashboard/notices", icon: <FaClipboardList /> },
    { name: "Reminders & Alerts", path: "/dashboard/alerts", icon: <FaBell /> },
    { name: "Teacher Ratings", path: "/dashboard/ratings", icon: <FaStar /> },
    { name: "Meeting Scheduler", path: "/dashboard/meetings", icon: <FaVideo /> },
  ];

  return (
    <nav className="h-full flex flex-col">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Student Panel</h2>

      <ul className="space-y-4">
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
        
        {/* 🔥 Logout Button - Calls handleLogout function */}
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded-lg text-lg text-white hover:bg-[#00E6E9]/20 transition-all duration-200 w-full"
          >
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
