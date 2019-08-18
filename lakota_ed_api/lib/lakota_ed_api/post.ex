defmodule LakotaEdApi.Post do
  use Ecto.Schema
  import Ecto.Changeset
  alias LakotaEdApi.Post

  schema "posts" do
    field :postTitle, :string
    field :postContent, :string
    field :categories, {:array, :string}
    field :tags, {:array, :string}
    field :quizzes, {:array, :map}

    timestamps()
  end

  @doc false
  def changeset(%Post{} = post, attrs) do
    post
    |> cast(attrs, [:postTitle, :postContent, :categories, :tags, :quizzes])
    |> validate_required([:postTitle, :postContent, :categories, :tags])
  end
end
