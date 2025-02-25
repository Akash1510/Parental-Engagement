import React, { useState } from "react";
import { motion } from "framer-motion";
import { Megaphone, FileText } from "lucide-react";

const notices = [
  { id: 1, title: "Exam Schedule Released", description: "Final exams will begin from March 15, 2025. Check the timetable on the portal.", date: "Feb 20, 2025" },
  { id: 2, title: "New Assignment Policy", description: "Assignments submitted after the due date will have a 10% deduction per day.", date: "Feb 18, 2025" },
  { id: 3, title: "Holiday Announcement", description: "The school will remain closed on March 8, 2025, for Holi celebrations.", date: "Feb 15, 2025" },
];

const ImportantNotice = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="bg-gray-900 text-white p-6 w-full max-w-3xl mx-auto rounded-xl shadow-lg border-2 border-[#00B6BA]">
      <motion.h2
        className="text-3xl font-bold text-[#00B6BA] text-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📢 Important Notices
      </motion.h2>

      <div className="space-y-4">
        {notices.map((notice) => (
          <motion.div
            key={notice.id}
            className="bg-gray-800 p-4 rounded-lg shadow-md border border-[#00B6BA] cursor-pointer transition-transform hover:scale-105"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setExpanded(expanded === notice.id ? null : notice.id)}
          >
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">{notice.title}</p>
              {expanded === notice.id ? <FileText size={24} className="text-[#00B6BA]" /> : <Megaphone size={24} className="text-yellow-400" />}
            </div>

            {expanded === notice.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mt-2 text-gray-300 text-sm"
              >
                <p>{notice.description}</p>
                <p className="text-xs text-gray-400 mt-1">📅 {notice.date}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImportantNotice;
