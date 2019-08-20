import React, {FC, useEffect} from 'react';
import {backendGetPosts, Post} from '../../redux/Posts/Posts.reducer';
import {connect} from 'react-redux';
import {RootState} from '../../store'
import {PostCard} from '../PostCard/PostCard.component'
import {ThunkDispatch} from 'redux-thunk'
import {Redirect} from 'react-router'

interface PostsViewActions {
    getPosts: (pageNum: number) => void,
}

interface PostsViewProps {
    posts: Post[],
    jwt: string
}

type PostsViewPropsWithActions = PostsViewProps & PostsViewActions

const PostsViewComponent: FC<PostsViewPropsWithActions> = props => {
    if (props.jwt.length == 0) {
        return <Redirect to={'login'} />
    }

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
    posts: state.postState.posts,
    jwt: state.adminState.jwt
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
