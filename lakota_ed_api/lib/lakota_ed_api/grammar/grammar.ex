defmodule LakotaEdApi.Grammar.Grammar do
  use Ecto.Schema
  import Ecto.Changeset

  schema "grammar" do
    field :grammar, :string

    timestamps()
  end

  @doc false
  def changeset(grammar, attrs) do
    grammar
    |> cast(attrs, [:grammar])
    |> validate_required([:grammar])
  end
end
