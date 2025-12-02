import joingImage from '../assets/joing.png';
import savingMonsterImage from '../assets/savemonster.png';
import stretchImage from '../assets/stretch.png';

export const projects = [
  {
    id: 1,
    title: "빌려joying",
    description: "P2P 렌탈 플랫폼으로, 사용자 간 직접 대여 거래를 지원하는 웹 서비스입니다. 도메인 중심 설계(DDD) 기반의 백엔드, React 기반 프론트엔드, LangChain 기반 AI 서버로 구성된 풀스택 프로젝트입니다.",
    tech: ["React", "Java", "Spring Boot", "Python", "FastAPI", "LangChain"],
    gitLink: "https://github.com/jyg99/p2p_rental",
    notionLink: "https://www.notion.so/joing-2b721e0bc5f68143b6f3cb957d516fe6?source=copy_link",
    image: joingImage
  },
  {
    id: 2,
    title: "절약몬",
    description: "게임을 통해 절약을 실천하는 핀테크 프로젝트입니다. Unity 기반 모바일 게임과 Spring Boot 백엔드, Python AI 서버로 구성되어 있으며, 사용자의 소비 패턴을 분석하고 게임화된 절약 경험을 제공합니다.",
    tech: ["Unity", "C#", "Java", "Spring Boot", "Python", "Firebase"],
    gitLink: "https://github.com/jyg99/saving_monster",
    notionLink: "https://www.notion.so/2b721e0bc5f681ce9ba3dc2aa3187f43?source=copy_link",
    image: savingMonsterImage
  },
  {
    id: 3,
    title: "stretch!",
    description: "직장인 골격질환 예방을 위한 동작인식 스트래칭 프로그램입니다. MediaPipe 기반 실시간 자세 인식, WebRTC 기반 화상 강의, 게이미피케이션 요소를 포함한 Electron 기반 데스크톱 애플리케이션입니다.",
    tech: ["Vue.js", "Electron", "Java", "Spring Boot", "Python", "FastAPI", "MediaPipe", "PyTorch"],
    gitLink: "https://github.com/jyg99/stretch",
    notionLink: "https://www.notion.so/STRETCH-2b721e0bc5f6818ba1c9c682e0133ebe?source=copy_link",
    image: stretchImage
  }
];
