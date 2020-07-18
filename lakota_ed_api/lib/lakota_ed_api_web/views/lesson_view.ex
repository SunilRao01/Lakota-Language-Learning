defmodule LakotaEdApiWeb.LessonView do
  use LakotaEdApiWeb, :view
  alias LakotaEdApiWeb.LessonView

  def render("index.json", %{lessons: lessons}) do
    %{data: render_many(lessons, LessonView, "lesson.json")}
  end

  def render("show.json", %{lesson: lesson}) do
    %{data: render_one(lesson, LessonView, "lesson.json")}
  end

  def render("lesson.json", %{lesson: lesson}) do
    %{id: lesson.id,
      lesson: lesson.lesson}
  end
end
