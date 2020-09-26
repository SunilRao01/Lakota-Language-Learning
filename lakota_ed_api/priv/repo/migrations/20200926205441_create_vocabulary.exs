defmodule LakotaEdApi.Repo.Migrations.CreateVocabulary do
  use Ecto.Migration

  def change do
    create table(:vocabulary) do
      add :vocab, :string

      timestamps()
    end

  end
end
