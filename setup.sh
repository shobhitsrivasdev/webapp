#!/bin/bash

sudo apt update
sudo apt upgrade -y
sudo apt install -y nodejs
sudo apt install -y npm
sudo apt install -y unzip
sudo apt-get -y remove git
nodejs -v

# Create a non-admin user
sudo useradd -m webappuser
sudo groupadd webappgroup
# Add webappuser and admin to the webappgroup
sudo usermod -aG webappgroup webappuser
sudo usermod -aG webappgroup admin

# switch to non-admin user
su - webappuser

mkdir -p /home/webapp

# Set ownership and permissions for webappuser's home directory
sudo chown -R webappuser:webappgroup /home/webapp
sudo chmod -R 750 /home/webapp
cp /tmp/webapp.zip /home/webapp/webapp.zip

cd /home/webapp/
unzip webapp.zip
ls -la
npm install
 
# Set ownership and permissions for webappuser's home directory
sudo chown -R webappuser:webappgroup /home/webappuser
sudo chmod -R 750 /home/webappuser
 
# Set ownership and permissions for the app.js file in admin's directory
sudo chown webappuser:webappgroup /home/admin/webapp/app.js
sudo chmod 750 /home/admin/webapp/app.js
 
# Add webappuser to the systemd-journal group
sudo usermod -aG systemd-journal webappuser
 
# Set the .env file in admin's directory
sudo chmod 644 /home/admin/webapp/.env
 
# Create the log file and set ownership and permissions
sudo touch /var/log/webapp.log
sudo chown webappuser:webappgroup /var/log/webapp.log
sudo chmod 644 /var/log/webapp.log
 
