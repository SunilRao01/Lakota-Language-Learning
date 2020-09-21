defmodule LakotaEdApiWeb.GrammarView do
  use LakotaEdApiWeb, :view
  alias LakotaEdApiWeb.GrammarView

  def render("index.json", %{grammar: grammar}) do
    %{data: render_many(grammar, GrammarView, "grammar.json")}
  end

  def render("show.json", %{grammar: grammar}) do
    %{data: render_one(grammar, GrammarView, "grammar.json")}
  end

  def render("grammar.json", %{grammar: grammar}) do
    %{id: grammar.id,
      grammar: grammar.grammar}
  end
end
