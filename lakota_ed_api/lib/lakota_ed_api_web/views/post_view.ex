defmodule LakotaEdApiWeb.PostView do
  use LakotaEdApiWeb, :view

  def render("show.json", %{post: post}) do
    %{
      id: post.id,
      title: post.postTitle,
      content: post.postContent,
      tags: post.tags,
      categories: post.categories,
      creationDate: post.inserted_at
    }
  end
end
