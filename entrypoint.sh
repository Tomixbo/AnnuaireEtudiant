#!/bin/sh
echo "Waiting for database to be ready..."
sleep 5  # Give time for the database to start (adjust if needed)

echo "Running database migrations..."
flask db init || true
flask db migrate -m "Auto migration" || true
flask db upgrade || true

echo "Starting Flask server..."
exec python run.py  # Use exec to properly forward signals (like Ctrl+C)
