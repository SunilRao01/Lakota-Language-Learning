defmodule LakotaEdApiWeb.VocabView do
  use LakotaEdApiWeb, :view
  alias LakotaEdApiWeb.VocabView

  def render("index.json", %{vocabulary: vocabulary}) do
    %{data: render_many(vocabulary, VocabView, "vocab.json")}
  end

  def render("show.json", %{vocab: vocab}) do
    %{data: render_one(vocab, VocabView, "vocab.json")}
  end

  def render("vocab.json", %{vocab: vocab}) do
    %{id: vocab.id,
      vocab: vocab.vocab}
  end
end
