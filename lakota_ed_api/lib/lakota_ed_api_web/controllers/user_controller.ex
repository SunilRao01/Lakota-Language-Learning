defmodule LakotaEdApiWeb.UserController do
  require Logger
  use LakotaEdApiWeb, :controller

  alias LakotaEdApi.Repo


  def index(conn, %{"email" => email, "password" => password}) do
    case Repo.get_by(LakotaEdApi.Accounts.User, email: email) do
      nil -> send_resp(conn, 404, "User with that e-mail not found.")
      user -> authenticate_user(conn, password, user)
    end
  end

  def authenticate_user(conn, inputPassword, realUser = %LakotaEdApi.Accounts.User{}) do
    case Bcrypt.verify_pass(inputPassword, realUser.encrypted_password) do
      false -> send_resp(conn, 401, "Incorrect password for e-mail.")
      true -> send_resp(conn, 200, "Successfully logged in.")
    end
  end
end

