import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentList = ({ onEdit }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/students")
      .then((response) => setStudents(response.data))
      .catch((error) => console.error(error));
  }, []);

  const deleteStudent = (id) => {
    axios
      .delete(`http://127.0.0.1:5000/api/students/${id}`)
      .then(() => setStudents(students.filter((s) => s.id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
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
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => onEdit(student)}
              >
                Éditer
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
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
