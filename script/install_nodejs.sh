#!/bin/bash
echo "π₯ Node.js 16.x λ₯Ό μ€μΉν©λλ€."

cd ~

curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh

sudo bash nodesource_setup.sh

sudo apt-get install -y nodejs

sudo apt-get install build-essential
echo "π₯ Node.js 16.x κ° μ€μΉλμμ΅λλ€."

node -v && npm -v
