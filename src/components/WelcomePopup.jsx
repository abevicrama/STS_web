import React, { useState, useEffect } from 'react';
import './WelcomePopup.css';

const WelcomePopup = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Show popup shortly after page loads
        const timer = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => setVisible(false);

    if (!visible) return null;

    return (
        <div className="wp-overlay" onClick={handleClose}>
            <div className="wp-modal" onClick={(e) => e.stopPropagation()}>
                <div className="wp-emoji">👋</div>
                <h2 className="wp-title">Welcome!</h2>
                <p className="wp-message">nova ponnaya</p>
                <div className="wp-buttons">
                    <button className="wp-btn wp-btn-yes" onClick={handleClose}>Yes</button>
                    <button className="wp-btn wp-btn-ow" onClick={handleClose}>Ow</button>
                </div>
            </div>
        </div>
    );
};

export default WelcomePopup;
