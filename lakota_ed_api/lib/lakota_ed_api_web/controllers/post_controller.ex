defmodule LakotaEdApiWeb.PostController do
  use LakotaEdApiWeb, :controller
  alias LakotaEdApi.Repo
  alias LakotaEdApi.Post

  def show(conn, _params) do
    case Repo.get(Post, 1) do
      nil -> text(conn, "Couldn't find post with id: 1")
      post -> render(conn, "show.json", post: post)
    end
  end
end
