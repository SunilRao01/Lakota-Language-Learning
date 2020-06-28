#!/usr/bin/env bash

set -e -u -x

{
    rsa=${RSA_KEY}
    echo "$rsa" > ./rsa_key
    chmod 600 ./rsa_key

    ssh-keygen -l -f ./rsa_key
    ssh-keygen -y -f ./rsa_key -b 4096 -t rsa -q -N "" > ./rsa_key.pub
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
