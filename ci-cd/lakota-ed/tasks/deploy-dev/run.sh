#!/usr/bin/env bash

set -e -u -x

{
  mkdir /root/.ssh

  rsa_public=${PUBLIC_RSA_KEY}
  rsa_private=${PRIVATE_RSA_KEY}

  echo "$rsa_private" > ~/.ssh/id_rsa
  echo "$rsa_public" > ~/.ssh/id_rsa.pub

  chmod 700 ~/.ssh
  chmod 600 ~/.ssh/id_rsa
  chmod 644 ~/.ssh/id_rsa.pub

  ls ~/.ssh

  touch ~/.ssh/known_hosts
  chmod 644 ~/.ssh/known_hosts

  ssh-keyscan -H skeletonpraxis.net >> ~/.ssh/known_hosts
  ssh-keyscan -H 134.122.124.158 >> ~/.ssh/known_hosts
}

cd dev-lakota-ed
#npm install
#npm run build

scp -r public/* root@skeletonpraxis.net:/var/www/lakota.skeletonpraxis.net

rm ~/.ssh/id_rsa
