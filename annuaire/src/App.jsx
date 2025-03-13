import React, { useState } from "react";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";

const App = () => {
  const [update, setUpdate] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">ANNUAIRE ETUDIANT</h1>
      <StudentForm
        onStudentAdded={() => {
          setUpdate(!update);
          setEditingStudent(null);
        }}
        editingStudent={editingStudent}
      />
      <StudentList key={update} onEdit={setEditingStudent} />
    </div>
  );
};

export default App;
