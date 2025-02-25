import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users } from "lucide-react";

const schedule = [
  { time: "08:00 AM - 09:00 AM", subject: "Mathematics", class: "Grade 10", type: "class" },
  { time: "10:00 AM - 11:00 AM", subject: "Science", class: "Grade 8", type: "class" },
  { time: "12:30 PM - 01:00 PM", subject: "Staff Meeting", class: "Conference Room", type: "meeting" },
  { time: "02:00 PM - 03:00 PM", subject: "History", class: "Grade 9", type: "class" },
  { time: "04:00 PM - 05:00 PM", subject: "Parent-Teacher Meeting", class: "Room 101", type: "meeting" },
];

const TeacherSchedule = () => {
  return (
    <div className="bg-gray-900 text-white p-6 w-full max-w-3xl mx-auto rounded-xl shadow-lg border-2 border-[#00B6BA]">
      <motion.h2
        className="text-3xl font-bold text-[#00B6BA] text-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📅 Teacher's Schedule
      </motion.h2>

      {/* Schedule List */}
      <div className="space-y-4">
        {schedule.map((event, index) => (
          <motion.div
            key={index}
            className={`p-4 rounded-md shadow-lg flex items-center gap-4 border-2 ${
              event.type === "class"
                ? "bg-gray-800 border-[#00B6BA] shadow-[#00B6BA]/50"
                : "bg-red-800/80 border-red-500 shadow-red-500/50"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {event.type === "class" ? (
              <Users className="text-[#00B6BA]" size={28} />
            ) : (
              <Calendar className="text-red-400" size={28} />
            )}
            <div>
              <p className="font-semibold text-lg">{event.subject}</p>
              <p className="text-gray-300 text-sm">{event.class}</p>
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <Clock size={16} className="text-gray-400" />
                {event.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeacherSchedule;
