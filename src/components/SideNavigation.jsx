import React, { useState, useEffect } from 'react';

const SideNavigation = () => {
    const [activeSection, setActiveSection] = useState('hero');

    const sections = [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'tech', label: 'Tech' },
        { id: 'projects', label: 'Projects' },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter(entry => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                
                if (visibleSections.length > 0) {
                    setActiveSection(visibleSections[0].target.id);
                }
            },
            { threshold: 0.5 }
        );

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <nav className="side-nav">
            <ul>
                {sections.map(({ id, label }) => (
                    <li key={id} className={activeSection === id ? 'active' : ''}>
                        <button onClick={() => scrollToSection(id)} aria-label={label}>
                            <span className="dot"></span>
                            <span className="label">{label}</span>
                        </button>
                    </li>
                ))}
            </ul>
            <style>{`
        .side-nav {
          position: fixed;
          left: 2rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 100;
        }
        .side-nav ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .side-nav button {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.5rem;
          position: relative;
        }
        .dot {
          width: 8px;
          height: 8px;
          background-color: var(--gray-medium);
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .label {
          font-family: var(--font-display);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
          color: var(--text-color);
          position: absolute;
          left: 25px;
          white-space: nowrap;
        }
        .side-nav li.active .dot {
          background-color: var(--text-color);
          transform: scale(1.5);
        }
        .side-nav li:hover .label,
        .side-nav li.active .label {
          opacity: 1;
          transform: translateX(0);
        }
        @media (max-width: 768px) {
          .side-nav {
            display: none; /* Hide on mobile if needed, or adjust style */
          }
        }
      `}</style>
        </nav>
    );
};

export default SideNavigation;
