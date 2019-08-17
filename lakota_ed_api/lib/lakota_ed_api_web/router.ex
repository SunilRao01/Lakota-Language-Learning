defmodule LakotaEdApiWeb.Router do
  use LakotaEdApiWeb, :router

  pipeline :unsecure_api do
    plug :accepts, ["json"]
  end

  pipeline :secure_api do
    plug :accepts, ["json"]
    plug(
      Guardian.Plug.Pipeline,
      error_handler: LakotaEdApiWeb.SessionController,
      module: LakotaEdApiWeb.Guardian
    )

    plug(Guardian.Plug.VerifyHeader)
    plug(Guardian.Plug.VerifyCookie)
    plug(Guardian.Plug.LoadResource, allow_blank: true)
  end

  scope "/", LakotaEdApiWeb do
    pipe_through :unsecure_api
    post "/login", SessionController, :create

    pipe_through :secure_api
    resources "/post", PostController, only: [:show, :create, :update]
  end
end
