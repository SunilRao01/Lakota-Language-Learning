defmodule LakotaEdApiWeb.UserController do
  use LakotaEdApiWeb, :controller

  alias LakotaEdApi.Repo

  def index(conn, %{"email" => email, "password" => password}) do
    case Repo.get_by(LakotaEdApi.Accounts.User, email: email) do
      nil -> render(conn, "login_error.json", email: email)
      user -> authenticate_user(conn, user)
    end
  end

  def authenticate_user(conn, user = %LakotaEdApi.Accounts.User{}) do
    render(conn, "login_success.json", email: user.email)
  end
end
