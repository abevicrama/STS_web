import React from 'react';
import './LoadingScreen.css';
import stsLogoWhite from '../assets/images/logo/sts_logo_white.png';

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div className="loader">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
            <div className="loading-logo">
                <img src={stsLogoWhite} alt="STS" className="loading-logo-img" />
            </div>
        </div>
    );
};

export default LoadingScreen;
