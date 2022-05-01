import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import Nav from '../Nav/Nav'
import { getLaunchers } from '../../slices/isroApiSlice/isroApiSlice'
import './Launchers.css'

const Launchers = ({ only10 }) => {
    const { launchers } = useSelector(state => state.isroapi)
    const { isLoggedIn } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }
        dispatch(getLaunchers(only10))
    }, [navigate, isLoggedIn, dispatch])
    return (
        <div className={`launchers ${!only10 && 'homepage-container'}`}>
            {only10 ? <></> : <Nav />}
            <div className="section-heading">
                <h2>ISRO Launchers:</h2>
                {only10 && <button onClick={() => navigate('/launchers')}>Show all {'>>'}</button>}
            </div>
            {launchers === null && <div>Loading...</div>}
            {launchers !== null && <div className="card-container">
                {launchers.map(item => (
                    <div key={item.id} className="card launcher-card">
                        <h4>Launchers: <span>{item.id}</span></h4>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default Launchers