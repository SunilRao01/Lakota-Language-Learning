import React, { ChangeEvent, FC, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import {AdminLessonsPropsAndActions, mapDispatchToProps, mapStateToProps} from './AdminLessons.types';

const AdminLessons: FC<AdminLessonsPropsAndActions> = (props) => {
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminLessons);
