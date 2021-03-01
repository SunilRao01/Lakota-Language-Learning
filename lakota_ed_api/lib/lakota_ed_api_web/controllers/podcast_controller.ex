defmodule LakotaEdApiWeb.PodcastController do
  use LakotaEdApiWeb, :controller

  alias LakotaEdApi.Podcasts
  alias LakotaEdApi.Podcasts.Podcast

  action_fallback LakotaEdApiWeb.FallbackController

  plug Guardian.Plug.EnsureAuthenticated when action in [:create, :delete, :update]
  plug Guardian.Plug.VerifySession when action in [:create, :delete, :update]
  plug Guardian.Plug.VerifyHeader when action in [:create, :delete, :update]

  def index(conn, _params) do
    podcasts = Podcasts.list_podcasts()
    render(conn, "index.json", podcasts: podcasts)
  end

  def create(conn, %{"podcast" => podcast_params}) do
    with {:ok, %Podcast{} = podcast} <- Podcasts.create_podcast(podcast_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.podcast_path(conn, :show, podcast))
      |> render("show.json", podcast: podcast)
    end
  end

  def show(conn, %{"id" => id}) do
    podcast = Podcasts.get_podcast!(id)
    render(conn, "show.json", podcast: podcast)
  end

  def update(conn, %{"id" => id, "podcast" => podcast_params}) do
    podcast = Podcasts.get_podcast!(id)

    with {:ok, %Podcast{} = podcast} <- Podcasts.update_podcast(podcast, podcast_params) do
      render(conn, "show.json", podcast: podcast)
    end
  end

  def delete(conn, %{"id" => id}) do
    podcast = Podcasts.get_podcast!(id)

    with {:ok, %Podcast{}} <- Podcasts.delete_podcast(podcast) do
      send_resp(conn, :no_content, "")
    end
  end
end
