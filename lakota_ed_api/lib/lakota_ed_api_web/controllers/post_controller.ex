defmodule LakotaEdApiWeb.PostController do
  require Logger

  use LakotaEdApiWeb, :controller
  use LakotaEdApiWeb.GuardedController

  alias LakotaEdApi.Repo
  alias LakotaEdApi.Post

  action_fallback(LakotaEdApiWeb.FallbackController)

  plug(Guardian.Plug.EnsureAuthenticated when action in [:create, :show])

  def show(conn, %{"id" => id}, _) do
    case Repo.get(Post, id) do
      nil ->
        conn
        |> text("Couldn't find post with id")
      post ->
        conn
        |> put_view(LakotaEdApiWeb.PostView)
        |> render("show.json", post: post)
    end
  end

  def create(
        conn,
        %{"categories" => cats, "postContent" => postContent, "postTItle" => postTitle, "tags" => tags},
        _
      ) do
    case Repo.insert(%Post{categories: cats, postContent: postContent, postTitle: postTitle, tags: tags}) do
      {:ok, newPost} -> text(conn, "Created post with id #{newPost.id}")
      {:error, _} -> text(conn, "Error creating post")
    end
  end

  def update(conn, %{"id" => id}, _) do
    bodyParams = conn.body_params
    newPost = Repo.get(Post, id)

    newPost = Ecto.Changeset.change newPost,
      postTitle: bodyParams["postTitle"],
      postContent: bodyParams["postContent"],
      categories: bodyParams["categories"],
      tags: bodyParams["tags"]

    case Repo.update(newPost) do
      {:ok, postResponse} -> text(conn, "Updated post: #{postResponse.id}")
      {:error, changeset} -> conn
                             |> put_view(LakotaEdApiWeb.PostView)
                             |> render("update_error.json", "Changeset: #{changeset}")
    end
  end
end
