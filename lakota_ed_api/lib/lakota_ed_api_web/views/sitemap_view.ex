defmodule LakotaEdApiWeb.SitemapView do
  require Logger

  use LakotaEdApiWeb, :view
  alias LakotaEdApiWeb.SitemapView

  def render("show.json", %{sitemap: sitemap}) do
    Logger.info inspect(sitemap)

    %{data: %{
      title: sitemap.title,
      content: sitemap.content
    }}
  end

  def render("update_error.json", %{message: message}) do
    %{
      message: message
    }
  end
end
