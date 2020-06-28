#!/usr/bin/env bash

set -e -u -x

cd dev-lakota-ed

# This is where you can run your unit test command, such as the ones below:
echo "Running integration tests against QA..."

npm install cypress --save-dev
CYPRESS_BASE_URL=http://lakota.skeletonpraxis.net/ cypress run

echo "Finished running unit tests."
