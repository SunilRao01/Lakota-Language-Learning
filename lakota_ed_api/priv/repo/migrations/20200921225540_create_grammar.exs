defmodule LakotaEdApi.Repo.Migrations.CreateGrammar do
  use Ecto.Migration

  def change do
    create table(:grammar) do
      add :grammar, :string

      timestamps()
    end

  end
end
