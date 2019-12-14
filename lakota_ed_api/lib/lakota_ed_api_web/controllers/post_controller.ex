import Ecto.Query, only: [from: 2, dynamic: 2, dynamic: 1]

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
    where_conditions = Enum.reduce(
      conn.query_params,
      dynamic(true),
      fn
        {"category", category}, conditions ->
          if is_list(category) do
            Enum.reduce category, conditions, fn c, acc -> dynamic([p], ^c in p.categories and ^acc) end
          else
            dynamic([p], ^category in p.categories and ^conditions)
          end


        {"tag", tag}, conditions ->
          if is_list(tag) do
            Enum.reduce tag, conditions, fn t, acc -> dynamic([p], ^t in p.tags and ^acc) end
          else
            dynamic([p], ^tag in p.tags and ^conditions)
          end

        {_, _}, conditions -> conditions
      end
    )

    filter_conditions = if conn.query_params["page"] do
      page = String.to_integer(conn.query_params["page"])

      [
        limit: 5,
        offset: (5 * (page - 1)),
        order_by: [
          desc: :inserted_at
        ]
      ]
    else
      :nil
    end

    IO.inspect conn.query_params

    query = if (filter_conditions != :nil) do
      from p in Post,
           where: ^where_conditions,
           limit: ^filter_conditions[:limit],
           offset: ^filter_conditions[:offset],
           order_by: ^filter_conditions[:order_by]
    else
      from p in Post,
           where: ^where_conditions
    end



    case Repo.all(query) do
      posts ->
        conn
        |> put_view(LakotaEdApiWeb.PostView)
        |> render("multiple_posts.json", %{posts: posts})
    end
  end

  def categories(conn, _, _) do
    query = from p in Post, select: p.categories, order_by: [
      desc: :inserted_at
    ]

    case Repo.all(query) do
      categories ->
        unique_categories = MapSet.to_list Enum.reduce(
                                             categories,
                                             MapSet.new(),
                                             fn (cat_array, cat_set) ->
                                               Enum.reduce(
                                                 cat_array,
                                                 cat_set,
                                                 fn (cat_value, cat_set) ->
                                                   MapSet.put(cat_set, cat_value)
                                                 end
                                               )
                                             end
                                           )
        conn
        |> json(unique_categories)
    end
  end

  def tags(conn, _, _) do
    query = from p in Post, select: p.tags, order_by: [
      desc: :inserted_at
    ]

    case Repo.all(query) do
      tags ->
        unique_tags = MapSet.to_list Enum.reduce(
                                             tags,
                                             MapSet.new(),
                                             fn (tag_array, tag_set) ->
                                               Enum.reduce(
                                                 tag_array,
                                                 tag_set,
                                                 fn (tag_value, tag_set) ->
                                                   MapSet.put(tag_set, tag_value)
                                                 end
                                               )
                                             end
                                           )
        conn
        |> json(unique_tags)
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
