import React, {FC, useEffect} from 'react';
import {Post} from '../../redux/Posts/Posts.reducer';
import {connect} from 'react-redux';
import {AnyAction, Dispatch} from 'redux'
import {RootState} from '../../store'
import {getPosts} from '../../redux/Posts/Posts.action'

interface PostsViewActions {
    getPosts: (pageNum: number) => void,
}

interface PostsViewProps {
    posts: Post[]
}

type PostsViewPropsWithActions = PostsViewProps & PostsViewActions

const PostsViewComponent: FC<PostsViewPropsWithActions> = props => {
    useEffect(() => {
        if (props.posts.length === 0) {
            props.getPosts(1)
        }
    }, [])

    return (
        <div className='container'>
            Posts: {JSON.stringify(props.posts)}
        </div>
    );
};

export const mapStateToProps = (state: RootState): PostsViewProps => ({
    posts: state.postState.posts
});

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    return {
        getPosts: (pageNumber: number) => dispatch(getPosts(pageNumber))
    }
};

export const PostsView = connect(mapStateToProps, mapDispatchToProps)(PostsViewComponent);
