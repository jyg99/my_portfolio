import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Lottie from 'lottie-react';
import { Send, AlertCircle } from 'lucide-react';
import successAnimation from '../assets/Success.json';

const ContactSection = () => {
    const formRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (submitStatus === 'success') {
            setShowSuccess(true);
            // 3초 후에 폼으로 돌아가기
            const timer = setTimeout(() => {
                setShowSuccess(false);
                setSubmitStatus(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [submitStatus]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            await emailjs.sendForm(
                'service_9aughf5',
                'template_m4jqjq8',
                formRef.current,
                'YgIwV4GgTyLnpfghD'
            );
            setSubmitStatus('success');
            formRef.current.reset();
        } catch (error) {
            console.error('Email send failed:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="contact-section">
            <div className="contact-container">
                {showSuccess ? (
                    <div className="success-overlay">
                        <Lottie 
                            animationData={successAnimation} 
                            loop={false}
                            className="success-animation"
                        />
                        <p className="success-text">메일이 성공적으로 전송되었습니다!</p>
                    </div>
                ) : (
                    <>
                        <h2 className="section-title">CONTACT</h2>
                        <p className="section-subtitle">프로젝트 문의나 협업 제안을 환영합니다</p>

                        <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="from_email">이메일</label>
                                <input
                                    type="email"
                                    id="from_email"
                                    name="from_email"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">제목</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    placeholder="문의 제목을 입력해주세요"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">내용</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="6"
                                    placeholder="내용을 입력해주세요"
                                    required
                                />
                            </div>

                            <button 
                                type="submit" 
                                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>전송 중...</>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        보내기
                                    </>
                                )}
                            </button>

                            {submitStatus === 'error' && (
                                <div className="status-message error">
                                    <AlertCircle size={20} />
                                    <span>전송에 실패했습니다. 다시 시도해주세요.</span>
                                </div>
                            )}
                        </form>
                    </>
                )}
            </div>

            <style>{`
                .contact-section {
                    background-color: var(--bg-color);
                    background-image: radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
                    background-size: 20px 20px;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 4rem 2rem;
                }
                .contact-container {
                    width: 100%;
                    max-width: 600px;
                }
                .section-title {
                    font-family: var(--font-display);
                    font-size: 3rem;
                    color: var(--text-color);
                    letter-spacing: 0.2em;
                    margin-bottom: 1rem;
                    text-align: center;
                }
                .section-subtitle {
                    font-family: var(--font-main);
                    font-size: 1rem;
                    color: var(--text-color);
                    text-align: center;
                    margin-bottom: 3rem;
                }
                .contact-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .form-group label {
                    font-family: var(--font-main);
                    font-size: 0.9rem;
                    color: var(--text-color);
                    font-weight: 500;
                }
                .form-group input,
                .form-group textarea {
                    background: rgba(0,0,0,0.02);
                    border: 1px solid rgba(0,0,0,0.2);
                    border-radius: 8px;
                    padding: 1rem;
                    font-family: var(--font-main);
                    font-size: 1rem;
                    color: var(--text-color);
                    transition: all 0.2s ease;
                    outline: none;
                }
                .form-group input::placeholder,
                .form-group textarea::placeholder {
                    color: rgba(0,0,0,0.4);
                }
                .form-group input:focus,
                .form-group textarea:focus {
                    border-color: var(--text-color);
                    background: rgba(0,0,0,0.03);
                }
                .form-group textarea {
                    resize: vertical;
                    min-height: 150px;
                }
                .submit-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    background: var(--text-color);
                    color: var(--bg-color);
                    border: none;
                    border-radius: 8px;
                    padding: 1rem 2rem;
                    font-family: var(--font-main);
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    margin-top: 1rem;
                }
                .submit-btn:hover:not(:disabled) {
                    background: rgba(0,0,0,0.8);
                    transform: translateY(-2px);
                }
                .submit-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .submit-btn.submitting {
                    background: rgba(0,0,0,0.7);
                }
                .success-overlay {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 400px;
                    animation: fadeIn 0.3s ease;
                }
                .success-animation {
                    width: 200px;
                    height: 200px;
                }
                .success-text {
                    font-family: var(--font-main);
                    font-size: 1.2rem;
                    color: var(--text-color);
                    margin-top: 1rem;
                    text-align: center;
                }
                .status-message {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    padding: 1rem;
                    border-radius: 8px;
                    font-family: var(--font-main);
                    font-size: 0.9rem;
                    animation: fadeIn 0.3s ease;
                }
                .status-message.error {
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                    border: 1px solid rgba(239, 68, 68, 0.3);
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @media (max-width: 768px) {
                    .contact-section {
                        padding: 3rem 1.5rem;
                        padding-bottom: 5rem;
                    }
                    .section-title {
                        font-size: 2rem;
                    }
                    .section-subtitle {
                        font-size: 0.9rem;
                        margin-bottom: 2rem;
                    }
                    .form-group input,
                    .form-group textarea {
                        padding: 0.8rem;
                        font-size: 0.95rem;
                    }
                    .submit-btn {
                        padding: 0.9rem 1.5rem;
                    }
                }
                
                @media (max-width: 480px) {
                    .contact-section {
                        padding: 2.5rem 1rem;
                        padding-bottom: 5rem;
                    }
                    .section-title {
                        font-size: 1.6rem;
                        letter-spacing: 0.1em;
                    }
                    .section-subtitle {
                        font-size: 0.85rem;
                    }
                    .contact-form {
                        gap: 1.2rem;
                    }
                    .form-group label {
                        font-size: 0.85rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default ContactSection;

