#!/bin/bash
echo "๐ฅ docker๋ฅผ ์ค์นํฉ๋๋ค."

sudo apt update
sudo apt-get install -y ca-certificates \ 
    curl \
    software-properties-common \
    apt-transport-https \
    gnupg \
    lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository \
  "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
echo "๐ฅ docker ์ค์น๊ฐ ์๋ฃ๋์์ต๋๋ค."
docker info