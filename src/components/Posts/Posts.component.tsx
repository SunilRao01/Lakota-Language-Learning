import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'redux/store';
import { backendGetPost, IQuiz, Post } from 'redux/Posts/Posts.reducer';
import { Tag } from 'components/Tag/Tag.component';
import { RouteComponentProps } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import Viewer from 'tui-editor/dist/tui-editor-Viewer';
import { QuizCard } from 'components/QuizCard/QuizCard.component';
import { Link } from 'react-router-dom';
import './Posts.css';
import { setCurrentPost, setPostLoading } from 'redux/Posts/Posts.action';

interface PostsOwnProps {
    post: Post | undefined;
    posts: Post[];
    postsLoading: boolean;
}

interface PostActions {
    getPost: (postId: number) => void;
    setCurrentPost: (post: Post) => void;
    setPostLoading: (loading: boolean) => void;
}

type PostsProps = PostsOwnProps &
    RouteComponentProps<{ postId: string }> &
    PostActions;

export const PostsComponent: FC<PostsProps> = (props) => {
    const {
        posts,
        getPost,
        setCurrentPost,
        post,
        history,
        setPostLoading,
        postsLoading,
    } = props;

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
        if (post && post.content && !postsLoading) {
            new Viewer({
                el: document.querySelector('#post-content')!,
                initialValue: post.content,
            });
        }
    }, [post, postsLoading]);

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
                            {post.content && <div id="post-content" />}
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
                            <div className="has-text-weight-bold section-title">
                                Posted:
                            </div>
                            <p className="is-size-8">
                                {new Date(post.creationDate).toString()}
                            </p>
                            <div className="has-text-weight-bold section-title">
                                Categories:
                            </div>
                            <p>
                                {post.categories.map((c: string, i: number) => (
                                    <Link
                                        key={i}
                                        className="is-size-6"
                                        to={`/posts?category=${c}`}
                                    >
                                        {`${c}${
                                            i < post!.categories.length - 1
                                                ? ', '
                                                : ''
                                        }`}
                                    </Link>
                                ))}
                            </p>
                            <div className="has-text-weight-bold section-title">
                                Tags:
                            </div>
                            <div className="field is-grouped">
                                {post.tags.map((p: any, i: any) => (
                                    <Tag key={i} text={p} />
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export const mapStateToProps = (state: RootState): PostsOwnProps => ({
    post: state.postState.currentPost,
    posts: state.postState.posts,
    postsLoading: state.postState.loadingPosts,
});

export const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): PostActions => {
    return {
        getPost: async (postId: number) => {
            return await dispatch(backendGetPost(postId));
        },
        setCurrentPost: (post: Post) => dispatch(setCurrentPost(post)),
        setPostLoading: (loading: boolean) => dispatch(setPostLoading(loading)),
    };
};

export const Posts = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostsComponent);
