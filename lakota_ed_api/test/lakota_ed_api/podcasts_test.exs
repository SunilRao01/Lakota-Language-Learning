defmodule LakotaEdApi.PodcastsTest do
  use LakotaEdApi.DataCase

  alias LakotaEdApi.Podcasts

  describe "podcasts" do
    alias LakotaEdApi.Podcasts.Post

    @valid_attrs %{podcast: "some podcast"}
    @update_attrs %{podcast: "some updated podcast"}
    @invalid_attrs %{podcast: nil}

    def post_fixture(attrs \\ %{}) do
      {:ok, post} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Podcasts.create_post()

      post
    end

    test "list_podcasts/0 returns all podcasts" do
      post = post_fixture()
      assert Podcasts.list_podcasts() == [post]
    end

    test "get_post!/1 returns the post with given id" do
      post = post_fixture()
      assert Podcasts.get_post!(post.id) == post
    end

    test "create_post/1 with valid data creates a post" do
      assert {:ok, %Post{} = post} = Podcasts.create_post(@valid_attrs)
      assert post.podcast == "some podcast"
    end

    test "create_post/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Podcasts.create_post(@invalid_attrs)
    end

    test "update_post/2 with valid data updates the post" do
      post = post_fixture()
      assert {:ok, %Post{} = post} = Podcasts.update_post(post, @update_attrs)
      assert post.podcast == "some updated podcast"
    end

    test "update_post/2 with invalid data returns error changeset" do
      post = post_fixture()
      assert {:error, %Ecto.Changeset{}} = Podcasts.update_post(post, @invalid_attrs)
      assert post == Podcasts.get_post!(post.id)
    end

    test "delete_post/1 deletes the post" do
      post = post_fixture()
      assert {:ok, %Post{}} = Podcasts.delete_post(post)
      assert_raise Ecto.NoResultsError, fn -> Podcasts.get_post!(post.id) end
    end

    test "change_post/1 returns a post changeset" do
      post = post_fixture()
      assert %Ecto.Changeset{} = Podcasts.change_post(post)
    end
  end
end
