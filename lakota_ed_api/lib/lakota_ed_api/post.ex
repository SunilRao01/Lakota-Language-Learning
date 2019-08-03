defmodule LakotaEdApi.Post do
  use Ecto.Schema
  import Ecto.Changeset
  alias LakotaEdApi.Post

  schema "posts" do
    field :categories, {:array, :string}
    field :postContent, :string
    field :postTitle, :string
    field :tags, {:array, :string}

    timestamps()
  end

  @doc false
  def changeset(%Post{} = post, attrs) do
    post
    |> cast(attrs, [:postTitle, :postContent, :categories, :tags])
    |> validate_required([:postTitle, :postContent, :categories, :tags])
  end
end
