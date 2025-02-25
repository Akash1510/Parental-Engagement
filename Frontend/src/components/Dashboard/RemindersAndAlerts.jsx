import React from "react";
import { motion } from "framer-motion";
import { BellRing, AlertCircle, Clock } from "lucide-react"; // Icons for visual appeal

const reminders = [
  { icon: <BellRing className="text-yellow-400" size={28} />, title: "Parent-Teacher Meeting", time: "Tomorrow at 10:00 AM", type: "reminder" },
  { icon: <Clock className="text-blue-400" size={28} />, title: "Homework Submission", time: "Due by Feb 25, 2025", type: "reminder" },
  { icon: <AlertCircle className="text-red-500" size={28} />, title: "Fee Payment Alert", time: "Last date: Feb 28, 2025", type: "alert" },
];

const RemindersAndAlerts = () => {
  return (
    <div className="bg-gray-900 text-white px-4 py-8 sm:p-8 min-h-screen w-full flex flex-col items-center z-10">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-3xl mt-6 sm:mt-10 border-2 border-[#00B6BA] flex flex-col gap-6 transition-transform transform hover:scale-105"
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-[#00B6BA] text-center tracking-wide">
          🔔 Reminders & Alerts
        </h3>

        {reminders.map((reminder, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
              reminder.type === "alert" ? "bg-red-800/80 border-red-500 shadow-red-500/50" : "bg-gray-700 border-[#00B6BA] shadow-[#00B6BA]/50"
            } border-2`}
          >
            <div className="w-10 h-10 flex items-center justify-center">{reminder.icon}</div>
            <div>
              <p className="text-lg sm:text-xl font-semibold">{reminder.title}</p>
              <p className="text-gray-300 text-sm sm:text-md">{reminder.time}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RemindersAndAlerts;
