import React from 'react';

// 기술 스택 로고 매핑
const techLogos = {
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Vue': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    'Three.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
};

const TechStackSection = () => {
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
        'Java',
        'Spring Boot',
        'Python',
        'FastAPI',
        'MySQL',
        'Redis',
    ];

    const toolsStack = [
        'Git',
        'Docker',
        'Jenkins',
        'GitLab',
        'Notion',
        'Slack',
    ];

    return (
        <section id="tech" className="tech-section">
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
                                    className="progress-bar"
                                    style={{ width: `${tech.percentage}%` }}
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
                            <span key={tech} className="tag">{tech}</span>
                        ))}
                    </div>
                </div>

                <div className="category">
                    <h3 className="category-title">Backend</h3>
                    <div className="tags">
                        {backendStack.map((tech) => (
                            <span key={tech} className="tag">{tech}</span>
                        ))}
                    </div>
                </div>

                <div className="category">
                    <h3 className="category-title">Tools</h3>
                    <div className="tags">
                        {toolsStack.map((tech) => (
                            <span key={tech} className="tag">{tech}</span>
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
          animation: fillProgress 1.5s ease-out forwards;
        }
        @keyframes fillProgress {
          from {
            width: 0%;
          }
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
        }
        .tag:hover {
          background: var(--text-color);
          color: var(--bg-color);
        }
        @media (max-width: 992px) {
          .core-stack-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          .stack-categories {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }
        @media (max-width: 768px) {
          .core-stack-grid {
            grid-template-columns: 1fr;
          }
          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>
        </section>
    );
};

export default TechStackSection;
