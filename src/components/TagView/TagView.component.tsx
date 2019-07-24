import React, {FC, useEffect, useState} from 'react'
import {RootState} from '../../store'
import {connect} from 'react-redux'
import {Post} from '../../redux/Posts/Posts.reducer'
import {AnyAction, Dispatch} from 'redux'
import {setFilterTags} from '../../redux/Filter/Filter.action'
import qs from 'querystring'
import {Tag} from '../Tag/Tag.component'
import {PostCard} from '../PostCard/PostCard.component'

interface TagViewOwnProps {
    filterTags: string[],
    posts: Post[],
    location?: any
}

interface TagViewActions {
    setFilterTags: (newTags: string[]) => void
}

type TagViewProps = TagViewOwnProps & TagViewActions

const mapStateToProps = (state: RootState, ownProps: TagViewProps): TagViewOwnProps => {
    return {
        posts: state.postState.posts,
        filterTags: state.filterState.filters.tags
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        setFilterTags: (tags: string[]) => dispatch(setFilterTags(tags))
    }
}

export const TagViewComponent: FC<TagViewProps> = props => {
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([])

    useEffect(() => {
        // Update filterState in store for tags
        const tags = qs.parse(props.location.search)['?tags']
        props.setFilterTags([`${tags.toString()}`])

        // Update filtered posts in state
        const fp = props.posts.filter((p: Post) => p.tags.includes(tags.toString()))
        setFilteredPosts(fp)
    }, [])

    return (
        <div className='container'>
            <div>
                <div className='is-size-3 title'>Tags:</div>
                {
                    <div className="tags are-large">
                        {props.filterTags.map((_, i: number) => <Tag text={props.filterTags[i]}/>)}
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

export const TagView = connect(mapStateToProps, mapDispatchToProps)(TagViewComponent)
