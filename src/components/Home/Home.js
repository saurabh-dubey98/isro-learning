import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Nav from '../Nav/Nav'
import Centres from '../Centres/Centres'
import CustomerSatellites from '../CustomerSatellites/CustomerSatellites'
import Launchers from '../Launchers/Launchers'
import SpaceCrafts from '../SpaceCrafts/SpaceCrafts'
import './Home.css'

const Home = () => {
    const { isLoggedIn } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }
    }, [isLoggedIn, navigate])

    return (
        <div className='homepage'>
            <div className="homepage-container">
                <Nav />

                <section className="mcq-section">
                    <h2>MCQ Questions</h2>
                    <p>Test your knowledge with these MCQ tests:</p>
                    <div>
                        <span>
                            <Link to="/mcq/astronomy">Astronomy</Link>
                        </span>
                        <span>
                            <Link to="/mcq/universe">Universe</Link>
                        </span>
                        <span>
                            <Link to="/mcq/cosmology">Cosmology</Link>
                        </span>
                    </div>
                </section>
                <section className="isro-section">
                    <h2>ISRO Knowledge</h2>
                    <p>Learn more about ISRO and the technology they are using:</p>
                    <Centres only10={true} />
                    <CustomerSatellites only10={true} />
                    <Launchers only10={true} />
                    <SpaceCrafts only10={true} />
                </section>


            </div>

            {/* <section className="hero-section" style={{ "--bg-image": `url(${earthImg})` }}>
                <div className="hero-section-overlay"></div>
                <div className="hero-section-content">
                    <h1><span>ISRO</span> Learning</h1>
                    <p>Start Here {">>"}</p>
                </div>
            </section> */}
        </div>
    )
}

export default Home