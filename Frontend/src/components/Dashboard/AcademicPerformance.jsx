import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { jsPDF } from "jspdf";

const data = [
  { subject: "Math", score: 85 },
  { subject: "Science", score: 92 },
  { subject: "English", score: 88 },
  { subject: "History", score: 80 },
  { subject: "Geography", score: 90 },
];

const COLORS = ["#FFC470", "#FF6B6B", "#00B6BA", "#FFD93D", "#6A0572"];

const AcademicPerformance = () => {
  const downloadReport = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Student Performance Report", 20, 20);
    data.forEach((item, index) => {
      doc.text(`${item.subject}: ${item.score}%`, 20, 40 + index * 10);
    });
    doc.save("student_performance_report.pdf");
  };

  return (
    <div className="bg-gray-900 text-white p-6 sm:p-8 rounded-lg shadow-md min-h-screen w-full flex flex-col justify-center items-center z-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#00B6BA] mb-6 text-center">Academic Performance</h2>
      
      {/* Subject Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8 w-full max-w-6xl">
        {data.map((item, index) => (
          <div key={index} className="p-4 sm:p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-[#00B6BA]">{item.subject}</h3>
            <p className="text-gray-300 text-base sm:text-lg">Score: {item.score}%</p>
          </div>
        ))}
      </div>

      {/* Performance Graphs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full max-w-6xl">
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg w-full">
          <h3 className="text-lg sm:text-xl font-semibold text-[#00B6BA] mb-3 sm:mb-4 text-center">Performance Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="subject" stroke="#00B6BA" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#00B6BA" barSize={40} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg w-full">
          <h3 className="text-lg sm:text-xl font-semibold text-[#00B6BA] mb-3 sm:mb-4 text-center">Subject Wise Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} dataKey="score" nameKey="subject" cx="50%" cy="50%" outerRadius={100} label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center mt-8 sm:mt-10">
        <button
          onClick={downloadReport}
          className="bg-[#00B6BA] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg hover:bg-[#009092] transition font-bold text-base sm:text-lg"
        >
          Download Report (PDF)
        </button>
      </div>
    </div>
  );
};

export default AcademicPerformance;
