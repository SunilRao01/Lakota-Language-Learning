import React, {ChangeEvent, FC, FormEvent, useState} from 'react'
import {IQuiz} from '../../redux/Posts/Posts.reducer'
import './QuizCard.css'
import CrossSvg from '../../assets/x.svg'

interface QuizCardProps {
    onCross?: () => void,
    quiz: IQuiz
}

export const QuizCard: FC<QuizCardProps> = props => {
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [quizState, setQuizState] = useState(-1) // -1 = no answer, 0 = incorrect answer, 1 = correct answer

    const getQuizStatus = () => {
        switch (quizState) {
            case 0:
                return <div className='error-message'>{props.quiz.errorMessage}</div>
            case 1:
                return <div className='success-message'>{props.quiz.successMessage}</div>
            default:
                break
        }
    }

    return (
        <div data-testid='QuizCard'
             className='column swing-in-top-bck is-full quiz-card'>
            <form onSubmit={(e: FormEvent) => {
                e.preventDefault()

                if (selectedAnswer == props.quiz.answer) {
                    setQuizState(1)
                } else {
                    setQuizState(0)
                }
            }}>
                <div className='card'>
                    <header className='card-header'>
                        <p className='card-header-title'>
                            {props.quiz.question}
                        </p>
                        {props.onCross &&
                        <button className='button is-danger' onClick={() => {
                            props.onCross && props.onCross()
                        }}>
                            <img src={CrossSvg} alt='X'/>
                        </button>
                        }
                    </header>
                    <div className='card-content'>
                        <div className='content'>
                            <div className="field">
                                <div className="control">
                                    {props.quiz.possibleAnswers &&
                                    props.quiz.possibleAnswers.map((pa: string, index: number) => {
                                        return (
                                            <label key={index} className='radio'>
                                                <input type="radio" name='quiz-answer'
                                                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                           setSelectedAnswer(e.target.value)
                                                       }}
                                                       value={pa}
                                                />
                                                {pa}
                                            </label>
                                        )
                                    })}
                                </div>
                            </div>
                            {
                                getQuizStatus()
                            }
                            <button className="button is-info"
                                    type='submit'>Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
};
