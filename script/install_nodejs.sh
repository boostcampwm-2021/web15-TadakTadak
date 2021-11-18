cd ~

curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh

sudo bash nodesource_setup.sh

sudo apt-get install -y nodejs

sudo apt-get install build-essential

node -v && npm -v
