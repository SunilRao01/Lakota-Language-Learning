defmodule LakotaEdApi.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add :postTitle, :string
      add :postContent, :string
      add :categories, {:array, :string}
      add :tags, {:array, :string}
      add :quizzes, :map

      timestamps()
    end
  end
end
