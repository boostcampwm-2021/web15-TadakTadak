#!/bin/bash
echo "🔥 Node.js 16.x 를 설치합니다."

cd ~

curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh

sudo bash nodesource_setup.sh

sudo apt-get install -y nodejs

sudo apt-get install build-essential
echo "🔥 Node.js 16.x 가 설치되었습니다."

node -v && npm -v
