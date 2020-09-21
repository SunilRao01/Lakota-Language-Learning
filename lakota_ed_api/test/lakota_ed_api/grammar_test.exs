defmodule LakotaEdApi.GrammarTest do
  use LakotaEdApi.DataCase

  alias LakotaEdApi.Grammar

  describe "grammar" do
    alias LakotaEdApi.Grammar.Post

    @valid_attrs %{grammar: "some grammar"}
    @update_attrs %{grammar: "some updated grammar"}
    @invalid_attrs %{grammar: nil}

    def post_fixture(attrs \\ %{}) do
      {:ok, post} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Grammar.create_post()

      post
    end

    test "list_grammar/0 returns all grammar" do
      post = post_fixture()
      assert Grammar.list_grammar() == [post]
    end

    test "get_post!/1 returns the post with given id" do
      post = post_fixture()
      assert Grammar.get_post!(post.id) == post
    end

    test "create_post/1 with valid data creates a post" do
      assert {:ok, %Post{} = post} = Grammar.create_post(@valid_attrs)
      assert post.grammar == "some grammar"
    end

    test "create_post/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Grammar.create_post(@invalid_attrs)
    end

    test "update_post/2 with valid data updates the post" do
      post = post_fixture()
      assert {:ok, %Post{} = post} = Grammar.update_post(post, @update_attrs)
      assert post.grammar == "some updated grammar"
    end

    test "update_post/2 with invalid data returns error changeset" do
      post = post_fixture()
      assert {:error, %Ecto.Changeset{}} = Grammar.update_post(post, @invalid_attrs)
      assert post == Grammar.get_post!(post.id)
    end

    test "delete_post/1 deletes the post" do
      post = post_fixture()
      assert {:ok, %Post{}} = Grammar.delete_post(post)
      assert_raise Ecto.NoResultsError, fn -> Grammar.get_post!(post.id) end
    end

    test "change_post/1 returns a post changeset" do
      post = post_fixture()
      assert %Ecto.Changeset{} = Grammar.change_post(post)
    end
  end
end
