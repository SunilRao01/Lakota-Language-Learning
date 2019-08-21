import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {backendGetPost, backendUpdatePost, Post} from '../../redux/Posts/Posts.reducer';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk'
import {RootState} from '../../store'
import {Redirect, RouterProps} from 'react-router'

interface PostEditProps {
    jwt: string,
    updatePostLoading: boolean,
    currentPost: Post
}

interface PostEditActions {
    updatePost: (updatedPost: Post, jwt: string) => void,
    getPost: (postId: number) => void
}

type PostEditComponentPropsWithActions = PostEditActions & PostEditProps & RouterProps

const PostEditComponentComponent: FC<PostEditComponentPropsWithActions> = props => {
    if (props.jwt.length == 0) {
        return <Redirect to={'/admin/login'} />
    }

    const [updatedPost, setUpdatedPost] = useState<Post>({
        categories: [],
        content: '',
        creationDate: '',
        id: 0,
        quizzes: [],
        tags: [],
        title: ''
    })

    const [showUpdateStatus, setShowUpdateStatus] = useState(false)

    useEffect(() => {
        const urlParams = props.history.location.pathname.split('/')
        const postId = parseInt(urlParams[urlParams.length-1])
        props.getPost(postId)
    }, [])

    useEffect(() => {
        setUpdatedPost(props.currentPost)
    }, [props.currentPost])

    return (
        <div className='container'>
            <div className='field'>
                <label className='label'>Title</label>
                <div className='control'>
                    <input
                        onChange={(e:ChangeEvent<HTMLInputElement>) => setUpdatedPost({
                            ...updatedPost,
                            title: e.target.value
                        })}
                        className='input' type='text' placeholder='Post Title'
                    defaultValue={props.currentPost.title}/>
                </div>
            </div>

            <div className='field'>
                <label className='label'>Content</label>
                <div className='control'>
                    {props.currentPost.content.length > 0 && <textarea
                        onChange={(e:ChangeEvent<HTMLTextAreaElement>) => setUpdatedPost({
                            ...updatedPost,
                            content: e.target.value
                        })}
                        className='textarea' defaultValue={props.currentPost.content}/>}
                </div>
            </div>

            <div className='field'>
                <label className='label'>Tags (Comma seperated)</label>
                <div className='control'>
                    <input
                        onChange={(e:ChangeEvent<HTMLInputElement>) => setUpdatedPost({
                            ...updatedPost,
                            tags: e.target.value.split(',')
                        })}
                        className='input' placeholder='Post Tags'
                        defaultValue={props.currentPost.tags.join()}/>
                </div>
            </div>

            <div className='field'>
                <label className='label'>Categories (Comma seperated)</label>
                <div className='control'>
                    <input
                        onChange={(e:ChangeEvent<HTMLInputElement>) => setUpdatedPost({
                            ...updatedPost,
                            categories: e.target.value.split(',')
                        })}
                        className='input' placeholder='Post Categories'
                        defaultValue={props.currentPost.categories.join()}/>
                </div>
            </div>

            <button onClick={async () => {
                setShowUpdateStatus(false)
                await props.updatePost(updatedPost, props.jwt)
                setShowUpdateStatus(true)
            }} className='button is-primary'>Edit Post
            </button>

            {props.updatePostLoading &&
            <div className='notification is-warning'>
                <button className='delete' />
                Updating post...
            </div>
            }

            {!props.updatePostLoading && showUpdateStatus &&
            <div className='notification is-success admin-button'>
                <button className='delete' />
                Post Updated Successfully!
            </div>
            }
        </div>
    )
};

export const mapStateToProps = (state: RootState): PostEditProps => {
    return {
        jwt: state.adminState.jwt,
        updatePostLoading: state.postState.updatingPostLoading,
        currentPost: state.postState.currentPost
    }
}

export const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): PostEditActions => {
    return {
        updatePost: async (post: Post, jwt: string) => {
            await dispatch(backendUpdatePost(post, jwt))
        },
        getPost: async (postId: number) => {
            return await dispatch(backendGetPost(postId))
        }
    }
};

export const PostEdit = connect(mapStateToProps, mapDispatchToProps)(PostEditComponentComponent);
