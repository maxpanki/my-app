import React from 'react'
import './welcome-page.css'

const WelcomePage = () => {
    return (
        <div className="welcome-text">
            <h1>Welcome to NewsAPI APP!</h1>
            <h5 className="description">Here you will find interesting news.<br/>Please choose a cattegory to start.</h5>
        </div>
    )
}

export default WelcomePage