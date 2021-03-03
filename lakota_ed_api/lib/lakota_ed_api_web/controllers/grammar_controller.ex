defmodule LakotaEdApiWeb.GrammarController do
  use LakotaEdApiWeb, :controller

  alias LakotaEdApi.Grammar
  alias LakotaEdApi.Grammar.Grammar, as: GrammarUnit

  action_fallback LakotaEdApiWeb.FallbackController

  plug Guardian.Plug.EnsureAuthenticated when action in [:create, :delete, :update]
  plug Guardian.Plug.VerifySession when action in [:create, :delete, :update]
  plug Guardian.Plug.VerifyHeader when action in [:create, :delete, :update]

  def index(conn, _params) do
    grammar = Grammar.list_grammar()
    render(conn, "index.json", grammar: grammar)
  end

  def create(conn, %{"grammar" => grammar_params}) do
    with {:ok, %GrammarUnit{} = grammar} <- Grammar.create_grammar(grammar_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.grammar_path(conn, :show, grammar))
      |> render("show.json", grammar: grammar)
    end
  end

  def show(conn, %{"id" => id}) do
    grammar = Grammar.get_grammar!(id)
    render(conn, "show.json", grammar: grammar)
  end

  def update(conn, %{"id" => id, "grammar" => grammar_params}) do
    grammar = Grammar.get_grammar!(id)

    with {:ok, %GrammarUnit{} = grammar} <- Grammar.update_grammar(grammar, grammar_params) do
      render(conn, "show.json", grammar: grammar)
    end
  end

  def delete(conn, %{"id" => id}) do
    grammar = Grammar.get_grammar!(id)

    with {:ok, %GrammarUnit{}} <- Grammar.delete_grammar(grammar) do
      send_resp(conn, :no_content, "")
    end
  end
end
