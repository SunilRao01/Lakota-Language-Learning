#!/usr/bin/env bash

set -e -u -x

{
  private_rsa_key=${PRIVATE_RSA_KEY}
  public_rsa_key=${PUBLIC_RSA_KEY}
  env_prod=${ENV_PROD}

  ssh-keygen -q -t rsa -N '' -f ~/.ssh/id_rsa 2>/dev/null <<< y >/dev/null
  echo "$private_rsa_key" > ~/.ssh/id_rsa
  echo "$public_rsa_key" > ~/.ssh/id_rsa.pub
}

cd prod-lakota-ed

touch .env.production
echo "$env_prod" > .env.production
npm install
npm run build

ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no srao_lakota-ed@ssh.phx.nearlyfreespeech.net "rm -rfv /home/public/*"
scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -r build/* srao_lakota-ed@ssh.phx.nearlyfreespeech.net:/home/public
