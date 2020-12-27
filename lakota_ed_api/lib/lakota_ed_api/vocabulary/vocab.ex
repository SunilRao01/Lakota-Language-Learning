defmodule LakotaEdApi.Vocabulary.Vocab do
  use Ecto.Schema
  import Ecto.Changeset
  alias LakotaEdApi.Vocabulary.Vocab

  schema "vocabulary" do
    field :vocab, :string

    timestamps()
  end

  @doc false
  def changeset(%Vocab{} = vocab, attrs) do
    vocab
    |> cast(attrs, [:vocab])
    |> validate_required([:vocab])
  end
end
