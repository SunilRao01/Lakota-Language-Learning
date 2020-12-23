/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PostCard } from 'components/PostCard/PostCard.component';
import {
    mapDispatchToProps,
    mapStateToProps,
    VocabularyPropsAndActions,
} from './Vocabulary.types';

const Vocabulary: FC<VocabularyPropsAndActions> = (props) => {
    const {
        clearPosts,
        posts,
        getVocabulary,
        getPostsForVocab,
        vocabulary,
        postsLoading,
        setPostLoading,
    } = props;

    const [selectedVocab, setSelectedVocab] = useState<string>();
    const [currentPage, setCurrentPage] = useState(1);

    // Retrieve all vocabulary
    const fetchData = useCallback(async () => {
        setPostLoading(true);
        clearPosts();

        const vocabulary: {
            id: number;
            vocab: string;
        }[] = await getVocabulary();
        if (vocabulary.length > 0) {
            setSelectedVocab(vocabulary[0].vocab);
        }

        setPostLoading(false);
    }, [clearPosts, getVocabulary, setPostLoading]);

    // On start, retrieve vocabulary
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Whenever changing the vocab, reset the page number to 1
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedVocab]);

    // Update posts when paginating or changing the vocabulary
    useEffect(() => {
        const getPostForSelectedVocab = async (vocab: string) => {
            clearPosts();
            await getPostsForVocab(vocab, currentPage);
        };
        selectedVocab && getPostForSelectedVocab(selectedVocab);
    }, [currentPage, clearPosts, getPostsForVocab, selectedVocab]);

    return (
        <div className="container">
            <h1 className="title">Vocabulary</h1>

            {/*Toggle Vocabulary Tabs*/}
            <div className="tabs is-toggle">
                <ul>
                    {!postsLoading &&
                        vocabulary.map((vocab, i) => (
                            <li
                                className={
                                    selectedVocab === vocab.vocab
                                        ? 'is-active'
                                        : undefined
                                }
                                key={i}
                                onClick={() => {
                                    setSelectedVocab(vocab.vocab);
                                }}
                            >
                                {/*TODO: Bulma is current not accessible, specifically for usages of <a />*/}
                                {/* being used just for convenience, breaking the required contract for accessibility*/}
                                <a>
                                    <span>{vocab.vocab}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Vocabulary);
