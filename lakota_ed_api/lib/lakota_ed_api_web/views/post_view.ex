defmodule LakotaEdApiWeb.PostView do
  use LakotaEdApiWeb, :view

  def render("single_post.json", %{post: post}) do
    %{
      id: post.id,
      title: post.postTitle,
      content: post.postContent,
      tags: post.tags,
      categories: post.categories,
      creationDate: post.inserted_at
    }
  end

  def render("multiple_posts.json", %{posts: posts}) do
    %{
      posts: for p <- posts do
        %{
          id: p.id,
          title: p.postTitle,
          content: p.postContent,
          tags: p.tags,
          categories: p.categories,
          creationDate: p.inserted_at
        }
      end
    }
  end

  def render("update_error.json", %{message: message}) do
    %{
      message: message
    }
  end
end
