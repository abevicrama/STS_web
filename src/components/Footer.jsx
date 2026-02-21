import React from 'react';
import './Footer.css';
import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react';
import stsLogoWhite from '../assets/images/logo/sts_logo_white.png';
import uniLogo from '../assets/images/logo/susl_log.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-col">
                    <div className="logo footer-logo">
                        <img src={stsLogoWhite} alt="STS" className="footer-logo-img" />
                        <div className="divider-vertical"></div>
                        <img src={uniLogo} alt="Sabaragamuwa University of Sri Lanka" className="footer-uni-logo" />
                    </div>
                    <p className="footer-about">
                        Empowering the next generation of tech leaders through innovation, collaboration, and excellence.
                    </p>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook"><Facebook size={20} /></a>

                        <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                        <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#events">Events</a></li>
                        <li><a href="#projects">Projects</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Contact Us</h4>
                    <p><a href='https://www.sab.ac.lk/app/physical-sciences-and-technologies'>Department of Physical Sciences and Technology</a></p>
                    <p><a href='https://www.sab.ac.lk/app/'>Faculty of Applied Sciences</a></p>
                    <p><a href='https://www.sab.ac.lk'>Sabaragamuwa University of Sri Lanka</a></p>
                    <p className="email-link"><Mail size={16} /> sts@sci.sab.ac.lk</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Society of Technological Studies. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
