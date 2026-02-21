import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X, ChevronDown, Calculator } from 'lucide-react';
import stsLogoWhite from '../assets/images/logo/sts_logo_white.png';
import stsLogoBlack from '../assets/images/logo/sts_logo_black.png';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [workOpen, setWorkOpen] = useState(false);

    const toggleMenu = () => { setIsOpen(!isOpen); };
    const toggleDropdown = () => { setDropdownOpen(!dropdownOpen); };
    const toggleWork = () => { setWorkOpen(!workOpen); };

    const currentLogo = theme === 'dark' ? stsLogoWhite : stsLogoBlack;

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="logo" onClick={() => setIsOpen(false)}>
                    <img src={currentLogo} alt="STS Logo" className="logo-img" />
                    <h1>Society of Technological Studies</h1>
                </Link>

                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>

                    <div
                        className="dropdown-container"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <button className="dropdown-trigger" onClick={toggleDropdown}>
                            Programme <ChevronDown size={16} className={`chevron ${dropdownOpen ? 'rotate' : ''}`} />
                        </button>
                        <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                            <Link to="/event/nanapahasa" onClick={() => setIsOpen(false)}>NanaPahasa</Link>
                            <Link to="/event/nanasaviya" onClick={() => setIsOpen(false)}>NanaSaviya</Link>
                            <Link to="/event/cricket" onClick={() => setIsOpen(false)}>STS Cricket Match</Link>
                            <Link to="/event/astrocamp" onClick={() => setIsOpen(false)}>Astro Camp</Link>
                            <Link to="/event/pitch" onClick={() => setIsOpen(false)}>Pitch Competition</Link>
                        </div>
                    </div>

                    <Link to="/department" onClick={() => setIsOpen(false)}>Department</Link>

                    {/* Our Work dropdown: Research + Projects */}
                    <div
                        className="dropdown-container"
                        onMouseEnter={() => setWorkOpen(true)}
                        onMouseLeave={() => setWorkOpen(false)}
                    >
                        <button className="dropdown-trigger" onClick={toggleWork}>
                            Our Work <ChevronDown size={16} className={`chevron ${workOpen ? 'rotate' : ''}`} />
                        </button>
                        <div className={`dropdown-menu ${workOpen ? 'show' : ''}`}>
                            <Link to="/research" onClick={() => { setIsOpen(false); setWorkOpen(false); }}>Research Publications</Link>
                            <Link to="/projects" onClick={() => { setIsOpen(false); setWorkOpen(false); }}>Projects</Link>
                        </div>
                    </div>

                    <Link to="/alumni" onClick={() => setIsOpen(false)}>Alumni</Link>
                </div>

                <div className="nav-actions">
                    <Link
                        to="/gpa"
                        className="gpa-btn"
                        aria-label="GPA Calculator"
                        title="GPA Calculator"
                        onClick={() => setIsOpen(false)}
                    >
                        <Calculator size={20} />
                    </Link>
                    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
