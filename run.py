from flask_migrate import Migrate
from app import create_app, db
from flask_cors import CORS

app = create_app()

# Initialisation de Flask-Migrate
migrate = Migrate(app, db)  

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Crée la base de données si elle n'existe pas
    app.run(debug=True, host="0.0.0.0", port=5000)

