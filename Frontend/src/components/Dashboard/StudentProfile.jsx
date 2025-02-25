
import UpcomingEvents from "./UpcomingEvents";

const StudentProfile = () => {
  return (
    <div className="bg-gray-700 text-white p-6 sm:p-8 min-h-screen w-full flex flex-col items-center overflow-hidden z-10">
      {/* Student ID Card */}
      <div className="relative bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-3xl flex flex-col sm:flex-row items-center border-2 border-[#00B6BA] mt-6 transition-all duration-500 hover:scale-105 hover:shadow-[#00B6BA]/50 hover:border-[#00E6E9]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-10"></div>

        <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-lg overflow-hidden border-4 border-[#00B6BA] shadow-md hover:shadow-[#00B6BA] transition-all duration-300 mb-4 sm:mb-0 sm:mr-8">
          <img src="/assets/student.png" alt="Student Profile" className="w-full h-full object-cover" />
        </div>

        <div className="text-center sm:text-left flex-1">
          <h3 className="text-2xl sm:text-4xl font-extrabold text-[#00B6BA] mb-2 sm:mb-4 hover:text-[#00E6E9] transition-all duration-300">
            John Doe
          </h3>
          <div className="text-sm sm:text-lg text-gray-300 mt-4 sm:mt-6 font-medium space-y-2 sm:space-y-3">
            <p>Grade: <span className="text-white">8</span></p>
            <p>Attendance: <span className="text-white">95%</span></p>
            <p>Roll No: <span className="text-white">23</span></p>
            <p>Section: <span className="text-white">A</span></p>
            <p>Student ID: <span className="text-white">STU-10023</span></p>
            <p>Guardian: <span className="text-white">Mr. Doe</span></p>
            <p>Contact: <span className="text-white">+123 456 7890</span></p>
            <p>Address: <span className="text-white">123 Elm Street, Springfield</span></p>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="w-full max-w-3xl mt-8">
        <UpcomingEvents />
      </div>
    </div>
  );
};

export default StudentProfile;
