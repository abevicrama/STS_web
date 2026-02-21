import React from 'react';
import './RecentEvent.css';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const RecentEvent = () => {
    return (
        <section id="events" className="event-section">
            <div className="section-header">
                <h2>Recent <span className="highlight">Event</span></h2>
                <p>Stay updated with our latest activities</p>
            </div>

            <div className="event-card">
                <div className="event-image">
                    <img
                        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        alt="Recent Event"
                    />
                    <div className="event-badge">Featured</div>
                </div>
                <div className="event-content">
                    <h3 className="event-title">Tech Talk 2024: The Future of AI</h3>
                    <div className="event-meta">
                        <span><Calendar size={16} /> October 15, 2024</span>
                        <span><MapPin size={16} /> Main Auditorium</span>
                    </div>
                    <p className="event-description">
                        A deep dive into the evolving landscape of Artificial Intelligence. Industry experts shared insights on machine learning, ethics in AI, and the future of automation.
                    </p>
                    <a href="#read-more" className="read-more-btn">
                        Read More <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default RecentEvent;
