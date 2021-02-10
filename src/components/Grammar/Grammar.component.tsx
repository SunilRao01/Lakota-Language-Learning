/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PostCard } from 'components/PostCard/PostCard.component';
import {
    GrammarPropsAndActions,
    mapDispatchToProps,
    mapStateToProps,
} from './Grammar.types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const Grammar: FC<GrammarPropsAndActions> = (props) => {
    const {
        clearPosts,
        posts,
        getGrammar,
        getPostsForGrammar,
        grammar,
        postsLoading,
        setPostLoading,
        history
    } = props;

    const [selectedGrammar, setSelectedGrammar] = useState<string>();
    const [currentPage, setCurrentPage] = useState(1);

    // Retrieve all grammar
    const fetchData = useCallback(async () => {
        setPostLoading(true);
        clearPosts();

        const grammar: { id: number; grammar: string }[] = await getGrammar();
        if (grammar.length > 0) {
            if (history.location.search) {
                setSelectedGrammar(history.location.search.substr(
                    history.location.search.indexOf('=') + 1
                ))
            } else {
                setSelectedGrammar(grammar[0].grammar);
            }

        }

        setPostLoading(false);
    }, [clearPosts, getGrammar, setPostLoading, history]);

    // On start, retrieve grammar
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Whenever changing the grammar, reset the page number to 1
    //  + update the URL
    useEffect(() => {
        setCurrentPage(1);

        if (selectedGrammar) {
            history.push({
                search: `?category=${selectedGrammar}`
            })
        }
    }, [history, selectedGrammar]);

    // Update posts when paginating or changing the grammar
    useEffect(() => {
        const getPostForSelectedGrammar = async (grammar: string) => {
            clearPosts();
            await getPostsForGrammar(grammar, currentPage);
        };
        selectedGrammar && getPostForSelectedGrammar(selectedGrammar);
    }, [currentPage, clearPosts, getPostsForGrammar, selectedGrammar]);

    return (
        <div className="container">
            <h1 className="title">Grammar</h1>

            {/*Toggle Grammar Tabs*/}
            <div className="tabs is-toggle">
                <ul>
                    {!postsLoading &&
                        grammar.map((grammar, i) => (
                            <li
                                className={
                                    selectedGrammar === grammar.grammar
                                        ? 'is-active'
                                        : undefined
                                }
                                key={i}
                                onClick={() => {
                                    setSelectedGrammar(grammar.grammar);
                                }}
                            >
                                {/*TODO: Bulma is current not accessible, specifically for usages of <a />*/}
                                {/* being used just for convenience, breaking the required contract for accessibility*/}
                                <a>
                                    <span>{grammar.grammar}</span>
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
                selectedGrammar &&
                posts
                    .filter((p) => p.categories.includes(selectedGrammar))
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

export default compose<React.ComponentType<GrammarPropsAndActions>>(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Grammar);
