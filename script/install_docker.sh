#!/bin/bash

# 리눅스 커널이 최소 3.10 버전 이상이여야 합니다.
# sudo 권한 혹은 root 권한을 소유한 계정에서 설치 진행해야 합니다.
# 최신 배포판 OS인지 확인해야 합니다.
# 64bit 운영체제이여야 합니다.

echo "🔥 docker를 설치합니다."

echo "🔥 apt package를 업데이트 합니다."
sudo apt update
sudo apt-get install -y ca-certificates \ 
    curl \
    software-properties-common \
    apt-transport-https \
    gnupg \
    lsb-release
echo "🔥 apt package 업데이트 되었습니다."

echo "🔥 GPG 키 및 저장소를 추가합니다."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository \
  "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
echo "🔥 GPG 키 및 저장소를 추가했습니다."

echo "🔥 도커 엔진을 설치합니다."
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
echo "🔥 도커 엔진이 설치 완료되었습니다."

echo "🔥 설치된 도커의 정보입니다."
docker info
echo "🔥 docker를 설치가 완료되었습니다."