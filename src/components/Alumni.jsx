import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Alumni.css';
import { alumniData } from '../data/alumniData';
import { Linkedin, Quote } from 'lucide-react';

const Alumni = () => {
    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        const cards = document.querySelectorAll('.alumni-card');
        cards.forEach(card => observerRef.current.observe(card));

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    return (
        <div className="alumni-page">
            <header className="alumni-hero">
                <div className="hero-content">
                    <h1>Our <span className="highlight">Alumni</span></h1>
                    <p>Celebrating the success stories of our graduates who are making a difference across the globe.</p>
                    <div className="alumni-cta-btns alumni-hero-btns">
                        <Link to="/alumni/register" className="join-btn join-btn--primary">
                            Create Alumni Profile
                        </Link>
                        <Link to="/alumni/login" className="join-btn join-btn--outline">
                            Update My Profile
                        </Link>
                    </div>
                </div>
            </header>

            <section className="alumni-grid-container">
                <div className="alumni-grid">
                    {alumniData.map((alumnus) => (
                        <div key={alumnus.id} className="alumni-card">
                            <div className="alumni-image-wrapper">
                                <img src={alumnus.image} alt={alumnus.name} />
                                <a href={alumnus.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-btn">
                                    <Linkedin size={18} />
                                </a>
                            </div>
                            <div className="alumni-content">
                                <h3 className="alumni-name">{alumnus.name}</h3>
                                <p className="alumni-role">{alumnus.role}</p>
                                <span className="alumni-batch">{alumnus.batch}</span>

                                <div className="alumni-quote">
                                    <Quote size={20} className="quote-icon-start" />
                                    <p>{alumnus.testimonial}</p>
                                    <Quote size={20} className="quote-icon-end" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Alumni;
