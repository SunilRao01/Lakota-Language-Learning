use Mix.Config


# Configure your database
config :lakota_ed_api,
       LakotaEdApi.Repo,
       pool_size: 18,
       ssl: true,
       url: System.get_env("DATABASE_URL")

config :lakota_ed_api,
       LakotaEdApiWeb.Endpoint,
       url: [
         scheme: "https",
         host: "sleepy-sierra-08774",
         port: 443
       ],
       http: [port: {:system, "PORT"}],
       force_ssl: [
         rewrite_on: [:x_forwarded_proto]
       ],
       cache_static_manifest: "priv/static/cache_manifest.json",
       secret_key_base: System.get_env("SECRET_KEY_BASE")

# Do not print debug messages in production
config :logger, level: :info

config :lakota_ed_api,
       LakotaEdApiWeb.Guardian,
       issuer: "LakotaEdApi",
       secret_key: System.get_env("GUARDIAN_KEY"),
       ttl: {30, :days},
       allowed_drift: 2000,
       verify_issuer: true


# Initialize plugs at runtime for faster development compilation
config :phoenix, :plug_init_mode, :runtime

config :cors_plug,
       origin: ["https://lakotalanguagelearning.com"]

# Configure bcrypt for passwords
config :comeonin, :bcrypt_log_rounds, 4
