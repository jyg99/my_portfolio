import React, { useEffect, useRef, useState } from 'react';

// 기술 스택 로고 매핑
const techLogos = {
    // Core
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Vue': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    'Three.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
    // Frontend
    'HTML/CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'React Query': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Zustand': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Pinia': 'https://pinia.vuejs.org/logo.svg',
    'Axios': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axios/axios-plain.svg',
    // Backend
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'FastAPI': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
    'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'Django': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    // Tools
    'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'Jenkins': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg',
    'GitLab': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg',
    'Notion': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg',
    'Discord': 'https://cdn.simpleicons.org/discord/5865F2',
    'Jira': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',
    'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
};

const TechStackSection = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // 진입 시 먼저 리셋하고 약간의 딜레이 후 애니메이션 시작
                    setIsVisible(false);
                    setAnimationKey(prev => prev + 1);
                    // 짧은 딜레이 후 애니메이션 시작
                    setTimeout(() => {
                        setIsVisible(true);
                    }, 50);
                } else {
                    setIsVisible(false);
                }
            },
            { threshold: 0.1, rootMargin: '-50px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const coreStack = [
        { name: 'JavaScript', percentage: 70 },
        { name: 'React', percentage: 60 },
        { name: 'Vue', percentage: 70 },
        { name: 'Three.js', percentage: 40 },
    ];

    const frontendStack = [
        'HTML/CSS',
        'TypeScript',
        'React Query',
        'Zustand',
        'Pinia',
        'Axios',
    ];

    const backendStack = [
        'Python',
        'FastAPI',
        'MySQL',
        'Django',
    ];

    const toolsStack = [
        'Git',
        'Docker',
        'Jenkins',
        'GitLab',
        'Notion',
        'Discord',
        'Jira',
        'Figma',
    ];

    return (
        <section id="tech" className="tech-section" ref={sectionRef}>
            <h2 className="section-title">TECH STACK</h2>

            <div className="core-stack-grid">
                {coreStack.map((tech, index) => {
                    const logoUrl = techLogos[tech.name];
                    return (
                        <div key={tech.name} className="core-stack-item">
                            <div className="stack-header">
                                {logoUrl && (
                                    <img src={logoUrl} alt={tech.name} className="stack-logo" />
                                )}
                                <div className="stack-info">
                                    <h3 className="stack-name">{tech.name}</h3>
                                    <span className="stack-percentage">{tech.percentage}%</span>
                                </div>
                            </div>
                            <div className="progress-container">
                                <div 
                                    key={`${tech.name}-${animationKey}`}
                                    className="progress-bar"
                                    style={{ 
                                        width: isVisible ? `${tech.percentage}%` : '0%',
                                        transitionDelay: `${index * 0.15}s`
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="stack-categories">
                <div className="category">
                    <h3 className="category-title">Frontend</h3>
                    <div className="tags">
                        {frontendStack.map((tech) => (
                            <span key={tech} className="tag">
                                {techLogos[tech] && (
                                    <img src={techLogos[tech]} alt={tech} className="tag-logo" />
                                )}
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="category">
                    <h3 className="category-title">Backend</h3>
                    <div className="tags">
                        {backendStack.map((tech) => (
                            <span key={tech} className="tag">
                                {techLogos[tech] && (
                                    <img src={techLogos[tech]} alt={tech} className="tag-logo" />
                                )}
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="category">
                    <h3 className="category-title">Tools</h3>
                    <div className="tags">
                        {toolsStack.map((tech) => (
                            <span key={tech} className="tag">
                                {techLogos[tech] && (
                                    <img src={techLogos[tech]} alt={tech} className="tag-logo" />
                                )}
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        .tech-section {
          background-color: var(--bg-color);
          background-image: radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
          padding: 4rem 2rem;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: 3rem;
          margin-bottom: 4rem;
          letter-spacing: 0.2em;
          text-align: left;
          width: 100%;
          max-width: 1200px;
          color: var(--text-color);
        }
        .core-stack-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-bottom: 5rem;
          width: 100%;
          max-width: 1200px;
        }
        .core-stack-item {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          border: 1px solid var(--text-color);
          background: var(--bg-color);
          transition: transform 0.2s ease;
        }
        .core-stack-item:hover {
          transform: translateY(-2px);
        }
        .stack-header {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .stack-logo {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }
        .stack-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
        }
        .stack-name {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--text-color);
          margin: 0;
        }
        .stack-percentage {
          font-family: var(--font-main);
          font-size: 0.9rem;
          color: var(--text-color);
          opacity: 0.7;
        }
        .progress-container {
          width: 100%;
          height: 2px;
          background-color: rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }
        .progress-bar {
          height: 100%;
          background-color: var(--text-color);
          transition: width 1s ease-out;
          width: 0%;
        }
        .stack-categories {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          width: 100%;
          max-width: 1200px;
        }
        .category {
          display: flex;
          flex-direction: column;
        }
        .category-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          text-align: left;
          color: var(--text-color);
          letter-spacing: 0.1em;
        }
        .tags {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .tag {
          padding: 0.5rem 1rem;
          border: 1px solid var(--text-color);
          border-radius: 4px;
          font-family: var(--font-main);
          font-size: 0.9rem;
          color: var(--text-color);
          transition: all 0.2s ease;
          background-color: transparent;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .tag:hover {
          background: var(--text-color);
          color: var(--bg-color);
        }
        .tag:hover .tag-logo {
          filter: brightness(0) invert(1);
        }
        .tag-logo {
          width: 18px;
          height: 18px;
          object-fit: contain;
          transition: filter 0.2s ease;
        }
        @media (max-width: 992px) {
          .tech-section {
            padding: 3rem 1.5rem;
          }
          .section-title {
            font-size: 2.5rem;
            margin-bottom: 3rem;
          }
          .core-stack-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          .stack-categories {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
        @media (max-width: 768px) {
          .tech-section {
            padding: 3rem 1rem;
            padding-bottom: 5rem;
            min-height: 100vh;
          }
          .section-title {
            font-size: 2rem;
            margin-bottom: 2.5rem;
            letter-spacing: 0.1em;
          }
          .core-stack-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-bottom: 3rem;
          }
          .core-stack-item {
            padding: 1rem;
          }
          .stack-logo {
            width: 32px;
            height: 32px;
          }
          .stack-name {
            font-size: 1rem;
          }
          .stack-percentage {
            font-size: 0.8rem;
          }
          .category-title {
            font-size: 1.3rem;
          }
          .tags {
            gap: 0.5rem;
          }
          .tag {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
          }
          .tag-logo {
            width: 14px;
            height: 14px;
          }
        }
        @media (max-width: 480px) {
          .tech-section {
            padding: 2.5rem 0.8rem;
            padding-bottom: 5rem;
          }
          .section-title {
            font-size: 1.6rem;
            margin-bottom: 2rem;
          }
          .core-stack-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.6rem;
          }
          .core-stack-item {
            padding: 0.8rem;
          }
          .stack-logo {
            width: 24px;
            height: 24px;
          }
          .stack-name {
            font-size: 0.85rem;
          }
          .stack-percentage {
            font-size: 0.7rem;
          }
          .stack-categories {
            gap: 2rem;
          }
          .category-title {
            font-size: 1.1rem;
            margin-bottom: 1rem;
          }
          .tag {
            padding: 0.35rem 0.7rem;
            font-size: 0.75rem;
          }
        }
      `}</style>
        </section>
    );
};

export default TechStackSection;
