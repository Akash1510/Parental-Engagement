import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";

const TeacherDashboard = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768); // Sidebar default open on larger screens

  // Close sidebar when clicking outside or selecting a menu item (on mobile)
  const handleCloseSidebar = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  // Ensure sidebar stays open on larger screens when resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#00B6BA] text-white p-6 shadow-lg 
          transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}
      >
        <Sidebar onClose={handleCloseSidebar} />
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

export default TeacherDashboard;
