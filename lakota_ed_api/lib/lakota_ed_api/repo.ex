defmodule LakotaEdApi.Repo do
  use Ecto.Repo,
    otp_app: :lakota_ed_api,
    adapter: Ecto.Adapters.Postgres
end
