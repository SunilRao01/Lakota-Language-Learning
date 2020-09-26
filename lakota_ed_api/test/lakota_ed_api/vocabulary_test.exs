defmodule LakotaEdApi.VocabularyTest do
  use LakotaEdApi.DataCase

  alias LakotaEdApi.Vocabulary

  describe "vocabulary" do
    alias LakotaEdApi.Vocabulary.Post

    @valid_attrs %{vocabulary: "some vocabulary"}
    @update_attrs %{vocabulary: "some updated vocabulary"}
    @invalid_attrs %{vocabulary: nil}

    def post_fixture(attrs \\ %{}) do
      {:ok, post} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Vocabulary.create_post()

      post
    end

    test "list_vocabulary/0 returns all vocabulary" do
      post = post_fixture()
      assert Vocabulary.list_vocabulary() == [post]
    end

    test "get_post!/1 returns the post with given id" do
      post = post_fixture()
      assert Vocabulary.get_post!(post.id) == post
    end

    test "create_post/1 with valid data creates a post" do
      assert {:ok, %Post{} = post} = Vocabulary.create_post(@valid_attrs)
      assert post.vocabulary == "some vocabulary"
    end

    test "create_post/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Vocabulary.create_post(@invalid_attrs)
    end

    test "update_post/2 with valid data updates the post" do
      post = post_fixture()
      assert {:ok, %Post{} = post} = Vocabulary.update_post(post, @update_attrs)
      assert post.vocabulary == "some updated vocabulary"
    end

    test "update_post/2 with invalid data returns error changeset" do
      post = post_fixture()
      assert {:error, %Ecto.Changeset{}} = Vocabulary.update_post(post, @invalid_attrs)
      assert post == Vocabulary.get_post!(post.id)
    end

    test "delete_post/1 deletes the post" do
      post = post_fixture()
      assert {:ok, %Post{}} = Vocabulary.delete_post(post)
      assert_raise Ecto.NoResultsError, fn -> Vocabulary.get_post!(post.id) end
    end

    test "change_post/1 returns a post changeset" do
      post = post_fixture()
      assert %Ecto.Changeset{} = Vocabulary.change_post(post)
    end
  end
end
