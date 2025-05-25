"use client";

import { colors, shadows } from '../constants/styles';
import { useState, useEffect } from 'react';
import { FileQuestion, Bookmark } from 'lucide-react';

const FloatingButton = ({ count, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300 && count > 0);
    };
    
    handleResize();
    handleScroll();
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [count]);

  if (count === 0) {
    return null;
  }

  const styles = {
    button: {
      position: 'fixed',
      bottom: isMobile ? '1.5rem' : '2rem',
      right: isMobile ? '1.5rem' : '2rem',
      width: isMobile ? '64px' : '56px',
      height: isMobile ? '64px' : '56px',
      background: `linear-gradient(135deg, ${colors.rubyRed} 0%, #b91c1c 100%)`,
      border: 'none',
      borderRadius: '50%',
      boxShadow: isHovered ? shadows.xl : shadows.lg,
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '1.75rem' : '1.5rem',
      color: 'white',
      zIndex: 999,
      transform: `scale(${isVisible ? (isHovered ? 1.1 : 1) : 0}) ${isHovered ? 'translateY(-3px)' : 'translateY(0)'}`,
      opacity: isVisible ? 1 : 0,
      visibility: isVisible ? 'visible' : 'hidden',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(255, 255, 255, 0.2)',
    },
    count: {
      position: 'absolute',
      top: isMobile ? '-10px' : '-8px',
      right: isMobile ? '-10px' : '-8px',
      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      color: 'white',
      borderRadius: '50%',
      width: isMobile ? '28px' : '24px',
      height: isMobile ? '28px' : '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '0.85rem' : '0.75rem',
      fontWeight: 700,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      border: '2px solid white',
      animation: count > 0 ? 'pulse 2s infinite' : 'none',
    },
    tooltip: {
      position: 'absolute',
      bottom: '100%',
      right: '50%',
      transform: 'translateX(50%)',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '0.5rem 0.75rem',
      borderRadius: '6px',
      fontSize: '0.8rem',
      whiteSpace: 'nowrap',
      marginBottom: '8px',
      opacity: isHovered ? 1 : 0,
      visibility: isHovered ? 'visible' : 'hidden',
      transition: 'all 0.2s ease',
      pointerEvents: 'none',
      zIndex: 1000,
    },
    tooltipArrow: {
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 0,
      height: 0,
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent',
      borderTop: '4px solid rgba(0, 0, 0, 0.8)',
    },
    ripple: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.3)',
      transform: 'scale(0)',
      animation: isHovered ? 'ripple 0.6s linear' : 'none',
      pointerEvents: 'none',
    },
  };

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    onClick();
  };

  return (
    <button 
      style={styles.button} 
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`選択されたアイテム${count}個を確認`}
      aria-describedby="floating-button-tooltip"
    >
      <div style={styles.ripple}></div>
      <FileQuestion size={isMobile ? 28 : 24} />
      {count > 0 && (
        <span style={styles.count} aria-label={`${count}個選択中`}>
          {count > 99 ? '99+' : count}
        </span>
      )}
      {isHovered && !isMobile && (
        <div style={styles.tooltip} id="floating-button-tooltip">
          {`${count}個のアイテムで練習問題を生成`}
          <div style={styles.tooltipArrow}></div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </button>
  );
};

export default FloatingButton; 