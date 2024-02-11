# Use the official Python base image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app


COPY requirements.txt ./
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

COPY . ./


# Expose the port on which the application will run
EXPOSE 10000


ENV PYTHONPATH api

# Run the FastAPI application using uvicorn server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000"]