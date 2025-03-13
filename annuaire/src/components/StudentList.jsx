import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = window.ENV?.VITE_API_BASE_URL || "http://sdm-db:5000";

const StudentList = ({ onEdit }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/students`)
      .then((response) => setStudents(response.data))
      .catch((error) => console.error(error));
  }, []);

  const deleteStudent = (id) => {
    axios
      .delete(`${API_BASE_URL}/api/students/${id}`)
      .then(() => setStudents(students.filter((s) => s.id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Liste des étudiants</h2>
      <ul className="space-y-2">
        {students.map((student) => (
          <li
            key={student.id}
            className="bg-white p-3 rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold">
                {student.first_name} {student.last_name}
              </p>
              <p className="text-sm text-gray-500">{student.email}</p>
            </div>
            <div className="space-x-2">
              <button
                className="border border-blue-500 hover:bg-blue-500 text-blue-500 px-3 py-1 rounded"
                onClick={() => onEdit(student)}
              >
                Éditer
              </button>
              <button
                className="border border-red-500 hover:bg-red-500 text-red-500 px-3 py-1 rounded"
                onClick={() => deleteStudent(student.id)}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
