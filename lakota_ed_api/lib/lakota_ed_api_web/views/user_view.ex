defmodule LakotaEdApiWeb.UserView do
  use LakotaEdApiWeb, :view

  def render("login_error.json", %{message: message}) do
    %{
      message: message
    }
  end

  def render("sign_in_success.json", %{email: email, jwt: jwt}) do
    %{
      message: "Login successful",
      email: email,
      jwt: jwt
    }
  end
end
