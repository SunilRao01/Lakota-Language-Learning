#!/usr/bin/env bash

set -e -u -x

cd dev-lakota-ed

# This is where you can run your unit test command, such as the ones below:
echo "Running integration tests against QA..."

apt-get install libgtk2.0-0 libgtk-3-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

npm install
npm run integration-test:qa

echo "Finished running unit tests."
