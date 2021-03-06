import React, { ChangeEvent, createRef, FC, useState } from 'react';
import { IQuiz } from 'redux/Posts/Posts.reducer';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PlusSvg from 'assets/plus.svg';
import CrossSvg from 'assets/x.svg';
import { QuizCard } from 'components/QuizCard/QuizCard.component';
import styles from './AdminPostCreate.module.scss';
import {
    AdminPostCreateComponentPropsWithActions,
    mapDispatchToProps,
    mapStateToProps,
    PostCreatePayload,
} from './AdminPostCreate.types';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

const AdminPostCreate: FC<AdminPostCreateComponentPropsWithActions> = (
    props
) => {
    const { jwt, updatePostLoading, createPost } = props;

    const editorRef = createRef<any>();

    const [updatedPost, setUpdatedPost] = useState<PostCreatePayload>({
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

    if (!jwt || jwt.length === 0) {
        return <Redirect to={'/admin/login'} />;
    }

    return (
        <div className="container">
            <div className="field">
                <h3 className="title is-3">Title</h3>
                <div className="control">
                    <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setUpdatedPost({
                                ...updatedPost,
                                postTitle: e.target.value,
                            })
                        }
                        className="input"
                        placeholder="Post Title"
                    />
                </div>
            </div>

            <div className="field">
                <h3 className="title">Content</h3>
                <Editor
                    previewStyle="vertical"
                    height="600px"
                    initialEditType="wysiwyg"
                    useCommandShortcut={true}
                    ref={editorRef}
                />
            </div>

            <div className="field">
                <h3 className="title">Tags (Comma seperated)</h3>
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
                    />
                </div>
            </div>

            <div className="field">
                <h3 className="title">Categories (Comma separated)</h3>
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
                    />
                </div>
            </div>

            <div className="field">
                <h3 className="title">Quizzes</h3>
                <div className={styles.CreatedQuizzes}>
                    {updatedPost.quizzes &&
                        updatedPost.quizzes.map((q: IQuiz, index: number) => {
                            return (
                                <QuizCard
                                    key={index}
                                    quiz={q}
                                    onCross={() => {
                                        let newQuizzes = updatedPost.quizzes;
                                        newQuizzes.splice(index, 1);

                                        setUpdatedPost({
                                            ...updatedPost,
                                            quizzes: newQuizzes,
                                        });
                                    }}
                                />
                            );
                        })}
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
                        quiz.possibleAnswers.map((a: string, index: number) => (
                            <div
                                className={`${styles.PossibleAnswerRow} slide-in-left`}
                                key={index}
                            >
                                <button
                                    onClick={() => {
                                        let newPossibleAnswers: string[] =
                                            quiz.possibleAnswers;
                                        newPossibleAnswers.splice(
                                            quiz.possibleAnswers.indexOf(a),
                                            1
                                        );
                                        setQuiz({
                                            ...quiz,
                                            possibleAnswers: newPossibleAnswers,
                                        });
                                    }}
                                    className={`button is-danger ${styles.PossibleAnswerRow_button}`}
                                >
                                    <img src={CrossSvg} alt="X" />
                                </button>
                                {a}
                            </div>
                        ))}
                    <div className={styles.PossibleAnswers}>
                        <div className={styles.PossibleAnswers_answer}>
                            <input
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setPossibleAnswer(e.target.value)
                                }
                                className="input"
                                placeholder={styles.PossibleAnswers_answerInput}
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
                                            possibleAnswers: [possibleAnswer],
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
            </div>

            <hr />

            <button
                onClick={async () => {
                    setShowUpdateStatus(false);

                    let newPost = updatedPost;
                    newPost.postContent = editorRef.current
                        .getInstance()
                        .getMarkdown();

                    await createPost(newPost, jwt);
                    setShowUpdateStatus(true);
                }}
                className="button is-primary"
            >
                Create Post
            </button>

            {updatePostLoading && (
                <progress className="progress is-small is-info" max="100">
                    50%
                </progress>
            )}

            {!updatePostLoading && showUpdateStatus && (
                <div
                    className={`notification is-success ${styles.UpdateBanner}`}
                >
                    <button className="delete" />
                    Created post Successfully!
                </div>
            )}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPostCreate);
