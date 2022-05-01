import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTimer } from "react-timer-hook"
import { useParams, useNavigate } from 'react-router'
import { BiRightArrow } from 'react-icons/bi'
import Nav from '../Nav/Nav'
import { getMcq, nextQuestion, reset, calculateScore, setSubject } from '../../slices/mcqSlice/mcqSlice'
import './MCQ.css'

const MCQ = () => {
    const { mcqQuestions, currentQuestion, time } = useSelector(state => state.mcq)
    const { isLoggedIn } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()
    const newTime = new Date()
    newTime.setSeconds(newTime.getSeconds() + time)
    const { seconds, start, restart } = useTimer({
        expiryTimestamp: newTime,
        onExpire: () => {
            if (currentQuestion < mcqQuestions.length)
                dispatch(nextQuestion({ didNotAttempt: true }))
        },
    })

    const optionSelectHandler = (answer) => {
        dispatch(nextQuestion(answer))
    }

    const submitHandler = () => {
        dispatch(calculateScore())
        navigate('/certificate')
    }

    useEffect(() => {
        restart(newTime)
    }, [currentQuestion])

    useEffect(() => {
        dispatch(getMcq(id))
        dispatch(setSubject(id))
        dispatch(reset())
    }, [id, isLoggedIn])

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }
    }, [isLoggedIn, navigate])
    return (
        <div className="mcq">
            <Nav />

            <div className="mcq-container">
                <h2>{id} MCQ  Questions:</h2>
                <div>
                    {mcqQuestions.length < 1 && <div>Loading...</div>}
                    {mcqQuestions.length > 0 && <div className={`mcq-question`}>
                        <h3>Qs.{currentQuestion + 1} {mcqQuestions[currentQuestion].question}</h3>
                        <div className="mcq-question-options">
                            {mcqQuestions[currentQuestion].options.map((item, idx) => (
                                <button onClick={() => optionSelectHandler({ isCorrect: item.isCorrect })} className="mcq-option-btn" key={idx}><BiRightArrow className="option-btn-icon" />{item.name}</button>
                            ))}
                        </div>
                    </div>}
                </div>
                {currentQuestion + 1 === mcqQuestions.length && <button className="mcq-submit-btn" onClick={submitHandler}>Submit</button>}
            </div>
        </div>
    )
}

export default MCQ