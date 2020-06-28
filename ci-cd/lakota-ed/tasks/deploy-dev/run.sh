#!/usr/bin/env bash

set -e -u -x

{
  mkdir -p /root/.ssh
  chmod 0700 ~/.ssh
#
  ln -s /run/secrets/private_rsa_key /root/.ssh/id_rsa
  ln -s /run/secrets/public_rsa_key /root/.ssh/id_rsa.pub

#  cat ~/.ssh/id_rsa
#  cat ~/.ssh/id_rsa.pub
#
  touch /root/.ssh/known_hosts
  chmod 644 ~/.ssh/known_hosts
  chmod 600 ~/.ssh/id_rsa
  chmod 644 ~/.ssh/id_rsa.pub
#
  ssh-keyscan -H skeletonpraxis.net >> /root/.ssh/known_hosts
#  ssh-keyscan -H 134.122.124.158 >> /root/.ssh/known_hosts

#  cat /run/secrets/private_rsa_key
#  cat /run/secrets/public_rsa_key
}
ls -la ~/.ssh
cd dev-lakota-ed
#npm install
#npm run build

#sftp root@skeletonpraxis.net
scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -rp public/ root@skeletonpraxis.net:/var/www/lakota.skeletonpraxis.net

rm ~/.ssh/id_ed25519
