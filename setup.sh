#!/bin/bash

# Update and upgrade packages
sudo apt update
sudo apt upgrade -y

# Install Node.js, npm, and unzip
sudo apt install -y nodejs npm unzip

# Remove git
sudo apt-get -y remove git

# Check Node.js version
nodejs -v

# Create user and group
sudo groupadd csye6225
sudo useradd -m -s /bin/bash -g csye6225 csye6225

sudo chown -R csye6225:csye6225 /home/csye6225
sudo chmod 770 /home/csye6225

# Set directory for the web app
WEB_APP_DIR="/home/csye6225/web2"

# Create the directory
sudo mkdir -p $WEB_APP_DIR

# Unzip the web app into the directory
sudo unzip /home/csye6225/webapp.zip -d $WEB_APP_DIR

# Set directory permissions
sudo chown -R csye6225:csye6225 $WEB_APP_DIR
sudo find $WEB_APP_DIR -type d -exec chmod 755 {} \;

# Set file permissions
sudo find $WEB_APP_DIR -type f -exec chmod 644 {} \;

# If there are specific executable files, set their permissions
sudo chmod 755 $WEB_APP_DIR/setup.sh
sudo chmod 755 $WEB_APP_DIR/install.sh
sudo chmod 600 $WEB_APP_DIR/.env

# Install npm packages
cd $WEB_APP_DIR
sudo npm install
