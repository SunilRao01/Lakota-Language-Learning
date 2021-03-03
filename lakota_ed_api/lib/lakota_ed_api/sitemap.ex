defmodule LakotaEdApi.Sitemap do
  use Ecto.Schema
  import Ecto.Changeset
  alias LakotaEdApi.Sitemap

  schema "sitemap" do
    field :title, :string
    field :content, :string

    timestamps()
  end

  @doc false
  def changeset(%Sitemap{} = sitemap, attrs) do
    sitemap
    |> cast(attrs, [:title, :content])
    |> validate_required([:title, :content])
  end
end
