import React, { FC, useCallback, useEffect, useState } from 'react';
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

    const [currentPage, setCurrentPage] = useState(1);
    const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
    const [tagFilters, setTagFilters] = useState<string[]>([]);

    const fetchData = useCallback(async () => {
        setPostLoading(true);
        clearPosts();
        await getPostsByFilter(currentPage, categoryFilters, tagFilters);
        setPostLoading(false);
    }, [
        categoryFilters,
        clearPosts,
        currentPage,
        getPostsByFilter,
        setPostLoading,
        tagFilters,
    ]);

    useEffect(() => {
        const queryStrings = qs.parse(location.search);

        let tags: any = queryStrings['tag'];
        if (tags) {
            if (typeof tags === 'string' && tags.length > 0) {
                setTagFilters([tags]);
            } else if (Array.isArray(tags)) {
                setTagFilters(tags);
            }
        }

        let categories: any = queryStrings['category'];
        if (categories) {
            if (typeof categories === 'string' && categories.length > 0) {
                setCategoryFilters([categories]);
            } else if (Array.isArray(categories)) {
                setCategoryFilters(categories);
            }
        }
    }, [location.search]); // Call hook when any filter url query params change

    useEffect(() => {
        if (categoryFilters.length > 0 || tagFilters.length > 0) {
            fetchData();
        }
    }, [categoryFilters.length, fetchData, tagFilters.length]);

    const addTagFilter = (tag: string) => {
        if (!tagFilters.includes(tag)) {
            const newTagFilters = [...tagFilters, tag];
            setTagFilters(newTagFilters);

            const newUrl = `${location.pathname}${location.search}&tag=${tag}`;

            history.push(newUrl);
        }
    };

    const addCategoryFilter = (category: string) => {
        if (!categoryFilters.includes(category)) {
            const newCategoryFilters = [...categoryFilters, category];
            setCategoryFilters(newCategoryFilters);

            const newUrl = `${location.pathname}${location.search}&category=${category}`;

            history.push(newUrl);
        }
    };

    return (
        <div className="container">
            <div>
                <div className="is-size-3 title">Tags:</div>
                {
                    <div className="tags are-large">
                        {!tagFilters || tagFilters.length === 0 ? (
                            <div>No Tag Filters</div>
                        ) : (
                            tagFilters.map((_, i: number) => (
                                <Tag key={i} text={tagFilters[i]} />
                            ))
                        )}
                    </div>
                }

                <div className="is-size-3 title">Categories:</div>
                {
                    <div className="tags are-large">
                        {!categoryFilters || categoryFilters.length === 0 ? (
                            <div>No Category Filters</div>
                        ) : (
                            categoryFilters.map((c: string, i: number) => (
                                <div key={i}>
                                    <Link
                                        to={`/posts?categories=${c}`}
                                    >{`${c}`}</Link>
                                    {`${
                                        i < categoryFilters.length - 1
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
                                categoryFilters,
                                tagFilters
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
                                categoryFilters,
                                tagFilters
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
