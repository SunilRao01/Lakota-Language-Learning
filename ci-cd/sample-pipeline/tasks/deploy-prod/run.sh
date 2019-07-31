#!/usr/bin/env bash

set -e -u -x

{
    rsa=${RSA_KEY}
    ssh-keygen -t rsa -N "" -f rsa.key
    echo "$rsa" > ./rsa.key
    mkdir /root/.ssh
    cp ./rsa.key ~/.ssh/id_rsa
    rm rsa.key
    rm rsa.key.pub
} &> /dev/null

cd prod-lakota-ed
npm install
npm build

cp -r ./build  /var/www/html

rm ~/.ssh/id_rsa
