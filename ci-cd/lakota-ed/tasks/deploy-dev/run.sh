#!/usr/bin/env bash

set -e -u -x

{
  private_rsa_key=${PRIVATE_RSA_KEY}
  public_rsa_key=${PUBLIC_RSA_KEY}

  ssh-keygen -q -t rsa -N '' -f ~/.ssh/id_rsa 2>/dev/null <<< y >/dev/null
  echo "$private_rsa_key" > ~/.ssh/id_rsa
  echo "$public_rsa_key" > ~/.ssh/id_rsa.pub
#  mkdir -p /root/.ssh
#  chmod 0700 ~/.ssh
#
#  chmod 600 /run/secrets/private_rsa_key
#  chmod 644 /run/secrets/public_rsa_key
#
#  ln -s /run/secrets/private_rsa_key /root/.ssh/id_rsa
#  ln -s /run/secrets/public_rsa_key /root/.ssh/id_rsa.pub

#  cat ~/.ssh/id_rsa
#  cat ~/.ssh/id_rsa.pub
#
  touch /root/.ssh/known_hosts
  chmod 644 ~/.ssh/known_hosts

#
  ssh-keyscan -H skeletonpraxis.net >> /root/.ssh/known_hosts
#  ssh-keyscan -H 134.122.124.158 >> /root/.ssh/known_hosts

#  cat /run/secrets/private_rsa_key
#  cat /run/secrets/public_rsa_key
}
#ls -la ./
printenv
ls -la ~/.ssh
cd dev-lakota-ed
#npm install
#npm run build

#sftp root@skeletonpraxis.net
scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -rp public/ root@skeletonpraxis.net:/var/www/lakota.skeletonpraxis.net

rm ~/.ssh/id_ed25519
