import React, { ChangeEvent, FC, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'redux/store';
import {
    backendAddLesson,
    backendDeleteLesson,
    backendGetCategories,
    backendGetLessons,
} from 'redux/Posts/Posts.reducer';
import { ThunkDispatch } from 'redux-thunk';
import { setPostLoading } from 'redux/Posts/Posts.action';

interface AdminLessonProps {
    lessons: { id: number; lesson: string }[];
    categories: string[];
    jwt: string;
    postsLoading: boolean;
}

interface AdminLessonActions {
    getLessons: () => void;
    getCategories: () => void;
    addLesson: (lesson: string, jwt: string) => void;
    deleteLesson: (lessonId: number, jwt: string) => void;
    setPostLoading: (loading: boolean) => void;
}

const mapStateToProps = (state: RootState): AdminLessonProps => {
    return {
        lessons: state.postState.lessons,
        categories: state.postState.categories
            ? state.postState.categories
            : [],
        jwt: state.adminState.jwt,
        postsLoading: state.postState.loadingPosts,
    };
};

const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): AdminLessonActions => {
    return {
        getLessons: async () => {
            await dispatch(backendGetLessons());
        },
        getCategories: async () => {
            await dispatch(backendGetCategories());
        },
        addLesson: async (lesson: string, jwt: string) => {
            await dispatch(backendAddLesson(lesson, jwt));
        },
        deleteLesson: async (lessonId: number, jwt: string) => {
            await dispatch(backendDeleteLesson(lessonId, jwt));
        },
        setPostLoading: (loading: boolean) => dispatch(setPostLoading(loading)),
    };
};

const AdminLessonsComponent: FC<AdminLessonProps & AdminLessonActions> = (
    props
) => {
    const {
        jwt,
        getCategories,
        categories,
        lessons,
        getLessons,
        addLesson,
        deleteLesson,
        postsLoading,
        setPostLoading,
    } = props;

    const fetchData = useCallback(async () => {
        setPostLoading(true);
        await getLessons();

        await getCategories();
        setPostLoading(false);
    }, [getCategories, getLessons, setPostLoading]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div>
            <h3 className="title is-3">Lessons:</h3>
            <div className="tags">
                {postsLoading && (
                    <progress className="progress is-small is-info" max="100">
                        50%
                    </progress>
                )}
                {!postsLoading &&
                    lessons.map((l, i) => (
                        <span key={i} className="tag is-info">
                            {l.lesson}
                            <button
                                onClick={async () =>
                                    await deleteLesson(l.id, jwt)
                                }
                                className="delete is-small"
                            />
                        </span>
                    ))}
            </div>

            <hr />

            <div className="control">
                {postsLoading && (
                    <progress className="progress is-small is-info" max="100">
                        50%
                    </progress>
                )}
                {!postsLoading && (
                    <div className="select">
                        <select
                            onChange={async (
                                event: ChangeEvent<HTMLSelectElement>
                            ) => {
                                if (
                                    event.target.value !== 'Add a Lesson' &&
                                    lessons.filter(
                                        (l) => l.lesson === event.target.value
                                    ).length === 0
                                ) {
                                    await addLesson(event.target.value, jwt);
                                }
                            }}
                        >
                            <option>Add a Lesson</option>
                            {categories.map((c, index) => (
                                <option key={index}>{c}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </div>
    );
};

export const AdminLessons = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminLessonsComponent);
