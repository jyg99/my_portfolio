import React, { useState } from 'react';
import { projects } from '../data/projects';
import ProjectModal from './ProjectModal';
import { ArrowRight, Github } from 'lucide-react';

const ProjectsSection = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    // 프로젝트를 이름으로 찾기
    const getProject = (title) => projects.find(p => p.title.includes(title));

    const stretchProject = getProject('stretch');
    const joingProject = getProject('joying');
    const savingProject = getProject('절약몬');

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % 2);
    };

    return (
        <section id="projects" className="projects-section">
            <h2 className="section-title">PROJECTS</h2>

            <div className="bento-grid">
                {/* 상단 좌측 - stretch */}
                <div 
                    className="bento-item stretch"
                    onClick={() => setSelectedProject(stretchProject)}
                >
                    <img src={stretchProject?.image} alt={stretchProject?.title} />
                    <div className="bento-overlay">
                        <h3>{stretchProject?.title}</h3>
                        <p>동작인식 스트래칭 프로그램</p>
                    </div>
                    <a
                        href={stretchProject?.gitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="git-link"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Github size={18} />
                    </a>
                </div>

                {/* 상단 우측 - 네비게이션 버튼 */}
                <div className="bento-item bento-nav" onClick={nextPage}>
                    <ArrowRight size={32} strokeWidth={1.5} />
                </div>

                {/* 가운데 큰 영역 - 빌려joying */}
                <div 
                    className="bento-item joing"
                    onClick={() => setSelectedProject(joingProject)}
                >
                    <img src={joingProject?.image} alt={joingProject?.title} />
                    <div className="bento-overlay">
                        <h3>{joingProject?.title}</h3>
                        <p>P2P 렌탈 플랫폼</p>
                    </div>
                    <a
                        href={joingProject?.gitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="git-link"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Github size={18} />
                    </a>
                </div>

                {/* 하단 좌측 - 절약몬 */}
                <div 
                    className="bento-item saving"
                    onClick={() => setSelectedProject(savingProject)}
                >
                    <img src={savingProject?.image} alt={savingProject?.title} />
                    <div className="bento-overlay">
                        <h3>{savingProject?.title}</h3>
                        <p>게이미피케이션 핀테크</p>
                    </div>
                    <a
                        href={savingProject?.gitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="git-link"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Github size={18} />
                    </a>
                </div>

                {/* 하단 우측 - 검정색 공란 */}
                <div className="bento-item empty">
                    <div className="empty-content"></div>
                </div>
            </div>

            <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />

            <style>{`
        .projects-section {
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
          margin-bottom: 3rem;
          letter-spacing: 0.2em;
          text-align: left;
          width: 100%;
          max-width: 900px;
          color: var(--text-color);
        }
        .bento-grid {
          display: grid;
          grid-template-columns: 1fr 150px;
          grid-template-rows: 150px 300px 150px;
          gap: 1rem;
          width: 100%;
          max-width: 900px;
        }
        .bento-item {
          background: #1a1a1a;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .bento-item:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        .bento-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }
        .bento-item:hover img {
          opacity: 0.4;
        }
        .bento-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          color: white;
        }
        .bento-overlay h3 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.3rem;
          letter-spacing: 0.05em;
        }
        .bento-overlay p {
          font-family: var(--font-main);
          font-size: 0.9rem;
          opacity: 0.8;
        }
        .git-link {
          position: absolute;
          top: 1rem;
          right: 1rem;
          color: white;
          background: rgba(0,0,0,0.5);
          padding: 0.5rem;
          border-radius: 8px;
          transition: background 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .git-link:hover {
          background: rgba(255,255,255,0.2);
        }
        
        /* Grid positioning */
        .stretch {
          grid-column: 1;
          grid-row: 1;
        }
        .bento-nav {
          grid-column: 2;
          grid-row: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2a2a2a;
          color: white;
          width: 150px;
          height: 150px;
        }
        .bento-nav:hover {
          background: #3a3a3a;
        }
        .joing {
          grid-column: 1 / -1;
          grid-row: 2;
        }
        .joing .bento-overlay h3 {
          font-size: 2.5rem;
        }
        .joing .bento-overlay p {
          font-size: 1.1rem;
        }
        .saving {
          grid-column: 1;
          grid-row: 3;
        }
        .empty {
          grid-column: 2;
          grid-row: 3;
          background: #1a1a1a;
          cursor: default;
          width: 150px;
          height: 150px;
        }
        .empty:hover {
          transform: none;
          box-shadow: none;
        }
        .empty-content {
          width: 100%;
          height: 100%;
        }
        
        @media (max-width: 768px) {
          .projects-section {
            padding: 3rem 1rem;
            padding-bottom: 5rem;
          }
          .section-title {
            font-size: 2rem;
            margin-bottom: 2rem;
          }
          .bento-grid {
            grid-template-columns: 1fr 100px;
            grid-template-rows: 100px auto 100px;
            height: auto;
            gap: 0.8rem;
          }
          .stretch {
            grid-column: 1;
            grid-row: 1;
          }
          .bento-nav {
            grid-column: 2;
            grid-row: 1;
            width: 100px;
            height: 100px;
          }
          .joing {
            grid-column: 1 / -1;
            grid-row: 2;
            min-height: 180px;
          }
          .joing .bento-overlay h3 {
            font-size: 1.8rem;
          }
          .joing .bento-overlay p {
            font-size: 0.9rem;
          }
          .saving {
            grid-column: 1;
            grid-row: 3;
          }
          .empty {
            grid-column: 2;
            grid-row: 3;
            width: 100px;
            height: 100px;
          }
          .bento-overlay {
            padding: 1rem;
          }
          .bento-overlay h3 {
            font-size: 1.2rem;
          }
          .bento-overlay p {
            font-size: 0.8rem;
          }
        }
        
        @media (max-width: 480px) {
          .projects-section {
            padding: 2.5rem 0.8rem;
            padding-bottom: 5rem;
          }
          .section-title {
            font-size: 1.6rem;
            margin-bottom: 1.5rem;
          }
          .bento-grid {
            grid-template-columns: 1fr 80px;
            grid-template-rows: 80px auto 80px;
            gap: 0.6rem;
          }
          .bento-nav {
            width: 80px;
            height: 80px;
          }
          .empty {
            width: 80px;
            height: 80px;
          }
          .joing {
            min-height: 140px;
          }
          .joing .bento-overlay h3 {
            font-size: 1.4rem;
          }
          .bento-overlay {
            padding: 0.8rem;
          }
          .bento-overlay h3 {
            font-size: 1rem;
          }
          .bento-overlay p {
            font-size: 0.7rem;
          }
          .git-link {
            top: 0.5rem;
            right: 0.5rem;
            padding: 0.4rem;
          }
          .git-link svg {
            width: 14px;
            height: 14px;
          }
        }
      `}</style>
        </section>
    );
};

export default ProjectsSection;
