import React, { FC, useCallback, useEffect, useMemo } from 'react';
import styles from './Home.module.scss';
import { Post } from 'redux/Posts/Posts.reducer';
import { connect } from 'react-redux';
import { PostCard } from 'components/PostCard/PostCard.component';
import { Tag } from 'components/Tag/Tag.component';
import { Link, withRouter } from 'react-router-dom';
import {
    HomePropsWithActions,
    mapDispatchToProps,
    mapStateToProps,
} from './Home.types';
import { compose } from 'redux';

const Home: FC<HomePropsWithActions> = (props) => {
    const {
        posts,
        categories,
        getCategories,
        getPosts,
        getTags,
        getWordOfTheDayPosts,
        tags,
        wordOfTheDayPosts,
        setPostLoading,
        postsLoading,
        history,
    } = props;

    const postUrlPageParam = useMemo(
        () =>
            history.location.search
                ? +history.location.search.substr(
                      history.location.search.indexOf('=') + 1
                  )
                : undefined,
        [history.location.search]
    );

    const fetchData = useCallback(async () => {
        setPostLoading(true);

        await getCategories();
        await getTags();
        await getWordOfTheDayPosts();

        setPostLoading(false);
    }, [getCategories, getTags, getWordOfTheDayPosts, setPostLoading]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const getUpdatedPosts = async () => {
            setPostLoading(true);
            await getPosts(postUrlPageParam || 1);
            setPostLoading(false);
        };

        getUpdatedPosts();
    }, [postUrlPageParam, getPosts, setPostLoading]);

    return (
        <div className="container">
            <div className="columns is-centered">
                <div className={`column is-narrow ${styles.TitleAnim}`}>
                    <p className="title is-2">Lakota Language Learning</p>
                    <p className={`subtitle is-4 ${styles.swingInTopForward}`}>
                        Lakota lessons and language tools from Alex
                    </p>
                </div>
            </div>
            <div className="columns is-variable is-4">
                <div
                    className="column is-two-thirds"
                    data-testid="post-container"
                >
                    <h3 className="title is-3">Recent Posts:</h3>
                    {postsLoading && (
                        <progress
                            data-testid="progress-bar"
                            className="progress is-small is-info"
                            max="100"
                        >
                            50%
                        </progress>
                    )}
                    {!postsLoading &&
                        posts &&
                        posts.length > 0 &&
                        posts.slice(0, 5).map((p: Post, i: number) => (
                            <div key={i}>
                                <PostCard showPreviewOnly post={p} />
                                {i < posts.length - 1 ? <hr /> : ``}
                            </div>
                        ))}
                    {!postsLoading && (
                        <button
                            className="button is-info pagination-button"
                            disabled={
                                postUrlPageParam === undefined ||
                                postUrlPageParam === 1
                            }
                            onClick={() => {
                                window.scrollTo(0, 0);

                                history.push({
                                    search: `?page=${
                                        (postUrlPageParam || 1) - 1
                                    }`,
                                });
                            }}
                            data-testid="previous-page"
                        >
                            Previous Page
                        </button>
                    )}
                    {!postsLoading && posts && (
                        <button
                            className="button is-info pagination-button"
                            disabled={posts.length === 0 || posts.length < 5}
                            onClick={() => {
                                window.scrollTo(0, 0);

                                history.push({
                                    search: `?page=${
                                        (postUrlPageParam || 1) + 1
                                    }`,
                                });
                            }}
                            data-testid="next-page"
                        >
                            Next Page
                        </button>
                    )}
                    <br />
                </div>
                <div className="column">
                    <div
                        className={styles.WordOfTheDaySection}
                        data-testid="word-of-the-day"
                    >
                        <h3 className="title is-3">Word of the Day:</h3>
                        {wordOfTheDayPosts.map((p: Post, i: number) => (
                            <div key={i}>
                                <PostCard post={p} showTitleOnly />
                            </div>
                        ))}
                    </div>

                    <div className={styles.CategorySection}>
                        <h3 className="title is-3">Categories:</h3>
                        <div>
                            {categories.length > 0 &&
                                Array.from(categories.values()).map(
                                    (c: string, i: number) => {
                                        return (
                                            <div
                                                className="swing-in-top-bck"
                                                key={i}
                                            >
                                                <Link
                                                    to={`/posts?category=${c}&page=1`}
                                                >{`${c}`}</Link>
                                                {`${
                                                    i < categories.length - 1
                                                        ? `,`
                                                        : ``
                                                }`}
                                                &nbsp;
                                            </div>
                                        );
                                    }
                                )}
                        </div>
                    </div>

                    <div>
                        <h3 className="title is-3">Tags:</h3>
                        <div className={`${styles.TagSection}`}>
                            {tags.length > 0 &&
                                Array.from(tags).map((t: string, i: number) => {
                                    return <Tag key={i} text={t} />;
                                })}
                            {tags.length > 0 &&
                                Array.from(tags).map((t: string, i: number) => {
                                    return <Tag key={i} text={t} />;
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default compose<React.ComponentType<HomePropsWithActions>>(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Home);
