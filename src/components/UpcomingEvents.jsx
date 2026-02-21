import React, { useEffect, useRef } from 'react';
import './UpcomingEvents.css';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';

const events = [
    {
        id: 1,
        title: "STS Hackathon 2025",
        date: { day: "15", month: "MAR" },
        time: "09:00 AM - 06:00 PM",
        location: "Computer Lab 01",
        description: "Join us for a 24-hour coding marathon! Build innovative solutions and win exciting prizes.",
        image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Competition"
    },
    {
        id: 2,
        title: "Guest Lecture: Quantum Computing",
        date: { day: "22", month: "MAR" },
        time: "10:00 AM - 12:00 PM",
        location: "Auditorium",
        description: "An introductory session on the principles of Quantum Mechanics and Computing by Dr. Perera.",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Lecture"
    },
    {
        id: 3,
        title: "Workshop: React for Beginners",
        date: { day: "05", month: "APR" },
        time: "01:00 PM - 04:00 PM",
        location: "Smart Classroom",
        description: "Learn the basics of React.js and build your first comprehensive web application.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Workshop"
    }
];

const UpcomingEvents = () => {
    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        const cards = document.querySelectorAll('.upcoming-event-card');
        cards.forEach(card => observerRef.current.observe(card));

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    return (
        <section id="upcoming-events" className="upcoming-section">
            <div className="section-header">
                <h2>Upcoming <span className="highlight">Events</span></h2>
                <p>Mark your calendars for our next big things</p>
            </div>

            <div className="upcoming-grid">
                {events.map((event) => (
                    <div key={event.id} className="upcoming-event-card">
                        <div className="card-image-wrapper">
                            <img src={event.image} alt={event.title} className="card-image" />
                            <div className="card-category">{event.category}</div>
                        </div>
                        <div className="card-content">
                            <div className="card-date-badge">
                                <span className="date-day">{event.date.day}</span>
                                <span className="date-month">{event.date.month}</span>
                            </div>
                            <div className="card-details">
                                <h3 className="card-title">{event.title}</h3>
                                <div className="card-meta">
                                    <span><Clock size={14} /> {event.time}</span>
                                    <span><MapPin size={14} /> {event.location}</span>
                                </div>
                                <p className="card-description">{event.description}</p>
                                <button className="card-btn">
                                    Register Now <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default UpcomingEvents;
