import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Edit } from "lucide-react";

const ManageAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({ title: "", dueDate: "" });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setNewAssignment({ ...newAssignment, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (!newAssignment.title || !newAssignment.dueDate) {
      alert("Please fill all fields!");
      return;
    }

    if (editIndex !== null) {
      // Update assignment
      const updatedAssignments = assignments.map((a, i) =>
        i === editIndex ? newAssignment : a
      );
      setAssignments(updatedAssignments);
      setEditIndex(null);
    } else {
      // Add new assignment
      setAssignments([...assignments, newAssignment]);
    }

    setNewAssignment({ title: "", dueDate: "" });
  };

  const handleEdit = (index) => {
    setNewAssignment(assignments[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedAssignments = assignments.filter((_, i) => i !== index);
    setAssignments(updatedAssignments);
  };

  return (
    <div className="bg-gray-900 text-white p-6 w-full max-w-3xl mx-auto rounded-xl shadow-lg border-2 border-[#00B6BA]">
      <motion.h2
        className="text-3xl font-bold text-[#00B6BA] text-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📚 Manage Assignments
      </motion.h2>

      {/* Assignment Form */}
      <form onSubmit={handleAddOrUpdate} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Assignment Title"
          value={newAssignment.title}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-gray-800 text-white border-2 border-[#00B6BA] focus:outline-none focus:ring-2 focus:ring-[#00B6BA]"
        />
        <input
          type="date"
          name="dueDate"
          value={newAssignment.dueDate}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-gray-800 text-white border-2 border-[#00B6BA] focus:outline-none focus:ring-2 focus:ring-[#00B6BA]"
        />
        <button
          type="submit"
          className="w-full bg-[#00B6BA] text-gray-900 font-bold p-3 rounded-md hover:bg-[#008c8e] transition-all"
        >
          {editIndex !== null ? "Update Assignment" : "Add Assignment"}
        </button>
      </form>

      {/* Assignment List */}
      <div className="mt-6 space-y-3">
        {assignments.map((assignment, index) => (
          <motion.div
            key={index}
            className="p-4 bg-gray-800 rounded-md border-2 border-[#00B6BA] shadow-lg flex justify-between items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div>
              <p className="font-semibold text-lg">{assignment.title}</p>
              <p className="text-gray-300 text-sm">Due: {assignment.dueDate}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(index)} className="text-yellow-400 hover:text-yellow-300">
                <Edit size={20} />
              </button>
              <button onClick={() => handleDelete(index)} className="text-red-400 hover:text-red-300">
                <Trash2 size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageAssignments;
