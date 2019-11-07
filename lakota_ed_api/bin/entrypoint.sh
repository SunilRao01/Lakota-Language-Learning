#!/bin/bash
set -e

export APP=lakota_ed_api
export FLAVOR=${FLAVOR:-localdev}

# Elixir knows what configuration to use based on MIX_ENV, which directly relates to config/${MIX_ENV}.exs
# We need to map those to the idea of "FLAVOR" in chamber and our various environments
if [[ -z "${MIX_ENV}" ]] ; then
  # If MIX_ENV is not set, we will set it based on FLAVOR
  if [[ ${FLAVOR} =~ (dev|localdev|unlimited) ]]; then
    export MIX_ENV=dev
  elif [[ ${FLAVOR} =~ (test|cicd) ]] ; then
    export MIX_ENV=test
  else
    # We default to prod, but all prod things need to trust the environment for configuration
    # Ideally, the various MIX_ENVs will only set things like logging verbosity and behavior flags.
    export MIX_ENV=prod
  fi
fi

echo "Starting APP=${APP} with MIX_ENV=${MIX_ENV} and FLAVOR=${FLAVOR}"

# short-circuit logic if a shell command is passed in
if [[ $1 =~ ^(/bin/)?(ba)?sh$ ]]; then
  echo "* First CMD argument is a shell: $1"
  echo "* Running: exec ${@@Q}"
  exec "$@"
elif [[ "$*" =~ ([;<>]|\(|\)|\&\&|\|\|) ]]; then
  echo "* Shell metacharacters detected, passing CMD to bash"
  _quoted="$*"
  echo "* Running: exec /bin/bash -c ${_quoted@Q}"
  unset _quoted
  exec /bin/bash -c "$*"
fi

# Use dumb-init to ensure proper handling of signals, zombies, etc.
# See https://github.com/Yelp/dumb-init
echo "Running command: /usr/local/bin/dumb-init ${@@Q}"
exec /usr/bin/dumb-init "$@"
