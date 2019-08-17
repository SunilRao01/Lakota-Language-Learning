defmodule LakotaEdApiWeb.UserController do
  require Logger
  use LakotaEdApiWeb, :controller

  alias LakotaEdApi.Repo


  def index(conn, %{"email" => email, "password" => password}) do
    case Repo.get_by(LakotaEdApi.Accounts.User, email: email) do
      nil -> render(conn, "login_error.json", email: email) # User does not exist
      user -> authenticate_user(conn, password, user)
    end
  end

  def authenticate_user(conn, inputPassword, realUser = %LakotaEdApi.Accounts.User{}) do
    case Bcrypt.verify_pass(inputPassword, realUser.encrypted_password) do
      false -> render(conn, "login_error.json", email: realUser.email) # Incorrect password for associated e-mail
      true -> render(conn, "login_success.json", email: realUser.email)
    end
  end
end

