defmodule LakotaEdApi.Grammar do
  @moduledoc """
  The Grammar context.
  """

  import Ecto.Query, warn: false
  alias LakotaEdApi.Repo

  alias LakotaEdApi.Grammar.Grammar

  @doc """
  Returns the list of grammar.

  ## Examples

      iex> list_grammar()
      [%Grammar{}, ...]

  """
  def list_grammar do
    Repo.all(Grammar)
  end

  @doc """
  Gets a single post.

  Raises `Ecto.NoResultsError` if the Grammar does not exist.

  ## Examples

      iex> get_grammar!(123)
      %Grammar{}

      iex> get_grammar!(456)
      ** (Ecto.NoResultsError)

  """
  def get_grammar!(id), do: Repo.get!(Grammar, id)

  @doc """
  Creates a post.

  ## Examples

      iex> create_grammar(%{field: value})
      {:ok, %Grammar{}}

      iex> create_grammar(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_grammar(attrs \\ %{}) do
    %Grammar{}
    |> Grammar.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a post.

  ## Examples

      iex> update_grammar(post, %{field: new_value})
      {:ok, %Grammar{}}

      iex> update_grammar(post, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_grammar(%Grammar{} = post, attrs) do
    post
    |> Grammar.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a post.

  ## Examples

      iex> delete_grammar(post)
      {:ok, %Grammar{}}

      iex> delete_grammar(post)
      {:error, %Ecto.Changeset{}}

  """
  def delete_grammar(%Grammar{} = post) do
    Repo.delete(post)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking post changes.

  ## Examples

      iex> change_grammar(post)
      %Ecto.Changeset{data: %Grammar{}}

  """
  def change_grammar(%Grammar{} = post, attrs \\ %{}) do
    Grammar.changeset(post, attrs)
  end
end
