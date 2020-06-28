#!/usr/bin/env bash

set -e -u -x

{
    ssh-keygen -f ~/.ssh/id_rsa -t rsa -N ''
#    ssh-keygen -f ~/.ssh/id_rsa_private -t rsa -N ''

    rsa=${RSA_KEY}
    echo "$rsa" > ~/.ssh/id_rsa_private

    touch ~/.ssh/config
    echo "Host *\n  AddKeysToAgent yes\n  UseKeychain yes\n  IdentityFile ~/.ssh/id_rsa_private\n" > ~/.ssh/config

    ls ~/.ssh
    cat ~/.ssh/config

    ssh-keygen -f ~/.ssh/id_rsa_private -t rsa -N ''

    ls ~/.ssh
#    echo
#
#    ssh-keygen -t rsa -N "" -f rsa.key
#    echo "$rsa" > ./rsa.key
#    mkdir /root/.ssh
#    cp ./rsa.key ~/.ssh/id_rsa
#    rm rsa.key
#    rm rsa.key.pub
#
#    touch ~/.ssh/id_rsa.pub
#    chmod 644 ~/.ssh/id_rsa.pub
#
#    ssh-keygen -f ~/.ssh/id_rsa -t rsa -N ''

    ssh-keyscan -H skeletonpraxis.net >> ~/.ssh/known_hosts
    ssh-keyscan -H 134.122.124.158 >> ~/.ssh/known_hosts
}

cd dev-lakota-ed
#npm install
#npm run build

scp -rp public/ root@skeletonpraxis.net:/var/www/lakota.skeletonpraxis.net

rm ~/.ssh/id_rsa
