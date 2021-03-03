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
    get "/sitemap", SitemapController, :show

    resources "/lessons", LessonController, only: [:show, :index]
    resources "/grammar", GrammarController, only: [:show, :index]
    resources "/vocabulary", VocabController, only: [:show, :index]
    resources "/podcasts", PodcastController, only: [:show, :index]

    pipe_through :secure_api
    resources "/post", PostController, only: [:create, :update, :delete]
    resources "/lessons", LessonController, only: [:create, :update, :delete]
    resources "/grammar", GrammarController, only: [:create, :update, :delete]
    resources "/vocabulary", VocabController, only: [:create, :update, :delete]
    resources "/podcasts", PodcastController, only: [:create, :update, :delete]
    resources "/sitemap", SitemapController, only: [:create, :update, :delete]

    # allow updating of sitemap without passing ID in URL
    resources "/sitemap", SitemapController, only: [:update], singleton: true
  end
end
