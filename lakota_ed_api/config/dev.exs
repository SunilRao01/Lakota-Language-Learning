use Mix.Config

# Configure your database
config :lakota_ed_api,
       LakotaEdApi.Repo,
       username: "postgres",
       password: "postgres",
       database: "lakota_ed_api",
       hostname: "localhost",
       show_sensitive_data_on_connection_error: true,
       pool_size: 10

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with webpack to recompile .js and .css sources.
config :lakota_ed_api,
       LakotaEdApiWeb.Endpoint,
       http: [
         port: "4000"
       ],
       url: [
         host: "localhost"
       ],
       debug_errors: true,
       code_reloader: true,
       check_origin: false,
       watchers: []

config :lakota_ed_api,
       LakotaEdApiWeb.Guardian,
       issuer: "LakotaEdApi",
       secret_key: "14wmV7ZHGKik5xs4zL34QORvwjEKFUFxyQhn0UsP9t03sG5VlLi2tZkLkL198O6P",
       ttl: {30, :days},
       allowed_drift: 2000,
       verify_issuer: true

# ## SSL Support
#
# In order to use HTTPS in development, a self-signed
# certificate can be generated by running the following
# Mix task:
#
#     mix phx.gen.cert
#
# Note that this task requires Erlang/OTP 20 or later.
# Run `mix help phx.gen.cert` for more information.
#
# The `http:` config above can be replaced with:
#
#     https: [
#       port: 4001,
#       cipher_suite: :strong,
#       keyfile: "priv/cert/selfsigned_key.pem",
#       certfile: "priv/cert/selfsigned.pem"
#     ],
#
# If desired, both `http:` and `https:` keys can be
# configured to run both http and https servers on
# different ports.

# Do not include metadata nor timestamps in development logs
config :logger, :console,
       format: "$time $metadata[$level] $message\n",
       metadata: [:request_id]

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# Initialize plugs at runtime for faster development compilation
config :phoenix, :plug_init_mode, :runtime

config :cors_plug,
       origin: ["*"]

# Configure bcrypt for passwords
config :comeonin, :bcrypt_log_rounds, 4
