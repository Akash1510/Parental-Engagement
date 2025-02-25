import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaUser, FaCheck, FaTimes, FaEdit, FaInfoCircle } from "react-icons/fa";

const teachers = [
  { name: "Mr. Smith", available: true },
  { name: "Ms. Johnson", available: false },
  { name: "Mrs. Brown", available: true }
];

const MeetingScheduler = () => {
  const [meetings, setMeetings] = useState([
    { id: 1, teacher: "Mr. Smith", date: "March 10, 2025", time: "3:00 PM - 5:00 PM", status: "Pending" }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [formData, setFormData] = useState({ teacher: "", date: "", time: "" });
  const selectedTeacher = teachers.find(t => t.name === formData.teacher);

  const handleAccept = (id) => {
    setMeetings(meetings.map(m => m.id === id ? { ...m, status: "Accepted" } : m));
  };

  const handleReject = (id) => {
    setMeetings(meetings.map(m => m.id === id ? { ...m, status: "Rejected" } : m));
  };

  const handleOpenForm = (meeting = null) => {
    setSelectedMeeting(meeting);
    setFormData(meeting ? { teacher: meeting.teacher, date: meeting.date, time: meeting.time } : { teacher: "", date: "", time: "" });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMeeting) {
      setMeetings(meetings.map(m => m.id === selectedMeeting.id ? { ...m, ...formData, status: "Pending" } : m));
    } else {
      setMeetings([...meetings, { id: Date.now(), ...formData, status: "Pending" }]);
    }
    setShowForm(false);
  };

  return (
    <div className="bg-gray-900 text-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto border-2 border-[#00B6BA] transition-all duration-500 hover:shadow-[#00B6BA]/50 hover:border-[#00E6E9]">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#00B6BA] mb-6 text-center">Meeting Scheduler</h2>
      
      <div className="space-y-4">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="p-4 sm:p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="w-full sm:w-auto">
              <p className="text-sm sm:text-lg flex items-center text-gray-300">
                <FaUser className="text-[#00E6E9] mr-2" /> {meeting.teacher}
              </p>
              <p className="text-sm sm:text-lg flex items-center text-gray-300 mt-1 sm:mt-2">
                <FaCalendarAlt className="text-[#00E6E9] mr-2" /> {meeting.date}
              </p>
              <p className="text-sm sm:text-lg flex items-center text-gray-300 mt-1 sm:mt-2">
                <FaClock className="text-[#00E6E9] mr-2" /> {meeting.time}
              </p>
              <p className={`mt-1 sm:mt-2 font-semibold ${meeting.status === "Accepted" ? "text-green-400" : meeting.status === "Rejected" ? "text-red-400" : "text-yellow-400"}`}>{meeting.status}</p>
            </div>
            <div className="flex space-x-2 sm:space-x-3 mt-2 sm:mt-0">
              {meeting.status === "Pending" && (
                <>
                  <button onClick={() => handleAccept(meeting.id)} className="bg-green-500 p-2 rounded-lg text-white hover:bg-green-600">
                    <FaCheck />
                  </button>
                  <button onClick={() => handleReject(meeting.id)} className="bg-red-500 p-2 rounded-lg text-white hover:bg-red-600">
                    <FaTimes />
                  </button>
                </>
              )}
              <button onClick={() => handleOpenForm(meeting)} className="bg-[#00B6BA] p-2 rounded-lg text-white hover:bg-[#009092]">
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <button onClick={() => handleOpenForm()} className="mt-6 w-full bg-[#00B6BA] text-white py-3 rounded-lg shadow-lg hover:bg-[#009092] transition font-bold text-lg">
        Request a New Meeting
      </button>
      
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg border-2 border-[#00B6BA]">
            <h3 className="text-lg sm:text-xl font-bold text-[#00B6BA] mb-4">{selectedMeeting ? "Modify Meeting" : "Schedule a Meeting"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <select value={formData.teacher} onChange={(e) => setFormData({ ...formData, teacher: e.target.value })} className="w-full p-3 border rounded-lg bg-gray-800 text-white">
                <option value="">Select a Teacher</option>
                {teachers.map((teacher, index) => (
                  <option key={index} value={teacher.name}>{teacher.name}</option>
                ))}
              </select>
              {selectedTeacher && (
                <p className={`text-sm flex items-center mt-2 ${selectedTeacher.available ? "text-green-400" : "text-red-400"}`}>
                  <FaInfoCircle className="mr-2" /> {selectedTeacher.available ? "Available for Meeting" : "Not Available for Meeting"}
                </p>
              )}
              <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full p-3 border rounded-lg bg-gray-800 text-white" />
              <input type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="w-full p-3 border rounded-lg bg-gray-800 text-white" />
              <button type="submit" className="w-full bg-[#00B6BA] text-white p-3 rounded-lg shadow-lg hover:bg-[#009092] transition font-bold">Submit</button>
            </form>
            <button onClick={() => setShowForm(false)} className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingScheduler;
