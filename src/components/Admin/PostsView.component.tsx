import React, {FC, useEffect} from 'react';
import {backendGetPosts, Post} from '../../redux/Posts/Posts.reducer';
import {connect} from 'react-redux';
import {AnyAction, Dispatch} from 'redux'
import {RootState} from '../../store'
import {getPosts} from '../../redux/Posts/Posts.action'
import {PostCard} from '../PostCard/PostCard.component'
import {ThunkDispatch} from 'redux-thunk'

interface PostsViewActions {
    getPosts: (pageNum: number) => void,
}

interface PostsViewProps {
    posts: Post[]
}

type PostsViewPropsWithActions = PostsViewProps & PostsViewActions

const PostsViewComponent: FC<PostsViewPropsWithActions> = props => {
    useEffect(() => {
        if (props.posts.length == 0) {
            props.getPosts(1)
        }
    }, [])

    return (
        <div className='container'>
            <h1 className='title'>Admin: Posts View</h1>
            {
                props.posts.map((p: Post, i: number) =>
                    <div key={i}>
                        <PostCard post={p} showTitleOnly={true} adminView={true}/>
                        {i < props.posts.length - 1 ? <hr/> : ``}
                    </div>)
            }
        </div>
    );
};

export const mapStateToProps = (state: RootState): PostsViewProps => ({
    posts: state.postState.posts
});

export const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): PostsViewActions => {
    return {
        getPosts: async (pageNumber: number) => {
            await dispatch(backendGetPosts(pageNumber))
            console.log('finished getting posts from backend')
        }
    }
};

export const PostsView = connect(mapStateToProps, mapDispatchToProps)(PostsViewComponent);
