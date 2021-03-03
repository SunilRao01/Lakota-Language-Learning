defmodule LakotaEdApiWeb.SitemapController do
  require Logger

  use LakotaEdApiWeb, :controller
  use LakotaEdApiWeb.GuardedController
  alias LakotaEdApi.Repo
  alias LakotaEdApi.Sitemap

  action_fallback(LakotaEdApiWeb.FallbackController)

  plug Guardian.Plug.EnsureAuthenticated when action in [:create]
  plug Guardian.Plug.VerifySession when action in [:create]
  plug Guardian.Plug.VerifyHeader when action in [:create]

  # retrieves single record, throws a phoenix error when more than 1
  # record is found
  def show(conn, _, _) do
    sitemap = Repo.one(Sitemap)

    case Repo.one(Sitemap) do
      _ ->
        conn
        |> put_view(LakotaEdApiWeb.SitemapView)
        |> render("show.json", sitemap: sitemap)
    end
  end

  def create(conn, %{"sitemap" => sitemap_params}, _) do
    case Repo.insert(
           %Sitemap{
             title: sitemap_params["title"],
             content: sitemap_params["content"]
           }
         ) do
      {:ok, newSitemap} ->
        text(conn, "Created sitemap with id #{newSitemap.id}")
      {:error, _} ->
        conn
        |> put_status(500)
    end
  end

  def update(conn, %{"sitemap" => sitemap_params}, _) do
    newSitemap = Repo.one(Sitemap)

    newSitemap = Ecto.Changeset.change newSitemap,
                                       title: sitemap_params["title"],
                                       content: sitemap_params["content"]

    case Repo.update(newSitemap) do
      {:ok, updateResponse} ->
        text(conn, "Updated sitemap: #{updateResponse.id}")
      {:error, changeset} ->
        conn
        |> put_view(LakotaEdApiWeb.SitemapView)
        |> render("update_error.json", "Changeset: #{changeset}")
    end


  end

  def delete(conn, %{"id" => id}, _) do
    case Repo.get(Sitemap, id) do
      nil ->
        conn
        |> put_status(500)
      sitemap ->
        {:ok, sitemap} = Repo.delete(sitemap)

        conn
        |> text("Deleted sitemap with id: #{sitemap.id}")
    end
  end
end