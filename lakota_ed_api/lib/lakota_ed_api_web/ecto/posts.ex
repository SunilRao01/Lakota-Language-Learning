defmodule Posts do
  import Ecto.Query
  alias LakotaEdApi.Post
  alias LakotaEdApi.Repo

  def all(criteria) do
    base_query()
    |> build_query(criteria)
    |> Repo.all()
  end

  def drafts, do: all(%{"draft" => true})

  def get(id) do
    %{"id" => id}
    |> all()
    |> handle_get()
  end

  defp base_query do
    from p in Post
  end

  defp build_query(query, criteria) do
    Enum.reduce(criteria, query, &compose_query/2)
  end

  defp compose_query({"title", title}, query) do
    where(query, [p], ilike(p.title, ^"%#{title}%"))
  end

  defp compose_query({"tags", tags}, query) do
    query
    |> join(:left, [p], t in assoc(p, :tags))
    |> where([_p, t], t.name in ^tags)
  end

  defp compose_query({key, value}, query) when key in ~w(draft id) do
    field = String.to_atom(key)
    where(query, [p], ^{field, value})
  end

  defp compose_query(_unsupported_param, query) do
    query
  end

  defp handle_get([]), do: {:error, "not found"}
  defp handle_get([post]), do: {:ok, post}
end
