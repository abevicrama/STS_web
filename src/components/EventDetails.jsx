import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft, Calendar, MapPin, Users, School,
    ChevronRight, X, Image, BookOpen, Star, AlertCircle
} from 'lucide-react';
import { eventData } from '../data/eventData';
import './EventDetails.css';

/* ============================================================
   EVENT INDEX PAGE — overview + edition year cards
   ============================================================ */
const EventIndex = ({ event }) => {
    const [selected, setSelected] = useState(null);

    // Sort editions newest first
    const editions = [...(event.editions || [])].sort((a, b) => b.year - a.year);
    const totalStudents = edition =>
        edition.schools.reduce((s, sc) => s + sc.students, 0) || null;

    return (
        <div className="evd-page">
            {/* Hero */}
            <div className="evd-hero" style={{ backgroundImage: `url(${event.coverImage})` }}>
                <div className="evd-hero-overlay">
                    <Link to="/" className="evd-back">
                        <ArrowLeft size={18} /> Home
                    </Link>
                    <div className="evd-hero-content">
                        <span className="evd-category-badge">{event.category}</span>
                        <h1>{event.title}</h1>
                        <p className="evd-subtitle">{event.subtitle}</p>
                        <div className="evd-hero-meta">
                            <span><MapPin size={15} /> {event.location}</span>
                            <span><Calendar size={15} /> {event.frequency}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* About */}
            <section className="evd-about">
                <div className="evd-container">
                    <h2>About <span className="highlight">{event.title}</span></h2>
                    <p>{event.description}</p>
                </div>
            </section>

            {/* Edition cards */}
            <section className="evd-editions-section">
                <div className="evd-container">
                    <h2 className="evd-section-title">Past Editions</h2>
                    <p className="evd-section-sub">Click an edition to see the full details</p>
                    <div className="evd-edition-grid">
                        {editions.map(ed => (
                            <button
                                key={ed.badge}
                                className="evd-edition-card"
                                onClick={() => setSelected(ed)}
                            >
                                <div className="ecard-badge">{ed.badge}</div>
                                <div className="ecard-year">{ed.year}</div>
                                <div className="ecard-stats">
                                    {ed.schoolCount > 0 && (
                                        <span><School size={14} /> {ed.schoolCount} schools</span>
                                    )}
                                    {totalStudents(ed) && (
                                        <span><Users size={14} /> {totalStudents(ed)} students</span>
                                    )}
                                </div>
                                <span className="ecard-see-more">
                                    View Details <ChevronRight size={15} />
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Edition detail modal */}
            {selected && (
                <EditionModal
                    event={event}
                    edition={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </div>
    );
};

/* ============================================================
   EDITION DETAIL MODAL
   ============================================================ */
const EditionModal = ({ event, edition, onClose }) => {
    const [lightbox, setLightbox] = useState(null);

    // Lock body scroll while open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    const totalStudents = edition.schools.reduce((s, sc) => s + sc.students, 0);

    return (
        <>
            <div className="emodal-overlay" onClick={onClose}>
                <div className="emodal" onClick={e => e.stopPropagation()}>
                    {/* Header */}
                    <div className="emodal-header">
                        <div>
                            <span className="emodal-badge">{edition.badge}</span>
                            <h2>{event.title} — {edition.year}</h2>
                        </div>
                        <button className="emodal-close" onClick={onClose}>
                            <X size={22} />
                        </button>
                    </div>

                    <div className="emodal-body">
                        {/* Summary stats row */}
                        <div className="emodal-stats">
                            <div className="estat">
                                <span className="estat-label">Academic Year</span>
                                <span className="estat-value">{edition.badge}</span>
                            </div>
                            {edition.schoolCount > 0 && (
                                <div className="estat">
                                    <span className="estat-label">Schools</span>
                                    <span className="estat-value">{edition.schoolCount}</span>
                                </div>
                            )}
                            {totalStudents > 0 && (
                                <div className="estat">
                                    <span className="estat-label">Students</span>
                                    <span className="estat-value">{totalStudents}</span>
                                </div>
                            )}
                            {edition.coordinators.length > 0 && (
                                <div className="estat">
                                    <span className="estat-label">Coordinators</span>
                                    <span className="estat-value">{edition.coordinators.length}</span>
                                </div>
                            )}
                        </div>

                        {/* Main coordinators */}
                        {edition.coordinators.length > 0 && (
                            <div className="emodal-section">
                                <h4><Star size={16} /> Main Coordinators</h4>
                                <div className="coord-chips">
                                    {edition.coordinators.map((c, i) => (
                                        <span key={i} className="coord-chip">{c}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Schools */}
                        {edition.schools.length > 0 && (
                            <div className="emodal-section">
                                <h4><School size={16} /> Participated Schools — {edition.schoolCount} schools</h4>
                                <div className="schools-table">
                                    <div className="school-row school-header">
                                        <span>School</span>
                                        <span>Students</span>
                                    </div>
                                    {edition.schools.map((sc, i) => (
                                        <div key={i} className="school-row">
                                            <span>{sc.name}</span>
                                            <span className="stu-count">{sc.students}</span>
                                        </div>
                                    ))}
                                    <div className="school-row school-total">
                                        <span>Total</span>
                                        <span className="stu-count">{totalStudents}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Special notes */}
                        {edition.notes && (
                            <div className="emodal-section">
                                <h4><AlertCircle size={16} /> Special Notes</h4>
                                <p className="enotes">{edition.notes}</p>
                            </div>
                        )}

                        {/* Image gallery */}
                        {edition.images && edition.images.length > 0 && (
                            <div className="emodal-section">
                                <h4><Image size={16} /> Image Gallery</h4>
                                <div className="egal-grid">
                                    {edition.images.map((img, i) => (
                                        <button
                                            key={i}
                                            className="egal-thumb"
                                            onClick={() => setLightbox(i)}
                                        >
                                            <img src={img} alt={`${event.title} ${edition.year} — ${i + 1}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {lightbox !== null && (
                <div className="elightbox" onClick={() => setLightbox(null)}>
                    <button className="lb-close"><X size={26} /></button>
                    <button
                        className="lb-nav lb-prev"
                        onClick={e => { e.stopPropagation(); setLightbox(idx => Math.max(0, idx - 1)); }}
                        disabled={lightbox === 0}
                    >&#8249;</button>
                    <img
                        src={edition.images[lightbox]}
                        alt={`Gallery ${lightbox + 1}`}
                        onClick={e => e.stopPropagation()}
                    />
                    <button
                        className="lb-nav lb-next"
                        onClick={e => { e.stopPropagation(); setLightbox(idx => Math.min(edition.images.length - 1, idx + 1)); }}
                        disabled={lightbox === edition.images.length - 1}
                    >&#8250;</button>
                    <span className="lb-counter">{lightbox + 1} / {edition.images.length}</span>
                </div>
            )}
        </>
    );
};

/* ============================================================
   PAGE WRAPPER — looks up event by ID from URL
   ============================================================ */
const EventDetails = () => {
    const { eventId } = useParams();
    const event = eventData[eventId];

    if (!event) {
        return (
            <div className="evd-not-found">
                <BookOpen size={48} />
                <h2>Event not found</h2>
                <Link to="/" className="evd-back-home">← Back to Home</Link>
            </div>
        );
    }

    return <EventIndex event={event} />;
};

export default EventDetails;
