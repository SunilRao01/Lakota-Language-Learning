import React, { createRef, FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { IQuiz } from 'redux/Posts/Posts.reducer';
import { Tag } from 'components/Tag/Tag.component';
// import Viewer from 'tui-editor/dist/tui-editor-Viewer';
import { QuizCard } from 'components/QuizCard/QuizCard.component';
import { Link } from 'react-router-dom';
import styles from './Posts.module.scss';
import {
    mapDispatchToProps,
    mapStateToProps,
    PostsPropsAndActions,
} from './Posts.types';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

export const Posts: FC<PostsPropsAndActions> = (props) => {
    const {
        posts,
        getPost,
        setCurrentPost,
        post,
        history,
        setPostLoading,
        postsLoading,
    } = props;

    const viewerRef = createRef<any>();

    useEffect(() => {
        const urlParams = history.location.pathname.split('/');
        const postId = parseInt(urlParams[urlParams.length - 1]);

        const fetchData = async () => {
            setPostLoading(true);
            await getPost(postId);
            setPostLoading(false);
        };

        const targetPost = posts.filter((p) => p.id === postId);
        if (targetPost.length > 0) {
            setCurrentPost(targetPost[0]);
        } else {
            fetchData();
        }
    }, [
        posts,
        history.location.pathname,
        getPost,
        setCurrentPost,
        setPostLoading,
    ]);

    useEffect(() => {
        if (post && post.content && viewerRef.current) {
            viewerRef.current.getInstance().setMarkdown(post.content);
        }
    }, [post, viewerRef]);

    return (
        <section className="section">
            <div className="container">
                {postsLoading && (
                    <progress className="progress is-small is-info" max="100">
                        50%
                    </progress>
                )}
                {!postsLoading && post && (
                    <>
                        <h1 className="title">{post.title}</h1>
                        <div className="content">
                            {post.content && <Viewer ref={viewerRef} />}
                            <br />
                            <hr />
                            {post.quizzes && post.quizzes.length > 0 && (
                                <div>
                                    <h3>Quiz:</h3>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        {post.quizzes.map(
                                            (q: IQuiz, i: number) => (
                                                <QuizCard key={i} quiz={q} />
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                            <br />
                            <div
                                className={`has-text-weight-bold ${styles.SectionTitle}`}
                            >
                                Posted:
                            </div>
                            <p className="is-size-8">
                                {new Date(post.creationDate).toString()}
                            </p>
                            {post.categories && post.categories.length > 0 && (
                                <>
                                    <div
                                        className={`has-text-weight-bold ${styles.SectionTitle}`}
                                    >
                                        Categories:
                                    </div>
                                    <p>
                                        {post.categories.map(
                                            (c: string, i: number) => (
                                                <Link
                                                    key={i}
                                                    className="is-size-6"
                                                    to={`/posts?category=${c}`}
                                                >
                                                    {`${c}${
                                                        i <
                                                        post!.categories
                                                            .length -
                                                            1
                                                            ? ', '
                                                            : ''
                                                    }`}
                                                </Link>
                                            )
                                        )}
                                    </p>
                                </>
                            )}
                            {post.tags && post.tags.length > 0 && (
                                <>
                                    <div
                                        className={`has-text-weight-bold ${styles.SectionTitle}`}
                                    >
                                        Tags:
                                    </div>
                                    <div className="field is-grouped">
                                        {post.tags.map((p: any, i: any) => (
                                            <Tag key={i} text={p} />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
