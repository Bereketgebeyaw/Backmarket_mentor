import React from 'react';
import './style.css'; // Import the CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <img src="/image/buna-bank-logo.png" alt="Logo" className="footer-logo" />
                    <h4>About Us</h4>
                    <p>
                        We are an online store dedicated to providing the best products and services.
                    </p>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/shop">Shop</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                        <li><a href="/faq">FAQs</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p>Email: backmarket.com</p>
                    <p>Phone: +111111111</p>
                </div>

                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} mentor. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;