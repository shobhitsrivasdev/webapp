#!/bin/bash
sudo cp /tmp/webapp.zip /opt/webapp.zip

sudo groupadd csye6225
sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225

sudo apt update
sudo apt upgrade -y
sudo apt install -y nodejs
sudo apt install -y npm
sudo apt install -y unzip
sudo apt-get -y remove git
sudo apt-get update -y
sudo apt-get upgrade -y
echo 'Downloading the CloudWatch Agent package...'
sudo wget https://s3.amazonaws.com/amazoncloudwatch-agent/debian/amd64/latest/amazon-cloudwatch-agent.deb
 
echo 'Installing the CloudWatch Agent package...'
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb
 
echo 'Enabling the CloudWatch Agent service...'
sudo systemctl enable amazon-cloudwatch-agent
sudo systemctl start amazon-cloudwatch-agent
 
rm ./amazon-cloudwatch-agent.deb

nodejs -v

cd /opt
sudo unzip webapp.zip -d csye6225
cd /opt/csye6225
sudo ls -la
sudo npm install
 
 
