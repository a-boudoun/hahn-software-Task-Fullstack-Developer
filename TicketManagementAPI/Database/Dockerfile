# Use the official PostgreSQL image from Docker Hub
FROM postgres:15

# Set environment variables for PostgreSQL user, password, and database
ENV POSTGRES_USER=abderrahim
ENV POSTGRES_PASSWORD=abderrahim13
ENV POSTGRES_DB=TicketManagementDB

# Copy the initialization scripts to the Docker entrypoint
COPY ./init.sql /docker-entrypoint-initdb.d/
