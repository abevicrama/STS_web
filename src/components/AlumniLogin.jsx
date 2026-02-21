import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowLeft, AlertCircle } from 'lucide-react';
import { loginAlumnus } from '../data/alumniAuth';
import './AlumniLogin.css';

const AlumniLogin = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setTimeout(() => {
            const result = loginAlumnus(form.email, form.password);
            if (result.success) {
                navigate('/alumni/profile');
            } else {
                setError(result.error);
            }
            setLoading(false);
        }, 600); // small delay for UX
    };

    return (
        <div className="al-page">
            <div className="al-card">
                <Link to="/alumni" className="al-back"><ArrowLeft size={16} /> Back to Alumni</Link>

                <div className="al-icon-wrap">
                    <LogIn size={28} />
                </div>
                <h1>Alumni Login</h1>
                <p className="al-sub">Sign in to update your profile details</p>

                {error && (
                    <div className="al-error">
                        <AlertCircle size={16} /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="al-form">
                    <div className="al-field">
                        <label htmlFor="email"><Mail size={14} /> Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="your.email@sts.ac.lk"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="al-field">
                        <label htmlFor="password"><Lock size={14} /> Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="al-btn-primary" disabled={loading}>
                        {loading ? 'Signing in…' : 'Sign In'}
                    </button>
                </form>

                <p className="al-hint">
                    Not registered yet? <Link to="/alumni/register">Create your profile</Link>
                </p>
            </div>
        </div>
    );
};

export default AlumniLogin;
