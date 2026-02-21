import React, { useState, useEffect } from 'react';
import './Projects.css';
import { projectsData } from '../data/projectsData';
import { Search, Filter, Code, User, ExternalLink } from 'lucide-react';

const Projects = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState(projectsData);

    const categories = ['All', ...new Set(projectsData.map(project => project.category))];

    useEffect(() => {
        const results = projectsData.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.student.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'All' || project.category === activeCategory;

            return matchesSearch && matchesCategory;
        });
        setFilteredProjects(results);
    }, [searchTerm, activeCategory]);

    return (
        <div className="projects-page">
            <header className="projects-hero">
                <h1>Student <span className="highlight">Projects</span></h1>
                <p>Explore the innovative solutions built by our talented students.</p>

                <div className="search-filter-container">
                    <div className="search-bar">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search projects, students, or tech..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="category-filters">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </header>

            <section className="projects-grid-container">
                {filteredProjects.length > 0 ? (
                    <div className="projects-grid">
                        {filteredProjects.map(project => (
                            <div key={project.id} className="project-card-full">
                                <div className="project-image-container">
                                    <img src={project.image} alt={project.title} loading="lazy" />
                                    <span className="category-badge">{project.category}</span>
                                </div>
                                <div className="project-content">
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-desc">{project.description}</p>

                                    <div className="project-meta">
                                        <div className="meta-item">
                                            <User size={16} />
                                            <span>{project.student}</span>
                                        </div>
                                        <div className="meta-item tech-badge">
                                            <Code size={16} />
                                            <span>{project.technology}</span>
                                        </div>
                                    </div>

                                    <button className="view-project-btn">
                                        View Details <ExternalLink size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <h3>No projects found</h3>
                        <p>Try adjusting your search or filter criteria.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Projects;
