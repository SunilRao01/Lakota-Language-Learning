#!/usr/bin/env bash

set -e -u -x

apt-get update
apt-get -y install git
apt-get -y install curl

# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh
heroku_key=${HEROKU_KEY}
echo "$heroku_key" > ~/.netrc

echo "Deploying API to Production via git through heroku remote server..."
cd prod-lakota-ed
heroku git:remote -a sleepy-sierra-08774
git subtree push --prefix lakota_ed_api heroku master
