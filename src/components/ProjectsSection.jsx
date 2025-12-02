import React, { useState } from 'react';
import { projects } from '../data/projects';
import ProjectModal from './ProjectModal';
import { ChevronLeft, ChevronRight, Github } from 'lucide-react';

const ProjectsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState(null);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    // Get 3 projects to display
    const getVisibleProjects = () => {
        const items = [];
        const displayCount = Math.min(3, projects.length);
        for (let i = 0; i < displayCount; i++) {
            const index = (currentIndex + i) % projects.length;
            items.push(projects[index]);
        }
        return items;
    };

    // 프로젝트가 3개 이하일 때는 모든 프로젝트 표시, 그 이상일 때만 캐러셀 사용
    const visibleProjects = projects.length > 3 ? getVisibleProjects() : projects;

    return (
        <section id="projects" className="projects-section">
            <h2 className="section-title">PROJECTS</h2>

            <div className="carousel-container">
                <button className="nav-btn prev" onClick={prevSlide}>
                    <ChevronLeft size={32} />
                </button>

                <div className="cards-wrapper">
                    {visibleProjects.map((project, idx) => (
                        <div key={`${project.id}-${idx}`} className="project-card" onClick={() => setSelectedProject(project)}>
                            <div className="card-image">
                                <img src={project.image} alt={project.title} />
                                <div className="card-overlay">
                                    <span>View Details</span>
                                </div>
                            </div>
                            <div className="card-content">
                                <h3>{project.title}</h3>
                                <p>{project.description.substring(0, 60)}...</p>
                                <a
                                    href={project.gitLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="card-git-link"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Github size={16} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="nav-btn next" onClick={nextSlide}>
                    <ChevronRight size={32} />
                </button>
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
          margin-bottom: 4rem;
          letter-spacing: 0.2em;
          text-align: left;
          width: 100%;
          max-width: 1200px;
          color: var(--text-color);
        }
        .carousel-container {
          display: flex;
          align-items: center;
          gap: 2rem;
          width: 100%;
          max-width: 1200px;
        }
        .nav-btn {
          background: none;
          border: 1px solid var(--text-color);
          cursor: pointer;
          padding: 0.75rem;
          transition: all 0.2s ease;
          color: var(--text-color);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-btn:hover {
          background: var(--text-color);
          color: var(--bg-color);
        }
        .cards-wrapper {
          display: flex;
          gap: 2rem;
          flex: 1;
          justify-content: center;
        }
        .project-card {
          background: var(--bg-color);
          border: 1px solid var(--text-color);
          overflow: hidden;
          width: 300px;
          cursor: pointer;
          transition: transform 0.2s ease;
          display: flex;
          flex-direction: column;
        }
        .project-card:hover {
          transform: translateY(-4px);
        }
        .card-image {
          height: 180px;
          position: relative;
          border-bottom: 1px solid var(--text-color);
        }
        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          opacity: 0;
          transition: opacity 0.2s ease;
          font-family: var(--font-main);
          font-size: 0.9rem;
        }
        .project-card:hover .card-overlay {
          opacity: 1;
        }
        .card-content {
          padding: 1.5rem;
          position: relative;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .card-content h3 {
          font-family: var(--font-display);
          margin-bottom: 0.75rem;
          color: var(--text-color);
          font-size: 1.2rem;
        }
        .card-content p {
          font-size: 0.9rem;
          color: var(--text-color);
          opacity: 0.7;
          margin-bottom: 1rem;
          line-height: 1.5;
          flex: 1;
        }
        .card-git-link {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          color: var(--text-color);
          transition: all 0.2s ease;
          padding: 0.25rem;
        }
        .card-git-link:hover {
          opacity: 0.6;
        }
        @media (max-width: 992px) {
          .cards-wrapper {
            grid-template-columns: repeat(2, 1fr);
            display: grid;
          }
          .project-card {
            width: 100%;
          }
        }
        @media (max-width: 768px) {
          .cards-wrapper {
            grid-template-columns: 1fr;
            display: grid;
          }
          .section-title {
            font-size: 2rem;
          }
          .carousel-container {
            flex-direction: column;
          }
          .nav-btn {
            display: none;
          }
        }
      `}</style>
        </section>
    );
};

export default ProjectsSection;
