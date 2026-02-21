import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Briefcase, Building, MapPin, Linkedin, Image, MessageSquare, ArrowLeft, LogOut, Save, CheckCircle } from 'lucide-react';
import { getSession, updateProfile, logoutAlumnus } from '../data/alumniAuth';
import './AlumniLogin.css';
import './AlumniUpdateProfile.css';

const BATCH_OPTIONS = ['2013/14', '2014/15', '2015/16', '2016/17', '2017/18', '2018/19', '2019/20', '2020/21', '2021/22', '2022/23', '2023/24', '2024/25'];

const AlumniUpdateProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState({});
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const session = getSession();
        if (!session) { navigate('/alumni/login'); return; }
        setProfile(session);
        setForm({
            name: session.name || '',
            batch: session.batch || '',
            role: session.role || '',
            company: session.company || '',
            location: session.location || '',
            linkedin: session.linkedin || '',
            image: session.image || '',
            testimonial: session.testimonial || '',
        });
    }, [navigate]);

    const handleChange = e => {
        setSaved(false);
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            updateProfile(form);
            setSaved(true);
            setLoading(false);
        }, 500);
    };

    const handleLogout = () => { logoutAlumnus(); navigate('/alumni'); };

    if (!profile) return null;

    const fields = [
        { name: 'name', label: 'Full Name', icon: <User size={14} />, type: 'text', placeholder: 'Your full name' },
        { name: 'role', label: 'Current Role', icon: <Briefcase size={14} />, type: 'text', placeholder: 'e.g. Software Engineer' },
        { name: 'company', label: 'Company / Institute', icon: <Building size={14} />, type: 'text', placeholder: 'e.g. WSO2 Lanka' },
        { name: 'location', label: 'Location', icon: <MapPin size={14} />, type: 'text', placeholder: 'e.g. Colombo, Sri Lanka' },
        { name: 'linkedin', label: 'LinkedIn URL', icon: <Linkedin size={14} />, type: 'url', placeholder: 'https://linkedin.com/in/...' },
        { name: 'image', label: 'Profile Photo URL', icon: <Image size={14} />, type: 'url', placeholder: 'https://...' },
    ];

    return (
        <div className="al-page aup-page">
            <div className="al-card aup-card">
                {/* Header */}
                <div className="aup-topbar">
                    <Link to="/alumni" className="al-back"><ArrowLeft size={16} /> Alumni</Link>
                    <button className="aup-logout-btn" onClick={handleLogout}>
                        <LogOut size={15} /> Logout
                    </button>
                </div>

                {/* Avatar preview */}
                <div className="aup-avatar-wrap">
                    <img
                        src={form.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=random&size=128`}
                        alt={form.name}
                        className="aup-avatar"
                        onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=0ea5e9&color=fff&size=128`; }}
                    />
                </div>

                <h1>Update Profile</h1>
                <p className="al-sub"><Mail size={13} /> {profile.email}</p>

                {saved && (
                    <div className="aup-success">
                        <CheckCircle size={16} /> Profile updated successfully!
                    </div>
                )}

                <form onSubmit={handleSubmit} className="al-form">
                    {/* Batch dropdown */}
                    <div className="al-field">
                        <label>Graduation Batch</label>
                        <select name="batch" value={form.batch} onChange={handleChange}>
                            <option value="">Select batch…</option>
                            {BATCH_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>

                    {/* Text / URL fields */}
                    {fields.map(f => (
                        <div className="al-field" key={f.name}>
                            <label>{f.icon} {f.label}</label>
                            <input
                                name={f.name}
                                type={f.type}
                                placeholder={f.placeholder}
                                value={form[f.name]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}

                    {/* Testimonial */}
                    <div className="al-field">
                        <label><MessageSquare size={14} /> Testimonial</label>
                        <textarea
                            name="testimonial"
                            rows={3}
                            placeholder="Share what STS meant to you…"
                            value={form.testimonial}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="al-btn-primary" disabled={loading}>
                        {loading ? 'Saving…' : <><Save size={16} /> Save Changes</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AlumniUpdateProfile;
