import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { connect } from 'react-redux';
import { Post } from 'redux/Posts/Posts.reducer';
import qs from 'query-string';
import { Tag } from 'components/Tag/Tag.component';
import { PostCard } from 'components/PostCard/PostCard.component';
import { Link } from 'react-router-dom';
import {
    FilteredPostsViewPropsAndActions,
    mapDispatchToProps,
    mapStateToProps,
} from './FilteredPostsView.types';

export const FilteredPostsView: FC<FilteredPostsViewPropsAndActions> = (
    props
) => {
    const {
        location,
        history,
        posts,
        clearPosts,
        getPostsByFilter,
        postsLoading,
        setPostLoading,
    } = props;

    const [selectedCategoryFilters, setSelectedCategoryFilters] = useState<string[]>([])
    const [selectedTagFilters, setSelectedTagFilters] = useState<string[]>([])
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = useCallback(async () => {
        setPostLoading(true);
        clearPosts();
        await getPostsByFilter(currentPage, selectedCategoryFilters, selectedTagFilters);
        setPostLoading(false);
    }, [
        selectedCategoryFilters,
        clearPosts,
        currentPage,
        getPostsByFilter,
        setPostLoading,
        selectedTagFilters,
    ]);

    // Memoized value of tags parsed from the URL
    // const tagsFromurl = useMemo<string[] | undefined>(() => {
    //     const queryStrings = qs.parse(history.location.search);
    //
    //     let tags: any = queryStrings['tag'];
    //     if (tags) {
    //         if (typeof tags === 'string' && tags.length > 0) {
    //             return [tags]
    //         } else if (Array.isArray(tags)) {
    //             return tags;
    //         }
    //     }
    //
    //     return undefined;
    // }, [history.location.search])
    //
    // // Memoized value of categories parsed from the URL
    // const categoriesFromUrl = useMemo<string[] | undefined>(() => {
    //     const queryStrings = qs.parse(history.location.search);
    //
    //     let tags: any = queryStrings['tag'];
    //     if (tags) {
    //         if (typeof tags === 'string' && tags.length > 0) {
    //             return [tags]
    //         } else if (Array.isArray(tags)) {
    //             return tags;
    //         }
    //     }
    //
    //     return undefined;
    // }, [history.location.search])
    //
    // // Memoized value of page parsed from the URL
    // const pageFromUrl = useMemo<number | undefined>(() => {
    //     const pageSearchIndex = history.location.search.indexOf('page') + 5;
    //     if (pageSearchIndex) {
    //         const page = history.location.search.substr(pageSearchIndex);
    //         return +page;
    //     }
    //
    //     return undefined;
    // }, [history.location.search]);

    useEffect(() => {
        if (selectedTagFilters.length > 0 || selectedTagFilters.length > 0) {
            fetchData();
        }
    }, [selectedCategoryFilters.length, fetchData, selectedTagFilters.length]);

    const addTagFilter = (tag: string) => {
        if (!selectedTagFilters.includes(tag)) {
            const newTagFilters = [...selectedTagFilters, tag];
            setSelectedTagFilters(newTagFilters);

            const newUrl = `${location.pathname}${location.search}&tag=${tag}`;

            history.push(newUrl);
        }
    };

    const addCategoryFilter = (category: string) => {
        if (!selectedCategoryFilters.includes(category)) {
            const newCategoryFilters = [...selectedCategoryFilters, category];
            setSelectedCategoryFilters(newCategoryFilters);

            const newUrl = `${location.pathname}${location.search}&category=${category}`;

            history.push(newUrl);
        }
    };

    // TODO:
    const onNextPage = useCallback(() => {
        if (posts.length !== 0) {
            setCurrentPage(currentPage + 1);

            history.push({
                search: `?category=${selectedCategoryFilters.length ? : ''}&page=${currentPage + 1}`,
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

    return (
        <div className="container">
            <div>
                <div className="is-size-3 title">Tags:</div>
                {
                    <div className="tags are-large">
                        {!selectedTagFilters || selectedTagFilters.length === 0 ? (
                            <div>No Tag Filters</div>
                        ) : (
                            selectedTagFilters.map((_, i: number) => (
                                <Tag key={i} text={selectedTagFilters[i]} />
                            ))
                        )}
                    </div>
                }

                <div className="is-size-3 title">Categories:</div>
                {
                    <div className="tags are-large">
                        {!selectedCategoryFilters || selectedCategoryFilters.length === 0 ? (
                            <div>No Category Filters</div>
                        ) : (
                            selectedCategoryFilters.map((c: string, i: number) => (
                                <div key={i}>
                                    <Link
                                        to={`/posts?categories=${c}`}
                                    >{`${c}`}</Link>
                                    {`${
                                        i < selectedCategoryFilters.length - 1
                                            ? `, `
                                            : ``
                                    }`}
                                </div>
                            ))
                        )}
                    </div>
                }
            </div>

            <hr />

            <div className="is-size-3 title">Filtered Posts:</div>
            {postsLoading && (
                <progress className="progress is-small is-info" max="100">
                    50%
                </progress>
            )}
            {!postsLoading &&
                posts.map((p: Post, i: number) => (
                    <div key={i}>
                        <PostCard
                            showPreviewOnly
                            post={p}
                            onClickCategory={addCategoryFilter}
                            onClickTag={addTagFilter}
                        />
                        {i < posts.length - 1 ? <hr /> : ``}
                    </div>
                ))}
            {!postsLoading && (
                <button
                    className="button is-info pagination-button"
                    disabled={currentPage === 1}
                    onClick={() => {
                        if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);

                            getPostsByFilter(
                                currentPage - 1,
                                selectedCategoryFilters,
                                selectedTagFilters
                            );
                        }
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
                        if (posts.length !== 0) {
                            setCurrentPage(currentPage + 1);

                            getPostsByFilter(
                                currentPage + 1,
                                selectedCategoryFilters,
                                selectedTagFilters
                            );
                        }
                    }}
                >
                    Next Page
                </button>
            )}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilteredPostsView);
