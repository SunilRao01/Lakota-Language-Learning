import React, {FC, useEffect, useState} from 'react'
import {RootState} from '../../store'
import {connect} from 'react-redux'
import {Post} from '../../redux/Posts/Posts.reducer'
import {AnyAction, Dispatch} from 'redux'
import {setFilterCategories, setFilterTags} from '../../redux/Filter/Filter.action'
import qs from 'querystring'
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

type FilteredPostsViewProps = FilteredPostsViewOwnProps & FilteredPostsViewActions & RouteComponentProps

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


    useEffect(() => {
        // Update filterState in store for tags
        const tags = qs.parse(props.location.search)['?tags']
        tags && props.setFilterTags([`${tags.toString()}`])

        // Update filterState in store for categories
        const categories = qs.parse(props.location.search)['?categories']
        categories && props.setFilterCategories([`${categories.toString()}`])

        // Update filtered posts in state
        const fp = props.posts.filter((p: Post) => tags
            ? p.tags.includes(tags.toString())
            : p.categories.includes(categories.toString()))

        setFilteredPosts(fp)
    }, [])

    return (
        <div className='container'>
            <div>
                <div className='is-size-3 title'>{props.filterTags.length > 0 ? `Tags` : `Categories`}:</div>
                {
                    <div className="tags are-large">
                        {
                            props.filterTags.length > 0
                            ? props.filterTags.map((_, i: number) => <Tag key={i} text={props.filterTags[i]}/>)
                            : Array.from(props.filterCategories).map((c: string, i: number) => {
                                    return (<div key={i}>
                                        <Link to={`/posts?categories=${c}`}>{`${c}`}</Link>
                                        {`${i < props.filterCategories.length - 1 ? `, ` : ``}`}
                                    </div>)
                                })
                        }
                    </div>
                }
            </div>

            <hr/>

            <div className='is-size-3 title'>Filtered Posts:</div>
            {
                filteredPosts.map((p: Post, i: number) => <div key={i}>
                    <PostCard post={p}/>
                    {i < filteredPosts.length - 1 ? <hr/> : ``}
                </div>)
            }
        </div>
    )
}

export const FilteredPostsView = connect(mapStateToProps, mapDispatchToProps)(FilteredPostsViewComponent)
