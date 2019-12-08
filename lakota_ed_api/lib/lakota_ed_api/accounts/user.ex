defmodule LakotaEdApi.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias LakotaEdApi.Accounts.User

  schema "users" do
    field :email, :string
    field :password, :string

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:email, :password])
    |> validate_required([:email, :password])
    |> unique_constraint(:email)
  end
end
