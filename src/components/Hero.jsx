import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Hero.css';

const SLIDES = [
    {
        id: 0,
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1950&q=80',
        tag: 'Welcome to STS',
        title: <>Discover. <span className="highlight">Innovate.</span> Excel.</>,
        subtitle: 'Transforming ideas into reality through collaboration and scientific curiosity.',
        buttons: [
            { label: 'Explore Programmes', to: '/department', primary: true },
            { label: 'Learn More', to: '/department', primary: false },
        ],
    },
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1950&q=80',
        tag: 'Annual Education Outreach',
        title: <><span className="highlight">NanaPahasa</span> — Labs for Every Student</>,
        subtitle: 'We open our department labs to A/L students from under-resourced schools — demonstrating practicals, distributing model papers, and mentoring for exams.',
        buttons: [
            { label: 'View Event', to: '/event/nanapahasa', primary: true },
            { label: 'Our Alumni', to: '/alumni', primary: false },
        ],
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1950&q=80',
        tag: 'Annual Community Service',
        title: <>Rebuild. Repaint. Restore — <span className="highlight">NanaSaviya</span></>,
        subtitle: 'Every batch unites to physically transform a school in need — fixing furniture, repainting classrooms, rebuilding computer labs, and restoring learning spaces.',
        buttons: [
            { label: 'View Event', to: '/event/nanasaviya', primary: true },
            { label: 'Our Projects', to: '/projects', primary: false },
        ],
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1950&q=80',
        tag: 'Annual Sports Day',
        title: <><span className="highlight">STS Cricket Match</span> — Beyond the Pitch</>,
        subtitle: 'Every batch and every lecturer, on the same field. A spirited off-campus cricket match that turns colleagues into teammates.',
        buttons: [
            { label: 'View Event', to: '/event/cricket', primary: true },
            { label: 'Research', to: '/research', primary: false },
        ],
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1950&q=80',
        tag: 'Adventure & Science',
        title: <><span className="highlight">Astro Camp</span> — Under the Stars</>,
        subtitle: 'An immersive astronomy camp where students explore the cosmos beyond the classroom with telescopes, lectures, and night-sky photography.',
        buttons: [
            { label: 'View Event', to: '/event/astrocamp', primary: true },
            { label: 'Alumni', to: '/alumni', primary: false },
        ],
    },
];

const INTERVAL = 5000; // ms per slide

const Hero = () => {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);

    const goTo = useCallback((idx) => {
        if (animating) return;
        setAnimating(true);
        setCurrent(idx);
        setTimeout(() => setAnimating(false), 700);
    }, [animating]);

    const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
    const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

    useEffect(() => {
        const timer = setInterval(next, INTERVAL);
        return () => clearInterval(timer);
    }, [next]);

    const slide = SLIDES[current];

    return (
        <section id="home" className="hero hero--slider">
            {/* Background slides */}
            {SLIDES.map((s, i) => (
                <div
                    key={s.id}
                    className={`hero-slide ${i === current ? 'hero-slide--active' : ''}`}
                    style={{ backgroundImage: `url('${s.image}')` }}
                    aria-hidden={i !== current}
                />
            ))}

            {/* Dark overlay */}
            <div className="hero-overlay" />

            {/* Content */}
            <div className={`hero-content hero-content--slider ${animating ? 'hero-content--fade' : ''}`}>
                <span className="hero-tag">{slide.tag}</span>
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-subtitle">{slide.subtitle}</p>
                <div className="hero-buttons">
                    {slide.buttons.map((btn, i) => (
                        <Link
                            key={i}
                            to={btn.to}
                            className={`btn ${btn.primary ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            {btn.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Prev / Next arrows */}
            <button className="hero-arrow hero-arrow--prev" onClick={prev} aria-label="Previous slide">
                <ChevronLeft size={28} />
            </button>
            <button className="hero-arrow hero-arrow--next" onClick={next} aria-label="Next slide">
                <ChevronRight size={28} />
            </button>

            {/* Dot indicators */}
            <div className="hero-dots">
                {SLIDES.map((_, i) => (
                    <button
                        key={i}
                        className={`hero-dot ${i === current ? 'hero-dot--active' : ''}`}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
