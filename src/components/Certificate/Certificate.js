import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print';
import Nav from '../Nav/Nav'
import './Certificate.css'

const Certificate = () => {
    const [tabChange, setTabChange] = useState('screen1')
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phoneNo: ''
    })
    const { score, subject } = useSelector(state => state.mcq)
    const { isLoggedIn } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const contentRef = useRef(null)
    const currentDate = new Date().toDateString()
    const onChangeHandler = e => {
        setUserInfo(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const infoSubmit = e => {
        e.preventDefault()
        setTabChange('screen2')

        setTimeout(() => {
            downloadFile()
        }, 1500)
    }

    const downloadFile = useReactToPrint({
        content: () => contentRef.current
    })

    const screen1 = <form onSubmit={infoSubmit} className="user-info">
        <h2>We need some information to generate your certificate</h2>
        <div className="form-group">
            <label htmlFor="name">*Name</label>
            <input value={userInfo.name} name="name" onChange={onChangeHandler} id="name" type="text" required />
        </div>
        <div className="form-group">
            <label htmlFor="email">*Email</label>
            <input value={userInfo.email} name="email" onChange={onChangeHandler} id="email" type="email" required />
        </div>
        <div className="form-group">
            <label htmlFor="phone">*Phone no.</label>
            <input value={userInfo.phoneNo} name="phoneNo" onChange={onChangeHandler} id="phone" type="text" required />
        </div>
        <button type="submit">Get Certificate</button>
    </form>

    const screen2 = <div ref={contentRef} className='certificate-generate'>
        <h2>Certificate For Completion</h2>
        <p>Name: <span>{userInfo.name}</span></p>
        <p>Email: <span>{userInfo.email}</span></p>
        <p>Phone: <span>{userInfo.phoneNo}</span></p>
        <p>Subject: <span style={{ textTransform: 'capitalize' }}>{subject}</span></p>
        <p>Score: <span>{score}</span></p>
        <p>Date: <span>{currentDate}</span></p>
    </div>

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }
    }, [isLoggedIn, navigate])

    return (
        <div className="certificate">
            <Nav />
            <div className="certificate-container">
                {tabChange === 'screen1' && screen1}
                {tabChange === 'screen2' && screen2}
            </div>
        </div>
    )
}

export default Certificate