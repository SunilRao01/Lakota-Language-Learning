defmodule LakotaEdApi.Lessons.Lesson do
  use Ecto.Schema
  import Ecto.Changeset
  alias LakotaEdApi.Lessons.Lesson

  schema "lessons" do
    field :lesson, :string

    timestamps()
  end

  @doc false
  def changeset(%Lesson{} = lesson, attrs) do
    lesson
    |> cast(attrs, [:lesson])
    |> validate_required([:lesson])
  end
end
