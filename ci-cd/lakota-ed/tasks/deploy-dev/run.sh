#!/usr/bin/env bash

set -e -u -x

{
    ssh-keygen -f ~/.ssh/id_rsa -b 4096 -t rsa -q -N ""

    rsa=${RSA_KEY}
    echo "$rsa" > ./rsa_key
    ssh-keygen -f ./rsa_key -y > ~/.ssh/id_rsa.pub
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
