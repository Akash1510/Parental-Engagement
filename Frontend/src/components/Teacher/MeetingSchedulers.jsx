import React, { useState } from "react";
import { motion } from "framer-motion";

const MeetingSchedulers = () => {
  const [meeting, setMeeting] = useState({
    title: "",
    date: "",
    time: "",
    attendee: "",
  });

  const [meetings, setMeetings] = useState([]);

  const handleChange = (e) => {
    setMeeting({ ...meeting, [e.target.name]: e.target.value });
  };

  const handleSchedule = (e) => {
    e.preventDefault();
    if (!meeting.title || !meeting.date || !meeting.time || !meeting.attendee) {
      alert("Please fill all fields!");
      return;
    }
    setMeetings([...meetings, meeting]);
    setMeeting({ title: "", date: "", time: "", attendee: "" });
  };

  return (
    <div className="bg-gray-900 text-white p-6 w-full max-w-3xl mx-auto rounded-xl shadow-lg border-2 border-[#00B6BA]">
      <motion.h2
        className="text-3xl font-bold text-[#00B6BA] text-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📅 Schedule a Meeting
      </motion.h2>

      {/* Meeting Form */}
      <form onSubmit={handleSchedule} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Meeting Title"
          value={meeting.title}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-gray-800 text-white border-2 border-[#00B6BA] focus:outline-none focus:ring-2 focus:ring-[#00B6BA]"
        />
        <input
          type="date"
          name="date"
          value={meeting.date}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-gray-800 text-white border-2 border-[#00B6BA] focus:outline-none focus:ring-2 focus:ring-[#00B6BA]"
        />
        <input
          type="time"
          name="time"
          value={meeting.time}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-gray-800 text-white border-2 border-[#00B6BA] focus:outline-none focus:ring-2 focus:ring-[#00B6BA]"
        />
        <input
          type="text"
          name="attendee"
          placeholder="Attendee (Parent/Student)"
          value={meeting.attendee}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-gray-800 text-white border-2 border-[#00B6BA] focus:outline-none focus:ring-2 focus:ring-[#00B6BA]"
        />
        <button
          type="submit"
          className="w-full bg-[#00B6BA] text-gray-900 font-bold p-3 rounded-md hover:bg-[#008c8e] transition-all"
        >
          Schedule Meeting
        </button>
      </form>

      {/* Scheduled Meetings List */}
      <div className="mt-6 space-y-3">
        {meetings.map((m, index) => (
          <motion.div
            key={index}
            className="p-4 bg-gray-800 rounded-md border-2 border-[#00B6BA] shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <p className="font-semibold text-lg">{m.title}</p>
            <p className="text-gray-300 text-sm">{m.date} at {m.time}</p>
            <p className="text-gray-400 text-sm">Attendee: {m.attendee}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MeetingSchedulers;
