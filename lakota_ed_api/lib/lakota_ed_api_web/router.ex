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
    plug CORSPlug, origin: ["https://lakotalanguagelearning.com"]
  end

  scope "/", LakotaEdApiWeb do
    pipe_through :unsecure_api
    post "/login", SessionController, :create
    post "/verify-session", SessionController, :verify_session

    get "/post/:id", PostController, :show
    get "/posts", PostController, :posts
    get "/categories", PostController, :categories
    get "/tags", PostController, :tags

    pipe_through :secure_api
    resources "/post", PostController, only: [:create, :update, :delete]
    resources "/lessons", LessonController, except: [:new, :edit]
    resources "/grammar", GrammarController, except: [:new, :edit]
    resources "/vocabulary", VocabController, except: [:new, :edit]
    resources "/podcasts", PodcastController, except: [:new, :edit]
  end
end
