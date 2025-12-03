import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2025 gyun's Portfolio. All rights reserved.</p>
            </div>
            <style>{`
        .footer {
          background-color: var(--text-color);
          color: var(--bg-color);
          padding: 2rem;
          text-align: center;
          scroll-snap-align: start;
        }
        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .footer-content p {
          font-family: var(--font-main);
          font-size: 0.9rem;
        }
        @media (max-width: 768px) {
          .footer {
            padding: 1.5rem 1rem;
            padding-bottom: 4rem;
          }
          .footer-content p {
            font-size: 0.85rem;
          }
        }
        @media (max-width: 480px) {
          .footer {
            padding: 1rem 0.8rem;
            padding-bottom: 4rem;
          }
          .footer-content p {
            font-size: 0.75rem;
          }
        }
      `}</style>
        </footer>
    );
};

export default Footer;
