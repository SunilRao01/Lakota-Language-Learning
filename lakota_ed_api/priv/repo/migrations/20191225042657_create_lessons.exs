defmodule LakotaEdApi.Repo.Migrations.CreateLessons do
  use Ecto.Migration

  def change do
    create table(:lessons) do
      add :lesson, :string

      timestamps()
    end

  end
end
