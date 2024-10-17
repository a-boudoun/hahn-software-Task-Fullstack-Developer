#!/bin/bash

set -e

until dotnet ef database update --project /app/TicketManagementAPI.csproj; do
    >&2 echo "SQL Server is starting up"
    sleep 1
done

>&2 echo "SQL Server is up - executing command"

exec dotnet ./out/TicketManagementAPI.dll