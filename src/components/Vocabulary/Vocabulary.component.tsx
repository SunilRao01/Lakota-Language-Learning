/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useCallback, useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { PostCard } from 'components/PostCard/PostCard.component';
import {
    VocabularyPropsAndActions,
    mapDispatchToProps,
    mapStateToProps,
} from './Vocabulary.types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { ChevronDownSvg, ChevronUpSvg } from '../../assets';

const Vocabulary: FC<VocabularyPropsAndActions> = (props) => {
    const {
        posts,
        getVocabulary,
        getPostsForVocab,
        vocabulary,
        postsLoading,
        setPostLoading,
        history,
    } = props;

    const [selectedVocab, setSelectedVocab] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [checkboxOpen, setCheckboxOpen] = useState(false);

    // Memoized value of vocab parsed from the URL
    const vocabFromUrl = useMemo<string | undefined>(() => {
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

    const fetchVocabulary = useCallback(async () => {
        setPostLoading(true);

        await getVocabulary();

        setPostLoading(false);
    }, [setPostLoading, getVocabulary]);

    const onVocabSelection = useCallback(
        (vocab: any) => {
            setSelectedVocab(vocab.vocab);

            history.push({
                search: `?category=${vocab.vocab}&page=1`,
            });
        },
        [history]
    );

    const onNextPage = useCallback(() => {
        if (posts.length !== 0) {
            setCurrentPage(currentPage + 1);

            history.push({
                search: `?category=${selectedVocab}&page=${currentPage + 1}`,
            });
        }
    }, [currentPage, history, posts.length, selectedVocab]);
    const onPreviousPage = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);

            history.push({
                search: `?category=${selectedVocab}&page=${currentPage - 1}`,
            });
        }
    }, [currentPage, history, selectedVocab]);

    const disableNextPage = useMemo(
        () => posts.length === 0 || posts.length < 5,
        [posts]
    );
    const disablePreviousPage = useMemo(() => currentPage === 1, [currentPage]);

    // On mount, retrieve vocabulary
    useEffect(() => {
        fetchVocabulary();
    }, [fetchVocabulary]);

    // Once vocabulary are retrieved, auto-select the first vocabulary as the selected vocab and update the URL
    useEffect(() => {
        if (vocabulary.length > 0 && !selectedVocab.length) {
            if (!history.location.search) {
                history.replace(`?category=${vocabulary[0].vocab}&page=1`);
            }
        }
    }, [currentPage, history, vocabulary, selectedVocab]);

    // Updates selected vocab from URL whenever a change is occurred
    useEffect(() => {
        vocabFromUrl && setSelectedVocab(decodeURI(vocabFromUrl));
    }, [vocabFromUrl]);

    // Updates selected vocab from URL whenever a change is occurred
    useEffect(() => {
        setCurrentPage(pageFromUrl || 1);
    }, [pageFromUrl]);

    // Update posts when paginating or changing the vocabulary
    useEffect(() => {
        const getPostsForSelectedVocab = async (vocab: string) => {
            setPostLoading(true);
            await getPostsForVocab(vocab, currentPage);
            setPostLoading(false);
        };

        // history.replace(`?category=${selectedVocab}&page=${currentPage}`);
        selectedVocab && getPostsForSelectedVocab(selectedVocab);
    }, [currentPage, getPostsForVocab, selectedVocab, setPostLoading]);

    return (
        <div className="container">
            <h1 className="title">Vocabulary</h1>
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
                            <span>{selectedVocab}</span>
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
                            {vocabulary
                                .sort((a, b) => a.vocab.localeCompare(b.vocab))
                                .map((vocab, i) => (
                                    <a
                                        key={i}
                                        className="dropdown-item"
                                        onClick={() => {
                                            onVocabSelection(vocab);
                                        }}
                                    >
                                        {vocab.vocab}
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
                selectedVocab &&
                posts
                    .filter((p) => p.categories.includes(selectedVocab))
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

export default compose<React.ComponentType<VocabularyPropsAndActions>>(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Vocabulary);
