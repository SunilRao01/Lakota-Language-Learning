import React, { FC, useEffect, useMemo } from 'react';
import { Post } from 'redux/Posts/Posts.reducer';
import { connect } from 'react-redux';
import { PostCard } from 'components/PostCard/PostCard.component';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import styles from './AdminHome.module.scss';
import {
    AdminHomePropsWithActions,
    mapDispatchToProps,
    mapStateToProps,
} from './AdminHome.types';

const AdminHome: FC<AdminHomePropsWithActions> = (props) => {
    const { jwt, posts, getPosts, deletePost, history } = props;

    const postUrlPageParam = useMemo(
        () =>
            history.location.search
                ? +history.location.search.substr(
                      history.location.search.indexOf('=') + 1
                  )
                : undefined,
        [history.location.search]
    );

    useEffect(() => {
        const getUpdatedPosts = async () => {
            await getPosts(postUrlPageParam || 1);
        };

        getUpdatedPosts();
    }, [postUrlPageParam, getPosts]);

    if (!jwt || jwt.length === 0) {
        return <Redirect to={'/admin/login'} />;
    }

    return (
        <div className="container">
            <h1 className="title">Admin: Posts View</h1>
            <div className="buttons">
                <Link to={'/admin/posts/new'} className="button is-primary">
                    Create New Post
                </Link>
                <Link to={'/admin/lessons'} className="button is-primary">
                    Change Lessons
                </Link>
                <Link to={'/admin/grammar'} className="button is-primary">
                    Change Grammar
                </Link>
                <Link to={'/admin/vocabulary'} className="button is-primary">
                    Change Vocabulary
                </Link>
                <Link to={'/admin/podcasts'} className="button is-primary">
                    Change Podcasts
                </Link>
                <Link to={'/admin/sitemap'} className="button is-primary">
                    Change Sitemap
                </Link>
            </div>
            <hr />
            {posts.map((p: Post, i: number) => (
                <div key={i}>
                    <PostCard post={p} showPreviewOnly />
                    <Link
                        className={`button is-primary ${styles.AdminButton}`}
                        to={`/admin/post/${p.id}`}
                    >
                        Edit
                    </Link>
                    <button
                        className={`button is-danger ${styles.AdminButton}`}
                        onClick={async () => {
                            await deletePost(p.id, jwt);
                        }}
                    >
                        Delete
                    </button>
                    {i < posts.length - 1 ? <hr /> : ``}
                </div>
            ))}
            <button
                className="button is-info pagination-button"
                disabled={
                    postUrlPageParam === undefined || postUrlPageParam === 1
                }
                onClick={() => {
                    window.scrollTo(0, 0);

                    history.push({
                        search: `?page=${(postUrlPageParam || 2) - 1}`,
                    });
                }}
            >
                Previous Page
            </button>
            <button
                className="button is-info pagination-button"
                disabled={posts.length === 0 || posts.length < 5}
                onClick={() => {
                    window.scrollTo(0, 0);

                    history.push({
                        search: `?page=${(postUrlPageParam || 1) + 1}`,
                    });
                }}
            >
                Next Page
            </button>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
