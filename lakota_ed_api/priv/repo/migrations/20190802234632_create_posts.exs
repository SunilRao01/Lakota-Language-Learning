defmodule LakotaEdApi.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add :postTitle, :string
      add :postContent, :text
      add :categories, {:array, :string}
      add :tags, {:array, :string}
      add :quizzes, :map
      add :podcastLink, :string

      timestamps()
    end

    alter table(:posts) do
      modify :postContent, :text
      modify :podcastLink, :text
    end
  end
end
