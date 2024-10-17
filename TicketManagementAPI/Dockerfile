FROM debian:buster

RUN apt-get update && \
    apt-get install -y wget 

RUN wget https://packages.microsoft.com/config/debian/10/packages-microsoft-prod.deb -O packages-microsoft-prod.deb && \
    dpkg -i packages-microsoft-prod.deb && \
    apt-get update && \
    apt-get install -y dotnet-sdk-8.0

RUN dotnet tool install --global dotnet-ef

ENV PATH="$PATH:/root/.dotnet/tools"

WORKDIR /app

COPY ["TicketManagementAPI.csproj", "/app/"]

RUN dotnet restore

COPY . .

RUN dotnet publish -c Release -o out

RUN chmod +x /app/script.sh

EXPOSE 5000

ENTRYPOINT ["bash", "script.sh"]
