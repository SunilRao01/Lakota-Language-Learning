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
}



cd dev-lakota-ed
npm install
npm run build

scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -rp build/ root@skeletonpraxis.net:/var/www/lakota.skeletonpraxis.net

rm ~/.ssh/id_rsa
