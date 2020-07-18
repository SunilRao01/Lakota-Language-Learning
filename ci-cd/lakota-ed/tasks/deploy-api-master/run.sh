#!/usr/bin/env bash

set -e -u -x

apt-get update
#
#export DEBIAN_FRONTEND="noninteractive"
#apt-get -y install tzdata
#apt-get -y install openssh-server
#{
#  private_rsa_key=${PRIVATE_RSA_KEY}
#  public_rsa_key=${PUBLIC_RSA_KEY}
#
#  ssh-keygen -q -t rsa -N '' -f ~/.ssh/id_rsa
#  echo "$private_rsa_key" > ~/.ssh/id_rsa
#  echo "$public_rsa_key" > ~/.ssh/id_rsa.pub
#}
#
#apt-get -y install ca-certificates
#apt-get -y install curl
#apt-get -y install wget
#apt-get -y install sudo
apt-get -y install git
apt-get -y install curl
#
#wget -q "https://toolbelt.heroku.com/install-ubuntu.sh"
#chmod +x install-ubuntu.sh
#sudo ./install-ubuntu.sh
#
## Install the Heroku CLI
##snap install --classic heroku
#
#heroku_key=${HEROKU_KEY}
#
#echo "$heroku_key" > ~/.netrc
curl https://cli-assets.heroku.com/install.sh | sh

cd prod-lakota-ed

#heroku auth:token
echo "Deploying API to Production via git through heroku remote server..."
git status
git fetch origin
#git fetch heroku
git subtree push --prefix lakota_ed_api heroku master
