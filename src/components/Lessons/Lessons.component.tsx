/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PostCard } from 'components/PostCard/PostCard.component';
import {
    LessonsPropsAndActions,
    mapDispatchToProps,
    mapStateToProps,
} from './Lessons.types';

const Lessons: FC<LessonsPropsAndActions> = (props) => {
    const {
        clearPosts,
        posts,
        getLessons,
        getPostsForLesson,
        lessons,
        postsLoading,
        setPostLoading,
    } = props;

    const [selectedLesson, setSelectedLesson] = useState<string>();
    const [currentPage, setCurrentPage] = useState(1);

    // Retrieve all lessons
    const fetchData = useCallback(async () => {
        setPostLoading(true);
        clearPosts();

        const lessons: { id: number; lesson: string }[] = await getLessons();
        if (lessons.length > 0) {
            setSelectedLesson(lessons[0].lesson);
        }

        setPostLoading(false);
    }, [clearPosts, getLessons, setPostLoading]);

    // On start, retrieve lessons
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Whenever changing the lesson, reset the page number to 1
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedLesson]);

    // Update posts when paginating or changing the lessons
    useEffect(() => {
        const getPostForSelectedLesson = async (lesson: string) => {
            clearPosts();
            await getPostsForLesson(lesson, currentPage);
        };
        selectedLesson && getPostForSelectedLesson(selectedLesson);
    }, [currentPage, clearPosts, getPostsForLesson, selectedLesson]);

    return (
        <div className="container">
            <h1 className="title">Lessons</h1>

            {/*Toggle Lessons Tabs*/}
            <div className="tabs is-toggle">
                <ul>
                    {!postsLoading &&
                        lessons.map((lesson, i) => (
                            <li
                                className={
                                    selectedLesson === lesson.lesson
                                        ? 'is-active'
                                        : undefined
                                }
                                key={i}
                                onClick={() => {
                                    setSelectedLesson(lesson.lesson);
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

export default connect(mapStateToProps, mapDispatchToProps)(Lessons);
