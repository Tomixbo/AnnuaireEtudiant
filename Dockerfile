# Use a lightweight Python image
FROM tomixbo/flask-py3-alpine:latest

# Set the working directory in the container
WORKDIR /backend

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV FLASK_APP=run.py
ENV FLASK_ENV=production

# Expose the port Flask runs on (default: 5000)
EXPOSE 5000

# Run database migrations
RUN flask db init || true
RUN flask db migrate -m "Initial migration" || true
RUN flask db upgrade || true

# Start the Flask server
CMD ["python", "run.py"]
