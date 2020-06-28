#!/usr/bin/env bash

set -e -u -x

{
    rsa=${RSA_KEY}
    mkdir /root/.ssh
    echo "$rsa" > ~/.ssh/id_rsa
    ssh-keygen -y -f ~/.ssh/id_rsa -t rsa -N ""
    ssh-keyscan -H skeletonpraxis.net >> ~/.ssh/known_hosts
    ssh-keyscan -H 134.122.124.158 >> ~/.ssh/known_hosts
}

cd dev-lakota-ed
#npm install
#npm run build

scp -rp public/ root@skeletonpraxis.net:/var/www/lakota.skeletonpraxis.net

rm ~/.ssh/id_rsa
