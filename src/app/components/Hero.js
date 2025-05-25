"use client";

import Link from 'next/link';
import { colors, gradients, fontFamily, shadows } from '../constants/styles';
import { useState, useEffect } from 'react';
import { Gem } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isShortScreen, setIsShortScreen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      const short = window.innerHeight < 700;
      setIsMobile(mobile);
      setIsShortScreen(short);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const CodeAnimation = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const codeSnippets = [
      'puts "Hello, Ruby!"',
      '[1, 2, 3].map(&:to_s)',
      'def ruby_magic; "💎"; end',
      'class Developer < Human',
      '"Ruby".downcase.upcase',
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % codeSnippets.length);
      }, 2500);
      return () => clearInterval(interval);
    }, []);

    return (
      <div style={styles.codeAnimation}>
        <div style={styles.codeWindow}>
          <div style={styles.codeHeader}>
            <div style={styles.codeButtons}>
              <div style={{...styles.codeButton, background: '#ff5f57'}}></div>
              <div style={{...styles.codeButton, background: '#ffbd2e'}}></div>
              <div style={{...styles.codeButton, background: '#28ca42'}}></div>
            </div>
            <span style={styles.codeTitle}>irb (Ruby Console)</span>
          </div>
          <div style={styles.codeContent}>
            <span style={styles.codePrompt}>{'irb> '}</span>
            <span 
              style={styles.codeText}
              key={currentIndex}
            >
              {codeSnippets[currentIndex]}
            </span>
            <span style={styles.cursor}>|</span>
          </div>
        </div>
      </div>
    );
  };

  const GeometricAnimation = () => (
    <div style={styles.geometricContainer}>
      <svg style={styles.svg} viewBox="0 0 1200 600">
        <defs>
          <radialGradient id="rubyGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(220, 38, 38, 0.3)" />
            <stop offset="70%" stopColor="rgba(220, 38, 38, 0.1)" />
            <stop offset="100%" stopColor="rgba(220, 38, 38, 0)" />
          </radialGradient>
          <linearGradient id="codeFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
            <stop offset="50%" stopColor="rgba(220, 38, 38, 0.5)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.5)" />
          </linearGradient>
        </defs>
        
        {/* 流れるようなコードストリーム */}
        <g style={styles.codeStream}>
          <path 
            d="M-100,150 Q200,100 400,150 T800,150 L1000,150" 
            stroke="url(#codeFlow)" 
            strokeWidth="2" 
            fill="none"
            style={styles.flowingPath1}
          />
          <path 
            d="M-100,250 Q300,200 500,250 T900,250 L1100,250" 
            stroke="url(#codeFlow)" 
            strokeWidth="1.5" 
            fill="none"
            style={styles.flowingPath2}
          />
          <path 
            d="M-100,350 Q250,300 450,350 T850,350 L1050,350" 
            stroke="url(#codeFlow)" 
            strokeWidth="1" 
            fill="none"
            style={styles.flowingPath3}
          />
        </g>
        
        {/* 浮遊するシンボル */}
        <g style={styles.floatingSymbols}>
          <circle cx="200" cy="120" r="15" fill="url(#rubyGlow)" style={styles.symbol1} />
          <rect x="480" y="180" width="20" height="20" rx="3" fill="rgba(59, 130, 246, 0.2)" style={styles.symbol2} />
          <circle cx="750" cy="280" r="12" fill="rgba(168, 85, 247, 0.2)" style={styles.symbol3} />
          <polygon points="350,320 365,350 335,350" fill="rgba(220, 38, 38, 0.3)" style={styles.symbol4} />
          <circle cx="600" cy="100" r="8" fill="rgba(34, 197, 94, 0.3)" style={styles.symbol5} />
          <rect x="150" y="380" width="16" height="16" rx="2" fill="rgba(249, 115, 22, 0.3)" style={styles.symbol6} />
        </g>
        
        {/* 光る粒子 */}
        <g style={styles.particles}>
          <circle cx="100" cy="200" r="1.5" fill={colors.rubyRed} style={styles.particle1} />
          <circle cx="300" cy="150" r="1" fill="rgba(59, 130, 246, 0.8)" style={styles.particle2} />
          <circle cx="500" cy="300" r="1.5" fill="rgba(168, 85, 247, 0.8)" style={styles.particle3} />
          <circle cx="700" cy="180" r="1" fill="rgba(34, 197, 94, 0.8)" style={styles.particle4} />
          <circle cx="850" cy="320" r="1.5" fill="rgba(249, 115, 22, 0.8)" style={styles.particle5} />
          <circle cx="400" cy="400" r="1" fill={colors.rubyRed} style={styles.particle6} />
          <circle cx="650" cy="250" r="1.5" fill="rgba(59, 130, 246, 0.8)" style={styles.particle7} />
        </g>
      </svg>
    </div>
  );

  const styles = {
    header: {
      position: 'relative',
      background: `linear-gradient(135deg, 
        rgba(255, 255, 255, 1) 0%, 
        rgba(249, 250, 251, 0.9) 50%, 
        rgba(255, 255, 255, 1) 100%)`,
      padding: isMobile ? (isShortScreen ? '1rem 1rem 1.5rem' : '1rem 1rem 2rem') : '4rem 2rem 3rem',
      textAlign: 'center',
      minHeight: isMobile ? (isShortScreen ? '90vh' : '100vh') : '100vh',
      maxHeight: isMobile ? (isShortScreen ? '90vh' : '100vh') : '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: isMobile ? 'flex-start' : 'center',
      overflow: 'hidden',
      paddingTop: isMobile ? (isShortScreen ? '4rem' : '6rem') : '4rem',
    },
    codeAnimation: {
      position: 'absolute',
      top: isMobile ? '75%' : '15%',
      right: isMobile ? '50%' : '5%',
      transform: isMobile ? 'translateX(50%) scale(0.5)' : 'none',
      opacity: isVisible ? 1 : 0,
      transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.5s',
      zIndex: 3,
      display: (isMobile && isShortScreen) ? 'none' : 'block',
    },
    codeWindow: {
      width: isMobile ? '240px' : '320px',
      background: '#1e1e1e',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
      border: '1px solid #333',
    },
    codeHeader: {
      background: '#2d2d2d',
      padding: '0.6rem 0.8rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    codeButtons: {
      display: 'flex',
      gap: '0.4rem',
    },
    codeButton: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
    },
    codeTitle: {
      color: '#fff',
      fontSize: '0.75rem',
      marginLeft: 'auto',
    },
    codeContent: {
      padding: '0.8rem',
      color: '#fff',
      fontFamily: fontFamily.mono,
      fontSize: '0.85rem',
      minHeight: '2rem',
      display: 'flex',
      alignItems: 'center',
    },
    codePrompt: {
      color: colors.rubyRed,
      marginRight: '0.4rem',
    },
    codeText: {
      color: '#61dafb',
      animation: 'fadeInText 0.5s ease-in-out',
    },
    cursor: {
      color: '#fff',
      animation: 'blink 1s infinite',
      marginLeft: '2px',
    },
    content: {
      position: 'relative',
      zIndex: 10,
      maxWidth: isMobile ? '90%' : '800px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
      marginBottom: isMobile ? '2rem' : '0',
      marginTop: isMobile ? '1rem' : '0',
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.08) 0%, rgba(239, 68, 68, 0.12) 100%)',
      color: colors.rubyRed,
      padding: '0.5rem 1.2rem',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: 600,
      marginBottom: isMobile ? '1rem' : '1.5rem',
      border: `1px solid rgba(220, 38, 38, 0.15)`,
      backdropFilter: 'blur(10px)',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    title: {
      fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
      fontWeight: 800,
      color: colors.textPrimary,
      marginBottom: isMobile ? '0.75rem' : '1rem',
      lineHeight: 1.1,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
    },
    rubyText: {
      color: colors.rubyRed,
    },
    subtitle: {
      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
      color: colors.textSecondary,
      marginBottom: isMobile ? '1.5rem' : '2rem',
      lineHeight: 1.5,
      maxWidth: '500px',
      margin: isMobile ? '0 auto 1.5rem' : '0 auto 2rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
    },
    ctaContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginBottom: isMobile ? '1.5rem' : '2.5rem',
      flexWrap: 'wrap',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.6s',
    },
    ctaButton: {
      padding: '0.75rem 1.8rem',
      borderRadius: '8px',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      fontSize: '0.95rem',
      minWidth: '160px',
      textAlign: 'center',
    },
    primaryCta: {
      background: colors.rubyRed,
      color: 'white',
      boxShadow: '0 3px 10px rgba(220, 38, 38, 0.2)',
    },
    secondaryCta: {
      background: 'rgba(255, 255, 255, 0.9)',
      color: colors.textPrimary,
      border: `2px solid ${colors.borderMedium}`,
      backdropFilter: 'blur(10px)',
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '1.5rem',
      marginTop: '2rem',
      maxWidth: '450px',
      margin: '2rem auto 0',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.8s',
    },
    statItem: {
      textAlign: 'center',
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.6)',
      borderRadius: '12px',
      border: `1px solid ${colors.borderLight}`,
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    statNumber: {
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      fontWeight: 800,
      color: colors.rubyRed,
      display: 'block',
      lineHeight: 1,
      marginBottom: '0.3rem',
    },
    statLabel: {
      fontSize: '0.8rem',
      color: colors.textTertiary,
      fontWeight: 500,
    },
    geometricContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.4,
      zIndex: 1,
    },
    svg: {
      width: '100%',
      height: '100%',
    },
    codeStream: {
      opacity: 0.8,
    },
    flowingPath1: {
      strokeDasharray: '10 5',
      animation: 'flowCode 12s linear infinite',
      animationDelay: '0s',
    },
    flowingPath2: {
      strokeDasharray: '8 4',
      animation: 'flowCode 15s linear infinite',
      animationDelay: '2s',
    },
    flowingPath3: {
      strokeDasharray: '6 3',
      animation: 'flowCode 18s linear infinite',
      animationDelay: '4s',
    },
    floatingSymbols: {
      opacity: 0.7,
    },
    symbol1: { animation: 'float 6s ease-in-out infinite', animationDelay: '0s' },
    symbol2: { animation: 'float 8s ease-in-out infinite', animationDelay: '1s' },
    symbol3: { animation: 'float 7s ease-in-out infinite', animationDelay: '2s' },
    symbol4: { animation: 'float 9s ease-in-out infinite', animationDelay: '3s' },
    symbol5: { animation: 'float 5s ease-in-out infinite', animationDelay: '1.5s' },
    symbol6: { animation: 'float 7.5s ease-in-out infinite', animationDelay: '2.5s' },
    particles: {
      opacity: 0.9,
    },
    particle1: { animation: 'twinkle 3s ease-in-out infinite', animationDelay: '0s' },
    particle2: { animation: 'twinkle 2.5s ease-in-out infinite', animationDelay: '0.5s' },
    particle3: { animation: 'twinkle 3.5s ease-in-out infinite', animationDelay: '1s' },
    particle4: { animation: 'twinkle 2.8s ease-in-out infinite', animationDelay: '1.5s' },
    particle5: { animation: 'twinkle 3.2s ease-in-out infinite', animationDelay: '2s' },
    particle6: { animation: 'twinkle 2.3s ease-in-out infinite', animationDelay: '2.5s' },
    particle7: { animation: 'twinkle 3.7s ease-in-out infinite', animationDelay: '3s' },
  };

  return (
    <header style={styles.header}>
      <GeometricAnimation />
      <CodeAnimation />
      <div style={styles.content}>
        <div style={styles.badge}>
          <Gem size={16} style={{ marginRight: '0.5rem' }} />
          完全無料・オープンソース
        </div>
        <h1 style={styles.title}>
          <span style={styles.rubyText}>Ruby</span> 構文・メソッド
          <br />
          完全リファレンス
        </h1>
        <p style={styles.subtitle}>
          Rubyの全ての構文とメソッドを、わかりやすい例とともに解説。
          初心者から上級者まで、必要な情報がすぐに見つかります。
        </p>
        <div style={styles.ctaContainer}>
          <Link 
            href="#docs" 
            style={{...styles.ctaButton, ...styles.primaryCta}}
            onMouseEnter={(e) => {
              e.target.style.background = colors.rubyRedDark;
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = colors.rubyRed;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            ドキュメントを見る
          </Link>
          <Link 
            href="/examples" 
            style={{...styles.ctaButton, ...styles.secondaryCta}}
            onMouseEnter={(e) => {
              e.target.style.borderColor = colors.rubyRed;
              e.target.style.color = colors.rubyRed;
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = colors.borderMedium;
              e.target.style.color = colors.textPrimary;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            サンプルコードを見る
          </Link>
        </div>
        <div style={styles.stats}>
          {[
            { number: '494', label: 'メソッド解説' },
            { number: '37+', label: 'サンプル' },
            { number: '91', label: '構文解説' },
          ].map((stat, index) => (
            <div 
              key={index}
              style={styles.statItem}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <span style={styles.statNumber}>{stat.number}</span>
              <span style={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInText {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes flowCode {
          0% { stroke-dashoffset: 50; }
          100% { stroke-dashoffset: -50; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-10px) rotate(180deg); opacity: 1; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </header>
  );
};

export default Hero;  