defmodule LakotaEdApiWeb.PodcastView do
  use LakotaEdApiWeb, :view
  alias LakotaEdApiWeb.PodcastView

  def render("index.json", %{podcasts: podcasts}) do
    %{data: render_many(podcasts, PodcastView, "podcast.json")}
  end

  def render("show.json", %{podcast: podcast}) do
    %{data: render_one(podcast, PodcastView, "podcast.json")}
  end

  def render("podcast.json", %{podcast: podcast}) do
    %{id: podcast.id,
      podcast: podcast.podcast}
  end
end
