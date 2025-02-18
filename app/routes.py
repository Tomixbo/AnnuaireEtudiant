from flask import Blueprint, request, jsonify
from app import db
from app.models import Student

student_routes = Blueprint("students", __name__)

# 🔹 Récupérer tous les étudiants
@student_routes.route("/students", methods=["GET"])
def get_students():
    students = Student.query.all()
    return jsonify([s.to_dict() for s in students])

# 🔹 Récupérer un étudiant spécifique par ID
@student_routes.route("/students/<int:id>", methods=["GET"])
def get_student_detail(id):
    student = Student.query.get(id)
    if student:
        return jsonify(student.to_dict())
    return jsonify({"error": "Étudiant non trouvé"}), 404

# 🔹 Ajouter un nouvel étudiant
@student_routes.route("/students", methods=["POST"])
def add_student():
    data = request.get_json()
    if not data.get("first_name") or not data.get("last_name") or not data.get("email"):
        return jsonify({"error": "Tous les champs sont obligatoires"}), 400

    new_student = Student(
        first_name=data["first_name"],
        last_name=data["last_name"],
        email=data["email"]
    )

    db.session.add(new_student)
    db.session.commit()
    return jsonify({"message": "Étudiant ajouté avec succès"}), 201

# 🔹 Mettre à jour un étudiant existant
@student_routes.route("/students/<int:id>", methods=["PUT"])
def update_student(id):
    student = Student.query.get(id)
    if not student:
        return jsonify({"error": "Étudiant non trouvé"}), 404

    data = request.get_json()
    student.first_name = data.get("first_name", student.first_name)
    student.last_name = data.get("last_name", student.last_name)
    student.email = data.get("email", student.email)

    db.session.commit()
    return jsonify({"message": "Étudiant mis à jour avec succès", "student": student.to_dict()})

# 🔹 Supprimer un étudiant
@student_routes.route("/students/<int:id>", methods=["DELETE"])
def delete_student(id):
    student = Student.query.get(id)
    if student:
        db.session.delete(student)
        db.session.commit()
        return jsonify({"message": "Étudiant supprimé"})
    return jsonify({"error": "Étudiant non trouvé"}), 404
