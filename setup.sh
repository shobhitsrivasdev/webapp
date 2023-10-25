#!/bin/bash
sudo cp tmp/webapp.zip /opt/webapp.zip

sudo groupadd csye6225
sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225

sudo apt update
sudo apt upgrade -y
sudo apt install -y nodejs
sudo apt install -y npm
sudo apt install -y unzip
sudo apt-get -y remove git
nodejs -v

cd /opt
sudo unzip /opt/webapp.zip -d /opt/csye6225/
cd csye6225
sudo ls -la
sudo npm install
 
 
