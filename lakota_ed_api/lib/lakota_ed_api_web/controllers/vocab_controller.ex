defmodule LakotaEdApiWeb.VocabController do
  use LakotaEdApiWeb, :controller

  alias LakotaEdApi.Vocabulary
  alias LakotaEdApi.Vocabulary.Vocab

  action_fallback LakotaEdApiWeb.FallbackController

  def index(conn, _params) do
    vocabulary = Vocabulary.list_vocabulary()
    render(conn, "index.json", vocabulary: vocabulary)
  end

  def create(conn, %{"vocab" => vocab_params}) do
    with {:ok, %Vocab{} = vocab} <- Vocabulary.create_vocabulary(vocab_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.vocab_path(conn, :show, vocab))
      |> render("show.json", vocab: vocab)
    end
  end

  def show(conn, %{"id" => id}) do
    vocab = Vocabulary.get_vocabulary!(id)
    render(conn, "show.json", vocab: vocab)
  end

  def update(conn, %{"id" => id, "vocab" => vocab_params}) do
    vocab = Vocabulary.get_vocabulary!(id)

    with {:ok, %Vocab{} = vocab} <- Vocabulary.update_vocabulary(vocab, vocab_params) do
      render(conn, "show.json", vocab: vocab)
    end
  end

  def delete(conn, %{"id" => id}) do
    vocab = Vocabulary.get_vocabulary!(id)

    with {:ok, %Vocab{}} <- Vocabulary.delete_vocabulary(vocab) do
      send_resp(conn, :no_content, "")
    end
  end
end
