defmodule LakotaEdApi.Accounts do
  import Ecto.Query, warn: false
  alias LakotaEdApi.Repo

  alias LakotaEdApi.Accounts.User

  def list_users do
    Repo.all(User)
  end

  def get_user!(id), do: Repo.get!(User, id)

  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  def delete_user(%User{} = user) do
    Repo.delete(user)
  end
end
