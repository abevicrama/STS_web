import React, { useEffect, useRef } from 'react';
import './Department.css';
import { departmentData } from '../data/departmentData';
import { ChevronRight, Download, ExternalLink, MapPin, Globe, Mail } from 'lucide-react';

const Department = () => {
    const { hero, about, hierarchy, programs, curriculum, opportunities, contact } = departmentData;

    // Intersection Observer for fade-in animations
    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => observerRef.current.observe(el));

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    return (
        <div className="department-page" id="department">
            {/* Hero Section */}
            <header className="dept-hero animate-on-scroll">
                <div className="dept-hero-content">
                    <h1>{hero.title}</h1>
                    <p>{hero.subtitle}</p>
                    <div className="dept-hero-buttons">
                        {hero.buttons.map((btn, index) => (
                            <a key={index} href={btn.link} className="dept-btn primary">{btn.text}</a>
                        ))}
                    </div>
                </div>
            </header>

            {/* About Section */}
            <section className="dept-section about-section animate-on-scroll">
                <div className="dept-container">
                    <h2>{about.title}</h2>
                    <p>{about.description}</p>
                </div>
            </section>

            {/* Programs Section */}
            <section id="programs" className="dept-section programs-section animate-on-scroll">
                <div className="dept-container">
                    <h2 className="section-title">Programs & Streams</h2>
                    <div className="programs-grid">
                        {programs.map((program, index) => {
                            const Icon = program.icon;
                            return (
                                <div key={index} className="program-card">
                                    <div className="program-icon"><Icon size={40} /></div>
                                    <h3>{program.title}</h3>
                                    <span className="program-abbr">{program.abbreviation}</span>
                                    <div className="program-details">
                                        <p><strong>Best for:</strong> {program.bestFor}</p>
                                        <div className="program-skills">
                                            {program.skills.map((skill, i) => (
                                                <span key={i} className="skill-tag">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <button className="dept-btn outline small">View Curriculum</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Academic Hierarchy */}
            <section id="hierarchy" className="dept-section hierarchy-section animate-on-scroll">
                <div className="dept-container">
                    <h2 className="section-title">{hierarchy.title}</h2>
                    <p className="hierarchy-note">{hierarchy.note}</p>

                    <div className="hierarchy-tree">
                        {/* HOD */}
                        <div className="hierarchy-node root-node">
                            <div className="role-card">
                                {(() => {
                                    const Icon = hierarchy.nodes[0].icon;
                                    return <span className="icon-box"><Icon size={24} /></span>;
                                })()}
                                <h4>{hierarchy.nodes[0].role}</h4>
                                <p>{hierarchy.nodes[0].name}</p>
                            </div>
                            <div className="connector-vertical"></div>
                        </div>

                        {/* Children */}
                        <div className="hierarchy-level-2">
                            {/* Programme Coordinators */}
                            <div className="hierarchy-branch">
                                <h4 className="branch-title">{hierarchy.nodes[0].children[0].role}</h4>
                                <div className="branch-content">
                                    {hierarchy.nodes[0].children[0].members.map((member, i) => (
                                        <div key={i} className="staff-item">
                                            <strong>{member.role}:</strong> {member.name}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Academic Staff */}
                            <div className="hierarchy-branch">
                                <h4 className="branch-title">{hierarchy.nodes[0].children[1].role}</h4>
                                <div className="branch-content">
                                    {hierarchy.nodes[0].children[1].categories.map((cat, i) => (
                                        <div key={i} className="staff-category">
                                            <h5>{cat.title}</h5>
                                            <ul>
                                                {cat.names.map((name, k) => <li key={k}>{name}</li>)}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Support & Reps */}
                            <div className="hierarchy-branch">
                                <h4 className="branch-title">Support & Admin</h4>
                                <div className="branch-content">
                                    <div className="staff-category">
                                        <h5>{hierarchy.nodes[0].children[2].role}</h5>
                                        <ul>
                                            {hierarchy.nodes[0].children[2].names.map((name, k) => <li key={k}>{name}</li>)}
                                        </ul>
                                    </div>
                                    <div className="staff-category">
                                        <h5>{hierarchy.nodes[0].children[3].role}</h5>
                                        <ul>
                                            {hierarchy.nodes[0].children[3].names.map((name, k) => <li key={k}>{name}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Curriculum Highlights */}
            <section className="dept-section curriculum-section animate-on-scroll">
                <div className="dept-container">
                    <h2 className="section-title">Curriculum Highlights</h2>
                    <div className="curriculum-content">
                        <div className="code-guide">
                            <h3>{curriculum.title}</h3>
                            <p>{curriculum.description}</p>
                            <div className="code-example">
                                <div className="code-display">{curriculum.example.code}</div>
                                <div className="code-breakdown">
                                    {curriculum.example.breakdown.map((item, index) => (
                                        <div key={index} className="code-part">
                                            <span className="part-text">{item.part}</span>
                                            <span className="part-arrow">↓</span>
                                            <span className="part-mean">{item.meaning}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="learning-areas">
                            <h3>First Year Core Areas</h3>
                            <div className="area-chips">
                                {curriculum.highlights.map((area, index) => (
                                    <span key={index} className="area-chip">{area}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Opportunities */}
            <section id="opportunities" className="dept-section opportunities-section animate-on-scroll">
                <div className="dept-container">
                    <h2 className="section-title">{opportunities.title}</h2>
                    <h3 className="section-subtitle">{opportunities.subtitle}</h3>

                    <div className="opportunity-card">
                        <div className="opp-header">
                            <h4>{opportunities.projectWork.title}</h4>
                            <span className="duration-badge">{opportunities.projectWork.duration}</span>
                        </div>
                        <ul className="opp-steps">
                            {opportunities.projectWork.steps.map((step, index) => (
                                <li key={index}>
                                    <span className="step-num">{index + 1}</span>
                                    {step}
                                </li>
                            ))}
                        </ul>
                        <p className="opp-note"><em>{opportunities.projectWork.note}</em></p>
                        <button className="dept-btn primary">How to prepare your proposal <ExternalLink size={16} /></button>
                    </div>
                </div>
            </section>

            {/* Quick Links / Contact */}
            <footer className="dept-footer animate-on-scroll">
                <div className="dept-container">
                    <div className="dept-contact-grid">
                        <div className="contact-item">
                            <Globe size={20} />
                            <a href={contact.website} target="_blank" rel="noopener noreferrer">Official Website</a>
                        </div>
                        <div className="contact-item">
                            <Mail size={20} />
                            <a href={`mailto:${contact.email}`}>{contact.email}</a>
                        </div>
                        <div className="contact-item">
                            <MapPin size={20} />
                            <span>{contact.location}</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Department;
