/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useCallback, useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { PostCard } from 'components/PostCard/PostCard.component';
import {
    PodcastsPropsAndActions,
    mapDispatchToProps,
    mapStateToProps,
} from './Podcasts.types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { ChevronDownSvg, ChevronUpSvg } from '../../assets';

const Podcasts: FC<PodcastsPropsAndActions> = (props) => {
    const {
        posts,
        getPodcasts,
        getPostsForPodcast,
        podcasts,
        postsLoading,
        setPostLoading,
        history,
    } = props;

    const [selectedPodcast, setSelectedPodcast] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [checkboxOpen, setCheckboxOpen] = useState(false);

    // Memoized value of podcast parsed from the URL
    const podcastFromUrl = useMemo<string | undefined>(() => {
        const categorySearchIndex =
            history.location.search.indexOf('category') + 9;
        if (history.location.search && categorySearchIndex) {
            const endSearchIndex = history.location.search.indexOf('&')
                ? history.location.search.indexOf('&') -
                  history.location.search.indexOf('=') -
                  1
                : undefined;
            return history.location.search.substr(
                categorySearchIndex,
                endSearchIndex
            );
        }

        return undefined;
    }, [history.location.search]);

    // Memoized value of page parsed from the URL
    const pageFromUrl = useMemo<number | undefined>(() => {
        const pageSearchIndex = history.location.search.indexOf('page') + 5;
        if (pageSearchIndex) {
            const page = history.location.search.substr(pageSearchIndex);
            return +page;
        }

        return undefined;
    }, [history.location.search]);

    const fetchPodcasts = useCallback(async () => {
        setPostLoading(true);

        await getPodcasts();

        setPostLoading(false);
    }, [setPostLoading, getPodcasts]);

    const onPodcastSelection = useCallback(
        (podcast: any) => {
            setSelectedPodcast(podcast.podcast);

            history.push({
                search: `?category=${podcast.podcast}&page=1`,
            });
        },
        [history]
    );

    const onNextPage = useCallback(() => {
        if (posts.length !== 0) {
            setCurrentPage(currentPage + 1);

            history.push({
                search: `?category=${selectedPodcast}&page=${currentPage + 1}`,
            });
        }
    }, [currentPage, history, posts.length, selectedPodcast]);
    const onPreviousPage = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);

            history.push({
                search: `?category=${selectedPodcast}&page=${currentPage - 1}`,
            });
        }
    }, [currentPage, history, selectedPodcast]);

    const disableNextPage = useMemo(
        () => posts.length === 0 || posts.length < 5,
        [posts]
    );
    const disablePreviousPage = useMemo(() => currentPage === 1, [currentPage]);

    // On mount, retrieve podcasts
    useEffect(() => {
        fetchPodcasts();
    }, [fetchPodcasts]);

    // Once podcasts are retrieved, auto-select the first podcasts as the selected podcast and update the URL
    useEffect(() => {
        if (podcasts.length > 0 && !selectedPodcast.length) {
            if (!history.location.search) {
                history.replace(`?category=${podcasts[0].podcast}&page=1`);
            }
        }
    }, [currentPage, history, podcasts, selectedPodcast]);

    // Updates selected podcast from URL whenever a change is occurred
    useEffect(() => {
        podcastFromUrl && setSelectedPodcast(decodeURI(podcastFromUrl));
    }, [podcastFromUrl]);

    // Updates selected podcast from URL whenever a change is occurred
    useEffect(() => {
        setCurrentPage(pageFromUrl || 1);
    }, [pageFromUrl]);

    // Update posts when paginating or changing the podcasts
    useEffect(() => {
        const getPostsForSelectedPodcast = async (podcast: string) => {
            setPostLoading(true);
            await getPostsForPodcast(podcast, currentPage);
            setPostLoading(false);
        };

        // history.replace(`?category=${selectedPodcast}&page=${currentPage}`);
        selectedPodcast && getPostsForSelectedPodcast(selectedPodcast);
    }, [currentPage, getPostsForPodcast, selectedPodcast, setPostLoading]);

    return (
        <div className="container">
            <h1 className="title">Media</h1>
            <div>
                <div
                    className={`dropdown ${checkboxOpen ? 'is-active' : ''}`}
                    onClick={() => {
                        setCheckboxOpen(!checkboxOpen);
                    }}
                >
                    <div className="dropdown-trigger">
                        <button
                            className="button"
                            aria-haspopup="true"
                            aria-controls="dropdown-menu"
                        >
                            <span>{selectedPodcast}</span>
                            <span className="icon is-small">
                                {checkboxOpen ? (
                                    <img src={ChevronUpSvg} alt="up arrow" />
                                ) : (
                                    <img
                                        src={ChevronDownSvg}
                                        alt="down arrow"
                                    />
                                )}
                            </span>
                        </button>
                    </div>
                    <div
                        className="dropdown-menu"
                        id="dropdown-menu"
                        role="menu"
                    >
                        <div className="dropdown-content">
                            {podcasts
                                .sort((a, b) =>
                                    a.podcast.localeCompare(b.podcast)
                                )
                                .map((podcast, i) => (
                                    <a
                                        key={i}
                                        className="dropdown-item"
                                        onClick={() => {
                                            onPodcastSelection(podcast);
                                        }}
                                    >
                                        {podcast.podcast}
                                    </a>
                                ))}
                        </div>
                    </div>
                </div>
            </div>{' '}
            <hr />
            {postsLoading && (
                <progress className="progress is-small is-info" max="100">
                    50%
                </progress>
            )}
            {!postsLoading &&
                selectedPodcast &&
                posts
                    .filter((p) => p.categories.includes(selectedPodcast))
                    .map((p, i) => (
                        <div key={i}>
                            <PostCard post={p} showPreviewOnly />
                        </div>
                    ))}
            <button
                className="button is-info pagination-button"
                disabled={disablePreviousPage}
                onClick={onPreviousPage}
            >
                Previous Page
            </button>
            <button
                className="button is-info pagination-button"
                disabled={disableNextPage}
                onClick={onNextPage}
            >
                Next Page
            </button>
        </div>
    );
};

export default compose<React.ComponentType<PodcastsPropsAndActions>>(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Podcasts);
