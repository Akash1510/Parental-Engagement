import React from "react";
import { motion } from "framer-motion";
import { BellRing, AlertCircle, Clock } from "lucide-react";

const reminders = [
  { icon: <BellRing className="text-yellow-400" size={28} />, title: "Staff Meeting", time: "Tomorrow at 10:00 AM", type: "reminder" },
  { icon: <Clock className="text-blue-400" size={28} />, title: "Grade Submission Deadline", time: "Due by Feb 28, 2025", type: "reminder" },
  { icon: <AlertCircle className="text-red-500" size={28} />, title: "Payroll Update", time: "Last date: March 5, 2025", type: "alert" },
];

const RemindersAndAlert = () => {
  return (
    <div className="bg-gray-900 text-white p-6 w-full max-w-3xl mx-auto rounded-xl shadow-lg border-2 border-[#00B6BA]">
      <motion.h2
        className="text-3xl font-bold text-[#00B6BA] text-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🔔 Reminders & Alerts
      </motion.h2>

      <div className="space-y-4">
        {reminders.map((reminder, index) => (
          <motion.div
            key={index}
            className={`flex items-center gap-4 p-4 rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer 
              ${reminder.type === "alert" ? "bg-red-800/80 border-red-500 shadow-red-500/50" : "bg-gray-800 border-[#00B6BA] shadow-[#00B6BA]/50"} border-2`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {reminder.icon}
            <div>
              <p className="text-lg font-semibold">{reminder.title}</p>
              <p className="text-gray-300 text-sm">{reminder.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RemindersAndAlert;
