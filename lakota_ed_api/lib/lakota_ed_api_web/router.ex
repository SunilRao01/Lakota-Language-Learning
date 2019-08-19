defmodule LakotaEdApiWeb.Router do
  use LakotaEdApiWeb, :router

  pipeline :unsecure_api do
    plug :accepts, ["json"]
    plug CORSPlug, origin: "*"
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
    get "/post/:id", PostController, :show
    get "/posts", PostController, :posts

    pipe_through :secure_api
    resources "/post", PostController, only: [:create, :update, :delete]
  end
end
