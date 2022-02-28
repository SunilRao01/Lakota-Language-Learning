defmodule LakotaEdApi.MixProject do
  use Mix.Project

  def project do
    [
      app: :lakota_ed_api,
      version: "1.0.1",
      elixir: "~> 1.13.3",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: [:phoenix, :gettext] ++ Mix.compilers(),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {LakotaEdApi.Application, []},
      extra_applications: [:logger, :runtime_tools]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.5.13"},
      {:phoenix_pubsub, "~> 2.0"},
      {:phoenix_ecto, "~> 4.4.0"},
      {:ecto_sql, "~> 3.7"},
      {:postgrex, "~> 0.1"},
      {:gettext, "~> 0.1"},
      {:jason, "~> 1.3"},
      {:plug_cowboy, "~> 2.5"},
      {:guardian, "~> 2.2"},
      {:bcrypt_elixir, "~> 2.3"},
      {:cors_plug, "~> 2.0"}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.create --quiet", "ecto.migrate", "test"]
    ]
  end
end
