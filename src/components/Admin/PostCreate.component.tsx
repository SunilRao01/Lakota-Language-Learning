import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {backendCreatePost, Post, IQuiz} from '../../redux/Posts/Posts.reducer';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk'
import {RootState} from '../../store'
import {Redirect, RouterProps} from 'react-router'
import './PostEdit.css'
import Editor from 'tui-editor'
import 'tui-editor/dist/tui-editor-contents.css'
import 'tui-editor/dist/tui-editor.css'
import './PostCreate.css'
import PlusSvg from '../../assets/plus.svg'
import CrossSvg from '../../assets/x.svg'
import {QuizCard} from '../QuizCard/QuizCard.component'

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
    categories: string[],
    quizzes: IQuiz[],
    podcastLink: string
}

const PostCreateComponentComponent: FC<PostCreateComponentPropsWithActions> = props => {
    if (!props.jwt || props.jwt.length == 0) {
        return <Redirect to={'/admin/login'}/>
    }

    const [editorState, setEditorState] = useState()
    const [updatedPost, setUpdatedPost] = useState<PostCreatePayload>({
        postTitle: '',
        postContent: '',
        tags: [],
        categories: [],
        quizzes: [],
        podcastLink: ''
    })
    const [showUpdateStatus, setShowUpdateStatus] = useState(false)
    const [possibleAnswer, setPossibleAnswer] = useState<string>('')
    const [quiz, setQuiz] = useState<IQuiz>({
        answer: '',
        errorMessage: '',
        possibleAnswers: [],
        question: '',
        successMessage: ''
    })

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
                <h3 className="title is-3">Title</h3>
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
                <h3 className='title'>Content</h3>
                <div id='wysiwyg-editor' className='control'>

                </div>
            </div>

            <div className='field'>
                <h3 className='title'>Tags (Comma seperated)</h3>
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
                <h3 className='title'>Categories (Comma separated)</h3>
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

            <div className='field'>
                <h3 className='title'>Quizzes</h3>
                <div className='created-quizzes-container'>
                    {
                        updatedPost.quizzes &&
                        updatedPost.quizzes.map((q: IQuiz, index: number) => {
                            return <QuizCard key={index} quiz={q} onCross={() => {
                                let newQuizzes = updatedPost.quizzes;
                                newQuizzes.splice(index, 1)

                                setUpdatedPost({
                                    ...updatedPost,
                                    quizzes: newQuizzes
                                })
                            }} />
                        })
                    }
                </div>
                <div className='control'>
                    <label className='label'>Question</label>
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuiz({
                            ...quiz,
                            question: e.target.value
                        })}
                        className='input' placeholder='Question'
                    />
                    <label className='label'>Answer</label>
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuiz({
                            ...quiz,
                            answer: e.target.value
                        })}
                        className='input' placeholder='Answer'
                    />
                    <label className='label'>Success Message</label>
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuiz({
                            ...quiz,
                            successMessage: e.target.value
                        })}
                        className='input' placeholder='Wow! Good job!'
                    />
                    <label className='label'>Failure Message</label>
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuiz({
                            ...quiz,
                            errorMessage: e.target.value
                        })}
                        className='input' placeholder='Oh no! Try again.'
                    />
                    <label className='label'>Possible Answers</label>
                    {
                        quiz.possibleAnswers &&
                        quiz.possibleAnswers.map((a: string, index: number) => <div
                            className='possible-answer-row slide-in-left' key={index}>
                            <button onClick={() => {
                                let newPossibleAnswers: string[] = quiz.possibleAnswers
                                newPossibleAnswers.splice(quiz.possibleAnswers.indexOf(a), 1)
                                setQuiz({
                                    ...quiz,
                                    possibleAnswers: newPossibleAnswers
                                })
                            }} className='button is-danger'>
                                <img src={CrossSvg} alt='X'/>
                            </button>
                            {a}
                        </div>)
                    }
                    <div className='possible-answers'>
                        <div className='possible-answer'>
                            <input
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setPossibleAnswer(e.target.value)}
                                className='input' placeholder='possible-answer' value={possibleAnswer}
                            />
                            <button onClick={() => {
                                if (quiz.possibleAnswers) {
                                    setQuiz({
                                        ...quiz,
                                        possibleAnswers: [
                                            ...quiz.possibleAnswers,
                                            possibleAnswer
                                        ]
                                    })
                                } else {
                                    setQuiz({
                                        ...quiz,
                                        possibleAnswers: [
                                            possibleAnswer
                                        ]
                                    })
                                }

                                setPossibleAnswer('')
                            }} className='button is-primary'>
                                <img src={PlusSvg} alt='+'/>
                            </button>
                        </div>
                    </div>

                    <button className='button is-primary' onClick={() => {
                        setUpdatedPost({
                            ...updatedPost,
                            quizzes: [
                                ...updatedPost.quizzes,
                                quiz
                            ]
                        })
                    }}>Add Quiz
                    </button>
                </div>


            </div>
            <div className='field'>
                <h3 className="title is-3">Podcast Embed Code</h3>
                <div className='control'>
                    <textarea
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setUpdatedPost({
                            ...updatedPost,
                            podcastLink: e.target.value
                        })}
                        className='textarea' placeholder='Podcast Embed Link'
                    />
                </div>
            </div>
            <hr/>

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
            <div className='notification is-success'>
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
