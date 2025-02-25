import React from "react";

const ImportantNotices = () => {
  const notices = [
    {
      id: 1,
      title: "School Annual Day Celebration",
      date: "March 10, 2025",
      description: "Join us for the annual day celebration with cultural programs and award distribution.",
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      date: "March 15, 2025",
      description: "A parent-teacher meeting will be held to discuss student progress and address queries.",
    },
    {
      id: 3,
      title: "Examination Schedule Released",
      date: "March 20, 2025",
      description: "The final examination schedule has been released. Please check the student portal for details.",
    },
  ];

  return (
    <div className="bg-gray-900 text-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-4xl mx-auto mt-6 border-2 border-[#00B6BA] overflow-hidden z-10">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00B6BA] mb-6 text-center">Important Notices</h2>
      <div className="space-y-4 sm:space-y-6">
        {notices.map((notice) => (
          <div key={notice.id} className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-700">
            <h3 className="text-lg sm:text-2xl font-semibold text-[#00B6BA]">{notice.title}</h3>
            <p className="text-gray-300 text-sm sm:text-lg font-medium mt-2">📅 {notice.date}</p>
            <p className="text-gray-400 text-sm sm:text-base mt-2">{notice.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImportantNotices;
