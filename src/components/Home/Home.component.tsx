import React, { FC, useCallback, useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { Post } from 'redux/Posts/Posts.reducer';
import { connect } from 'react-redux';
import { PostCard } from 'components/PostCard/PostCard.component';
import { Tag } from 'components/Tag/Tag.component';
import { Link } from 'react-router-dom';
import {
    HomePropsWithActions,
    mapDispatchToProps,
    mapStateToProps,
} from './Home.types';

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
    } = props;
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = useCallback(async () => {
        setPostLoading(true);
        await getPosts(1);
        setPostLoading(false);

        await getCategories();
        await getTags();
        await getWordOfTheDayPosts();
    }, [
        getCategories,
        getPosts,
        getTags,
        getWordOfTheDayPosts,
        setPostLoading,
    ]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
                <div className="column is-two-thirds" data-testid='post-container'>
                    <h3 className="title is-3">Recent Posts:</h3>
                    {postsLoading && (
                        <progress
                            data-testid='progress-bar'
                            className="progress is-small is-info"
                            max="100"
                        >
                            50%
                        </progress>
                    )}
                    {!postsLoading && posts && posts.length > 0 &&
                        posts.slice(0, 5).map((p: Post, i: number) => (
                            <div key={i}>
                                <PostCard showPreviewOnly post={p} />
                                {i < posts.length - 1 ? <hr /> : ``}
                            </div>
                        ))}
                    {!postsLoading && (
                        <button
                            className='button is-info pagination-button'
                            disabled={currentPage === 1}
                            onClick={() => {
                                window.scrollTo(0, 0);
                                getPosts(currentPage - 1);
                                setCurrentPage(currentPage - 1);
                            }}
                            data-testid='previous-page'
                        >
                            Previous Page
                        </button>
                    )}
                    {!postsLoading && posts && (
                        <button
                            className='button is-info pagination-button'
                            disabled={posts.length === 0 || posts.length < 5}
                            onClick={() => {
                                window.scrollTo(0, 0);
                                getPosts(currentPage + 1);
                                setCurrentPage(currentPage + 1);
                            }}
                            data-testid='next-page'
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
                                                    to={`/posts?category=${c}`}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
