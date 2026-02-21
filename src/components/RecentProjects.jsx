import React from 'react';
import './RecentProjects.css';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
    {
        title: "AI Waste Robot",
        desc: "Autonomous robot for waste classification and sorting using computer vision.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Python", "OpenCV", "Raspberry Pi"]
    },
    {
        title: "Smart Garden System",
        desc: "IoT-based system to monitor soil moisture and automate watering.",
        image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["IoT", "Arduino", "React"]
    },
    {
        title: "Tech Blog Platform",
        desc: "A community platform for sharing tech insights and tutorials.",
        image: "https://images.unsplash.com/photo-1499750310159-529800cf2c5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Node.js", "MongoDB", "Express"]
    }
];

const RecentProjects = () => {
    return (
        <section id="projects" className="projects-section">
            <div className="section-header">
                <h2>Our <span className="highlight">Projects</span></h2>
                <p>Showcasing student innovation</p>
            </div>

            <div className="projects-grid">
                {projects.map((project, index) => (
                    <div key={index} className="project-card">
                        <div className="project-image">
                            <img src={project.image} alt={project.title} />
                            <div className="project-overlay">
                                <a href="#demo" className="icon-link"><ExternalLink size={24} /></a>
                                <a href="#code" className="icon-link"><Github size={24} /></a>
                            </div>
                        </div>
                        <div className="project-content">
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-desc">{project.desc}</p>
                            <div className="project-tags">
                                {project.tags.map(tag => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecentProjects;
