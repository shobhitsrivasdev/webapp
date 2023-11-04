sudo chown -R csye6225:csye6225 /opt/csye6225
sudo chmod -R 750  /opt/csye6225
sudo -u csye6225 bash

sudo cp /tmp/nodeserver.service /etc/systemd/system/nodeserver.service
echo "Enabling the REST API Service"
sudo systemctl enable nodeserver
sudo systemctl start nodeserver
sudo systemctl restart nodeserver
sudo systemctl status nodeserver
sudo systemctl enable amazon-cloudwatch-agent
sudo systemctl start amazon-cloudwatch-agent
APISRVC=$?
if [ $APISRVC -eq 0 ]; then
  echo "API service is installed successfully!"
else
  echo "Unable to install the API service"
fi