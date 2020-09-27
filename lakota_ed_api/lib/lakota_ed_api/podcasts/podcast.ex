defmodule LakotaEdApi.Podcasts.Podcast do
  use Ecto.Schema
  import Ecto.Changeset

  schema "podcasts" do
    field :podcast, :string

    timestamps()
  end

  @doc false
  def changeset(post, attrs) do
    post
    |> cast(attrs, [:podcast])
    |> validate_required([:podcast])
  end
end
