// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";

// const Sidebar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Perform logout operations here (e.g., clearing tokens, user session)
//     navigate("/"); // Redirect to homepage
//   };

//   return (
//     <div className="space-y-4 z-40">
//       <h2 className="text-xl font-bold">Parent Dashboard</h2>
//       <ul className="space-y-2">
//         <li>
//           <NavLink to="/dashboard" className="block px-4 py-2 bg-white text-[#00B6BA] rounded-lg hover:bg-gray-200">
//             Student Profile
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/dashboard/performance" className="block px-4 py-2 bg-white text-[#00B6BA] rounded-lg hover:bg-gray-200">
//             Academic Performance
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/dashboard/notices" className="block px-4 py-2 bg-white text-[#00B6BA] rounded-lg hover:bg-gray-200">
//             Important Notices
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/dashboard/alerts" className="block px-4 py-2 bg-white text-[#00B6BA] rounded-lg hover:bg-gray-200">
//             Reminders & Alerts
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/dashboard/ratings" className="block px-4 py-2 bg-white text-[#00B6BA] rounded-lg hover:bg-gray-200">
//             Teacher Ratings
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/dashboard/meetings" className="block px-4 py-2 bg-white text-[#00B6BA] rounded-lg hover:bg-gray-200">
//             Meeting Scheduler
//           </NavLink>
//         </li>
//       </ul>

//       {/* Logout Button */}
//       <button
//         onClick={handleLogout}
//         className="block w-full px-4 py-2 mt-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Sidebar;



import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaChartLine, FaCalendarAlt, FaClipboardList, FaBell, FaStar, FaVideo, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ onClose }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Academic Performance", path: "/dashboard/performance", icon: <FaChartLine /> },
    { name: "Upcoming Events", path: "/dashboard/events", icon: <FaCalendarAlt /> },
    { name: "Important Notices", path: "/dashboard/notices", icon: <FaClipboardList /> },
    { name: "Reminders & Alerts", path: "/dashboard/alerts", icon: <FaBell /> },
    { name: "Teacher Ratings", path: "/dashboard/ratings", icon: <FaStar /> },
    { name: "Meeting Scheduler", path: "/dashboard/meetings", icon: <FaVideo /> },
    { name: "Logout", path: "/", icon: <FaSignOutAlt /> },
  ];

  return (
    <nav className="h-full flex flex-col">
      {/* Sidebar Header */}
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Student Panel</h2>

      {/* Menu Items */}
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              onClick={onClose} // Closes sidebar when clicking on an item (for mobile)
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
    </nav>
  );
};

export default Sidebar;

