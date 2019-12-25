defmodule LakotaEdApiWeb.LessonControllerTest do
  use LakotaEdApiWeb.ConnCase

  alias LakotaEdApi.Lessons.Lesson

  @create_attrs %{
    lesson: "some lesson"
  }
  @update_attrs %{
    lesson: "some updated lesson"
  }
  @invalid_attrs %{lesson: nil}

  def fixture(:lesson) do
    {:ok, lesson} = Lessons.create_lesson(@create_attrs)
    lesson
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all lessons", %{conn: conn} do
      conn = get(conn, Routes.lesson_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create lesson" do
    test "renders lesson when data is valid", %{conn: conn} do
      conn = post(conn, Routes.lesson_path(conn, :create), lesson: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.lesson_path(conn, :show, id))

      assert %{
               "id" => id,
               "lesson" => "some lesson"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.lesson_path(conn, :create), lesson: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update lesson" do
    setup [:create_lesson]

    test "renders lesson when data is valid", %{conn: conn, lesson: %Lesson{id: id} = lesson} do
      conn = put(conn, Routes.lesson_path(conn, :update, lesson), lesson: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.lesson_path(conn, :show, id))

      assert %{
               "id" => id,
               "lesson" => "some updated lesson"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, lesson: lesson} do
      conn = put(conn, Routes.lesson_path(conn, :update, lesson), lesson: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete lesson" do
    setup [:create_lesson]

    test "deletes chosen lesson", %{conn: conn, lesson: lesson} do
      conn = delete(conn, Routes.lesson_path(conn, :delete, lesson))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.lesson_path(conn, :show, lesson))
      end
    end
  end

  defp create_lesson(_) do
    lesson = fixture(:lesson)
    {:ok, lesson: lesson}
  end
end
