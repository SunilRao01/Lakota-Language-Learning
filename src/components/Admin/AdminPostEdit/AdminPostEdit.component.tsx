import React, {
    ChangeEvent,
    FC,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { IQuiz } from 'redux/Posts/Posts.reducer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import './AdminPostEdit.css';
import Editor from 'tui-editor';
import { QuizCard } from 'components/QuizCard/QuizCard.component';
import CrossSvg from 'assets/x.svg';
import PlusSvg from 'assets/plus.svg';
import {
    AdminPostEditComponentPropsWithActions,
    mapDispatchToProps,
    mapStateToProps,
    PostUpdatePayload,
} from './AdminPostEdit.types';

// TODO: Add typing for api payloads

const AdminPostEdit: FC<AdminPostEditComponentPropsWithActions> = (props) => {
    const {
        getPost,
        currentPost,
        updatePost,
        jwt,
        updatePostLoading,
        history,
    } = props;

    const [updatedPost, setUpdatedPost] = useState<PostUpdatePayload>({
        id: -1,
        postTitle: '',
        postContent: '',
        tags: [],
        categories: [],
        quizzes: [],
        podcastLink: '',
    });

    const [showUpdateStatus, setShowUpdateStatus] = useState(false);
    const [possibleAnswer, setPossibleAnswer] = useState<string>('');
    const [quiz, setQuiz] = useState<IQuiz>({
        answer: '',
        errorMessage: '',
        possibleAnswers: [],
        question: '',
        successMessage: '',
    });

    const [editorState, setEditorState] = useState<any>();

    const fetchData = useCallback(async () => {
        const urlParams = history.location.pathname.split('/');
        const postId = parseInt(urlParams[urlParams.length - 1]);

        await getPost(postId);
    }, [getPost, history.location.pathname]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (currentPost && currentPost.title) {
            const urlParams = history.location.pathname.split('/');
            const postId = parseInt(urlParams[urlParams.length - 1]);

            setUpdatedPost({
                id: postId,
                postTitle: currentPost.title,
                postContent: currentPost.content,
                categories: currentPost.categories,
                tags: currentPost.tags,
                quizzes: currentPost.quizzes,
                podcastLink: currentPost.pod,
            });

            const editor = new Editor({
                el: document.querySelector('#wysiwyg-editor')!,
                initialEditType: 'wysiwyg',
                previewStyle: 'vertical',
                height: '300px',
                hideModeSwitch: true,
                initialValue: currentPost.content,
            });

            editor.on('change', () => {
                setEditorState(editor.getValue());
            });
        }
    }, [currentPost, history.location.pathname]);

    if (!jwt || jwt.length === 0) {
        return <Redirect to={'/admin/login'} />;
    }

    if (updatedPost && currentPost) {
        return (
            <div className="container">
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setUpdatedPost({
                                    ...updatedPost,
                                    postTitle: e.target.value,
                                })
                            }
                            className="input"
                            type="text"
                            placeholder="Post Title"
                            defaultValue={currentPost.title}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Content</label>
                    <div className="control">
                        {currentPost.content && <div id="wysiwyg-editor" />}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Tags (Comma separated)</label>
                    <div className="control">
                        <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setUpdatedPost({
                                    ...updatedPost,
                                    tags: e.target.value
                                        .split(',')
                                        .map((s) => s.trim()),
                                })
                            }
                            className="input"
                            placeholder="Post Tags"
                            defaultValue={currentPost.tags.join()}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">
                        Categories (Comma separated)
                    </label>
                    <div className="control">
                        <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setUpdatedPost({
                                    ...updatedPost,
                                    categories: e.target.value
                                        .split(',')
                                        .map((s) => s.trim()),
                                })
                            }
                            className="input"
                            placeholder="Post Categories"
                            defaultValue={currentPost.categories.join()}
                        />
                    </div>
                </div>

                <div className="field">
                    <h3 className="title">Quizzes</h3>
                    <div className="created-quizzes-container">
                        {updatedPost.quizzes &&
                            updatedPost.quizzes.map(
                                (q: IQuiz, index: number) => {
                                    return (
                                        <QuizCard
                                            key={index}
                                            quiz={q}
                                            onCross={() => {
                                                let newQuizzes =
                                                    updatedPost.quizzes;
                                                newQuizzes.splice(index, 1);

                                                setUpdatedPost({
                                                    ...updatedPost,
                                                    quizzes: newQuizzes,
                                                });
                                            }}
                                        />
                                    );
                                }
                            )}
                    </div>
                    <div className="control">
                        <label className="label">Question</label>
                        <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setQuiz({
                                    ...quiz,
                                    question: e.target.value,
                                })
                            }
                            className="input"
                            placeholder="Question"
                        />
                        <label className="label">Answer</label>
                        <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setQuiz({
                                    ...quiz,
                                    answer: e.target.value,
                                })
                            }
                            className="input"
                            placeholder="Answer"
                        />
                        <label className="label">Success Message</label>
                        <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setQuiz({
                                    ...quiz,
                                    successMessage: e.target.value,
                                })
                            }
                            className="input"
                            placeholder="Wow! Good job!"
                        />
                        <label className="label">Failure Message</label>
                        <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setQuiz({
                                    ...quiz,
                                    errorMessage: e.target.value,
                                })
                            }
                            className="input"
                            placeholder="Oh no! Try again."
                        />
                        <label className="label">Possible Answers</label>
                        {quiz.possibleAnswers &&
                            quiz.possibleAnswers.map(
                                (a: string, index: number) => (
                                    <div
                                        className="possible-answer-row slide-in-left"
                                        key={index}
                                    >
                                        <button
                                            onClick={() => {
                                                let newPossibleAnswers: string[] =
                                                    quiz.possibleAnswers;
                                                newPossibleAnswers.splice(
                                                    quiz.possibleAnswers.indexOf(
                                                        a
                                                    ),
                                                    1
                                                );
                                                setQuiz({
                                                    ...quiz,
                                                    possibleAnswers: newPossibleAnswers,
                                                });
                                            }}
                                            className="button is-danger"
                                        >
                                            <img src={CrossSvg} alt="X" />
                                        </button>
                                        {a}
                                    </div>
                                )
                            )}
                        <div className="possible-answers">
                            <div className="possible-answer">
                                <input
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => setPossibleAnswer(e.target.value)}
                                    className="input"
                                    placeholder="possible-answer"
                                    value={possibleAnswer}
                                />
                                <button
                                    onClick={() => {
                                        if (quiz.possibleAnswers) {
                                            setQuiz({
                                                ...quiz,
                                                possibleAnswers: [
                                                    ...quiz.possibleAnswers,
                                                    possibleAnswer,
                                                ],
                                            });
                                        } else {
                                            setQuiz({
                                                ...quiz,
                                                possibleAnswers: [
                                                    possibleAnswer,
                                                ],
                                            });
                                        }

                                        setPossibleAnswer('');
                                    }}
                                    className="button is-primary"
                                >
                                    <img src={PlusSvg} alt="+" />
                                </button>
                            </div>
                        </div>

                        <button
                            className="button is-primary"
                            onClick={() => {
                                setUpdatedPost({
                                    ...updatedPost,
                                    quizzes: [...updatedPost.quizzes, quiz],
                                });
                            }}
                        >
                            Add Quiz
                        </button>
                    </div>

                    <div className="field">
                        <h3 className="title is-3">Podcast Embed Link</h3>
                        <div className="control">
                            <textarea
                                onChange={(
                                    e: ChangeEvent<HTMLTextAreaElement>
                                ) =>
                                    setUpdatedPost({
                                        ...updatedPost,
                                        podcastLink: e.target.value,
                                    })
                                }
                                className="textarea"
                                placeholder="Podcast Embed Link"
                            />
                        </div>
                    </div>
                </div>

                <hr />

                <button
                    onClick={async () => {
                        setShowUpdateStatus(false);

                        const updatePostPayload = {
                            ...updatedPost,
                            postContent: editorState,
                        };

                        await updatePost(
                            updatedPost.id,
                            updatePostPayload,
                            jwt
                        );
                        setShowUpdateStatus(true);
                    }}
                    className="button is-primary"
                >
                    Edit Post
                </button>

                {updatePostLoading && (
                    <div className="notification is-warning">
                        <button className="delete" />
                        Updating post...
                    </div>
                )}

                {!updatePostLoading && showUpdateStatus && (
                    <div className="notification is-success admin-button">
                        <button className="delete" />
                        Post Updated Successfully!
                    </div>
                )}
            </div>
        );
    } else {
        return <div>Getting updatedPost...</div>;
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPostEdit);