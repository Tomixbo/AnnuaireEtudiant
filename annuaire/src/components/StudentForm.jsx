import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentForm = ({ onStudentAdded, editingStudent }) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState(null);

  // Remplit le formulaire si on édite un étudiant
  useEffect(() => {
    if (editingStudent) {
      setFirstName(editingStudent.first_name);
      setLastName(editingStudent.last_name);
      setEmail(editingStudent.email);
      setId(editingStudent.id);
    }
  }, [editingStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // Mode édition : Mettre à jour l'étudiant
      axios
        .put(`http://127.0.0.1:5000/api/students/${id}`, {
          first_name,
          last_name,
          email,
        })
        .then(() => {
          onStudentAdded();
          resetForm();
        })
        .catch((error) => console.error(error));
    } else {
      // Mode ajout : Créer un nouvel étudiant
      axios
        .post("http://127.0.0.1:5000/api/students", {
          first_name,
          last_name,
          email,
        })
        .then(() => {
          onStudentAdded();
          resetForm();
        })
        .catch((error) => console.error(error));
    }
  };

  // Réinitialiser le formulaire après soumission
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setId(null);
  };

  return (
    <form className="p-4 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-2">
        {id ? "Modifier l'étudiant" : "Ajouter un étudiant"}
      </h2>
      <input
        className="border p-2 w-full mb-2 rounded"
        type="text"
        placeholder="Prénom"
        value={first_name}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full mb-2 rounded"
        type="text"
        placeholder="Nom"
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full mb-4 rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className="flex space-x-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          {id ? "Mettre à jour" : "Ajouter"}
        </button>
        {id && (
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            type="button"
            onClick={resetForm}
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
};

export default StudentForm;
