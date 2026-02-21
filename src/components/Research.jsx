import React, { useState } from 'react';
import './Research.css';
import { researchData } from '../data/researchData';
import { BookOpen, Users, ExternalLink, Search } from 'lucide-react';

const Research = () => {
    const [search, setSearch] = useState('');

    const filtered = researchData.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.authors.some(a => a.toLowerCase().includes(search.toLowerCase())) ||
        p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="research-page">
            <header className="research-hero">
                <h1>Research <span className="highlight">Publications</span></h1>
                <p>Academic contributions from the Society of Technological Studies</p>
                <div className="research-search">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search by title, author or topic..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </header>

            <section className="research-list">
                {filtered.length === 0 && (
                    <div className="no-results"><p>No publications match your search.</p></div>
                )}
                {filtered.map(pub => (
                    <div key={pub.id} className="pub-card">
                        <div className="pub-meta">
                            <span className="pub-year">{pub.year}</span>
                            <span className="pub-journal">{pub.journal}</span>
                        </div>
                        <h3 className="pub-title">
                            <BookOpen size={18} className="pub-icon" />
                            {pub.title}
                        </h3>
                        <div className="pub-authors">
                            <Users size={15} />
                            {pub.authors.join(', ')}
                        </div>
                        <p className="pub-abstract">{pub.abstract}</p>
                        <div className="pub-footer">
                            <div className="pub-tags">
                                {pub.tags.map(tag => (
                                    <span key={tag} className="pub-tag">{tag}</span>
                                ))}
                            </div>
                            <a href={pub.doi} target="_blank" rel="noopener noreferrer" className="pub-link">
                                View Paper <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Research;
