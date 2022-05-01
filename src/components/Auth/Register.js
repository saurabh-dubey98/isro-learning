import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Nav from '../Nav/Nav'
import './Auth.css'
const Register = () => {
    const { isLoggedIn } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn, navigate])
    return (
        <div className='auth-container'>
            <Nav />
            <div>
                <h2>Register</h2>
                <form>
                    <div className='auth-form-control'>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" required />
                    </div>
                    <div className='auth-form-control'>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" required />
                    </div>
                    <div className='auth-form-control'>
                        <label htmlFor="pass">Password</label>
                        <input id="pass" type="password" required />
                    </div>
                    <button className="auth-btn">Register</button>
                </form>
                <Link className="auth-link" to='/login'>Already have a account ?</Link>
            </div>

        </div>
    )
}

export default Register