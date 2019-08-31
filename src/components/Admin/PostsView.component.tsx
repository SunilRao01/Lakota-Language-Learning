import React, {FC, useEffect} from 'react';
import {backendDeletePost, backendGetPosts, Post} from '../../redux/Posts/Posts.reducer';
import {connect} from 'react-redux';
import {RootState} from '../../store'
import {PostCard} from '../PostCard/PostCard.component'
import {ThunkDispatch} from 'redux-thunk'
import {Redirect} from 'react-router'
import {Link} from 'react-router-dom'
import './PostView.css'
import {getPosts} from '../../redux/Posts/Posts.action'

interface PostsViewActions {
    getPosts: (pageNum: number) => void,
    deletePost: (postId: number, jwt: string) => void
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
        props.getPosts(1)
    }, [])

    useEffect(() => {
        console.log('props.posts changed: ', props.posts)
    }, [props.posts])

    return (
        <div className='container'>
            <h1 className='title'>Admin: Posts View</h1>
            <Link to={'/admin/postss/new'} className='button is-primary'>Create New Post</Link>
            <hr/>
            {
                props.posts.map((p: Post, i: number) =>
                    <div key={i}>
                        <PostCard post={p} showTitleOnly={true}/>
                        <Link className="button is-primary admin-button" to={`/admin/post/${p.id}`}>Edit</Link>
                        <button className="button is-danger admin-button"
                                onClick={async () => {
                                    await props.deletePost(p.id, props.jwt)
                                }}>
                            Delete
                        </button>
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
        },
        deletePost: async (postId: number, jwt: string) => {
            await dispatch(backendDeletePost(postId, jwt))
        }
    }
};

export const PostsView = connect(mapStateToProps, mapDispatchToProps)(PostsViewComponent);
