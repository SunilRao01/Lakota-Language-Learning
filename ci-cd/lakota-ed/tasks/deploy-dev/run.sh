#!/usr/bin/env bash

set -e -u -x

{
  mkdir -p /root/.ssh
  chmod 0700 ~/.ssh

  rsa_public=${PUBLIC_RSA_KEY}
  rsa_private=${PRIVATE_RSA_KEY}

  echo "$rsa_private" >> /root/.ssh/id_rsa
  echo "$rsa_public" >> /root/.ssh/id_rsa.pub


  chmod 600 ~/.ssh/id_rsa
  chmod 600 ~/.ssh/id_rsa.pub

  ls ~/.ssh

  touch /root/.ssh/known_hosts
  chmod 644 ~/.ssh/known_hosts
#
  ssh-keyscan -H skeletonpraxis.net >> /root/.ssh/known_hosts
  ssh-keyscan -H 134.122.124.158 >> /root/.ssh/known_hosts
#
#  cat ~/.ssh/known_hosts
}

cd dev-lakota-ed
#npm install
#npm run build

scp -rp public/ root@skeletonpraxis.net:/var/www/lakota.skeletonpraxis.net


rm ~/.ssh/id_rsa
