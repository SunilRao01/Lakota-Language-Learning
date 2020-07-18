#!/usr/bin/env bash

set -e -u -x

cd prod-lakota-ed

pwd
ls -la

# This is where you can run your unit test command, such as the ones below:
echo "Running integration tests against production..."

npm install
npm install cypress

npm run integration-test:prod

echo "Finished running unit tests."
