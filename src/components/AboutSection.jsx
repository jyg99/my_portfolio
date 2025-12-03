import React, { useState, useRef, Suspense, useMemo, useEffect } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import jygImage from '../assets/jyg.JPG';
import rockModel from '../assets/rock/xjijbgx_tier_3.gltf?url';
import sketchTexture from '../assets/rock/Textures/T_xjijbgx_1K_A.png';

// 3D Rock 모델 컴포넌트 - 스케치 스타일 + 캐러셀 연동
function RockModel({ activeSlide, prevSlide }) {
  const { scene } = useGLTF(rockModel);
  const meshRef = useRef();
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);

  // 슬라이드 변경 시 회전 방향 결정
  useEffect(() => {
    if (prevSlide !== activeSlide) {
      // 오른쪽으로 이동 (다음 슬라이드) → 반시계 방향 회전
      // 왼쪽으로 이동 (이전 슬라이드) → 시계 방향 회전
      const direction = activeSlide > prevSlide ? -1 : 1;
      targetRotation.current += Math.PI * 2 * direction; // 360도 회전
    }
  }, [activeSlide, prevSlide]);

  // 스케치 텍스처 적용
  const sketchScene = useMemo(() => {
    const clonedScene = scene.clone();
    
    // 텍스처 로더
    const textureLoader = new THREE.TextureLoader();
    const map = textureLoader.load(sketchTexture);
    map.colorSpace = THREE.SRGBColorSpace;
    
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        // 스케치 텍스처 그대로 표시
        const material = new THREE.MeshBasicMaterial({
          map: map,
        });
        child.material = material;
      }
    });
    
    return clonedScene;
  }, [scene]);

  useFrame(() => {
    if (meshRef.current) {
      // 목표 회전값으로 부드럽게 보간
      currentRotation.current += (targetRotation.current - currentRotation.current) * 0.08;
      meshRef.current.rotation.y = currentRotation.current;
    }
  });

  return (
    <primitive 
      ref={meshRef}
      object={sketchScene} 
      scale={1.2}
      position={[0, -1, 0]}
    />
  );
}

const AboutSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const carouselRef = useRef(null);
  const totalSlides = 4; // 개인정보, 학력, 경력, 활동

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const slideWidth = carouselRef.current.offsetWidth;
      const currentSlide = Math.round(scrollLeft / slideWidth);
      if (currentSlide !== activeSlide) {
        setPrevSlide(activeSlide);
        setActiveSlide(currentSlide);
      }
    }
  };

  const goToSlide = (index) => {
    if (carouselRef.current) {
      setPrevSlide(activeSlide);
      const slideWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-layout">
          {/* 상단: 사진 + 소개 */}
          <div className="top-section">
            {/* 왼쪽: 사진 */}
            <div className="left-column">
              <div className="image-wrapper">
                <div className="image-frame">
                  <img src={jygImage} alt="Jeong Yong-gyun" />
                </div>
              </div>
            </div>

            {/* 오른쪽: 나에 대한 소개 */}
            <div className="right-column">
              <div className="bio-section">
                <p className="highlight">
                  사용자에게 즐거움을 주는<br />
                  웹 경험을 만드는 것을<br />
                  목표로 합니다.
                </p>
                <p className="bio-text">
                  안녕하세요, 프론트엔드 개발자 정용균입니다.
                  <br /><br />
                  단순히 기능이 작동하는 것을 넘어, 사용자가 머물고 싶고 다시 찾고 싶은
                  매력적인 디지털 공간을 건축하는 것을 지향합니다.
                 
                  <br /><br />
                  새로운 기술을 배우고 적용하는 것을 좋아하며,
                  직관적이고 아름다운 UI/UX를 구현하는 데 열정이 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 3D Rock 오브젝트 */}
          <div className="rock-container">
            <Canvas
              camera={{ position: [0, 0, 4], fov: 45 }}
              style={{ background: 'transparent' }}
              className="rock-canvas"
            >
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={1.2} />
              <directionalLight position={[-3, 3, -3]} intensity={0.6} />
              <Suspense fallback={null}>
                <RockModel activeSlide={activeSlide} prevSlide={prevSlide} />
              </Suspense>
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                enableRotate={false}
              />
            </Canvas>
          </div>

          {/* 하단: 개인정보 + 학력 + 경력 + 활동 */}
          <div className="carousel-wrapper">
            <div className="bottom-section" ref={carouselRef} onScroll={handleScroll}>
            {/* 개인 정보 */}
            <div className="info-section">
              <h3 className="section-subtitle">개인 정보</h3>
              <div className="info-list">
                <div className="info-row">
                  <span className="info-label">이름</span>
                  <span className="info-value">정용균</span>
                </div>
                <div className="info-row">
                  <span className="info-label">이메일</span>
                  <span className="info-value">younggun0906@gmail.com</span>
                </div>
                <div className="info-row">
                  <span className="info-label">번호</span>
                  <span className="info-value">010-6538-2980</span>
                </div>
                <div className="info-row">
                  <span className="info-label">주소</span>
                  <span className="info-value">광주 광역시 화정동</span>
                </div>
              </div>
            </div>

            {/* 학력과 교육이력 */}
            <div className="content-section">
              <h3 className="section-subtitle">학력과 교육이력</h3>
              <div className="entry-list">
                <div className="entry-item">
                  <span className="entry-date">2018.03 ~ 2022.02</span>
                  <span className="entry-content">목포대학교 전자과 18학번 졸업</span>
                </div>
                <div className="entry-item">
                  <span className="entry-date">2025.1 ~ 2026.01</span>
                  <span className="entry-content">삼성 청년 소프트웨어 아카데미 13기</span>
                </div>
              </div>
            </div>

            {/* 경력 */}
            <div className="content-section">
              <h3 className="section-subtitle">경력</h3>
              <div className="entry-list">
                <div className="entry-item">
                  <span className="entry-date">2022.02 ~ 2024.06</span>
                  <span className="entry-content"> 통신 장교로 군 복무</span>
                </div>
              </div>
            </div>

            {/* 활동 */}
            <div className="content-section">
              <h3 className="section-subtitle">활동</h3>
              <div className="entry-list">
                <div className="entry-item">
                  <span className="entry-date">2025.07 ~ 2025.08</span>
                  <span className="entry-content">stretch 프로젝트 참여</span>
                </div>
                <div className="entry-item">
                  <span className="entry-date">2025.08 ~ 2025.09</span>
                  <span className="entry-content">절약몬 프로젝트 참여</span>
                </div>
                <div className="entry-item">
                  <span className="entry-date">2025.09 ~ 2025.11</span>
                  <span className="entry-content">빌려joing 프로젝트 참여</span>
                </div>

              </div>
            </div>
            </div>
            {/* 캐러셀 인디케이터 */}
            <div className="carousel-indicators">
              {[...Array(totalSlides)].map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${activeSlide === index ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`슬라이드 ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          background-color: var(--bg-color);
          background-image: radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
          background-position: 0 0;
          position: relative;
          justify-content: center;
          align-items: center;
          padding: 0;
          height: auto;
          min-height: 100vh;
        }
        .about-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          padding: 3rem 4rem;
          max-width: 1600px;
          margin: 0 auto;
        }
        .about-layout {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          width: 100%;
        }
        .rock-container {
          width: 100%;
          height: 200px;
          display: none;
        }
        .rock-canvas {
          /* 필터 없음 - 텍스처 원본 그대로 */
        }
        .top-section {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 3rem;
          align-items: start;
        }
        .left-column {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .image-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        .right-column {
          display: flex;
          flex-direction: column;
        }
        .bio-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .bottom-section {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          grid-auto-rows: min-content;
          align-items: start;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          line-height: 1.2;
          text-transform: uppercase;
          color: var(--text-color);
          margin: 0;
          margin-bottom: 0;
        }
        .image-frame {
          width: 100%;
          max-width: 250px;
          height: auto;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          padding: 5px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .image-frame img {
          width: 100%;
          height: auto;
          object-fit: contain;
          display: block;
        }
        .info-section,
        .content-section {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          min-width: 0;
        }
        .section-subtitle {
          font-family: var(--font-main);
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-color);
          border-bottom: 1px solid var(--text-color);
          padding-bottom: 0.2rem;
          margin: 0;
          margin-bottom: 0.05rem;
        }
        .info-list {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .info-label {
          font-family: var(--font-main);
          font-size: 0.85rem;
          color: #666;
          flex-shrink: 0;
        }
        .info-value {
          font-family: var(--font-main);
          font-size: 0.85rem;
          color: var(--text-color);
          text-align: right;
          flex: 1;
          min-width: 0;
        }
        .entry-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .entry-item {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .entry-date {
          font-family: var(--font-main);
          font-size: 0.85rem;
          color: #666;
          white-space: nowrap;
        }
        .entry-content {
          font-family: var(--font-main);
          font-size: 0.85rem;
          color: var(--text-color);
          line-height: 1.5;
        }
        .highlight {
          font-size: 1.8rem;
          font-weight: 700;
          font-family: var(--font-main);
          line-height: 1.4;
          color: var(--text-color);
          letter-spacing: 0.02em;
          margin-bottom: 0.8rem;
        }
        .bio-text {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--text-color);
          font-family: var(--font-main);
          letter-spacing: 0.02em;
        }
        .project-list {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .project-item {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .project-header {
          display: flex;
          gap: 0.8rem;
          align-items: flex-start;
        }
        .project-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          background-color: #f5f5f5;
          border-radius: 4px;
          flex-shrink: 0;
        }
        .project-info {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          flex: 1;
        }
        .project-date {
          font-family: var(--font-main);
          font-size: 0.8rem;
          color: #666;
        }
        .project-title {
          font-family: var(--font-main);
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-color);
        }
        .project-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-left: 48px;
        }
        .tag {
          font-family: var(--font-main);
          font-size: 0.75rem;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          color: white;
          font-weight: 500;
        }
        .tag-blue {
          background-color: #3b82f6;
        }
        .tag-purple {
          background-color: #8b5cf6;
        }
        .tag-light-blue {
          background-color: #60a5fa;
        }
        .tag-gray {
          background-color: #9ca3af;
        }
        .link-list {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .link-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          text-decoration: none;
          color: var(--text-color);
          transition: opacity 0.2s;
        }
        .link-item:hover {
          opacity: 0.7;
        }
        .link-icon-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #ef4444;
          flex-shrink: 0;
        }
        .link-label {
          font-family: var(--font-main);
          font-size: 0.85rem;
          min-width: 80px;
        }
        .link-url {
          font-family: var(--font-main);
          font-size: 0.85rem;
          color: #666;
        }
        .skill-list {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .skill-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .skill-icons {
          display: flex;
          gap: 0.4rem;
          min-width: 80px;
        }
        .skill-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-main);
          font-size: 0.75rem;
          font-weight: 600;
          background-color: #f5f5f5;
          border-radius: 4px;
        }
        .skill-name {
          font-family: var(--font-main);
          font-size: 0.85rem;
          color: var(--text-color);
          flex: 1;
        }
        /* 큰 화면 */
        @media (min-width: 1400px) {
          .about-container {
            padding: 4rem 6rem;
          }
          .about-layout {
            gap: 5rem;
          }
        }
        @media (min-width: 1200px) and (max-width: 1399px) {
          .about-container {
            padding: 3rem 4rem;
          }
          .about-layout {
            gap: 4rem;
          }
        }
        /* 중간 화면 */
        @media (min-width: 992px) and (max-width: 1199px) {
          .top-section {
            grid-template-columns: 250px 1fr;
            gap: 2.5rem;
          }
          .bottom-section {
            gap: 1.5rem;
          }
        }
        /* 태블릿 */
        @media (max-width: 968px) {
          .about-container {
            padding: 2rem 2rem;
          }
          .about-layout {
            gap: 2.5rem;
          }
          .top-section {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .bottom-section {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }
        /* 모바일 */
        @media (max-width: 640px) {
          .about-section {
            display: block !important;
            height: 100vh;
            padding: 0 !important;
            overflow: hidden;
          }
          .about-container {
            padding: 1rem;
            padding-top: 5rem;
            padding-bottom: 5rem;
            height: 100vh;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
          }
          .about-layout {
            display: flex;
            flex-direction: column;
            flex: 1;
            gap: 0;
            min-height: 0;
          }
          .rock-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            min-height: 80px;
            flex: 1;
            min-height: 0;
          }
          .top-section {
            display: grid;
            grid-template-columns: 100px 1fr;
            grid-template-rows: auto auto;
            gap: 0.8rem;
            align-items: start;
            flex-shrink: 0;
          }
          .left-column {
            grid-column: 1;
            grid-row: 1;
          }
          .right-column {
            display: contents;
          }
          .bio-section {
            display: contents;
          }
          .highlight {
            grid-column: 2;
            grid-row: 1;
            font-size: 1rem;
            text-align: left;
            margin-bottom: 0;
            align-self: center;
            line-height: 1.4;
            font-weight: 700;
          }
          .bio-text {
            grid-column: 1 / -1;
            grid-row: 2;
            font-size: 0.8rem;
            text-align: left;
            line-height: 1.5;
            margin-top: 0.3rem;
          }
          .image-frame {
            max-width: 100px;
          }
          .carousel-wrapper {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            flex-shrink: 0;
            margin-top: 0.5rem;
          }
          .bottom-section {
            display: flex;
            flex-direction: row;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 0;
            padding-bottom: 0;
            margin: 0;
            -webkit-overflow-scrolling: touch;
          }
          .bottom-section::-webkit-scrollbar {
            display: none;
          }
          .info-section,
          .content-section {
            flex: 0 0 100%;
            min-width: 100%;
            scroll-snap-align: start;
            background: var(--bg-color);
            padding: 1.5rem 1rem;
            border: none;
            border-top: 1px solid rgba(0,0,0,0.1);
            border-radius: 0;
            box-sizing: border-box;
          }
          .carousel-indicators {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.5rem 0;
          }
          .indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: none;
            background: rgba(0,0,0,0.2);
            cursor: pointer;
            transition: all 0.3s ease;
            padding: 0;
          }
          .indicator.active {
            background: var(--text-color);
            transform: scale(1.3);
          }
          .section-subtitle {
            font-size: 0.95rem;
          }
          .info-label,
          .info-value,
          .entry-date,
          .entry-content {
            font-size: 0.8rem;
          }
        }
        
        /* 작은 모바일 */
        @media (max-width: 480px) {
          .about-container {
            padding: 0.8rem;
            padding-top: 4.5rem;
            padding-bottom: 5rem;
          }
          .rock-container {
            min-height: 60px;
          }
          .top-section {
            grid-template-columns: 90px 1fr;
            gap: 0.6rem;
          }
          .image-frame {
            max-width: 90px;
          }
          .highlight {
            font-size: 0.95rem;
            line-height: 1.35;
          }
          .bio-text {
            font-size: 0.75rem;
            line-height: 1.45;
          }
          .bottom-section {
            margin: 0;
          }
          .info-section,
          .content-section {
            flex: 0 0 100%;
            min-width: 100%;
            padding: 1rem 0.8rem;
          }
          .info-row {
            flex-direction: column;
            gap: 0.2rem;
          }
          .info-value {
            text-align: left;
          }
          .section-subtitle {
            font-size: 0.85rem;
          }
          .info-label,
          .info-value,
          .entry-date,
          .entry-content {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
