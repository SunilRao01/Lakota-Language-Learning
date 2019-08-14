defmodule LakotaEdApiWeb.UserView do
  use LakotaEdApiWeb, :view
  alias LakotaEdApiWeb.UserView

  def render("login_success.json", %{email: email}) do
    %{message: "Login successful",
      email: email}
  end

  def render("login_error.json", %{email: email}) do
    %{message: "No login for email",
      email: email}
  end
end
