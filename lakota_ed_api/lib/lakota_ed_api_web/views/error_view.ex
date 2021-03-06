defmodule LakotaEdApiWeb.ErrorView do
  use LakotaEdApiWeb, :view

  def render("404.json", _assigns) do
    %{
      errors: %{
        detail: "Page not found"
      }
    }
  end

  def render("500.json", _assigns) do
    %{
      errors: %{
        detail: "Internal server error"
      }
    }
  end

  def render("query_error.json", %{message: message}) do
    %{
      message: message
    }
  end

  def render("invalid_uri_param.json", %{invalid_uri: invalid_uri}) do
    %{
      message: "\"#{invalid_uri}\": Invalid URI query string param detected."
    }
  end

  # If you want to customize a particular status code
  # for a certain format, you may uncomment below.
  # def render("500.json", _assigns) do
  #   %{errors: %{detail: "Internal Server Error"}}
  # end

  # By default, Phoenix returns the status message from
  # the template name. For example, "404.json" becomes
  # "Not Found".
  def template_not_found(template, _assigns) do
    %{
      errors: %{
        detail: Phoenix.Controller.status_message_from_template(template)
      }
    }
  end
end
