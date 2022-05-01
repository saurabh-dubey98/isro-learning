import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import Nav from '../Nav/Nav'
import { getSpaceCrafts } from '../../slices/isroApiSlice/isroApiSlice'
import './SpaceCrafts.css'

const SpaceCrafts = ({ only10 }) => {
    const { spaceCrafts } = useSelector(state => state.isroapi)
    const { isLoggedIn } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }
        dispatch(getSpaceCrafts(only10))
    }, [navigate, dispatch])
    return (
        <div className={`spacecrafts ${!only10 && 'homepage-container'}`}>
            {only10 ? <></> : <Nav />}
            <div className="section-heading">
                <h2>Spacecrafts:</h2>
                {only10 && <button onClick={() => navigate('/spacecrafts')}>Show all {'>>'}</button>}
            </div>
            {spaceCrafts === null && <div>Loading...</div>}
            {spaceCrafts !== null && <div className="card-container">
                {spaceCrafts.map(item => (
                    <div key={item.id} className="card spacecraft-card">
                        <h4>Name: <span>{item.name}</span></h4>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default SpaceCrafts