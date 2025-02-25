import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const initialTeachers = [
  { id: 1, name: "Mr. Smith", subject: "Math", rating: 4.5, feedbacks: [] },
  { id: 2, name: "Ms. Johnson", subject: "Science", rating: 4.8, feedbacks: [] },
  { id: 3, name: "Mrs. Brown", subject: "English", rating: 4.3, feedbacks: [] },
];

const TeacherRatings = () => {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [feedback, setFeedback] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTeacher && feedback && rating > 0) {
      setTeachers((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher.name === selectedTeacher
            ? {
                ...teacher,
                feedbacks: [...teacher.feedbacks, { rating, feedback }],
              }
            : teacher
        )
      );
      setFeedback("");
      setSelectedTeacher("");
      setRating(0);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto border-2 border-[#00B6BA] transition-all duration-500 hover:shadow-[#00B6BA]/50 hover:border-[#00E6E9]">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#00B6BA] mb-6 text-center">Teacher Ratings</h2>
      
      <div className="space-y-4">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="p-4 bg-gray-900 rounded-lg shadow hover:bg-gray-700 transition">
            <h3 className="text-lg sm:text-xl font-semibold text-[#00E6E9]">{teacher.name} ({teacher.subject})</h3>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.round(teacher.rating)
                      ? "text-yellow-400"
                      : "text-gray-500"
                  }
                />
              ))}
              <span className="ml-2 text-gray-300 text-sm sm:text-base">{teacher.rating}/5</span>
            </div>
            {teacher.feedbacks.length > 0 && (
              <div className="mt-3 p-3 bg-gray-700 rounded-lg">
                <h4 className="text-[#00B6BA] font-semibold">Feedback:</h4>
                {teacher.feedbacks.map((fb, index) => (
                  <p key={index} className="text-gray-300 text-xs sm:text-sm">⭐ {fb.rating}/5 - {fb.feedback}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <h3 className="text-xl sm:text-2xl font-semibold text-[#00B6BA] mt-8 text-center">Leave Feedback</h3>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <select
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B6BA] bg-gray-900 text-white text-sm sm:text-base"
        >
          <option value="">Select a Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.name}>{teacher.name} ({teacher.subject})</option>
          ))}
        </select>
        <div className="flex items-center justify-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              onClick={() => setRating(i + 1)}
              className={`cursor-pointer text-2xl sm:text-3xl transition-all ${i < rating ? "text-yellow-400" : "text-gray-500"}`}
            />
          ))}
        </div>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback here..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B6BA] bg-gray-900 text-white text-sm sm:text-base"
        />
        <button
          type="submit"
          className="w-full bg-[#00B6BA] text-white p-3 rounded-lg shadow hover:bg-[#009092] transition font-bold text-sm sm:text-base"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default TeacherRatings;
