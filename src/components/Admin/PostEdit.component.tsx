import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {backendGetPost, backendUpdatePost, Post, PostPayload} from '../../redux/Posts/Posts.reducer';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk'
import {RootState} from '../../store'
import {Redirect, RouterProps} from 'react-router'
import {Editor, EditorState} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './PostEdit.css'
import {convertToRaw} from 'draft-js'

interface PostEditProps {
    jwt: string,
    updatePostLoading: boolean,
    currentPost?: any
}

interface PostEditActions {
    updatePost: (updatedPost: PostPayload, jwt: string) => void,
    getPost: (postId: number) => void
}

type PostEditComponentPropsWithActions = PostEditActions & PostEditProps & RouterProps

const PostEditComponentComponent: FC<PostEditComponentPropsWithActions> = props => {
    if (props.jwt.length == 0) {
        return <Redirect to={'/admin/login'}/>
    }

    const [updatedPost, setUpdatedPost] = useState<Post>()

    const [showUpdateStatus, setShowUpdateStatus] = useState(false)
    const [editorState, setEditorState] = useState()

    useEffect(() => {
        const urlParams = props.history.location.pathname.split('/')
        const postId = parseInt(urlParams[urlParams.length - 1])
        props.getPost(postId)
    }, [])

    useEffect(() => {
        if (props.currentPost) {
            setUpdatedPost(props.currentPost)
        }
    }, [props.currentPost])

    if (updatedPost && props.currentPost) {
        return (
            <div className='container'>
                <div className='field'>
                    <label className='label'>Title</label>
                    <div className='control'>
                        <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUpdatedPost({
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
                        {props.currentPost.content &&
                        <Editor
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            initialContentState={props.currentPost.content}
                            onEditorStateChange={(e: EditorState) => {
                                setEditorState(e)
                            }}
                        />}
                    </div>
                </div>

                <div className='field'>
                    <label className='label'>Tags (Comma seperated)</label>
                    <div className='control'>
                        <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUpdatedPost({
                                ...updatedPost,
                                tags: e.target.value.split(',').map(s => s.trim())
                            })}
                            className='input' placeholder='Post Tags'
                            defaultValue={props.currentPost.tags.join()}/>
                    </div>
                </div>

                <div className='field'>
                    <label className='label'>Categories (Comma separated)</label>
                    <div className='control'>
                        <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUpdatedPost({
                                ...updatedPost,
                                categories: e.target.value.split(',').map(s => s.trim())
                            })}
                            className='input' placeholder='Post Categories'
                            defaultValue={props.currentPost.categories.join()}/>
                    </div>
                </div>

                <button onClick={async () => {
                    setShowUpdateStatus(false)
                    let newUpdatedPost: PostPayload = {...updatedPost, content: JSON.stringify(convertToRaw(editorState.getCurrentContent()))}

                    console.log('updated post:', newUpdatedPost)
                    await props.updatePost(newUpdatedPost, props.jwt)
                    setShowUpdateStatus(true)
                }} className='button is-primary'>Edit Post
                </button>

                {props.updatePostLoading &&
                <div className='notification is-warning'>
                    <button className='delete'/>
                    Updating post...
                </div>
                }

                {!props.updatePostLoading && showUpdateStatus &&
                <div className='notification is-success admin-button'>
                    <button className='delete'/>
                    Post Updated Successfully!
                </div>
                }
            </div>
        )
    } else {
        return (<div>Getting updatedPost...</div>)
    }
};

export const mapStateToProps = (state: RootState): PostEditProps => {
    let newProps: PostEditProps = {
        jwt: state.adminState.jwt,
        updatePostLoading: state.postState.updatingPostLoading
    }
    if (state.postState.currentPost) {
        newProps.currentPost = state.postState.currentPost
    }
    return newProps
}

export const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): PostEditActions => {
    return {
        updatePost: async (post: PostPayload, jwt: string) => {
            await dispatch(backendUpdatePost(post, jwt))
        },
        getPost: async (postId: number) => {
            return await dispatch(backendGetPost(postId))
        }
    }
};

export const PostEdit = connect(mapStateToProps, mapDispatchToProps)(PostEditComponentComponent);
