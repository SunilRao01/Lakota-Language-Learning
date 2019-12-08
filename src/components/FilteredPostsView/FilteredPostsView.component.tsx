import React, {FC, useEffect, useState} from 'react'
import {RootState} from '../../store'
import {connect} from 'react-redux'
import {backendGetPostsByFilters, Post} from '../../redux/Posts/Posts.reducer'
import qs from 'query-string'
import {Tag} from '../Tag/Tag.component'
import {PostCard} from '../PostCard/PostCard.component'
import {Link, RouteComponentProps} from 'react-router-dom'
import {ThunkDispatch} from 'redux-thunk'

interface FilteredPostsViewOwnProps {
    posts: Post[]
}

interface FilteredPostsViewActions {
    getPostsByFilter: (pageNumber: number, categories?: string[], tags?: string[]) => void
}

type FilteredPostsViewProps =
    RouteComponentProps
    & FilteredPostsViewOwnProps
    & FilteredPostsViewActions
    & RouteComponentProps

export const mapStateToProps = (state: RootState): FilteredPostsViewOwnProps => {
    return {
        posts: state.postState.posts
    }
}

export const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): FilteredPostsViewActions => {
    return {
        getPostsByFilter: async (pageNumber: number, categories?: string[], tags?: string[]) => {
            await dispatch(backendGetPostsByFilters(pageNumber, categories ? categories : [], tags ? tags : []))
        }
    }
}

export const FilteredPostsViewComponent: FC<FilteredPostsViewProps> = props => {
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryFilters, setCategoryFilters] = useState<string[]>([])
    const [tagFilters, setTagFilters] = useState<string[]>([])

    useEffect(() => {
        const queryStrings = qs.parse(props.location.search)

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
    }, [props.location.search]) // Call hook when any filter url query params change

    useEffect(() => {
        props.getPostsByFilter(currentPage, categoryFilters, tagFilters)
    }, [tagFilters, categoryFilters])

    const addTagFilter = (tag: string) => {
        if (!tagFilters.includes(tag)) {
            const newTagFilters = [
                ...tagFilters,
                tag
            ]
            setTagFilters(newTagFilters)

            console.log(props.location)

            const newUrl = `${props.location.pathname}${props.location.search}&tag=${tag}`

            props.history.push(newUrl)
        }
    }

    const addCategoryFilter = (category: string) => {
        if (!categoryFilters.includes(category)) {
            const newCategoryFilters = [
                ...categoryFilters,
                category
            ]
            setCategoryFilters(newCategoryFilters)

            const newUrl = `${props.location.pathname}${props.location.search}&category=${category}`

            props.history.push(newUrl)
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
                                    <Link to={` / posts ? categories =${c}`}>{`${c}`}</Link>
                                    {`${i < categoryFilters.length - 1 ? `, ` : ``}`}
                                </div>)
                        }
                    </div>
                }
            </div>

            <hr/>

            <div className='is-size-3 title'>Filtered Posts:</div>
            {
                props.posts.map((p: Post, i: number) => <div key={i}>
                    <PostCard post={p} onClickCategory={addCategoryFilter} onClickTag={addTagFilter}/>
                    {i < props.posts.length - 1 ? <hr/> : ``}
                </div>)
            }
            <button className="button is-info pagination-button"
                    disabled={currentPage === 1}
                    onClick={() => {
                        if (currentPage > 1) {
                            // props.getPosts(currentPage-1)
                            setCurrentPage(currentPage - 1)
                        }
                    }}>
                Previous Page
            </button>
            <button className="button is-info pagination-button"
                    disabled={props.posts.length === 0}
                    onClick={() => {
                        if (props.posts.length !== 0) {
                            // props.getPosts(currentPage+1)
                            setCurrentPage(currentPage + 1)
                        }
                    }}>
                Next Page
            </button>
        </div>
    )
}

export const FilteredPostsView = connect(mapStateToProps, mapDispatchToProps)(FilteredPostsViewComponent)
