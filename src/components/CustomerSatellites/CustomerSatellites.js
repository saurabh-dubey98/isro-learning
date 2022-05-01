import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import Nav from '../Nav/Nav'
import { getCustomerSatellites } from '../../slices/isroApiSlice/isroApiSlice'
import './CustomerSatellites.css'

const CustomerSatellites = ({ only10 }) => {
    const { customerSatellites } = useSelector(state => state.isroapi)
    const { isLoggedIn } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }
        dispatch(getCustomerSatellites(only10))
    }, [navigate, dispatch, isLoggedIn, only10])
    return (
        <div className={`customer-satellites ${!only10 && 'homepage-container'}`}>
            {only10 ? <></> : <Nav />}
            <div className="section-heading">
                <h2>Customer Satellites:</h2>
                {only10 && <button onClick={() => navigate('/customer-satellites')}>Show all {'>>'}</button>}
            </div>

            {customerSatellites === null && <div>Loading...</div>}
            {customerSatellites !== null && <div className="card-container">
                {customerSatellites.map(item => (
                    <div key={item.id} className="card satellites-card">
                        <h4>Satellite Id: <span>{item.id}</span></h4>
                        <p>Country: <span>{item.country}</span></p>
                        <p>Launch date: <span>{item.launch_date}</span></p>
                        <p>Mass: <span>{item.mass}</span></p>
                        <p>Launcher: <span>{item.launcher}</span></p>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default CustomerSatellites