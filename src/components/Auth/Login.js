import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Nav from '../Nav/Nav'
import { login } from '../../slices/authSlice/authSlice'
import './Auth.css'

const Login = () => {
    const { isLoggedIn } = useSelector(state => state.auth)
    const [userData, setUserData] = useState({
        email: '',
        pass: ''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onChangeHandler = e => {
        setUserData(prev => {
            return {
                ...prev, [e.target.name]: e.target.value
            }
        })
    }

    const loginHandler = e => {
        e.preventDefault()
        dispatch(login({ email: userData.email, pass: userData.pass }))
    }

    console.log(userData);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn, navigate])
    return (
        <div className='auth-container'>
            <Nav />

            <div>
                <h2>Login</h2>
                <form onSubmit={loginHandler}>
                    <div className='auth-form-control'>
                        <label htmlFor="email">Email</label>
                        <input value={userData.email} onChange={onChangeHandler} name="email" id="email" type="email" required />
                    </div>
                    <div className='auth-form-control'>
                        <label htmlFor="pass">Password</label>
                        <input value={userData.pass} onChange={onChangeHandler} name="pass" id="pass" type="password" required />
                    </div>
                    <button className="auth-btn">Login</button>
                </form>
                <Link className="auth-link" to='/register'>Don't have an account ?</Link>
            </div>
        </div>
    )
}

export default Login