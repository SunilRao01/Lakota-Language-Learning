#!/usr/bin/env bash

set -e -u -x

# Install the Heroku CLI
snap install --classic heroku --yes

heroku_key=${HEROKU_KEY}

echo "$heroku_key" > ~/.netrc

cd prod-lakota-ed
git subtree push --prefix lakota_ed_api heroku master
