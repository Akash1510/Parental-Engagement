
import  { useState } from "react";
import { FaUserGraduate, FaSearch, FaSort, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

const initialStudents = [
  { id: 1, name: "John Doe", grade: "10th", section: "A", attendance: 95 },
  { id: 2, name: "Emma Watson", grade: "9th", section: "B", attendance: 88 },
  { id: 3, name: "Chris Evans", grade: "11th", section: "A", attendance: 92 },
];

const Students = () => {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [newStudent, setNewStudent] = useState({ name: "", grade: "", section: "", attendance: "" });
  const [editingStudent, setEditingStudent] = useState(null);

  const filteredStudents = students
    .filter(student => student.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortOrder === "asc" ? a.attendance - b.attendance : b.attendance - a.attendance);

  const addStudent = () => {
    if (!newStudent.name || !newStudent.grade || !newStudent.section || !newStudent.attendance) return;
    setStudents([...students, { ...newStudent, id: Date.now(), attendance: Number(newStudent.attendance) }]);
    setNewStudent({ name: "", grade: "", section: "", attendance: "" });
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const updateStudent = () => {
    setStudents(students.map(student => (student.id === editingStudent.id ? editingStudent : student)));
    setEditingStudent(null);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <FaUserGraduate className="text-[#00B6BA]" /> Student Management
      </h2>

      <div className="flex gap-3 mt-4">
        <input
          type="text"
          placeholder="Search student..."
          className="p-2 border rounded-lg w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="bg-[#00B6BA] text-white px-4 py-2 rounded-lg hover:bg-[#008b8e]">
          <FaSort /> Sort
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {filteredStudents.map(student => (
          <motion.div key={student.id} className="p-4 bg-gray-50 border rounded-lg shadow-sm flex justify-between items-center"
            whileHover={{ scale: 1.02 }}>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">{student.name}</h3>
              <p className="text-gray-500">{student.grade} - Section {student.section}</p>
              <p className={`font-semibold ${student.attendance < 90 ? "text-red-500" : "text-green-600"}`}>
                Attendance: {student.attendance}%
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditingStudent(student)} className="text-blue-600 hover:underline">
                <FaEdit /> Edit
              </button>
              <button onClick={() => deleteStudent(student.id)} className="text-red-600 hover:underline">
                <FaTrash /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">{editingStudent ? "Edit Student" : "Add Student"}</h3>
        <input type="text" placeholder="Name" className="p-2 border rounded-lg w-full mt-2" 
          value={editingStudent ? editingStudent.name : newStudent.name}
          onChange={(e) => (editingStudent ? setEditingStudent({ ...editingStudent, name: e.target.value }) : setNewStudent({ ...newStudent, name: e.target.value }))}
        />
        <input type="text" placeholder="Grade" className="p-2 border rounded-lg w-full mt-2" 
          value={editingStudent ? editingStudent.grade : newStudent.grade}
          onChange={(e) => (editingStudent ? setEditingStudent({ ...editingStudent, grade: e.target.value }) : setNewStudent({ ...newStudent, grade: e.target.value }))}
        />
        <input type="text" placeholder="Section" className="p-2 border rounded-lg w-full mt-2" 
          value={editingStudent ? editingStudent.section : newStudent.section}
          onChange={(e) => (editingStudent ? setEditingStudent({ ...editingStudent, section: e.target.value }) : setNewStudent({ ...newStudent, section: e.target.value }))}
        />
        <input type="number" placeholder="Attendance" className="p-2 border rounded-lg w-full mt-2" 
          value={editingStudent ? editingStudent.attendance : newStudent.attendance}
          onChange={(e) => (editingStudent ? setEditingStudent({ ...editingStudent, attendance: e.target.value }) : setNewStudent({ ...newStudent, attendance: e.target.value }))}
        />
        <button onClick={editingStudent ? updateStudent : addStudent} 
          className="bg-[#00B6BA] text-white px-4 py-2 rounded-lg mt-3 w-full hover:bg-[#008b8e]">
          {editingStudent ? "Update" : "Add"} Student
        </button>
      </div>
    </div>
  );
};

export default Students;


// import { useState, useEffect } from "react";
// import { FaUserGraduate, FaSearch, FaSort, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
// import { motion } from "framer-motion";
// import axios from "D:/Parental_Engagement/Frontend/src/utils/api" // Import axios instance
// import Cookies from "js-cookie";

// const Students = () => {
//   const [students, setStudents] = useState([]);
//   const [search, setSearch] = useState("");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [newStudent, setNewStudent] = useState({ name: "", grade: "", section: "", attendance: "" ,parent:"",roll_no:""});
//   const [editingStudent, setEditingStudent] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   /** ✅ Fetch students from API */
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get("/students", {
//           headers: { Authorization: `Bearer ${Cookies.get("authToken")}` }
//         });
//         setStudents(response.data.students);
//       } catch (err) {
//         setError("Error fetching students.");
//       }
//     };
//     fetchStudents();
//   }, []);

//   /** ✅ Add a new student */
//   const addStudent = async () => {
//     if (!newStudent.name || !newStudent.grade || !newStudent.section || !newStudent.attendance || !newStudent.parent || !newStudent.roll_no) return;
//     setLoading(true);
//     try {
//       const response = await axios.post("/students/add", newStudent, {
//         headers: { Authorization: `Bearer ${Cookies.get("authToken")}` }
//       });
//       setStudents([...students, response.data.student]);
//       setNewStudent({ name: "", grade: "", section: "", attendance: "" ,parent:"",roll_no:""});
//     } catch (err) {
//       setError("Error adding student.");
//     }
//     setLoading(false);
//   };

//   /** ✅ Update student details */
//   const updateStudent = async () => {
//     setLoading(true);
//     try {
//       await axios.put(`/students/${editingStudent._id}`, editingStudent, {
//         headers: { Authorization: `Bearer ${Cookies.get("authToken")}` }
//       });
//       setStudents(students.map(student => (student._id === editingStudent._id ? editingStudent : student)));
//       setEditingStudent(null);
//     } catch (err) {
//       setError("Error updating student.");
//     }
//     setLoading(false);
//   };

//   /** ✅ Delete student */
//   const deleteStudent = async (id) => {
//     try {
//       await axios.delete(`/students/${id}`, {
//         headers: { Authorization: `Bearer ${Cookies.get("authToken")}` }
//       });
//       setStudents(students.filter(student => student._id !== id));
//     } catch (err) {
//       setError("Error deleting student.");
//     }
//   };

//   /** ✅ Filter and sort students */
//   const filteredStudents = students
//     .filter(student => student.name.toLowerCase().includes(search.toLowerCase()))
//     .sort((a, b) => (sortOrder === "asc" ? a.attendance - b.attendance : b.attendance - a.attendance));

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-4xl mx-auto mt-6">
//       <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//         <FaUserGraduate className="text-[#00B6BA]" /> Student Management
//       </h2>

//       {error && <p className="text-red-500">{error}</p>}

//       <div className="flex gap-3 mt-4">
//         <input
//           type="text"
//           placeholder="Search student..."
//           className="p-2 border rounded-lg w-full"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <button
//           onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
//           className="bg-[#00B6BA] text-white px-4 py-2 rounded-lg hover:bg-[#008b8e]">
//           <FaSort /> Sort
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//         {filteredStudents.map(student => (
//           <motion.div key={student._id} className="p-4 bg-gray-50 border rounded-lg shadow-sm flex justify-between items-center"
//             whileHover={{ scale: 1.02 }}>
//             <div>
//               <h3 className="text-lg font-semibold text-gray-700">{student.name}</h3>
//               <p className="text-gray-500">{student.grade} - Section {student.section}</p>
//               <p className={`font-semibold ${student.attendance < 90 ? "text-red-500" : "text-green-600"}`}>
//                 Attendance: {student.attendance}%
//               </p>
//             </div>
//             <div className="flex gap-2">
//               <button onClick={() => setEditingStudent(student)} className="text-blue-600 hover:underline">
//                 <FaEdit /> Edit
//               </button>
//               <button onClick={() => deleteStudent(student._id)} className="text-red-600 hover:underline">
//                 <FaTrash /> Delete
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       <div className="mt-6 p-4 border rounded-lg">
//         <h3 className="text-lg font-semibold">{editingStudent ? "Edit Student" : "Add Student"}</h3>
//         <input type="text" placeholder="Name" className="p-2 border rounded-lg w-full mt-2" 
//           value={editingStudent ? editingStudent.name : newStudent.name}
//           onChange={(e) => (editingStudent ? setEditingStudent({ ...editingStudent, name: e.target.value }) : setNewStudent({ ...newStudent, name: e.target.value }))} 
//         />
//         <input type="text" placeholder="Grade" className="p-2 border rounded-lg w-full mt-2" 
//           value={editingStudent ? editingStudent.grade : newStudent.grade}
//           onChange={(e) => (editingStudent ? setEditingStudent({ ...editingStudent, grade: e.target.value }) : setNewStudent({ ...newStudent, grade: e.target.value }))} 
//         />
//         <input type="text" placeholder="Section" className="p-2 border rounded-lg w-full mt-2" 
//           value={editingStudent ? editingStudent.section : newStudent.section}
//           onChange={(e) => (editingStudent ? setEditingStudent({ ...editingStudent, section: e.target.value }) : setNewStudent({ ...newStudent, section: e.target.value }))} 
//         />
//         <input type="number" placeholder="Attendance" className="p-2 border rounded-lg w-full mt-2" 
//           value={editingStudent ? editingStudent.attendance : newStudent.attendance}
//           onChange={(e) => (editingStudent ? setEditingStudent({ ...editingStudent, attendance: e.target.value }) : setNewStudent({ ...newStudent, attendance: e.target.value }))} 
//         />
//         <input type="text" placeholder="Guardian Name" className="p-2 border rounded-lg w-full mt-2" 
//           value={editingStudent ? editingStudent.parent : newStudent.parent}
//           onChange={(e) => (editingStudent ? setEditingStudent({ ...editingStudent, parent: e.target.value }) : setNewStudent({ ...newStudent, parent: e.target.value }))} 
//         />
//         <input type="number" placeholder="Student Id" className="p-2 border rounded-lg w-full mt-2" 
//           value={editingStudent ? editingStudent.roll_no : newStudent.roll_no}
//           onChange={(e) => (editingStudent ? setEditingStudent({ ...editingStudent, roll_no: e.target.value }) : setNewStudent({ ...newStudent, roll_no: e.target.value }))} 
//         />
//         <button onClick={editingStudent ? updateStudent : addStudent} 
//           className="bg-[#00B6BA] text-white px-4 py-2 rounded-lg mt-3 w-full hover:bg-[#008b8e]" disabled={loading}>
//           {loading ? "Processing..." : editingStudent ? "Update" : "Add"} Student
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Students;
