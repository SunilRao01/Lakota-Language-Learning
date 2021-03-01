/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useCallback, useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { PostCard } from 'components/PostCard/PostCard.component';
import {
    GrammarPropsAndActions,
    mapDispatchToProps,
    mapStateToProps,
} from './Grammar.types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

const Grammar: FC<GrammarPropsAndActions> = (props) => {
    const {
        posts,
        getGrammar,
        getPostsForGrammar,
        grammar,
        postsLoading,
        setPostLoading,
        history,
    } = props;

    const [selectedGrammar, setSelectedGrammar] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Memoized value of grammar parsed from the URL
    const grammarFromUrl = useMemo<string | undefined>(() => {
        const categorySearchIndex =
            history.location.search.indexOf('category') + 9;
        if (categorySearchIndex) {
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

    const fetchGrammar = useCallback(async () => {
        setPostLoading(true);

        await getGrammar();

        setPostLoading(false);
    }, [setPostLoading, getGrammar]);

    const onGrammarSelection = useCallback(
        (grammar: any) => {
            setSelectedGrammar(grammar.grammar);

            history.push({
                search: `?category=${grammar.grammar}&page=1`,
            });
        },
        [history]
    );

    const onNextPage = useCallback(() => {
        if (posts.length !== 0) {
            setCurrentPage(currentPage + 1);

            history.push({
                search: `?category=${selectedGrammar}&page=${currentPage + 1}`,
            });
        }
    }, [currentPage, history, posts.length, selectedGrammar]);
    const onPreviousPage = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);

            history.push({
                search: `?category=${selectedGrammar}&page=${currentPage - 1}`,
            });
        }
    }, [currentPage, history, selectedGrammar]);

    const disableNextPage = useMemo(
        () => posts.length === 0 || posts.length < 5,
        [posts]
    );
    const disablePreviousPage = useMemo(() => currentPage === 1, [currentPage]);

    // On mount, retrieve grammar
    useEffect(() => {
        fetchGrammar();
    }, [fetchGrammar]);

    // Once grammar are retrieved, auto-select the first grammar as the selected grammar and update the URL
    useEffect(() => {
        if (grammar.length > 0 && !selectedGrammar.length) {
            if (!history.location.search || !history.location.search.length) {
                history.replace(`?category=${grammar[0].grammar}&page=1`);
            }
        }
    }, [currentPage, history, grammar, selectedGrammar]);

    // Updates selected grammar from URL whenever a change is occurred
    useEffect(() => {
        grammarFromUrl && setSelectedGrammar(grammarFromUrl);
    }, [grammarFromUrl]);

    // Updates selected grammar from URL whenever a change is occurred
    useEffect(() => {
        setCurrentPage(pageFromUrl || 1);
    }, [pageFromUrl]);

    // Update posts when paginating or changing the grammar
    useEffect(() => {
        const getPostsForSelectedGrammar = async (grammar: string) => {
            setPostLoading(true);
            await getPostsForGrammar(grammar, currentPage);
            setPostLoading(false);
        };

        // history.replace(`?category=${selectedGrammar}&page=${currentPage}`);
        selectedGrammar && getPostsForSelectedGrammar(selectedGrammar);
    }, [currentPage, getPostsForGrammar, selectedGrammar, setPostLoading]);

    return (
        <div className="container">
            <h1 className="title">Grammar</h1>
            {/*Toggle Grammar Tabs*/}
            <div className="tabs is-toggle">
                <ul>
                    {grammar.map((grammar, i) => (
                        <li
                            className={
                                selectedGrammar === grammar.grammar
                                    ? 'is-active'
                                    : undefined
                            }
                            key={i}
                            onClick={() => {
                                onGrammarSelection(grammar);
                            }}
                        >
                            {/*TODO: Bulma is currently not accessible, specifically for usages of <a />*/}
                            {/* being used just for convenience, breaking the required contract for accessibility*/}
                            <a>
                                <span>{grammar.grammar}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>{' '}
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

export default compose<React.ComponentType<GrammarPropsAndActions>>(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Grammar);
