defmodule LakotaEdApiWeb.SessionController do
  require Logger
  use LakotaEdApiWeb, :controller

  alias LakotaEdApi.Accounts.Auth

  action_fallback(LakotaEdApiWeb.FallbackController)

  def create(conn, params) do
    case Auth.find_user_and_check_password(params) do
      {:ok, user} ->
        {:ok, jwt, claims} =
          user
          |> LakotaEdApiWeb.Guardian.encode_and_sign(
               %{},
               ttl: {1, :hour}
               # Sessions last 1 hour until re-login is required
             )

        IO.inspect(claims)

        conn
        |> put_view(LakotaEdApiWeb.UserView)
        |> render("sign_in_success.json", %{email: user.email, jwt: jwt})

      {:error, _} ->
        conn
        |> put_view(LakotaEdApiWeb.UserView)
        |> render("login_error.json", %{message: "failed to find user"})
    end
  end

  def auth_error(conn, {_type, _reason}, _opts) do
    conn
    |> put_view(LakotaEdApiWeb.UserView)
    |> render("login_error.json", %{message: "failed to authenticate"})
  end

  def verify_session(conn, _params) do
    token = conn.body_params["token"]
    case LakotaEdApiWeb.Guardian.decode_and_verify(token) do
      {:ok, _} ->
        conn
        |> put_status(200)
        |> text("")
      {:error, _} ->
        conn
        |> put_status(401)
        |> text("Invalid Session Token")
    end
  end
end
