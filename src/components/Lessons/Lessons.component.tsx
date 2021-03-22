/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useCallback, useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { PostCard } from 'components/PostCard/PostCard.component';
import {
    LessonsPropsAndActions,
    mapDispatchToProps,
    mapStateToProps,
} from './Lessons.types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { ChevronDownSvg, ChevronUpSvg } from '../../assets';

const Lessons: FC<LessonsPropsAndActions> = (props) => {
    const {
        posts,
        getLessons,
        getPostsForLesson,
        lessons,
        postsLoading,
        setPostLoading,
        history,
    } = props;

    const [selectedLesson, setSelectedLesson] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [checkboxOpen, setCheckboxOpen] = useState(false);

    // Memoized value of lesson parsed from the URL
    const lessonFromUrl = useMemo<string | undefined>(() => {
        const categorySearchIndex =
            history.location.search.indexOf('category') + 9;
        if (history.location.search && categorySearchIndex) {
            const endSearchIndex = history.location.search.indexOf('&')
                ? history.location.search.indexOf('&') -
                  history.location.search.indexOf('=') -
                  1
                : undefined;
            return history.location.search.substr(
                categorySearchIndex,
                endSearchIndex
            );
        }

        return undefined;
    }, [history.location.search]);

    // Memoized value of page parsed from the URL
    const pageFromUrl = useMemo<number | undefined>(() => {
        const pageSearchIndex = history.location.search.indexOf('page') + 5;
        if (pageSearchIndex) {
            const page = history.location.search.substr(pageSearchIndex);
            return +page;
        }

        return undefined;
    }, [history.location.search]);

    const fetchLessons = useCallback(async () => {
        setPostLoading(true);

        await getLessons();

        setPostLoading(false);
    }, [setPostLoading, getLessons]);

    const onLessonSelection = useCallback(
        (lesson: any) => {
            setSelectedLesson(lesson.lesson);

            history.push({
                search: `?category=${lesson.lesson}&page=1`,
            });
        },
        [history]
    );

    const onNextPage = useCallback(() => {
        if (posts.length !== 0) {
            setCurrentPage(currentPage + 1);

            history.push({
                search: `?category=${selectedLesson}&page=${currentPage + 1}`,
            });
        }
    }, [currentPage, history, posts.length, selectedLesson]);
    const onPreviousPage = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);

            history.push({
                search: `?category=${selectedLesson}&page=${currentPage - 1}`,
            });
        }
    }, [currentPage, history, selectedLesson]);

    const disableNextPage = useMemo(
        () => posts.length === 0 || posts.length < 5,
        [posts]
    );
    const disablePreviousPage = useMemo(() => currentPage === 1, [currentPage]);

    // On mount, retrieve lessons
    useEffect(() => {
        fetchLessons();
    }, [fetchLessons]);

    // Once lessons are retrieved, auto-select the first lessons as the selected lesson and update the URL
    useEffect(() => {
        if (lessons.length > 0 && !selectedLesson.length) {
            if (!history.location.search) {
                history.replace(`?category=${lessons[0].lesson}&page=1`);
            }
        }
    }, [currentPage, history, lessons, selectedLesson]);

    // Updates selected lesson from URL whenever a change is occurred
    useEffect(() => {
        lessonFromUrl && setSelectedLesson(decodeURI(lessonFromUrl));
    }, [lessonFromUrl]);

    // Updates selected lesson from URL whenever a change is occurred
    useEffect(() => {
        setCurrentPage(pageFromUrl || 1);
    }, [pageFromUrl]);

    // Update posts when paginating or changing the lessons
    useEffect(() => {
        const getPostsForSelectedLesson = async (lesson: string) => {
            setPostLoading(true);
            await getPostsForLesson(lesson, currentPage);
            setPostLoading(false);
        };

        // history.replace(`?category=${selectedLesson}&page=${currentPage}`);
        selectedLesson && getPostsForSelectedLesson(selectedLesson);
    }, [currentPage, getPostsForLesson, selectedLesson, setPostLoading]);

    return (
        <div className="container">
            <h1 className="title">Lessons</h1>
            <div>
                <div
                    className={`dropdown ${checkboxOpen ? 'is-active' : ''}`}
                    onClick={() => {
                        setCheckboxOpen(!checkboxOpen);
                    }}
                >
                    <div className="dropdown-trigger">
                        <button
                            className="button"
                            aria-haspopup="true"
                            aria-controls="dropdown-menu"
                        >
                            <span>{selectedLesson}</span>
                            <span className="icon is-small">
                                {checkboxOpen ? (
                                    <img src={ChevronUpSvg} alt="up arrow" />
                                ) : (
                                    <img
                                        src={ChevronDownSvg}
                                        alt="down arrow"
                                    />
                                )}
                            </span>
                        </button>
                    </div>
                    <div
                        className="dropdown-menu"
                        id="dropdown-menu"
                        role="menu"
                    >
                        <div className="dropdown-content">
                            {lessons
                                .sort((a, b) =>
                                    a.lesson.localeCompare(b.lesson)
                                )
                                .map((lesson, i) => (
                                    <a
                                        key={i}
                                        className="dropdown-item"
                                        onClick={() => {
                                            onLessonSelection(lesson);
                                        }}
                                    >
                                        {lesson.lesson}
                                    </a>
                                ))}
                        </div>
                    </div>
                </div>
            </div>{' '}
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
                disabled={disablePreviousPage}
                onClick={onPreviousPage}
            >
                Previous Page
            </button>
            <button
                className="button is-info pagination-button"
                disabled={disableNextPage}
                onClick={onNextPage}
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
