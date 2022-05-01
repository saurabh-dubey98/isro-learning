import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import Nav from '../Nav/Nav'
import { getCentres } from '../../slices/isroApiSlice/isroApiSlice'
import './Centres.css'

const Centres = ({ only10 }) => {
    const { centres } = useSelector(state => state.isroapi)
    const { isLoggedIn } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }
        dispatch(getCentres(only10))
    }, [only10, navigate])
    return (
        <div className={`centres ${!only10 && 'homepage-container'}`}>
            {only10 ? <></> : <Nav />}
            <div className='section-heading'>
                <h2>ISRO Centres:</h2>
                {only10 && <button onClick={() => navigate('/centres')}>Show all {'>>'}</button>}
            </div>
            {centres === null && <div>Loading...</div>}
            {centres !== null && <div className="card-container">
                {centres.map(item => (
                    <div className="card centres-card" key={item.id}>
                        <h4>{item.name}</h4>
                        <p>{item.Place}</p>
                        <p>{item.State}</p>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default Centres