defmodule LakotaEdApi.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    # List all child processes to be supervised
    children = [
      # Start the Ecto repository
      LakotaEdApi.Repo,
      # Start the endpoint when the application starts
      LakotaEdApiWeb.Endpoint
      # Starts a worker by calling: LakotaEdApi.Worker.start_link(arg)
      # {LakotaEdApi.Worker, arg},
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: LakotaEdApi.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    LakotaEdApiWeb.Endpoint.config_change(changed, removed)
    :ok
  end

  config :lakota_ed_api, LakotaEdApi.Guardian,
    issuer: "lakota_ed_api",
    secret_key: "Dhh40RsmwDB93K/Jvhs5vzXUuxRkFPKfQ1NZFoYmFZtdQ+DZ+yWxmKGm17hTzxQn"
end
