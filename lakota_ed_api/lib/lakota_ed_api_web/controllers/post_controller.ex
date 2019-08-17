defmodule LakotaEdApiWeb.PostController do
  use LakotaEdApiWeb, :controller
  alias LakotaEdApi.Repo
  alias LakotaEdApi.Post

  def show(conn, %{"id" => id}) do
    case Repo.get(Post, id) do
      nil -> text(conn, "Couldn't find post with id")
      post -> render(conn, "show.json", post: post)
    end
  end
end
