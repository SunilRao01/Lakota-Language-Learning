#!/usr/bin/env bash

set -e -u -x

{
    rsa=${RSA_KEY}
    ssh-keygen -t rsa -N "" -f rsa.key
    echo "$rsa" > ./rsa.key
    mkdir /root/.ssh
    cp ./rsa.key ~/.ssh/id_ed25519
    rm rsa.key
    rm rsa.key.pub
} &> /dev/null

cd dev-lakota-ed
npm install
npm run build

scp -r build/* root@167.71.81.111:/var/www/html

rm ~/.ssh/id_rsa