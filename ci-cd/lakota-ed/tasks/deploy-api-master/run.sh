#!/usr/bin/env bash

set -e -u -x

apt-get update

#export DEBIAN_FRONTEND="noninteractive"
#apt-get -y install tzdata
#
#apt-get -y install snapd
#
#systemctl status snapd
#systemctl start snapd

apt-get -y install ca-certificates
apt-get -y install curl
apt-get -y install wget
apt-get -y install sudo
apt-get -y install git

wget -q "https://toolbelt.heroku.com/install-ubuntu.sh"
chmod +x install-ubuntu.sh
sudo ./install-ubuntu.sh

# Install the Heroku CLI
#snap install --classic heroku

heroku_key=${HEROKU_KEY}

echo "$heroku_key" > ~/.netrc

cd prod-lakota-ed
git subtree push --prefix lakota_ed_api heroku master
