import Ecto.Query, only: [from: 2]

defmodule LakotaEdApiWeb.PostController do
  require Logger

  use LakotaEdApiWeb, :controller
  use LakotaEdApiWeb.GuardedController
  alias LakotaEdApi.Repo
  alias LakotaEdApi.Post

  action_fallback(LakotaEdApiWeb.FallbackController)

   plug Guardian.Plug.EnsureAuthenticated when action in [:create, :delete, :update]
   plug Guardian.Plug.VerifySession when action in [:create, :delete, :update]
   plug Guardian.Plug.VerifyHeader when action in [:create, :delete, :update]

  def posts(conn, _, _) do
    # Conditionally serves content based on query strings; currently mutually exclusive
    case hd(Map.keys(conn.query_params)) do
      "page" ->
        {page, _} = Integer.parse(conn.query_params["page"])
        offset = 5 * (page - 1)
        query = from Post, limit: 5, offset: ^offset, order_by: [desc: :inserted_at]
        case Repo.all(query) do
          posts ->
            conn
            |> put_view(LakotaEdApiWeb.PostView)
            |> render("multiple_posts.json", %{posts: posts})
        end

      "category" ->
        category = conn.query_params["category"]
        query = from p in Post,
                     where: fragment("exists (select * from unnest(?) tag where tag like ?)", p.categories, ^category)
        case Repo.all(query) do
          posts ->
            conn
            |> put_view(LakotaEdApiWeb.PostView)
            |> render("multiple_posts.json", %{posts: posts})
        end

      "tag" ->
        tag = conn.query_params["tag"]
        query = from p in Post, where: fragment("exists (select * from unnest(?) tag where tag like ?)", p.tags, ^tag)
        case Repo.all(query) do
          posts ->
            conn
            |> put_view(LakotaEdApiWeb.PostView)
            |> render("multiple_posts.json", %{posts: posts})
        end

      true ->
        conn
        |> put_view(LakotaEdApiWeb.ErrorView)
        |> render("query_error.json", "Couldn't find any relevant query strings!")
    end
  end

  def show(conn, %{"id" => id}, _) do
    case Repo.get(Post, id) do
      nil ->
        conn
        |> text("Couldn't find post with id")
      post ->
        conn
        |> put_view(LakotaEdApiWeb.PostView)
        |> render("single_post.json", post: post)
    end
  end

  def create(conn, _, _) do
    bodyParams = conn.body_params
    case Repo.insert(
           %Post{
             categories: bodyParams["categories"],
             postContent: bodyParams["postContent"],
             postTitle: bodyParams["postTitle"],
             tags: bodyParams["tags"],
             quizzes: bodyParams["quizzes"],
             podcastLink: bodyParams["podcastLink"]
           }
         ) do
      {:ok, newPost} -> text(conn, "Created post with id #{newPost.id}")
      {:error, _} -> text(conn, "Error creating post")
    end
  end

  def update(conn, %{"id" => id}, _) do
    bodyParams = conn.body_params
    newPost = Repo.get(Post, id)

    newPost = Ecto.Changeset.change newPost,
                                    postTitle: bodyParams["title"],
                                    postContent: bodyParams["content"],
                                    categories: bodyParams["categories"],
                                    tags: bodyParams["tags"],
                                    quizzes: bodyParams["quizzes"],
                                    podcastLink: bodyParams["podcastLink"]

    case Repo.update(newPost) do
      {:ok, postResponse} -> text(conn, "Updated post: #{postResponse.id}")
      {:error, changeset} -> conn
                             |> put_view(LakotaEdApiWeb.PostView)
                             |> render("update_error.json", "Changeset: #{changeset}")
    end
  end

  def delete(conn, %{"id" => id}, _) do
    case Repo.get(Post, id) do
      nil ->
        conn
        |> put_view(LakotaEdApiWeb.PostView)
        |> render("update_error.json", message: "Error deleting post: Couldn't find post with that id")
      post ->
        {:ok, post} = Repo.delete(post)

        conn
        |> text("Deleted post with id: #{post.id}")
    end
  end
end
