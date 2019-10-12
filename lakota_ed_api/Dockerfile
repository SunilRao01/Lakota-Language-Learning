# ./Dockerfile
FROM elixir:alpine

ARG BUILD_COMMIT_SHA
ENV BUILD_COMMIT_SHA ${BUILD_COMMIT_SHA:-}

# Default the PHXPORT variable to something reasonable
ENV PHXPORT 4000

RUN apk update && apk --no-cache --update add build-base bash dumb-init postgresql-client

# Create app directory and copy the Elixir projects into it
RUN mkdir /app
WORKDIR /app

RUN mix local.hex --force && mix local.rebar --force

COPY config/* config/
COPY mix.exs ./
RUN mix deps.get
RUN mix deps.compile

COPY . ./
RUN mix compile

CMD ["mix", "phx.server"]
