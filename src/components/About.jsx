import React from 'react';
import './About.css';
import { FlaskConical, Users, HeartHandshake, Trophy } from 'lucide-react';

const pillars = [
    {
        icon: <FlaskConical size={28} />,
        title: 'Education Outreach',
        desc: 'Through NanaPahasa, we open our department labs to A/L students from schools that lack practical resources — demonstrating experiments, distributing model papers, and motivating students before their exams.',
    },
    {
        icon: <HeartHandshake size={28} />,
        title: 'Community Service',
        desc: "NanaSaviya brings every batch together to physically rebuild a school in need — repairing furniture, repainting classrooms, restoring blackboards, and reviving computer labs with our own hands.",
    },
    {
        icon: <Users size={28} />,
        title: 'Student Leadership',
        desc: 'Each year, a student-elected Executive Committee leads the society, guided by a Senior Treasurer from the academic staff. Together they plan, coordinate, and execute every STS initiative.',
    },
    {
        icon: <Trophy size={28} />,
        title: 'Unity & Camaraderie',
        desc: 'The annual STS Cricket Match unites undergraduates of all batches and academic staff on the same field outside the university — a day of sport, laughter, and lasting bonds.',
    },
];

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="about-container">
                {/* Main intro */}
                <div className="about-intro">
                    <h2 className="section-title">About <span className="highlight">STS</span></h2>
                    <p className="about-text">
                        The <strong>Society of Technological Studies (STS)</strong> is the official student society of the
                        <strong> Department of Physical Science and Technology</strong>,
                        Faculty of Applied Sciences, Sabaragamuwa University of Sri Lanka.
                    </p>
                    <p className="about-text">
                        We are a student-led community that believes science and technology thrive when they are
                        shared, applied, and celebrated together. From opening our university laboratories to
                        under-resourced A/L students, to rolling up our sleeves to rebuild a school, to cheering on
                        lecturers and undergraduates on the cricket field — STS is where knowledge meets action.
                    </p>
                </div>

                {/* Four pillars */}
                <div className="about-pillars">
                    {pillars.map((p, i) => (
                        <div className="about-pillar" key={i}>
                            <div className="pillar-icon">{p.icon}</div>
                            <h3>{p.title}</h3>
                            <p>{p.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
