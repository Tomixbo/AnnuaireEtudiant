# Use a lightweight Python image
FROM tomixbo/flask-py3-alpine:latest

# Set the working directory in the container
WORKDIR /backend

# Copy entrypoint script first, separately
USER root
COPY entrypoint.sh /backend/entrypoint.sh
RUN chmod +x /backend/entrypoint.sh

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV FLASK_APP=run.py
ENV FLASK_ENV=production

# Expose the port Flask runs on (default: 5000)
EXPOSE 5000

# Set correct entrypoint path
ENTRYPOINT ["/backend/entrypoint.sh"]
