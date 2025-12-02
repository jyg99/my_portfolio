import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2025 Portfolio Architect. All rights reserved.</p>
                <div className="social-links">
                    <a href="#">GitHub</a>
                    <a href="#">LinkedIn</a>
                    <a href="#">Email</a>
                </div>
            </div>
            <style>{`
        .footer {
          background-color: var(--text-color);
          color: var(--bg-color);
          padding: 2rem;
          text-align: center;
          scroll-snap-align: start; /* Optional: if we want footer to snap */
        }
        .footer-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }
        .social-links {
          display: flex;
          gap: 2rem;
        }
        .social-links a {
          color: var(--bg-color);
          text-decoration: none;
          font-family: var(--font-display);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .social-links a:hover {
          text-decoration: underline;
        }
      `}</style>
        </footer>
    );
};

export default Footer;
