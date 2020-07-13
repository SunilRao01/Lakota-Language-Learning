#!/usr/bin/env bash

set -e -u -x

apt-get update

export DEBIAN_FRONTEND="noninteractive"
apt-get -y install tzdata

apt-get -y install snapd

# Install the Heroku CLI
snap install --yes --classic heroku

heroku_key=${HEROKU_KEY}

echo "$heroku_key" > ~/.netrc

cd prod-lakota-ed
git subtree push --prefix lakota_ed_api heroku master
