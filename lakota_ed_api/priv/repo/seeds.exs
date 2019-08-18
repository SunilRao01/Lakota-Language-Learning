# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     LakotaEdApi.Repo.insert!(%LakotaEdApi.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias LakotaEdApi.Repo
alias LakotaEdApi.Post
alias LakotaEdApi.Accounts.User

Repo.insert!(%Post{
  postTitle: "post title",
  postContent: "post content",
  categories: ["cat 1", "cat 2"],
  tags: ["tag 1", "tag 2"],
})
Repo.insert!(%Post{
  postTitle: "post title",
  postContent: "post content",
  categories: ["cat 1", "cat 2"],
  tags: ["tag 1", "tag 2"],
})
Repo.insert!(%Post{
  postTitle: "post title",
  postContent: "post content",
  categories: ["cat 1", "cat 2"],
  tags: ["tag 1", "tag 2"],
})
Repo.insert!(%Post{
  postTitle: "post title",
  postContent: "post content",
  categories: ["cat 1", "cat 2"],
  tags: ["tag 1", "tag 2"],
})
Repo.insert!(%Post{
  postTitle: "post title",
  postContent: "post content",
  categories: ["cat 1", "cat 2"],
  tags: ["tag 1", "tag 2"],
})
Repo.insert!(%Post{
  postTitle: "post title",
  postContent: "post content",
  categories: ["cat 1", "cat 2"],
  tags: ["tag 1", "tag 2"],
})
Repo.insert!(%Post{
  postTitle: "post title",
  postContent: "post content",
  categories: ["cat 1", "cat 2"],
  tags: ["tag 1", "tag 2"],
})
Repo.insert!(%Post{
  postTitle: "post title",
  postContent: "post content",
  categories: ["cat 1", "cat 2"],
  tags: ["tag 1", "tag 2"],
})
Repo.insert!(%Post{
  postTitle: "post title",
  postContent: "post content",
  categories: ["cat 1", "cat 2"],
  tags: ["tag 1", "tag 2"],
})
Repo.insert!(%Post{
  postTitle: "post title",
  postContent: "post content",
  categories: ["cat 1", "cat 2"],
  tags: ["tag 1", "tag 2"],
})
Repo.insert!(%Post{
  postTitle: "post title",
  postContent: "post content",
  categories: ["cat 1", "cat 2"],
  tags: ["tag 1", "tag 2"],
})
Repo.insert!(%Post{
  postTitle: "post title",
  postContent: "post content",
  categories: ["cat 1", "cat 2"],
  tags: ["tag 1", "tag 2"],
})
Repo.insert!(%Post{
  postTitle: "post title",
  postContent: "post content",
  categories: ["cat 1", "cat 2"],
  tags: ["tag 1", "tag 2"],
})
Repo.insert!(%Post{
  postTitle: "post title",
  postContent: "post content",
  categories: ["cat 1", "cat 2"],
  tags: ["tag 1", "tag 2"],
})
Repo.insert!(%Post{
  postTitle: "post title",
  postContent: "post content",
  categories: ["cat 1", "cat 2"],
  tags: ["tag 1", "tag 2"],
})

Repo.insert!(%User{
  email: "email",
  password: Bcrypt.add_hash("password").password_hash
})
