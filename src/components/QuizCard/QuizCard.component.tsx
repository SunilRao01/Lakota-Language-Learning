import React, { ChangeEvent, FC, FormEvent, useState, Fragment } from 'react';
import { CrossSVG } from 'assets';
import styles from './QuizCard.module.scss';
import { QuizCardProps } from './QuizCard.types';

export const QuizCard: FC<QuizCardProps> = (props) => {
    const { onCross, quiz } = props;

    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [quizState, setQuizState] = useState(-1); // -1 = no answer, 0 = incorrect answer, 1 = correct answer

    const getQuizStatus = () => {
        switch (quizState) {
            case 0:
                return <div className={`error-message ${styles.ErrorMessage}`}>{quiz.errorMessage}</div>;
            case 1:
                return (
                    <div className={`success-message ${styles.SuccessMessage}`}>{quiz.successMessage}</div>
                );
            default:
                break;
        }
    };

    return (
        <div
            data-testid="QuizCard"
            className={`column swing-in-top-bck ${styles.QuizCard}`}
        >
            <form
                onSubmit={(e: FormEvent) => {
                    e.preventDefault();

                    if (selectedAnswer === quiz.answer) {
                        setQuizState(1);
                    } else {
                        setQuizState(0);
                    }
                }}
            >
                <div className="card">
                    <header className="card-header">
                        <p className={`card-header-title ${styles.CardHeaderTitle}`}>{quiz.question}</p>
                        {onCross && (
                            <button
                                className={`button is-danger ${styles.QuizCard_cross}`}
                                onClick={() => {
                                    onCross && onCross();
                                }}
                            >
                                <img src={CrossSVG} alt="X" />
                            </button>
                        )}
                    </header>
                    <div className="card-content">
                        <div className="content">
                            <div className="field">
                                <div className="control">
                                    {quiz.possibleAnswers?.map(
                                        (pa: string, index: number) => {
                                            return (
                                                <Fragment key={index}>
                                                    <label

                                                        className={styles.QuizCard_radio}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="quiz-answer"
                                                            onChange={(
                                                                e: ChangeEvent<
                                                                    HTMLInputElement
                                                                >
                                                            ) => {
                                                                setSelectedAnswer(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                            value={pa}
                                                            className={styles.QuizCard_radioInput}
                                                        />
                                                        {pa}
                                                    </label>
                                                    {index !==
                                                        quiz.possibleAnswers
                                                            .length -
                                                            1 && <hr className={styles.QuizCard_break} />}
                                                </Fragment>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                            {getQuizStatus()}
                            <button className="button is-info" type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
