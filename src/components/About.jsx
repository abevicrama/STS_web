import React from 'react';
import './About.css';
import { Lightbulb } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="about-container">
                <div className="about-content">
                    <h2 className="section-title">About <span className="highlight">STS</span></h2>
                    <p className="about-text">
                        The Society of Technological Studies (STS) is a student-led organization dedicated to bridging the gap between theoretical knowledge and practical application. We empower students to explore emerging technologies, engage in collaborative projects, and develop skills that matter in the digital age.
                    </p>
                    <p className="about-text">
                        Our mission is to cultivate a community of innovators, thinkers, and problem-solvers who are ready to tackle the challenges of tomorrow.
                    </p>
                </div>
                <div className="about-image">
                    <div className="icon-wrapper">
                        <Lightbulb size={120} strokeWidth={1} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
