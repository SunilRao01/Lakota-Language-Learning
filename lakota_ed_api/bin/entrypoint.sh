#!/bin/bash
# Docker entrypoint script.
echo "At entrypoint.sh"

# Wait until Postgres is ready
while ! pg_isready -q -h $PGHOST -p $PGPORT -U $PGUSER
do
  echo "$(date) - waiting for database to start"
  sleep 2
done

# Create, migrate, and seed database if it doesn't exist.

echo "Creating $PGDATABASE."
createdb -E UTF8 $PGDATABASE -l en_US.UTF-8 -T template0
echo "Migrating..."
mix ecto.migrate
echo "Seeding..."
mix run priv/repo/seeds.exs
echo "Database $PGDATABASE created."

exec mix phx.server
