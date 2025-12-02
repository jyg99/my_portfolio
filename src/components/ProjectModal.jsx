import React from 'react';
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
                        <a href={project.gitLink} target="_blank" rel="noopener noreferrer" className="git-link">
                            <Github size={20} />
                            <span>View Code</span>
                        </a>
                        {project.notionLink && (
                            <a href={project.notionLink} target="_blank" rel="noopener noreferrer" className="notion-link">
                                <ExternalLink size={20} />
                                <span>Notion</span>
                            </a>
                        )}
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
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }
        .modal-content {
          background: white;
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          padding: 2rem;
          border-radius: 8px;
          animation: slideUp 0.3s ease;
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #333;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-right: 2rem;
        }
        .modal-header h2 {
          font-family: var(--font-display);
          font-size: 2rem;
        }
        .header-links {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }
        .git-link,
        .notion-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: var(--text-color);
          font-weight: bold;
          border: 1px solid var(--text-color);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .git-link:hover,
        .notion-link:hover {
          background: var(--text-color);
          color: white;
        }
        .modal-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 4px;
          margin-bottom: 2rem;
          display: block;
        }
        .description {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          color: #444;
        }
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .tag {
          background: var(--gray-light);
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          font-size: 0.9rem;
          color: #666;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .tech-logo {
          width: 20px;
          height: 20px;
          object-fit: contain;
        }
      `}</style>
        </div>
    );
};

export default ProjectModal;
