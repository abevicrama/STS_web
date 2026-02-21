import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { committeeData } from '../data/committeeData';
import {
    Mail, ChevronDown, ChevronUp, Award, Shield,
    BookOpen, DollarSign, PenTool, Users, ArrowRight
} from 'lucide-react';
import './Committee.css';

/* ============================================================
   Shared constants
   ============================================================ */
const ROLE_ICON = {
    'President': <Shield size={16} />,
    'Vice President': <Award size={16} />,
    'Secretary': <BookOpen size={16} />,
    'Treasurer': <DollarSign size={16} />,
    'Senior Treasurer': <DollarSign size={16} />,
    'Editor': <PenTool size={16} />,
};

const ROLE_ORDER = ['President', 'Vice President', 'Secretary', 'Treasurer', 'Senior Treasurer', 'Editor'];

/** '20/21' → '2020/2021' */
const expandBadge = badge => {
    const [a, b] = badge.split('/');
    return `20${a}/20${b}`;
};

/* ============================================================
   MemberCard — used in both the home section and archive page
   ============================================================ */
const MemberCard = ({ member, badge, isSeniorTreasurer }) => (
    <div className={`com-card ${isSeniorTreasurer ? 'com-card--faculty' : ''}`}>
        <div className="com-avatar-wrap">
            <img
                src={member.avatar}
                alt={member.name}
                className="com-avatar"
                onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&size=128`; }}
            />
        </div>
        <div className="com-role-badge">
            {ROLE_ICON[member.role]} {member.role}
        </div>
        {badge && <span className="com-acad-badge">{badge}</span>}
        <h3 className="com-name">{member.name}</h3>
        <p className="com-degree">{member.year}</p>
        <a className="com-email" href={`mailto:${member.email}`}>
            <Mail size={13} /> {member.email}
        </a>
    </div>
);

/* ============================================================
   YearSection — collapsible block used in the archive page
   ============================================================ */
const YearSection = ({ data, isLatest }) => {
    const [open, setOpen] = useState(isLatest);

    const sorted = [...data.committees].sort(
        (a, b) => ROLE_ORDER.indexOf(a.role) - ROLE_ORDER.indexOf(b.role)
    );
    const studentRoles = sorted.filter(m => m.role !== 'Senior Treasurer');
    const seniorTreasurer = sorted.find(m => m.role === 'Senior Treasurer');

    return (
        <div className={`com-year-block ${isLatest ? 'com-year-block--latest' : ''}`}>
            <button
                className="com-year-header"
                onClick={() => setOpen(o => !o)}
                aria-expanded={open}
            >
                <div className="com-year-left">
                    {isLatest && <span className="com-current-tag">Current</span>}
                    <span className="com-year-badge">{expandBadge(data.badge)}</span>
                    <span className="com-year-title">Executive Committee</span>
                </div>
                <span className="com-year-toggle">
                    {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
            </button>

            {open && (
                <div className="com-year-body">
                    <div className="com-grid">
                        {studentRoles.map(m => (
                            <MemberCard key={m.role} member={m} badge={data.badge} isSeniorTreasurer={false} />
                        ))}
                    </div>
                    {seniorTreasurer && (
                        <div className="com-faculty-row">
                            <div className="com-faculty-divider"><span>Faculty Advisor</span></div>
                            <div className="com-faculty-card-wrap">
                                <MemberCard member={seniorTreasurer} badge={data.badge} isSeniorTreasurer />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

/* ============================================================
   CommitteeSection — embedded in the Home page
   Shows ONLY the latest year + "View Former Committees" link
   ============================================================ */
export const CommitteeSection = () => {
    const latest = [...committeeData].sort((a, b) => b.badge.localeCompare(a.badge))[0];
    if (!latest) return null;

    const sorted = [...latest.committees].sort(
        (a, b) => ROLE_ORDER.indexOf(a.role) - ROLE_ORDER.indexOf(b.role)
    );
    const studentRoles = sorted.filter(m => m.role !== 'Senior Treasurer');
    const seniorTreasurer = sorted.find(m => m.role === 'Senior Treasurer');

    return (
        <section className="com-home-section">
            <div className="com-home-inner">
                {/* Header */}
                <div className="com-home-header">
                    <div>
                        <h2>Executive Committee</h2>
                        <p className="com-home-sub">
                            {expandBadge(latest.badge)} — the student leaders of STS
                        </p>
                    </div>
                    <Link to="/committee" className="com-former-link">
                        View Former Committees <ArrowRight size={16} />
                    </Link>
                </div>

                {/* 5 student roles */}
                <div className="com-grid com-home-grid">
                    {studentRoles.map(m => (
                        <MemberCard key={m.role} member={m} badge={latest.badge} isSeniorTreasurer={false} />
                    ))}
                </div>

                {/* Faculty advisor */}
                {seniorTreasurer && (
                    <div className="com-faculty-row">
                        <div className="com-faculty-divider"><span>Faculty Advisor</span></div>
                        <div className="com-faculty-card-wrap">
                            <MemberCard member={seniorTreasurer} badge={latest.badge} isSeniorTreasurer />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

/* ============================================================
   Committee — full archive page at /committee
   ============================================================ */
const Committee = () => {
    const sorted = [...committeeData].sort((a, b) => b.badge.localeCompare(a.badge));

    return (
        <div className="com-page">
            <div className="com-hero">
                <div className="com-hero-inner">
                    <Users size={42} className="com-hero-icon" />
                    <h1>Executive Committee</h1>
                    <p>The student leaders who drive STS forward — past and present.</p>
                </div>
            </div>
            <div className="com-container">
                {sorted.map((data, idx) => (
                    <YearSection key={data.badge} data={data} isLatest={idx === 0} />
                ))}
            </div>
        </div>
    );
};

export default Committee;
