## Backend service : créer avec Flask/Python

Determiner dans les variables environnement l'app FLASK :
```
\\ Windows
set FLASK_APP=run.py

\\ Linux
export FLASK_APP=run.py
```

Database migration :
```
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

Lancer le serveur backend :
```
python run.py
```
