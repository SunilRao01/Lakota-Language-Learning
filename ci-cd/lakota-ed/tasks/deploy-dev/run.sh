#!/usr/bin/env bash

set -e -u -x

{
  private_rsa_key=${PRIVATE_RSA_KEY}
  public_rsa_key=${PUBLIC_RSA_KEY}

  ssh-keygen -q -t rsa -N '' -f ~/.ssh/id_rsa 2>/dev/null <<< y >/dev/null
  echo "$private_rsa_key" > ~/.ssh/id_rsa
  echo "$public_rsa_key" > ~/.ssh/id_rsa.pub

  touch /root/.ssh/known_hosts
  chmod 644 ~/.ssh/known_hosts

  ssh-keyscan -H skeletonpraxis.net >> /root/.ssh/known_hosts
}

apt-get install libgtk2.0-0 libgtk-3-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

cd dev-lakota-ed
npm install
npm run build

ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no root@skeletonpraxis.net "rm -rfv /var/www/lakota.skeletonpraxis.net/*"
scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -rp build/ root@skeletonpraxis.net:/var/www/lakota.skeletonpraxis.net
