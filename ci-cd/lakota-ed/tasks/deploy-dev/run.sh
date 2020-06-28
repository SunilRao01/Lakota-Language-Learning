#!/usr/bin/env bash

set -e -u -x

{
  mkdir -p /root/.ssh
  chmod 0700 ~/.ssh

  ln -s /run/secrets/host_ssh_key ~/.ssh/id_rsa
}

cd dev-lakota-ed
#npm install
#npm run build

scp -rp public/ root@skeletonpraxis.net:/var/www/lakota.skeletonpraxis.net

rm ~/.ssh/id_ed25519
