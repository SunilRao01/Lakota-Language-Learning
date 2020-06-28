# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :lakota_ed_api,
  ecto_repos: [LakotaEdApi.Repo]

# Configures the endpoint
config :lakota_ed_api, LakotaEdApiWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "JEshUOjGYI2IuTJmFjGQzftRba7y8BgjaeGzzvqiuJjhTIvNGm/9Zd4VUlRHTfoJ",
  render_errors: [view: LakotaEdApiWeb.ErrorView, accepts: ~w(json)],
  pubsub_server: LakotaEdApi.PubSub

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
