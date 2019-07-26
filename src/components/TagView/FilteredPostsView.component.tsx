import React, {FC, useEffect, useState} from 'react'
import {RootState} from '../../store'
import {connect} from 'react-redux'
import {Post} from '../../redux/Posts/Posts.reducer'
import {AnyAction, Dispatch} from 'redux'
import {setFilterCategories, setFilterTags} from '../../redux/Filter/Filter.action'
import qs from 'query-string'
import {Tag} from '../Tag/Tag.component'
import {PostCard} from '../PostCard/PostCard.component'
import {Link, RouteComponentProps} from 'react-router-dom'

interface FilteredPostsViewOwnProps {
    filterTags: string[],
    filterCategories: string[],
    posts: Post[]
}

interface FilteredPostsViewActions {
    setFilterTags: (newTags: string[]) => void,
    setFilterCategories: (newCategories: string[]) => void
}

type FilteredPostsViewProps =
    RouteComponentProps
    & FilteredPostsViewOwnProps
    & FilteredPostsViewActions
    & RouteComponentProps

const mapStateToProps = (state: RootState): FilteredPostsViewOwnProps => {
    return {
        posts: state.postState.posts,
        filterTags: state.filterState.filters.tags,
        filterCategories: state.filterState.filters.categories
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): FilteredPostsViewActions => {
    return {
        setFilterTags: (tags: string[]) => dispatch(setFilterTags(tags)),
        setFilterCategories: (categories: string[]) => dispatch(setFilterCategories(categories))
    }
}

export const FilteredPostsViewComponent: FC<FilteredPostsViewProps> = props => {
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([])

    const filterPostsByField = (posts: Post[], tags: string[] = [], categories: string[] = []): Post[] => {
        return posts.filter((p: Post) => {
            let result = true

            if (tags.length > 0) {
                tags.forEach(t => {
                    if (!p.tags.includes(t)) {
                        result = false
                    }
                })
            }

            if (categories.length > 0) {
                categories.forEach(c => {
                    if (!p.categories.includes(c)) {
                        result = false
                    }
                })
            }

            return result
        })
    }

    useEffect(() => {
        // Update filterState in store for tags
        const queryStrings = qs.parse(props.location.search, {arrayFormat: 'comma'})
        let tags: any = queryStrings['tags'];
        if (typeof tags === 'string') {
            tags = [tags]
        }
        console.log(`tags form url: ${tags}`)
        tags && props.setFilterTags(tags)

        // Update filterState in store for categories
        let categories: any = queryStrings['categories'];
        if (typeof categories === 'string') {
            categories = [categories]
        }
        console.log(`cats form url: ${categories}`)
        categories && props.setFilterCategories(categories)

        // Update filtered posts in state
        const fp = filterPostsByField(props.posts, tags, categories)
        setFilteredPosts(fp)
    }, [props.location.search]) // Call hook when any filter url query params change

    const addTagFilter = (tag: any) => {
        if (!props.filterTags.includes(tag)) {
            if (props.filterTags.length === 0) {
                let newUrl: string = props.location.pathname
                newUrl += `&tags=${tag}`

                props.history.push(newUrl)
            } else if (props.filterTags.length === 1) {
                let querystring: any = qs.parse(props.location.search, {arrayFormat: 'comma'})
                console.log('current querystring', querystring)

                props.history.push(`${props.location.pathname}?`
                    + qs.stringify({
                        tags: `${querystring['tags']},${tag}`
                    }))
            } else {
                let querystring: any = qs.parse(props.location.search, {arrayFormat: 'comma'})
                querystring['tags'].push(tag)

                props.history.push(`${props.location.pathname}?`
                    + qs.stringify(querystring, {arrayFormat: 'comma'}))
            }
        }
    }

    const addCategoryFilter = (category: any) => {
        if (!props.filterCategories.includes(category)) {
            props.history.push(`${props.history.location.search},${category}`)
        }
    }

    return (
        <div className='container'>
            <div>
                <div className='is-size-3 title'>Tags:</div>
                {
                    <div className="tags are-large">
                        {
                            props.filterTags.map((_, i: number) =>
                                <Tag key={i} text={props.filterTags[i]}/>)
                        }
                    </div>
                }

                <div className='is-size-3 title'>Categories:</div>
                {
                    <div className="tags are-large">
                        {
                            Array.from(props.filterCategories).map((c: string, i: number) =>
                                <div key={i}>
                                    <Link to={`/posts?categories=${c}`}>{`${c}`}</Link>
                                    {`${i < props.filterCategories.length - 1 ? `, ` : ``}`}
                                </div>)
                        }
                    </div>
                }
            </div>

            <hr/>

            <div className='is-size-3 title'>Filtered Posts:</div>
            {
                filteredPosts.map((p: Post, i: number) => <div key={i}>
                    <PostCard post={p} onClickCategory={addCategoryFilter} onClickTag={addTagFilter}/>
                    {i < filteredPosts.length - 1 ? <hr/> : ``}
                </div>)
            }
        </div>
    )
}

export const FilteredPostsView = connect(mapStateToProps, mapDispatchToProps)(FilteredPostsViewComponent)
