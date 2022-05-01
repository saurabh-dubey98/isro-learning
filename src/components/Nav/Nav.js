import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { GoRocket } from 'react-icons/go'
import { logout } from '../../slices/authSlice/authSlice'
import './Nav.css'

const Nav = () => {
    const { isLoggedIn } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div className="nav-container">
            <div>
                <div onClick={() => navigate('/')} className="nav-logo">
                    <GoRocket className="rocket-icon" />
                    <span>ISRO</span>
                    Learning
                </div>
                {isLoggedIn && <button onClick={() => dispatch(logout())} className="logout-btn">
                    Logout
                </button>}
            </div>
        </div>
    )
}

export default Nav