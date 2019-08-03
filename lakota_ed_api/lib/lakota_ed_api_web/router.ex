defmodule LakotaEdApiWeb.Router do
  use LakotaEdApiWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", LakotaEdApiWeb do
    pipe_through :api

    resources "/post", PostController, only: [:show, :update, :delete, :create]
  end
end
