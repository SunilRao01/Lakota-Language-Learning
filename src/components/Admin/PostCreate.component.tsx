import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {backendCreatePost, Post} from '../../redux/Posts/Posts.reducer';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk'
import {RootState} from '../../store'
import {Redirect, RouterProps} from 'react-router'
import './PostEdit.css'
import Editor from 'tui-editor'
import 'tui-editor/dist/tui-editor-contents.css'
import 'tui-editor/dist/tui-editor.css'

interface PostCreateProps {
    jwt: string,
    updatePostLoading: boolean,
}

interface PostCreateActions {
    createPost: (newPost: any, jwt: string) => void,
}

type PostCreateComponentPropsWithActions = PostCreateActions & PostCreateProps & RouterProps

interface PostCreatePayload {
    postTitle: string,
    postContent: string,
    tags: string[],
    categories: string[]
}

const PostCreateComponentComponent: FC<PostCreateComponentPropsWithActions> = props => {
    if (props.jwt.length == 0) {
        return <Redirect to={'/admin/login'}/>
    }

    const [editorState, setEditorState] = useState()
    const [updatedPost, setUpdatedPost] = useState<PostCreatePayload>({
        postTitle: '',
        postContent: '',
        tags: [],
        categories: []
    })
    const [showUpdateStatus, setShowUpdateStatus] = useState(false)

    useEffect(() => {
        const editor = new Editor({
            el: document.querySelector('#wysiwyg-editor')!,
            initialEditType: 'wysiwyg',
            previewStyle: 'vertical',
            height: '300px',
            hideModeSwitch: true
        })

        editor.on('change', () => {
            setEditorState(editor.getValue())
        })
    }, [])

    return (
        <div className='container'>
            <div className='field'>
                <label className='label'>Title</label>
                <div className='control'>
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setUpdatedPost({
                            ...updatedPost,
                            postTitle: e.target.value
                        })}
                        className='input' placeholder='Post Title'
                    />
                </div>
            </div>

            <div className='field'>
                <label className='label'>Content</label>
                <div id='wysiwyg-editor' className='control'>

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
                    />
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
                    />
                </div>
            </div>

            <button onClick={async () => {
                setShowUpdateStatus(false)
                let newPost = updatedPost
                newPost.postContent = editorState
                await props.createPost(newPost, props.jwt)
                setShowUpdateStatus(true)
            }} className='button is-primary'>Create Post
            </button>

            {props.updatePostLoading &&
            <div className='notification is-warning'>
                <button className='delete'/>
                Creating post...
            </div>
            }

            {!props.updatePostLoading && showUpdateStatus &&
            <div className='notification is-success admin-button'>
                <button className='delete'/>
                Created post Successfully!
            </div>
            }
        </div>
    )
};

export const mapStateToProps = (state: RootState): PostCreateProps => {
    return {
        jwt: state.adminState.jwt,
        updatePostLoading: state.postState.updatingPostLoading
    }
}

export const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): PostCreateActions => {
    return {
        createPost: async (post: Post, jwt: string) => {
            await dispatch(backendCreatePost(post, jwt))
        }
    }
};

export const PostCreate = connect(mapStateToProps, mapDispatchToProps)(PostCreateComponentComponent);
