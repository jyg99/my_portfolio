import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import { ChevronDown, Linkedin } from 'lucide-react';

const HeroSection = () => {
  const canvasRef = useRef(null);
  const [hoveredText, setHoveredText] = useState('');
  const hoveredTextRef = useRef('');
  const particlesRef = useRef([]);
  const particleCountRef = useRef(0);
  const animationFrameRef = useRef(null);
  const targetPixelsRef = useRef([]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/in/your-profile', '_blank');
  };

  // hoveredText가 변경될 때 ref도 업데이트
  useEffect(() => {
    hoveredTextRef.current = hoveredText;
  }, [hoveredText]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // 파티클을 골고루 분포하도록 생성
    const spacing = 30;
    const particles = [];
    let time = 0;
    
    for (let y = spacing; y < height; y += spacing) {
      for (let x = spacing; x < width; x += spacing) {
        const offsetX = (Math.random() - 0.5) * 8;
        const offsetY = (Math.random() - 0.5) * 8;
        const shapeType = Math.random();
        particles.push({
          x: x + offsetX,
          y: y + offsetY,
          originalX: x + offsetX,
          originalY: y + offsetY,
          targetX: x + offsetX,
          targetY: y + offsetY,
          radius: 0.5 + Math.random() * 0.8, // 더 작은 크기
          phase: Math.random() * Math.PI * 2,
          amplitude: 1 + Math.random() * 1.5,
          shape: shapeType < 0.4 ? 'circle' : shapeType < 0.7 ? 'square' : 'dash', // 원형, 사각형, 대시
          rotation: Math.random() * Math.PI * 2, // 회전 각도
          sizeVariation: 0.8 + Math.random() * 0.4 // 크기 변형
        });
      }
    }

    particlesRef.current = particles;
    particleCountRef.current = particles.length;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;
      
      const targetPixels = targetPixelsRef.current;
      const currentHoveredText = hoveredTextRef.current;
      
      if (currentHoveredText && targetPixels.length > 0) {
        const targetCount = targetPixels.length;
        
        // 파티클들을 타겟(글자 테두리)에 배치
        // 모든 파티클이 동일한 패턴으로 움직이도록 순서대로 배정 (모듈러 연산)
        particles.forEach((particle, i) => {
          const targetIndex = i % targetCount; // 순환하며 타겟 배정
          const target = targetPixels[targetIndex];
          particle.targetX = target.x;
          particle.targetY = target.y;
          particle.isOnText = i < targetCount; // 첫 번째 사이클만 글자에 표시
        });
      } else {
        // 원래 위치 주변으로 미세하게 움직임
        particles.forEach((particle) => {
          const offsetX = Math.sin(time + particle.phase) * particle.amplitude;
          const offsetY = Math.cos(time + particle.phase * 1.3) * particle.amplitude;
          particle.targetX = particle.originalX + offsetX;
          particle.targetY = particle.originalY + offsetY;
          particle.isOnText = false;
        });
      }

      // 파티클 업데이트 및 그리기 (자석처럼 붙는 효과)
      particles.forEach((particle, i) => {
        const dx = particle.targetX - particle.x;
        const dy = particle.targetY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (currentHoveredText && targetPixels.length > 0) {
          // 모든 파티클이 동일한 속도로 이동
          const speed = 0.3;
          
          if (distance > 1) {
            particle.x += dx * speed;
            particle.y += dy * speed;
          } else {
            particle.x = particle.targetX;
            particle.y = particle.targetY;
          }
          
          // 충돌 방지: 글자에 배치된 파티클끼리만 적용
          if (particle.isOnText) {
            const minDistance = 4;
            for (let j = 0; j < i; j++) {
              const other = particles[j];
              if (!other.isOnText) continue; // 글자 외부 파티클은 제외
              
              const dx2 = particle.x - other.x;
              const dy2 = particle.y - other.y;
              const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
              
              if (dist2 < minDistance && dist2 > 0) {
                const angle = Math.atan2(dy2, dx2);
                const pushDistance = (minDistance - dist2) * 0.5;
                particle.x += Math.cos(angle) * pushDistance;
                particle.y += Math.sin(angle) * pushDistance;
              }
            }
          }
        } else {
          // 일반 상태에서는 부드럽게 움직임
          particle.x += dx * 0.08;
          particle.y += dy * 0.08;
        }
        
        // 호버 중일 때 글자에 배치되지 않은 파티클은 이동하면서 빠르게 사라짐
        let alpha = 0.7;
        if (currentHoveredText && !particle.isOnText) {
          // 원래 위치에서 현재 위치까지의 이동 비율로 투명도 계산
          const originalDx = particle.targetX - particle.originalX;
          const originalDy = particle.targetY - particle.originalY;
          const totalDistance = Math.sqrt(originalDx * originalDx + originalDy * originalDy);
          
          const currentDx = particle.targetX - particle.x;
          const currentDy = particle.targetY - particle.y;
          const remainingDistance = Math.sqrt(currentDx * currentDx + currentDy * currentDy);
          
          // 이동 시작하자마자 빠르게 사라짐 (30% 이동하면 완전히 투명)
          const progress = totalDistance > 0 ? 1 - (remainingDistance / totalDistance) : 1;
          alpha = Math.max(0, 0.7 * (1 - progress * 3));
        }
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        
        const size = particle.radius * particle.sizeVariation;
        
        if (particle.shape === 'circle') {
          ctx.beginPath();
          const rx = size * (0.9 + Math.random() * 0.2);
          const ry = size * (0.9 + Math.random() * 0.2);
          ctx.ellipse(0, 0, rx, ry, Math.random() * 0.3, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.shape === 'square') {
          const w = size * (1.5 + Math.random() * 0.5);
          const h = size * (1.5 + Math.random() * 0.5);
          ctx.fillRect(-w / 2, -h / 2, w, h);
        } else {
          const len = size * (2 + Math.random() * 1.5);
          const thick = size * (0.6 + Math.random() * 0.4);
          ctx.fillRect(-len / 2, -thick / 2, len, thick);
        }
        
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hoveredText) {
      targetPixelsRef.current = [];
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const particleCount = particleCountRef.current || 5000;
    
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = width;
    tempCanvas.height = height;
    
    // 화면 크기에 비례하여 글씨 크기 계산
    // 화면의 45%를 텍스트가 차지하도록, 글자 수에 따라 조절
    const maxTextWidth = width * 0.45;
    const charCount = hoveredText.length;
    // 글자당 폭을 기준으로 폰트 크기 계산
    const fontSize = Math.min(maxTextWidth / (charCount * 0.6), height * 0.3);
    
    tempCtx.fillStyle = 'black';
    const fontFamily = getComputedStyle(document.documentElement).getPropertyValue('--font-display') || 'Arial';
    tempCtx.font = `bold ${fontSize}px ${fontFamily}`;
    tempCtx.textAlign = 'center';
    tempCtx.textBaseline = 'middle';
    tempCtx.fillText(hoveredText, width / 2, height / 2);
    
    const imageData = tempCtx.getImageData(0, 0, width, height);
    const allEdgePixels = [];
    
    // 텍스트의 테두리(윤곽선)만 추출
    for (let y = 1; y < height - 1; y += 1) {
      for (let x = 1; x < width - 1; x += 1) {
        const index = (y * width + x) * 4;
        const alpha = imageData.data[index + 3];
        
        if (alpha > 128) {
          const neighbors = [
            imageData.data[((y - 1) * width + x) * 4 + 3],
            imageData.data[((y + 1) * width + x) * 4 + 3],
            imageData.data[(y * width + (x - 1)) * 4 + 3],
            imageData.data[(y * width + (x + 1)) * 4 + 3]
          ];
          
          const hasTransparentNeighbor = neighbors.some(neighborAlpha => neighborAlpha < 128);
          
          if (hasTransparentNeighbor) {
            allEdgePixels.push({ x, y });
          }
        }
      }
    }
    
    // 테두리 픽셀을 거리 순으로 정렬 (연결된 경로 만들기)
    const sortedPixels = [];
    if (allEdgePixels.length > 0) {
      sortedPixels.push(allEdgePixels[0]);
      const remaining = [...allEdgePixels.slice(1)];
      
      while (remaining.length > 0) {
        const last = sortedPixels[sortedPixels.length - 1];
        let minDist = Infinity;
        let nearestIdx = 0;
        
        for (let i = 0; i < remaining.length; i++) {
          const dx = remaining[i].x - last.x;
          const dy = remaining[i].y - last.y;
          const dist = dx * dx + dy * dy;
          if (dist < minDist) {
            minDist = dist;
            nearestIdx = i;
          }
        }
        
        sortedPixels.push(remaining[nearestIdx]);
        remaining.splice(nearestIdx, 1);
      }
    }
    
    // 테두리 총 길이 계산
    let totalLength = 0;
    for (let i = 1; i < sortedPixels.length; i++) {
      const dx = sortedPixels[i].x - sortedPixels[i - 1].x;
      const dy = sortedPixels[i].y - sortedPixels[i - 1].y;
      totalLength += Math.sqrt(dx * dx + dy * dy);
    }
    
    // 파티클 수에 맞춰 점 간격 계산 (모든 파티클 사용)
    // 최소 간격 2px 보장 (너무 촘촘하면 안 됨)
    const targetDistance = Math.max(2, totalLength / particleCount);
    
    // 계산된 간격으로 타겟 생성
    const sampledTargets = [];
    if (sortedPixels.length > 0) {
      let accumulatedDistance = 0;
      let lastTarget = sortedPixels[0];
      sampledTargets.push(lastTarget);
      
      for (let i = 1; i < sortedPixels.length; i++) {
        const dx = sortedPixels[i].x - lastTarget.x;
        const dy = sortedPixels[i].y - lastTarget.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        accumulatedDistance += distance;
        
        if (accumulatedDistance >= targetDistance) {
          sampledTargets.push(sortedPixels[i]);
          lastTarget = sortedPixels[i];
          accumulatedDistance = 0;
        }
      }
    }
    
    targetPixelsRef.current = sampledTargets;
  }, [hoveredText]);

  return (
    <section id="hero" className="hero-section">
      <canvas ref={canvasRef} className="particles-canvas" />
      <Header />

      <div className="hero-content">
        <div className="frame-wrapper">
          <div className="frame">
            <h1 className="text-top">재미를 주고싶{'\n'}은 개발자</h1>
            <p className="intro-text">
              <strong className="name">정용균</strong> 입니다.
            </p>
          </div>
          <div className="button-container">
            <button 
              className="nav-button" 
              onClick={() => scrollToSection('about')}
              onMouseEnter={() => setHoveredText('ABOUT')}
              onMouseLeave={() => setHoveredText('')}
            >
              자기소개
            </button>
            <button 
              className="nav-button" 
              onClick={() => scrollToSection('tech')}
              onMouseEnter={() => setHoveredText('STACK')}
              onMouseLeave={() => setHoveredText('')}
            >
              기술스택
            </button>
            <button 
              className="nav-button" 
              onClick={() => scrollToSection('projects')}
              onMouseEnter={() => setHoveredText('PROJECT')}
              onMouseLeave={() => setHoveredText('')}
            >
              포트폴리오
            </button>
            <button 
              className="nav-button linkedin" 
              onClick={openLinkedIn}
              onMouseEnter={() => setHoveredText('LINKED')}
              onMouseLeave={() => setHoveredText('')}
            >
              <Linkedin size={20} />
              링크드인
            </button>
          </div>
        </div>
      </div>

      <div className="scroll-hint">
        <ChevronDown size={32} className="bounce" />
      </div>

      <style>{`
        .hero-section {
          background-color: var(--bg-color);
          position: relative;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        .particles-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }
        .hero-content {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          position: relative;
          z-index: 1;
        }
        .frame-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }
        .button-container {
          display: flex;
          flex-direction: row;
          gap: 1.5rem;
        }
        .nav-button {
          background-color: transparent;
          background-image: radial-gradient(circle, rgba(0, 0, 0, 0.08) 1px, transparent 1px);
          background-size: 20px 20px;
          background-position: 0 0;
          border: 2px solid var(--text-color);
          color: var(--text-color);
          padding: 1.2rem 2rem;
          font-family: var(--font-main);
          font-size: 1.1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          width: 180px;
          min-width: 180px;
        }
        .nav-button:hover {
          background-color: var(--text-color);
          color: var(--bg-color);
        }
        .frame {
          position: relative;
          width: 450px;
          height: 350px;
          padding: 3rem;
          background-image: radial-gradient(circle, rgba(0, 0, 0, 0.08) 1px, transparent 1px);
          background-size: 20px 20px;
          background-position: 0 0;
          border: 3px solid var(--text-color);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .frame::after {
          content: '';
          position: absolute;
          left: -3px;
          top: 3rem;
          width: 3px;
          height: 8rem;
          background-color: var(--bg-color);
        }
        .text-top {
          font-family: var(--font-display);
          font-size: 3.2rem;
          font-weight: 700;
          color: var(--text-color);
          margin: 0;
          margin-left: -6rem;
          letter-spacing: 0.05em;
          line-height: 1.2;
          text-transform: uppercase;
          position: relative;
          text-align: left;
          align-self: flex-start;
          white-space: pre-line;
        }
        .intro-text {
          font-family: var(--font-main);
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--text-color);
          text-align: right;
          line-height: 1.6;
          margin: 0;
          margin-top: 4.5rem;
          letter-spacing: 0.02em;
          align-self: flex-end;
        }
        .intro-text .name {
          font-size: 2rem;
          font-weight: 700;
          display: inline;
        }
        .scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
