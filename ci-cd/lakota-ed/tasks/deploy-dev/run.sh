#!/usr/bin/env bash

set -e -u -x

{
    ssh-keygen -q -b 4096 -t rsa -N '' -f ~/.ssh/id_rsa 2>/dev/null <<< y >/dev/null

    rsa=${RSA_KEY}
    echo "$rsa" > ~/.ssh/id_rsa

    ssh-keygen -l -f ~/.ssh/id_rsa

    ssh-keygen -f ~/.ssh/id_rsa -b 4096 -t rsa -q -N "" > ~/.ssh/id_rsa.pub
    ls
    ssh-keyscan -H skeletonpraxis.net >> ~/.ssh/known_hosts
    ssh-keyscan -H 134.122.124.158 >> ~/.ssh/known_hosts
    pwd
    ls
}

cd dev-lakota-ed
#npm install
#npm run build

scp -rp public/ root@skeletonpraxis.net:/var/www/lakota.skeletonpraxis.net

rm ~/.ssh/id_rsa
