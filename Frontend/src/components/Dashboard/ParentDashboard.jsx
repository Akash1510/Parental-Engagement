import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const ParentDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to close sidebar when a menu item is selected
  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#00B6BA] text-white p-6 shadow-lg 
          transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}
      >
        <Sidebar onClose={handleCloseSidebar} /> {/* Pass close function to Sidebar */}
      </div>

      {/* Toggle Button for Mobile */}
      <button
        className="absolute top-4 left-4 md:hidden text-white bg-[#00B6BA] p-2 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Main Content */}
      <div className="flex-1 p-6 transition-all duration-300 md:ml-64" onClick={handleCloseSidebar}>
        <Outlet />
      </div>
    </div>
  );
};

export default ParentDashboard;
