import React, {FC, useState} from 'react'
import './Quiz.css'

interface QuizProps {
    question: string,
    answers: string[],
    answer: string
}

export const Quiz: FC<QuizProps> = props => {
    const [renderAnswer, setRenderAnswer] = useState('')
    const [outputMessage, setOutputMessage] = useState('')

    const onSubmit = () => {
        if (renderAnswer === props.answer) {
            setOutputMessage('Correct!')
        } else {
            setOutputMessage('Incorrect! Try again.')
        }
    }

    return (<>
            <div className='has-text-weight-bold'>
                {props.question}
            </div>
            {outputMessage.length > 0 &&
            <p>
                {outputMessage}
            </p>}
            <div className="field is-grouped">
                <div className="quiz-answers">
                    {
                        props.answers.map((a, i) =>
                            <label key={i} className="radio">
                                <input onChange={e => setRenderAnswer(e.target.value)}
                                       value={a} type="radio" name="answer"
                                />
                                {a}
                            </label>
                        )
                    }
                    <p className="control">
                        <a className="button is-light is-small" onClick={onSubmit}>Submit</a>
                    </p>
                </div>
            </div>
        </>
    )
}
