import React, { useState, useEffect, useRef } from 'react';
import RockCanvas from './RockModel';

const SideNavigation = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const [prevSection, setPrevSection] = useState('hero');
    const [sectionIndex, setSectionIndex] = useState(0);
    const [prevSectionIndex, setPrevSectionIndex] = useState(0);

    const sections = [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'tech', label: 'Tech' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' },
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
                    const newSection = visibleSections[0].target.id;
                    if (newSection !== activeSection) {
                        setPrevSection(activeSection);
                        setActiveSection(newSection);
                        
                        // 인덱스 업데이트
                        const newIndex = sections.findIndex(s => s.id === newSection);
                        setPrevSectionIndex(sectionIndex);
                        setSectionIndex(newIndex);
                    }
                }
            },
            { threshold: 0.5 }
        );

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [activeSection, sectionIndex]);

    return (
        <nav className="side-nav">
            {/* PC용 3D Rock 오브젝트 */}
            <div className="rock-wrapper">
                <RockCanvas 
                    activeIndex={sectionIndex} 
                    prevIndex={prevSectionIndex}
                />
            </div>
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
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .rock-wrapper {
          width: 80px;
          height: 80px;
          margin-bottom: 0.5rem;
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
        @media (max-width: 992px) {
          .side-nav {
            left: auto;
            right: 0;
            top: auto;
            bottom: 0;
            transform: none;
            width: 100%;
            background: var(--bg-color);
            border-top: 1px solid var(--text-color);
            padding: 0.5rem 0;
            flex-direction: row;
          }
          .rock-wrapper {
            display: none;
          }
          .side-nav ul {
            flex-direction: row;
            justify-content: space-around;
            gap: 0;
            width: 100%;
          }
          .side-nav button {
            flex-direction: column;
            gap: 0.3rem;
            padding: 0.5rem 1rem;
          }
          .dot {
            width: 6px;
            height: 6px;
          }
          .label {
            position: static;
            opacity: 1;
            transform: none;
            font-size: 0.7rem;
            letter-spacing: 0.05em;
          }
          .side-nav li.active .dot {
            transform: scale(1.3);
          }
        }
        @media (max-width: 480px) {
          .label {
            font-size: 0.6rem;
          }
          .side-nav button {
            padding: 0.5rem 0.5rem;
          }
        }
      `}</style>
        </nav>
    );
};

export default SideNavigation;
