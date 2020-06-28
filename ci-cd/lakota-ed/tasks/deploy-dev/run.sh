#!/usr/bin/env bash

set -e -u -x

{
    mkdir ~/.ssh
    touch ~/.ssh/id_rsa

    chmod 700 ~/.ssh
    chmod 600 ~/.ssh/id_rsa

    rsa=${RSA_KEY}
    echo "$rsa" > ~/.ssh/id_rsa


    ssh-keygen -q -b 4096 -t rsa -N '' -f ~/.ssh/id_rsa 2>/dev/null <<< y >/dev/null

    ssh-keyscan -H skeletonpraxis.net >> ~/.ssh/known_hosts
    ssh-keyscan -H 134.122.124.158 >> ~/.ssh/known_hosts
}

cd dev-lakota-ed
#npm install
#npm run build

scp -rp public/ root@skeletonpraxis.net:/var/www/lakota.skeletonpraxis.net

rm ~/.ssh/id_rsa
