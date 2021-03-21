import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
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

    const [selectedCategoryFilters, setSelectedCategoryFilters] = useState<
        string[]
    >([]);
    const [selectedTagFilters, setSelectedTagFilters] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Memoized value of tags parsed from the URL
    const tagsFromUrl = useMemo<string[] | undefined>(() => {
        const queryStrings = qs.parse(history.location.search);

        let tags: any = queryStrings['tag'];
        if (tags) {
            if (typeof tags === 'string' && tags.length > 0) {
                return [tags];
            } else if (Array.isArray(tags)) {
                return tags;
            }
        }

        return undefined;
    }, [history.location.search]);

    // Memoized value of categories parsed from the URL
    const categoriesFromUrl = useMemo<string[] | undefined>(() => {
        const queryStrings = qs.parse(history.location.search);

        let categories: any = queryStrings['category'];
        if (categories) {
            if (typeof categories === 'string' && categories.length > 0) {
                return [categories];
            } else if (Array.isArray(categories)) {
                return categories;
            }
        }

        return undefined;
    }, [history.location.search]);

    // Memoized value of page parsed from the URL
    const pageFromUrl = useMemo<number | undefined>(() => {
        const queryStrings = qs.parse(history.location.search);

        let page: any = queryStrings['page'];
        if (page) {
            return +page;
        }

        return undefined;
    }, [history.location.search]);

    useEffect(() => {
        categoriesFromUrl && setSelectedCategoryFilters(categoriesFromUrl);
    }, [categoriesFromUrl]);

    useEffect(() => {
        tagsFromUrl && setSelectedTagFilters(tagsFromUrl);
    }, [tagsFromUrl]);

    useEffect(() => {
        pageFromUrl
            ? setCurrentPage(pageFromUrl)
            : history.replace(`${location.pathname}${location.search}&page=1`);
    }, [history, location.pathname, location.search, pageFromUrl]);

    useEffect(() => {}, [currentPage]);

    // TODO: Figure out why this function is being called twice, when navigating to it
    //  from somewhere (e.g. clicking on a category on the home page)
    useEffect(() => {
        const getPostsForCategoriesAndTags = async (
            categories: string[],
            tags: string[]
        ) => {
            setPostLoading(true);
            clearPosts();
            await getPostsByFilter(currentPage, categories, tags);
            setPostLoading(false);
        };

        (selectedCategoryFilters.length > 0 || selectedTagFilters.length > 0) &&
            getPostsForCategoriesAndTags(
                selectedCategoryFilters,
                selectedTagFilters
            );
    }, [
        clearPosts,
        currentPage,
        getPostsByFilter,
        selectedCategoryFilters,
        selectedTagFilters,
        setPostLoading,
    ]);

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

    const parsedUrlFromFilters = useMemo(() => {
        let searchQuery: string = '';

        // Add categories to URL
        for (let i = 0; i < selectedCategoryFilters.length; i++) {
            const category = selectedCategoryFilters[i];

            if (i === 0) {
                searchQuery += `?category=${category}`;
            } else {
                searchQuery += `&category=${category}`;
            }
        }

        // Add tags to URL
        for (let i = 0; i < selectedTagFilters.length; i++) {
            const tag = selectedTagFilters[i];

            if (i === 0 && selectedCategoryFilters.length === 0) {
                searchQuery += `?tag=${tag}`;
            } else {
                searchQuery += `&tag=${tag}`;
            }
        }

        return searchQuery;
    }, [selectedTagFilters, selectedCategoryFilters]);

    const onNextPage = useCallback(() => {
        if (posts.length !== 0) {
            // setCurrentPage(currentPage + 1);

            history.push({
                search: `${parsedUrlFromFilters}&page=${currentPage + 1}`,
            });
        }
    }, [currentPage, history, parsedUrlFromFilters, posts.length]);

    const onPreviousPage = useCallback(() => {
        if (currentPage > 1) {
            // setCurrentPage(currentPage - 1);

            history.push({
                search: `${parsedUrlFromFilters}&page=${currentPage - 1}`,
            });
        }
    }, [currentPage, history, parsedUrlFromFilters]);

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
                        {!selectedTagFilters ||
                        selectedTagFilters.length === 0 ? (
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
                        {!selectedCategoryFilters ||
                        selectedCategoryFilters.length === 0 ? (
                            <div>No Category Filters</div>
                        ) : (
                            selectedCategoryFilters.map(
                                (c: string, i: number) => (
                                    <div key={i}>
                                        <Link
                                            to={`/posts?category=${c}`}
                                        >{`${c}`}</Link>
                                        {`${
                                            i <
                                            selectedCategoryFilters.length - 1
                                                ? `, `
                                                : ``
                                        }`}
                                    </div>
                                )
                            )
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
                    disabled={disablePreviousPage}
                    onClick={onPreviousPage}
                >
                    Previous Page
                </button>
            )}
            {!postsLoading && (
                <button
                    className="button is-info pagination-button"
                    disabled={disableNextPage}
                    onClick={onNextPage}
                >
                    Next Page
                </button>
            )}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilteredPostsView);
