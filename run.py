from flask_migrate import Migrate
from app import create_app, db

app = create_app()
migrate = Migrate(app, db)  # Initialisation de Flask-Migrate

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Crée la base de données si elle n'existe pas
    app.run(debug=True)

