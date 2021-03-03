defmodule LakotaEdApi.Repo.Migrations.CreateSitemap do
  use Ecto.Migration

  def change do
    create table(:sitemap) do
      add :title, :string
      add :content, :text

      timestamps()
    end

    alter table(:sitemap) do
      modify :content, :text
    end
  end
end
