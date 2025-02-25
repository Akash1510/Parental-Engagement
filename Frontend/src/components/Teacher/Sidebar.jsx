import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUsers, FaCalendarAlt, FaClipboardList, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ onClose }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/teacher", icon: <FaHome /> },
    { name: "Students", path: "/teacher/students", icon: <FaUsers /> },
    { name: "Schedule", path: "/teacher/schedule", icon: <FaCalendarAlt /> },
    { name: "Assignments", path: "/teacher/assignments", icon: <FaClipboardList /> },
    { name: "Logout", path: "/", icon: <FaSignOutAlt /> },
  ];

  return (
    <nav className="h-full flex flex-col">
      {/* Sidebar Header */}
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Teacher Panel</h2>

      {/* Menu Items */}
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              onClick={onClose} // Closes sidebar when clicking on an item (only on mobile)
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
