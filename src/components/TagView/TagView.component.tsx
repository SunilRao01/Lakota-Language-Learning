import React, {FC, useEffect, useState} from 'react'
import {RootState} from '../../store'
import {connect} from 'react-redux'
import {Post} from '../../redux/Posts/Posts.reducer'
import {AnyAction, Dispatch} from 'redux'
import {setFilterTags} from '../../redux/Filter/Filter.action'

interface TagViewOwnProps {
    filteredPosts: Post[],
    filterTags: string[],
    match?: any
}

interface TagViewActions {
    setFilterTags: (newTags: string[]) => void
}

type TagViewProps = TagViewOwnProps & TagViewActions

const mapStateToProps = (state: RootState, ownProps: TagViewProps): TagViewOwnProps => {
    return {
        filteredPosts: state.postState.posts,
        filterTags: state.filterState.filters.tags
    }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        setFilterTags: (tags: string[]) => dispatch(setFilterTags(tags))
    }
}

// TODO: Create filtered tag view

export const TagViewComponent: FC<TagViewProps> = props => {
    const [filteredPosts, setFilteredPosts] = useState([{}])

    useEffect(() => {
        props.setFilterTags([props.match.params.tag])


        const fp = props.filteredPosts.filter((p: Post) => p.tags.includes(props.match.params.tag))

        setFilteredPosts(fp)
    }, [])

    return (
        <>
            <div>Filter posts by tags: ${props.filterTags}</div>
            <div className='is-size-3'>Filtered Posts:</div>
            <div>{JSON.stringify(filteredPosts)}</div>
        </>
    )
}

export const TagView = connect(mapStateToProps, mapDispatchToProps)(TagViewComponent)
