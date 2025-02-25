import React from "react";
import { motion } from "framer-motion";

const events = [
  { title: "📅 Science Fair", date: "March 15, 2025", location: "School Auditorium" },
  { title: "🏆 Sports Meet", date: "April 10, 2025", location: "School Ground" },
  { title: "🎭 Drama Competition", date: "May 5, 2025", location: "Main Hall" },
];

const UpcomingEvents = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-2xl border-2 border-[#00B6BA] flex flex-col gap-6 transition-transform transform hover:scale-105">
        <h3 className="text-3xl font-extrabold text-[#00B6BA] text-center">
          🎉 Upcoming Events
        </h3>

        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-gray-700 p-6 rounded-lg shadow-md flex flex-col md:flex-row md:items-center justify-between transition-transform transform hover:scale-105 hover:bg-gray-600 hover:shadow-lg hover:shadow-[#00B6BA]/50"
          >
            <p className="text-xl text-white font-semibold">{event.title}</p>
            <p className="text-gray-300 text-lg">{event.date} - {event.location}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
