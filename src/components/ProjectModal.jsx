import React, { useEffect } from 'react';
import { X, Github, ExternalLink } from 'lucide-react';

// 기술 스택 로고 매핑
const techLogos = {
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'Spring Boot': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'FastAPI': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
    'LangChain': 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4',
    'Unity': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg',
    'C#': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
    'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    'Vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    'Electron': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg',
    'MediaPipe': 'https://mediapipe.dev/images/mediapipe_small.png',
    'PyTorch': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'Vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    'WebSocket': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/websocket/websocket-original.svg',
    'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'Jenkins': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg',
    'GitLab': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg',
    'Three.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
    'WebGL': 'https://www.khronos.org/assets/images/khronos-group.png',
    'ONNX': 'https://onnx.ai/images/logo.png',
};

const ProjectModal = ({ project, onClose }) => {
    // 모달 열렸을 때 body에 클래스 추가 (커서 색상 변경용)
    useEffect(() => {
        if (project) {
            document.body.classList.add('modal-open');
        }
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [project]);

    if (!project) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-header">
                    <h2>{project.title}</h2>
                    <div className="header-links">
                        {project.notionLink && (
                            <a href={project.notionLink} target="_blank" rel="noopener noreferrer" className="link-btn notion-link">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg" alt="Notion" className="link-icon" />
                                <span>Notion</span>
                            </a>
                        )}
                        <a href={project.gitLink} target="_blank" rel="noopener noreferrer" className="link-btn github-link">
                            <Github size={18} />
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>

                <img src={project.image} alt={project.title} className="modal-image" />

                <div className="modal-body">
                    <p className="description">{project.description}</p>

                    <div className="tech-tags">
                        {project.tech.map(t => {
                            const logoUrl = techLogos[t];
                            return (
                                <span key={t} className="tag">
                                    {logoUrl ? (
                                        <>
                                            <img src={logoUrl} alt={t} className="tech-logo" />
                                            <span>{t}</span>
                                        </>
                                    ) : (
                                        <span>{t}</span>
                                    )}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(8px);
        }
        .modal-content {
          background-color: var(--bg-color);
          background-image: radial-gradient(circle, rgba(0, 0, 0, 0.08) 1px, transparent 1px);
          background-size: 16px 16px;
          color: var(--text-color);
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          padding: 2.5rem;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 16px;
          animation: slideUp 0.3s ease;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .modal-content::-webkit-scrollbar {
          width: 6px;
        }
        .modal-content::-webkit-scrollbar-track {
          background: transparent;
        }
        .modal-content::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.2);
          border-radius: 3px;
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .close-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(0,0,0,0.05);
          border: none;
          cursor: pointer;
          color: var(--text-color);
          padding: 0.5rem;
          border-radius: 8px;
          transition: background 0.2s;
        }
        .close-btn:hover {
          background: rgba(0,0,0,0.1);
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-right: 3rem;
        }
        .modal-header h2 {
          font-family: var(--font-display);
          font-size: 2.2rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: var(--text-color);
        }
        .header-links {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }
        .link-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: var(--text-color);
          font-weight: 500;
          border: 1px solid rgba(0,0,0,0.2);
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          transition: all 0.2s;
          font-size: 0.9rem;
          background: transparent;
        }
        .link-btn:hover {
          background: var(--text-color);
          color: var(--bg-color);
          border-color: var(--text-color);
        }
        .link-btn:hover .link-icon {
          filter: brightness(0) invert(1);
        }
        .link-icon {
          width: 18px;
          height: 18px;
          object-fit: contain;
          transition: filter 0.2s;
        }
        .modal-image {
          width: 100%;
          height: 320px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 2rem;
          display: block;
          border: 1px solid rgba(0,0,0,0.1);
        }
        .description {
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 2rem;
          color: var(--text-color);
          font-family: var(--font-main);
        }
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .tag {
          background: rgba(0,0,0,0.05);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.85rem;
          color: var(--text-color);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid rgba(0,0,0,0.1);
          transition: all 0.2s;
        }
        .tag:hover {
          background: rgba(0,0,0,0.08);
          border-color: rgba(0,0,0,0.15);
        }
        .tech-logo {
          width: 18px;
          height: 18px;
          object-fit: contain;
        }
        @media (max-width: 768px) {
          .modal-content {
            width: 95%;
            padding: 1.5rem;
            max-height: 85vh;
            border-radius: 12px;
          }
          .modal-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            padding-right: 2.5rem;
          }
          .modal-header h2 {
            font-size: 1.6rem;
          }
          .header-links {
            width: 100%;
          }
          .link-btn {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }
          .link-icon {
            width: 16px;
            height: 16px;
          }
          .modal-image {
            height: 200px;
            margin-bottom: 1.5rem;
            border-radius: 8px;
          }
          .description {
            font-size: 0.95rem;
            margin-bottom: 1.5rem;
          }
          .tag {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
          }
          .tech-logo {
            width: 16px;
            height: 16px;
          }
          .close-btn {
            top: 1rem;
            right: 1rem;
          }
        }
        @media (max-width: 480px) {
          .modal-content {
            padding: 1.2rem;
            border-radius: 12px;
          }
          .modal-header h2 {
            font-size: 1.4rem;
          }
          .header-links {
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          .link-btn {
            flex: 1;
            justify-content: center;
            padding: 0.6rem;
            border-radius: 6px;
          }
          .modal-image {
            height: 160px;
            margin-bottom: 1rem;
          }
          .description {
            font-size: 0.9rem;
            line-height: 1.5;
          }
          .close-btn {
            top: 0.5rem;
            right: 0.5rem;
          }
        }
      `}</style>
        </div>
    );
};

export default ProjectModal;
