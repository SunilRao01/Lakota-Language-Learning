defmodule LakotaEdApi.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias LakotaEdApi.Accounts.User

  schema "users" do
    field :email, :string
    field :encrypted_password, :string

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:email])
    |> validate_required([:email])
    |> unique_constraint(:email)
  end
end
