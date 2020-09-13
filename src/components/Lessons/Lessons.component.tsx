import React, { FC, Fragment, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { PostCard } from 'components/PostCard/PostCard.component';
import {LessonsPropsAndActions, mapDispatchToProps, mapStateToProps} from './Lessons.types';

const Lessons: FC<LessonsPropsAndActions> = (props) => {
    const {
        clearPosts,
        posts,
        getLessons,
        getPostsForLessons,
        lessons,
        postsLoading,
        setPostLoading,
    } = props;

    const fetchData = useCallback(async () => {
        setPostLoading(true);
        const lessons: { id: number; lesson: string }[] = await getLessons();
        clearPosts();
        await getPostsForLessons(
            lessons.map((l: { id: number; lesson: string }) => l.lesson)
        );
        setPostLoading(false);
    }, [clearPosts, getLessons, getPostsForLessons, setPostLoading]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="container">
            <h1 className="title">Lessons</h1>
            <hr />
            {postsLoading && (
                <progress className="progress is-small is-info" max="100">
                    50%
                </progress>
            )}
            {!postsLoading &&
                lessons.map((lesson, i) => (
                    <Fragment key={i}>
                        <h3 className="title is-4">{lesson.lesson}</h3>
                        {posts
                            .filter((p) => p.categories.includes(lesson.lesson))
                            .map((p, i) => (
                                <div key={i}>
                                    <PostCard post={p} showPreviewOnly />
                                </div>
                            ))}
                        {i !== lessons.length - 1 && <hr />}
                    </Fragment>
                ))}
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lessons);
