import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

import jygImage from '../assets/jyg.JPG';

const AboutSection = () => {
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
                  사용자에게 즐거움을 주는 웹 경험을 만드는 것을 목표로 합니다.
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

          {/* 하단: 개인정보 + 학력 + 경력 + 활동 */}
          <div className="bottom-section">
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
          .about-container {
            padding: 1.5rem 1rem;
          }
          .about-layout {
            gap: 1.5rem;
          }
          .top-section {
            gap: 1.5rem;
          }
          .bottom-section {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .image-frame {
            max-width: 200px;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
