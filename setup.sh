#!/bin/bash

# Update and upgrade packages
sudo apt update
sudo apt upgrade -y

# Install PostgreSQL and related packages
sudo apt install -y postgresql postgresql-contrib

# Start and enable PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Install Node.js and npm
sudo apt install -y nodejs
sudo apt install -y npm
sudo apt install -y unzip

# Check Node.js version
nodejs -v
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD  'password'";

mkdir web2
unzip webapp.zip -d web2
cd web2
ls -a
npm install