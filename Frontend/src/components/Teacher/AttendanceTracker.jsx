import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react"; // Icons for attendance

const students = [
  { id: 1, name: "Alice Johnson", present: true },
  { id: 2, name: "Bob Smith", present: false },
  { id: 3, name: "Charlie Brown", present: true },
  { id: 4, name: "Diana Prince", present: false },
];

const AttendanceTracker = () => {
  const [attendance, setAttendance] = useState(students);

  // Toggle attendance status
  const toggleAttendance = (id) => {
    setAttendance((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student
      )
    );
  };

  return (
    <div className="bg-gray-900 text-white p-6 w-full max-w-3xl mx-auto rounded-xl shadow-lg border-2 border-[#00B6BA]">
      <motion.h2
        className="text-3xl font-bold text-[#00B6BA] text-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Attendance Tracker
      </motion.h2>

      <div className="space-y-4">
        {attendance.map((student) => (
          <motion.div
            key={student.id}
            className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md border border-[#00B6BA] cursor-pointer transition-transform hover:scale-105"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => toggleAttendance(student.id)}
          >
            <p className="text-lg">{student.name}</p>
            {student.present ? (
              <CheckCircle className="text-green-400" size={28} />
            ) : (
              <XCircle className="text-red-500" size={28} />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceTracker;
