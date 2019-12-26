defmodule LakotaEdApi.LessonsTest do
  use LakotaEdApi.DataCase

  alias LakotaEdApi.Lessons

  describe "lessons" do
    alias LakotaEdApi.Lessons.Lesson

    @valid_attrs %{lesson: "some lesson"}
    @update_attrs %{lesson: "some updated lesson"}
    @invalid_attrs %{lesson: nil}

    def lesson_fixture(attrs \\ %{}) do
      {:ok, lesson} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Lessons.create_lesson()

      lesson
    end

    test "list_lessons/0 returns all lessons" do
      lesson = lesson_fixture()
      assert Lessons.list_lessons() == [lesson]
    end

    test "get_lesson!/1 returns the lesson with given id" do
      lesson = lesson_fixture()
      assert Lessons.get_lesson!(lesson.id) == lesson
    end

    test "create_lesson/1 with valid data creates a lesson" do
      assert {:ok, %Lesson{} = lesson} = Lessons.create_lesson(@valid_attrs)
      assert lesson.lesson == "some lesson"
    end

    test "create_lesson/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Lessons.create_lesson(@invalid_attrs)
    end

    test "update_lesson/2 with valid data updates the lesson" do
      lesson = lesson_fixture()
      assert {:ok, %Lesson{} = lesson} = Lessons.update_lesson(lesson, @update_attrs)
      assert lesson.lesson == "some updated lesson"
    end

    test "update_lesson/2 with invalid data returns error changeset" do
      lesson = lesson_fixture()
      assert {:error, %Ecto.Changeset{}} = Lessons.update_lesson(lesson, @invalid_attrs)
      assert lesson == Lessons.get_lesson!(lesson.id)
    end

    test "delete_lesson/1 deletes the lesson" do
      lesson = lesson_fixture()
      assert {:ok, %Lesson{}} = Lessons.delete_lesson(lesson)
      assert_raise Ecto.NoResultsError, fn -> Lessons.get_lesson!(lesson.id) end
    end

    test "change_lesson/1 returns a lesson changeset" do
      lesson = lesson_fixture()
      assert %Ecto.Changeset{} = Lessons.change_lesson(lesson)
    end
  end
end
