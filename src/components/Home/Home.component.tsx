import React, { FC, useCallback, useEffect, useState } from 'react';
import './Home.css';
import {
    backendGetCategories,
    backendGetPosts,
    backendGetTags,
    backendGetWordOfTheDayPosts,
    Post,
} from 'redux/Posts/Posts.reducer';
import { connect } from 'react-redux';
import { RootState } from 'redux/store';
import { PostCard } from 'components/PostCard/PostCard.component';
import { Tag } from 'components/Tag/Tag.component';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { setPostLoading } from 'redux/Posts/Posts.action';

interface HomeActions {
    getPosts: (pageNumber: number) => void;
    getCategories: () => void;
    getTags: () => void;
    getWordOfTheDayPosts: () => void;
    setPostLoading: (loading: boolean) => void;
}

interface HomeProps {
    posts: Post[];
    wordOfTheDayPosts: Post[];
    categories: string[];
    tags: string[];
    postsLoading: boolean;
}

type HomePropsWithActions = HomeProps & HomeActions;

export const mapStateToProps = (state: RootState): HomeProps => ({
    posts: state.postState.posts,
    wordOfTheDayPosts: state.postState.wordOfTheDayPosts
        ? state.postState.wordOfTheDayPosts
        : [],
    categories: state.postState.categories ? state.postState.categories : [],
    tags: state.postState.tags ? state.postState.tags : [],
    postsLoading: state.postState.loadingPosts,
});

export const mapDispatchToProps = (
    dispatch: ThunkDispatch<{}, {}, any>
): HomeActions => {
    return {
        getPosts: async (pageNumber: number) => {
            await dispatch(backendGetPosts(pageNumber));
        },
        getCategories: async () => {
            await dispatch(backendGetCategories());
        },
        getTags: async () => {
            await dispatch(backendGetTags());
        },
        getWordOfTheDayPosts: async () => {
            await dispatch(backendGetWordOfTheDayPosts(1));
        },
        setPostLoading: (loading: boolean) => dispatch(setPostLoading(loading)),
    };
};

const HomeComponent: FC<HomePropsWithActions> = (props) => {
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
        await getCategories();
        await getTags();
        await getWordOfTheDayPosts();
        setPostLoading(false);
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
                <div className="column is-narrow title-anim">
                    <p className="title is-2">Lakota Language Learning</p>
                    <p className="subtitle is-4 swing-in-top-bck">
                        Lakota lessons and language tools from Alex
                    </p>
                </div>
            </div>
            <div className="columns is-variable is-4">
                <div className="column is-two-thirds">
                    <h3 className="title is-3">Recent Posts:</h3>
                    {postsLoading && (
                        <progress
                            data-testid={'progress-bar'}
                            className="progress is-small is-info"
                            max="100"
                        >
                            50%
                        </progress>
                    )}
                    {!postsLoading &&
                        posts.map((p: Post, i: number) => (
                            <div key={i}>
                                <PostCard showPreviewOnly={true} post={p} />
                                {i < posts.length - 1 ? <hr /> : ``}
                            </div>
                        ))}
                    {!postsLoading && (
                        <button
                            className="button is-info pagination-button"
                            disabled={currentPage === 1}
                            onClick={() => {
                                window.scrollTo(0, 0);
                                getPosts(currentPage - 1);
                                setCurrentPage(currentPage - 1);
                            }}
                        >
                            Previous Page
                        </button>
                    )}
                    {!postsLoading && (
                        <button
                            className="button is-info pagination-button"
                            disabled={posts.length === 0 || posts.length < 5}
                            onClick={() => {
                                window.scrollTo(0, 0);
                                getPosts(currentPage + 1);
                                setCurrentPage(currentPage + 1);
                            }}
                        >
                            Next Page
                        </button>
                    )}
                    <br />
                </div>
                <div className="column">
                    <div
                        className="word-of-the-day-section"
                        data-testid="word-of-the-day"
                    >
                        <h3 className="title is-3">Word of the Day:</h3>
                        {wordOfTheDayPosts.map((p: Post, i: number) => (
                            <div key={i}>
                                <PostCard post={p} showTitleOnly={true} />
                            </div>
                        ))}
                    </div>

                    <div className="categories-section">
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
                        <div className="field is-grouped tags-section">
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

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
