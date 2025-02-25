import React from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, ClipboardList } from "lucide-react"; // Icons for visual appeal

const classData = {
  className: "Grade 10 - Section A",
  totalStudents: 35,
  subjects: ["Mathematics", "Science", "English", "History"],
  upcomingAssignments: [
    { subject: "Mathematics", dueDate: "March 5, 2025" },
    { subject: "Science", dueDate: "March 7, 2025" },
  ],
};

const ClassOverview = () => {
  return (
    <div className="bg-gray-900 text-white p-8 w-full max-w-4xl mx-auto rounded-xl shadow-lg border-2 border-[#00B6BA]">
      <motion.h2 
        className="text-3xl font-bold text-[#00B6BA] text-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Class Overview
      </motion.h2>

      {/* Class Details */}
      <div className="space-y-4">
        <motion.div 
          className="flex items-center gap-4 bg-gray-800 p-5 rounded-lg shadow-md border border-[#00B6BA]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Users className="text-[#00E6E9]" size={28} />
          <p className="text-xl">{classData.className} - {classData.totalStudents} Students</p>
        </motion.div>

        <motion.div 
          className="flex items-center gap-4 bg-gray-800 p-5 rounded-lg shadow-md border border-[#00B6BA]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BookOpen className="text-[#00E6E9]" size={28} />
          <p className="text-xl">Subjects: {classData.subjects.join(", ")}</p>
        </motion.div>

        {/* Upcoming Assignments */}
        <motion.div 
          className="bg-gray-800 p-5 rounded-lg shadow-md border border-[#00B6BA]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <ClipboardList className="text-yellow-400" size={28} />
            <p className="text-xl font-semibold">Upcoming Assignments</p>
          </div>
          <ul className="list-disc list-inside text-gray-300">
            {classData.upcomingAssignments.map((assignment, index) => (
              <li key={index} className="mt-2">
                {assignment.subject} - Due by {assignment.dueDate}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default ClassOverview;
