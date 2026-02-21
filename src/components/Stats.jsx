import React, { useEffect, useState, useRef } from 'react';
import './Stats.css';

const StatItem = ({ end, label }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.ceil(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isVisible, end]);

    return (
        <div className="stat-item" ref={ref}>
            <h3 className="stat-number">{count}+</h3>
            <p className="stat-label">{label}</p>
        </div>
    );
};

const Stats = () => {
    return (
        <section className="stats-section">
            <div className="stats-container">
                <StatItem end={50} label="Events Organized" />
                <StatItem end={200} label="Active Members" />
                <StatItem end={15} label="Projects Completed" />
            </div>
        </section>
    );
};

export default Stats;
