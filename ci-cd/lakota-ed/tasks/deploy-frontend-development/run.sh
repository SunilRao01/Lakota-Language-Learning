#!/usr/bin/env bash

set -e -u -x

{
  private_rsa_key=${PRIVATE_RSA_KEY}
  public_rsa_key=${PUBLIC_RSA_KEY}
  env_staging=${ENV_STAGING}

  ssh-keygen -q -t rsa -N '' -f ~/.ssh/id_rsa 2>/dev/null <<< y >/dev/null
  echo "$private_rsa_key" > ~/.ssh/id_rsa
  echo "$public_rsa_key" > ~/.ssh/id_rsa.pub

  touch /root/.ssh/known_hosts
  chmod 644 ~/.ssh/known_hosts

  ssh-keyscan -H skeletonpraxis.net >> /root/.ssh/known_hosts
}

cd dev-lakota-ed

touch .env.staging
echo "$env_staging" > .env.staging
npm install
npm run build:staging

ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no root@skeletonpraxis.net "rm -rfv /var/www/lakota.skeletonpraxis.net/*"
scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -r build/* root@skeletonpraxis.net:/var/www/lakota.skeletonpraxis.net
