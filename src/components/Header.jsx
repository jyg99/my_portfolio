import React from 'react';

const Header = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="header-nav">
            <div className="logo">PORTFOLIO</div>
            <ul className="nav-links">
                <li onClick={() => scrollToSection('about')}>About</li>
                <li onClick={() => scrollToSection('tech')}>Tech</li>
                <li onClick={() => scrollToSection('projects')}>Projects</li>
            </ul>
            <style>{`
        .header-nav {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          padding: 2rem 4rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 10;
        }
        .logo {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: 0.1em;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
        .nav-links li {
          cursor: pointer;
          font-family: var(--font-main);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          position: relative;
        }
        .nav-links li::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--text-color);
          transition: width 0.3s ease;
        }
        .nav-links li:hover::after {
          width: 100%;
        }
      `}</style>
        </nav>
    );
};

export default Header;
