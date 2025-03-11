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

# Copy the entrypoint script separately to a standard location
RUN chmod +x entrypoint.sh

# Expose Flask port
EXPOSE 5000

# Set entrypoint script
ENTRYPOINT ["entrypoint.sh"]
