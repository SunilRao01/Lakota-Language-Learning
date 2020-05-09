import React, {FC, useEffect, useState} from 'react'
import {RootState} from '../../store'
import {connect} from 'react-redux'
import {backendGetPostsByFilters, Post} from '../../redux/Posts/Posts.reducer'
import qs from 'query-string'
import {Tag} from '../Tag/Tag.component'
import {PostCard} from '../PostCard/PostCard.component'
import {Link, RouteComponentProps} from 'react-router-dom'
import {ThunkDispatch} from 'redux-thunk'
import {clearPosts} from '../../redux/Posts/Posts.action'

interface FilteredPostsViewOwnProps {
    posts: Post[]
}

interface FilteredPostsViewActions {
    getPostsByFilter: (pageNumber: number, categories?: string[], tags?: string[]) => void
    clearPosts: () => void
}

type FilteredPostsViewProps =
    RouteComponentProps
    & FilteredPostsViewOwnProps
    & FilteredPostsViewActions

export const mapStateToProps = (state: RootState): FilteredPostsViewOwnProps => {
    return {
        posts: state.postState.posts
    }
}

export const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): FilteredPostsViewActions => {
    return {
        getPostsByFilter: async (pageNumber: number, categories?: string[], tags?: string[]) => {
            await dispatch(backendGetPostsByFilters(pageNumber, categories ? categories : [], tags ? tags : []))
        },
        clearPosts: () => dispatch(clearPosts()),
    }
}

export const FilteredPostsViewComponent: FC<FilteredPostsViewProps> = props => {
    const {location, history, posts, clearPosts, getPostsByFilter} = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [categoryFilters, setCategoryFilters] = useState<string[]>([])
    const [tagFilters, setTagFilters] = useState<string[]>([])

    useEffect(() => {
        const queryStrings = qs.parse(location.search)

        let tags: any = queryStrings['tag'];
        if (tags) {
            if (typeof tags === 'string' && tags.length > 0) {
                setTagFilters([tags])
            } else if (Array.isArray(tags)) {
                setTagFilters(tags)
            }
        }

        let categories: any = queryStrings['category'];
        if (categories) {
            if (typeof categories === 'string' && categories.length > 0) {
                setCategoryFilters([categories])
            } else if (Array.isArray(categories)) {
                setCategoryFilters(categories)
            }
        }
    }, [location.search]) // Call hook when any filter url query params change

    useEffect(() => {
        const fetchData = async () => {
            clearPosts()
            await getPostsByFilter(currentPage, categoryFilters, tagFilters)
        }

        fetchData()
    }, [tagFilters, categoryFilters, clearPosts, getPostsByFilter, currentPage])

    const addTagFilter = (tag: string) => {
        if (!tagFilters.includes(tag)) {
            const newTagFilters = [
                ...tagFilters,
                tag
            ]
            setTagFilters(newTagFilters)

            const newUrl = `${location.pathname}${location.search}&tag=${tag}`

            history.push(newUrl)
        }
    }

    const addCategoryFilter = (category: string) => {
        if (!categoryFilters.includes(category)) {
            const newCategoryFilters = [
                ...categoryFilters,
                category
            ]
            setCategoryFilters(newCategoryFilters)

            const newUrl = `${location.pathname}${location.search}&category=${category}`

            history.push(newUrl)
        }
    }

    return (
        <div className='container'>
            <div>
                <div className='is-size-3 title'>Tags:</div>
                {
                    <div className="tags are-large">
                        {!tagFilters ||
                        tagFilters.length === 0
                            ? <div>No Tag Filters</div>
                            : tagFilters.map((_, i: number) =>
                                <Tag key={i} text={tagFilters[i]}/>)
                        }
                    </div>
                }

                <div className='is-size-3 title'>Categories:</div>
                {
                    <div className="tags are-large">
                        {!categoryFilters ||
                        categoryFilters.length === 0
                            ? <div>No Category Filters</div>
                            : categoryFilters.map((c: string, i: number) =>
                                <div key={i}>
                                    <Link to={`/posts?categories=${c}`}>{`${c}`}</Link>
                                    {`${i < categoryFilters.length - 1 ? `, ` : ``}`}
                                </div>)
                        }
                    </div>
                }
            </div>

            <hr/>

            <div className='is-size-3 title'>Filtered Posts:</div>
            {
                posts.map((p: Post, i: number) => <div key={i}>
                    <PostCard showPreviewOnly={true} post={p} onClickCategory={addCategoryFilter} onClickTag={addTagFilter}/>
                    {i < posts.length - 1 ? <hr/> : ``}
                </div>)
            }
            <button className="button is-info pagination-button"
                    disabled={currentPage === 1}
                    onClick={() => {
                        if (currentPage > 1) {
                            setCurrentPage(currentPage - 1)

                            getPostsByFilter(currentPage - 1, categoryFilters, tagFilters)
                        }
                    }}>
                Previous Page
            </button>
            <button className="button is-info pagination-button"
                    disabled={posts.length === 0 || posts.length < 5}
                    onClick={() => {
                        if (posts.length !== 0) {
                            setCurrentPage(currentPage + 1)

                            getPostsByFilter(currentPage + 1, categoryFilters, tagFilters)
                        }
                    }}>
                Next Page
            </button>
        </div>
    )
}

export const FilteredPostsView = connect(mapStateToProps, mapDispatchToProps)(FilteredPostsViewComponent)
