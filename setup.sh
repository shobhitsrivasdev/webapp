#!/bin/bash

# Update and upgrade packages
sudo apt update
sudo apt upgrade -y

# Install PostgreSQL and related packages
#sudo apt install -y postgresql postgresql-contrib

# Start and enable PostgreSQL service
#sudo systemctl start postgresql
#sudo systemctl enable postgresql

# Install Node.js and npm
sudo apt install -y nodejs
sudo apt install -y npm
sudo apt install -y unzip
# Remove git
sudo apt-get -y remove git
# Check Node.js version
nodejs -v
#sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD  'password'";
sudo groupadd csye6225
sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225

# Set directory permissions
sudo find /home/csye6225/web2/ -type d -exec chmod 755 {} \;

# Set file permissions
sudo find /home/csye6225/web2/ -type f -exec chmod 644 {} \;

# If there are specific executable files, set their permissions
sudo chmod 755 /home/csye6225/web2/setup.sh
sudo chmod 755 /home/csye6225/web2/install.sh

sudo chmod 600 /home/csye6225/web2/.env

mkdir web2
unzip webapp.zip -d web2
cd web2
ls -a
npm install