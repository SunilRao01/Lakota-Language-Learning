#!/usr/bin/env bash

set -e -u -x

#{
#  mkdir -p /root/.ssh
#  chmod 0700 ~/.ssh
#
#  ln -s /run/secrets/private_rsa_key ~/.ssh/id_rsa
#  ln -s /run/secrets/public_rsa_key ~/.ssh/id_rsa.pub

<<<<<<< HEAD
#  cat ~/.ssh/id_rsa
#  cat ~/.ssh/id_rsa.pub
=======
  echo ~/.ssh/id_rsa
  echo ~/.ssh/id_rsa.pub
>>>>>>> parent of 4ef1054... sym link.... solved all the problems
#
#  touch /root/.ssh/known_hosts
#  chmod 644 ~/.ssh/known_hosts
#
#  ssh-keyscan -H skeletonpraxis.net >> /root/.ssh/known_hosts
#  ssh-keyscan -H 134.122.124.158 >> /root/.ssh/known_hosts
#}

cd dev-lakota-ed
#npm install
#npm run build

scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -rp public/ root@skeletonpraxis.net:/var/www/lakota.skeletonpraxis.net

rm ~/.ssh/id_ed25519
