defmodule LakotaEdApi.Vocabulary do
  @moduledoc """
  The Vocabulary context.
  """

  import Ecto.Query, warn: false
  alias LakotaEdApi.Repo

  alias LakotaEdApi.Vocabulary.Vocab

  @doc """
  Returns the list of vocabulary.

  ## Examples

      iex> list_vocabulary()
      [%Vocabulary{}, ...]

  """
  def list_vocabulary do
    Repo.all(Vocab)
  end

  @doc """
  Gets a single vocabulary.

  Raises `Ecto.NoResultsError` if the Vocabulary does not exist.

  ## Examples

      iex> get_vocabulary!(123)
      %Vocabulary{}

      iex> get_vocabulary!(456)
      ** (Ecto.NoResultsError)

  """
  def get_vocabulary!(id), do: Repo.get!(Vocab, id)

  @doc """
  Creates a vocabulary.

  ## Examples

      iex> create_vocabulary(%{field: value})
      {:ok, %Vocabulary{}}

      iex> create_vocabulary(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_vocabulary(attrs \\ %{}) do
    %Vocab{}
    |> Vocab.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a vocabulary.

  ## Examples

      iex> update_vocabulary(vocabulary, %{field: new_value})
      {:ok, %Vocabulary{}}

      iex> update_vocabulary(vocabulary, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_vocabulary(%Vocab{} = vocab, attrs) do
    vocab
    |> Vocab.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a vocabulary.

  ## Examples

      iex> delete_vocabulary(vocabulary)
      {:ok, %Vocabulary{}}

      iex> delete_vocabulary(vocabulary)
      {:error, %Ecto.Changeset{}}

  """
  def delete_vocabulary(%Vocab{} = vocab) do
    Repo.delete(vocab)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking vocabulary changes.

  ## Examples

      iex> change_vocabulary(vocabulary)
      %Ecto.Changeset{data: %Vocabulary{}}

  """
  def change_vocabulary(%Vocab{} = vocab, attrs \\ %{}) do
    Vocabulary.changeset(vocab, attrs)
  end
end
