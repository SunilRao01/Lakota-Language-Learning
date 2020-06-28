#!/usr/bin/env bash

set -e -u -x

cd dev-lakota-ed

# This is where you can run your unit test command, such as the ones below:
echo "Running integration tests against QA..."

apt-get install libgdk-pixbuf2.0-0 libgtk-3-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

npm install cypress --save-dev
CYPRESS_BASE_URL=http://lakota.skeletonpraxis.net/ cypress run

echo "Finished running unit tests."
