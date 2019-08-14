#!/usr/bin/env bash

set -e -u -x

cd dev-lakota-ed

# This is where you can run your unit test command, such as the ones below:
echo "Running unit tests..."

npm install
npm test

echo "Finished running unit tests."
