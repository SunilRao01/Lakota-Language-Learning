import Config

# Configure your database
config :lakota_ed_api, LakotaEdApi.Repo,
  username: "postgres",
  password: "postgres",
  database: "lakota_ed_api_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :lakota_ed_api, LakotaEdApiWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn
