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

sudo cp /tmp/nodeserver.service /lib/systemd/system/nodeserver.service
echo "Enabling the REST API Service"
sudo systemctl enable nodeserver
sudo systemctl start nodeserver
sudo systemctl restart nodeserver
sudo systemctl status nodeserver
APISRVC=$?
if [ $APISRVC -eq 0 ]; then
  echo "API service is installed successfully!"
else
  echo "Unable to install the API service"
fi