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

#cd dev-lakota-ed

ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no root@skeletonpraxis.net << EOF
  cd /root/src/Lakota-Language-Learning/
  git pull origin development
  cd lakota_ed_api
  docker-compose down
  docker-compose build
  docker-compose up -d
EOF
