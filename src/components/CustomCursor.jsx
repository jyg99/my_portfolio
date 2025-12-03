import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverTarget, setHoverTarget] = useState(null);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const checkIsInteractive = (element) => {
      if (!element) return false;
      
      // 직접 태그 체크
      if (element.tagName === 'A' || element.tagName === 'BUTTON' || element.tagName === 'LI') {
        return true;
      }
      
      // 클래스 체크
      if (element.classList && (
        element.classList.contains('nav-button') ||
        element.classList.contains('link-button') ||
        element.classList.contains('link-item') ||
        element.classList.contains('logo') ||
        element.classList.contains('nav-links') ||
        element.classList.contains('bento-item') ||
        element.classList.contains('project-card') ||
        element.classList.contains('link-btn')
      )) {
        return true;
      }
      
      // closest 체크
      if (element.closest) {
        const closest = element.closest('button, a, .nav-button, .link-button, .link-item, .nav-links li, .logo, .bento-item, .project-card, .link-btn');
        if (closest) return true;
      }
      
      // cursor 스타일 체크
      const computedStyle = window.getComputedStyle(element);
      if (computedStyle.cursor === 'pointer') {
        return true;
      }
      
      return false;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = checkIsInteractive(target);
      
      setIsHovering(isInteractive);
      setHoverTarget(isInteractive ? target : null);
    };

    const handleMouseOut = (e) => {
      // 마우스가 요소를 벗어날 때, relatedTarget이 인터랙티브 요소가 아니면 호버 해제
      const relatedTarget = e.relatedTarget;
      if (!relatedTarget || !checkIsInteractive(relatedTarget)) {
        setIsHovering(false);
        setHoverTarget(null);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOut, true);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseOut, true);
    };
  }, []);

  // 도트 패턴 생성 (홈의 도트 패턴과 일치: 20px 간격)
  const dotCount = 9; // 3x3 그리드
  const dotSpacing = 8;
  const dots = [];

  for (let i = 0; i < dotCount; i++) {
    const row = Math.floor(i / 3);
    const col = i % 3;
    const offsetX = (col - 1) * dotSpacing;
    const offsetY = (row - 1) * dotSpacing;
    
    // 호버 시 점들이 모이는 효과
    const hoverOffset = isHovering ? 0.3 : 1;
    
    dots.push({
      x: offsetX * hoverOffset,
      y: offsetY * hoverOffset,
      delay: i * 0.02,
    });
  }

  return (
    <>
      <div 
        className="custom-cursor"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      >
        {dots.map((dot, index) => (
          <div
            key={index}
            className="cursor-dot"
            style={{
              transform: `translate(${dot.x}px, ${dot.y}px)`,
              transitionDelay: `${dot.delay}s`,
            }}
          />
        ))}
      </div>
      <style>{`
        * {
          cursor: none !important;
        }
        .custom-cursor {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: transform 0.1s ease-out;
        }
        .cursor-dot {
          position: absolute;
          width: 3px;
          height: 3px;
          background-color: var(--text-color);
          border-radius: 50%;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease;
        }
        /* 텍스트 선택 시 기본 커서 표시 */
        *::selection {
          cursor: text;
        }
        input, textarea {
          cursor: text !important;
        }
        /* 태블릿/모바일에서 커스텀 커서 숨기기 */
        @media (max-width: 992px) {
          * {
            cursor: auto !important;
          }
          .custom-cursor {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;

