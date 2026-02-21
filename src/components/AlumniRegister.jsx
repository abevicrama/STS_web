import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    User, Mail, Lock, Briefcase, Building, MapPin,
    Linkedin, Image, MessageSquare, ArrowLeft, UserPlus
} from 'lucide-react';
import './AlumniLogin.css';
import './AlumniRegister.css';

const BATCH_OPTIONS = [
    '2013/14', '2014/15', '2015/16', '2016/17', '2017/18',
    '2018/19', '2019/20', '2020/21', '2021/22', '2022/23', '2023/24', '2024/25'
];

const EMPTY = {
    name: '', email: '', password: '', confirmPassword: '',
    batch: '', role: '', company: '', location: '',
    linkedin: '', image: '', testimonial: '',
};

const AlumniRegister = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState(EMPTY);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setError('');
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (form.password.length < 4) {
            setError('Password must be at least 4 characters.');
            return;
        }
        setLoading(true);

        /* Save to localStorage (keyed by email) so existing users can
           log in via alumniAuth which merges JSON seed + localStorage */
        setTimeout(() => {
            const stored = JSON.parse(localStorage.getItem('sts_alumni_profiles') || '{}');
            stored[form.email] = {
                id: `usr_${Date.now()}`,
                name: form.name,
                email: form.email,
                password: form.password,
                batch: form.batch,
                role: form.role,
                company: form.company,
                location: form.location,
                linkedin: form.linkedin,
                image: form.image,
                testimonial: form.testimonial,
            };
            localStorage.setItem('sts_alumni_profiles', JSON.stringify(stored));

            /* Also persist a separate registrations list so Login can find new users */
            const regs = JSON.parse(localStorage.getItem('sts_alumni_reg') || '[]');
            regs.push({ email: form.email, password: form.password });
            localStorage.setItem('sts_alumni_reg', JSON.stringify(regs));

            setLoading(false);
            navigate('/alumni/login?registered=1');
        }, 600);
    };

    const fields = [
        { name: 'name', label: 'Full Name', icon: <User size={14} />, type: 'text', placeholder: 'Your full name', required: true },
        { name: 'email', label: 'Email Address', icon: <Mail size={14} />, type: 'email', placeholder: 'you@example.com', required: true },
        { name: 'password', label: 'Password', icon: <Lock size={14} />, type: 'password', placeholder: '••••••••', required: true },
        { name: 'confirmPassword', label: 'Confirm Password', icon: <Lock size={14} />, type: 'password', placeholder: '••••••••', required: true },
        { name: 'role', label: 'Current Role', icon: <Briefcase size={14} />, type: 'text', placeholder: 'e.g. Software Engineer' },
        { name: 'company', label: 'Company / Institute', icon: <Building size={14} />, type: 'text', placeholder: 'e.g. WSO2 Lanka' },
        { name: 'location', label: 'Location', icon: <MapPin size={14} />, type: 'text', placeholder: 'e.g. Colombo, Sri Lanka' },
        { name: 'linkedin', label: 'LinkedIn URL', icon: <Linkedin size={14} />, type: 'url', placeholder: 'https://linkedin.com/in/...' },
        { name: 'image', label: 'Profile Photo URL', icon: <Image size={14} />, type: 'url', placeholder: 'https://...' },
    ];

    return (
        <div className="al-page aup-page">
            <div className="al-card aup-card">
                <Link to="/alumni" className="al-back"><ArrowLeft size={16} /> Back to Alumni</Link>

                <div className="al-icon-wrap">
                    <UserPlus size={26} />
                </div>
                <h1>Create Profile</h1>
                <p className="al-sub">Register as an STS alumnus and join the network</p>

                {error && (
                    <div className="al-error">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="al-form">
                    {fields.map(f => (
                        <div className="al-field" key={f.name}>
                            <label>{f.icon} {f.label}</label>
                            <input
                                name={f.name}
                                type={f.type}
                                placeholder={f.placeholder}
                                value={form[f.name]}
                                onChange={handleChange}
                                required={f.required}
                            />
                        </div>
                    ))}

                    {/* Batch */}
                    <div className="al-field">
                        <label>Graduation Batch</label>
                        <select name="batch" value={form.batch} onChange={handleChange}>
                            <option value="">Select batch…</option>
                            {BATCH_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>

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
                        {loading ? 'Creating profile…' : 'Create Profile'}
                    </button>
                </form>

                <p className="al-hint">
                    Already registered? <Link to="/alumni/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default AlumniRegister;
