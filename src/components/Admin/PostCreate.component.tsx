import React, {ChangeEvent, FC, useState} from 'react';
import {backendCreatePost, Post} from '../../redux/Posts/Posts.reducer';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk'
import {RootState} from '../../store'
import {Redirect, RouterProps} from 'react-router'
import {Editor, EditorState} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './PostEdit.css'
import {convertToRaw} from 'draft-js'

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

    const [updatedPost, setUpdatedPost] = useState<PostCreatePayload>({
        postTitle: '',
        postContent: '',
        tags: [],
        categories: []
    })
    const [showUpdateStatus, setShowUpdateStatus] = useState(false)

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
                        className='input' type='text' placeholder='Post Title'
                    />
                </div>
            </div>

            <div className='field'>
                <label className='label'>Content</label>
                <div className='control'>
                    <Editor
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={(e: EditorState) => {
                            setUpdatedPost({
                                ...updatedPost,
                                postContent: JSON.stringify(convertToRaw(e.getCurrentContent()))
                            })
                        }}
                    />
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
                await props.createPost(updatedPost, props.jwt)
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
