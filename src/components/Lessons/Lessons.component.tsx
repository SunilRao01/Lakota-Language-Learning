/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PostCard } from 'components/PostCard/PostCard.component';
import {
    LessonsPropsAndActions,
    mapDispatchToProps,
    mapStateToProps,
} from './Lessons.types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

const Lessons: FC<LessonsPropsAndActions> = (props) => {
    const {
        clearPosts,
        posts,
        getLessons,
        getPostsForLesson,
        lessons,
        postsLoading,
        setPostLoading,
        history,
    } = props;

    const [selectedLesson, setSelectedLesson] = useState<string>();
    const [currentPage, setCurrentPage] = useState(1);

    // Function that retrieve all lessons
    const fetchData = useCallback(async () => {
        setPostLoading(true);
        clearPosts();

        const lessons: { id: number; lesson: string }[] = await getLessons();

        if (lessons.length > 0) {
            if (history.location.search) {
                const lessonFromUrl = history.location.search.substr(
                    history.location.search.indexOf('=') + 1
                );
                setSelectedLesson(lessonFromUrl);
            } else {
                setSelectedLesson(lessons[0].lesson);
            }
        }

        if (!history.location.search) {
            history.replace(`?category=${lessons[0].lesson}`);
        }

        setPostLoading(false);
    }, [clearPosts, getLessons, setPostLoading, history]);

    const onLessonSelection = useCallback(
        (lesson: any) => {
            setSelectedLesson(lesson.lesson);
            setCurrentPage(1);

            history.push({
                search: `?category=${lesson.lesson}`,
            });
        },
        [history]
    );

    // On mount, retrieve initially selected lesson (first lesson)
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Updates selected lesson from URL whenever a change is occurred
    useEffect(() => {
        const lessonFromUrl = history.location.search?.substr(
            history.location.search.indexOf('=') + 1
        );
        if (lessonFromUrl) {
            setSelectedLesson(
                history.location.search.substr(
                    history.location.search.indexOf('=') + 1
                )
            );
        }
    }, [history.location]);

    // Update posts when paginating or changing the lessons
    useEffect(() => {
        const getPostForSelectedLesson = async (lesson: string) => {
            setPostLoading(true);
            await getPostsForLesson(lesson, currentPage);
            setPostLoading(false);
        };
        selectedLesson && getPostForSelectedLesson(selectedLesson);
    }, [currentPage, getPostsForLesson, selectedLesson, setPostLoading]);

    return (
        <div className="container">
            <h1 className="title">Lessons</h1>

            {/*Toggle Lessons Tabs*/}
            <div className="tabs is-toggle">
                <ul>
                    {lessons.map((lesson, i) => (
                        <li
                            className={
                                selectedLesson === lesson.lesson
                                    ? 'is-active'
                                    : undefined
                            }
                            key={i}
                            onClick={() => {
                                onLessonSelection(lesson);
                            }}
                        >
                            {/*TODO: Bulma is currently not accessible, specifically for usages of <a />*/}
                            {/* being used just for convenience, breaking the required contract for accessibility*/}
                            <a>
                                <span>{lesson.lesson}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <hr />
            {postsLoading && (
                <progress className="progress is-small is-info" max="100">
                    50%
                </progress>
            )}
            {!postsLoading &&
                selectedLesson &&
                posts
                    .filter((p) => p.categories.includes(selectedLesson))
                    .map((p, i) => (
                        <div key={i}>
                            <PostCard post={p} showPreviewOnly />
                        </div>
                    ))}

            <button
                className="button is-info pagination-button"
                disabled={currentPage === 1}
                onClick={() => {
                    if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                    }
                }}
            >
                Previous Page
            </button>
            <button
                className="button is-info pagination-button"
                disabled={posts.length === 0 || posts.length < 5}
                onClick={() => {
                    if (posts.length !== 0) {
                        setCurrentPage(currentPage + 1);
                    }
                }}
            >
                Next Page
            </button>
        </div>
    );
};

export default compose<React.ComponentType<LessonsPropsAndActions>>(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Lessons);
