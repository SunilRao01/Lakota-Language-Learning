defmodule LakotaEdApi.Repo.Migrations.CreatePodcasts do
  use Ecto.Migration

  def change do
    create table(:podcasts) do
      add :podcast, :string

      timestamps()
    end

  end
end
