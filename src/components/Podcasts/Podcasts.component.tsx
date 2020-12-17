/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PostCard } from 'components/PostCard/PostCard.component';
import {
    PodcastsPropsAndActions,
    mapDispatchToProps,
    mapStateToProps,
} from './Podcasts.types';

const Podcasts: FC<PodcastsPropsAndActions> = (props) => {
    const {
        clearPosts,
        posts,
        getPodcasts,
        getPostsForPodcast,
        podcasts,
        postsLoading,
        setPostLoading,
    } = props;

    const [selectedPodcast, setSelectedPodcast] = useState<string>();
    const [currentPage, setCurrentPage] = useState(1);

    // Retrieve all podcasts
    const fetchData = useCallback(async () => {
        setPostLoading(true);
        clearPosts();

        const podcasts: { id: number; podcast: string }[] = await getPodcasts();
        if (podcasts.length > 0) {
            setSelectedPodcast(podcasts[0].podcast);
        }

        setPostLoading(false);
    }, [clearPosts, getPodcasts, setPostLoading]);

    // On start, retrieve podcasts
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Whenever changing the podcast, reset the page number to 1
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedPodcast]);

    // Update posts when paginating or changing the podcasts
    useEffect(() => {
        const getPostForSelectedPodcast = async (podcast: string) => {
            clearPosts();
            await getPostsForPodcast(podcast, currentPage);
        };
        selectedPodcast && getPostForSelectedPodcast(selectedPodcast);
    }, [currentPage, clearPosts, getPostsForPodcast, selectedPodcast]);

    return (
        <div className="container">
            <h1 className="title">Podcasts</h1>

            {/*Toggle Podcasts Tabs*/}
            <div className="tabs is-toggle">
                <ul>
                    {!postsLoading &&
                        podcasts.map((podcast, i) => (
                            <li
                                className={
                                    selectedPodcast === podcast.podcast
                                        ? 'is-active'
                                        : undefined
                                }
                                key={i}
                                onClick={() => {
                                    setSelectedPodcast(podcast.podcast);
                                }}
                            >
                                {/*TODO: Bulma is current not accessible, specifically for usages of <a />*/}
                                {/* being used just for convenience, breaking the required contract for accessibility*/}
                                <a>
                                    <span>{podcast.podcast}</span>
                                </a>
                            </li>
                        ))}
                </ul>
            </div>

            <hr />
            {postsLoading && (
                <progress className="progress is-small is-info" max="100">
                    50%
                </progress>
            )}
            {!postsLoading &&
                podcasts.map((podcast, i) => (
                    <Fragment key={i}>
                        {posts
                            .filter((p) =>
                                p.categories.includes(podcast.podcast)
                            )
                            .map((p, i) => (
                                <div key={i}>
                                    <PostCard post={p} showPreviewOnly />
                                </div>
                            ))}
                    </Fragment>
                ))}

            <button
                className="button is-info pagination-button"
                disabled={currentPage === 1}
                onClick={() => {
                    if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                    }
                }}
            >
                Previous Page
            </button>
            <button
                className="button is-info pagination-button"
                disabled={posts.length === 0 || posts.length < 5}
                onClick={() => {
                    if (posts.length !== 0) {
                        setCurrentPage(currentPage + 1);
                    }
                }}
            >
                Next Page
            </button>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Podcasts);
