"use client";

import Link from 'next/link';
import { colors, shadows, fontFamily } from '../constants/styles';
import { useState, useEffect } from 'react';
import { Gem } from 'lucide-react';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const styles = {
    nav: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(8px)',
      borderBottom: `1px solid ${colors.borderLight}`,
      zIndex: 1000,
      transition: 'all 0.2s ease',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.25rem',
      fontWeight: 700,
      color: colors.rubyRed,
      textDecoration: 'none',
      fontFamily: fontFamily.sans,
      zIndex: 1001,
    },
    logoIcon: {
      fontSize: '1.5rem',
    },
    desktopMenu: {
      display: isMobile ? 'none' : 'flex',
      listStyle: 'none',
      gap: '2rem',
      margin: 0,
      padding: 0,
      alignItems: 'center',
    },
    mobileMenuToggle: {
      display: isMobile ? 'flex' : 'none',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.5rem',
      width: '2.5rem',
      height: '2.5rem',
      zIndex: 1001,
      transition: 'all 0.3s ease',
    },
    hamburgerLine: {
      width: '20px',
      height: '2px',
      backgroundColor: colors.rubyRed,
      borderRadius: '2px',
      transition: 'all 0.3s ease',
      transformOrigin: 'center',
    },
    hamburgerLineFirst: {
      marginBottom: '4px',
      transform: mobileMenuOpen ? 'translateY(6px) rotate(45deg)' : 'translateY(0) rotate(0)',
    },
    hamburgerLineSecond: {
      opacity: mobileMenuOpen ? 0 : 1,
    },
    hamburgerLineThird: {
      marginTop: '4px',
      transform: mobileMenuOpen ? 'translateY(-6px) rotate(-45deg)' : 'translateY(0) rotate(0)',
    },
    mobileMenu: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem',
      transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
      opacity: mobileMenuOpen ? 1 : 0,
      visibility: mobileMenuOpen ? 'visible' : 'hidden',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      zIndex: 999,
    },
    mobileMenuItem: {
      opacity: mobileMenuOpen ? 1 : 0,
      transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.3s ease',
    },
    link: {
      color: colors.textSecondary,
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: '0.9rem',
      padding: '0.5rem 0',
      transition: 'color 0.2s ease',
      position: 'relative',
    },
    linkHover: {
      color: colors.rubyRed,
    },
    mobileLinkStyle: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: colors.textPrimary,
      padding: '1rem 2rem',
      borderRadius: '12px',
      background: 'transparent',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      minWidth: '200px',
    },
    cta: {
      background: colors.rubyRed,
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      fontWeight: 600,
      transition: 'all 0.2s ease',
      boxShadow: shadows.sm,
    },
    ctaHover: {
      background: colors.rubyRedDark,
      transform: 'translateY(-1px)',
      boxShadow: shadows.md,
    },
    mobileCta: {
      background: colors.rubyRed,
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '12px',
      fontWeight: 600,
      fontSize: '1.2rem',
      minWidth: '200px',
      textAlign: 'center',
      boxShadow: shadows.md,
      transform: 'scale(1)',
      transition: 'all 0.3s ease',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      opacity: mobileMenuOpen ? 1 : 0,
      visibility: mobileMenuOpen ? 'visible' : 'hidden',
      transition: 'all 0.3s ease',
      zIndex: 998,
    },
  };

  const menuItems = [
    { href: '/examples', label: 'サンプル', delay: '0.1s', isCta: true },
  ];

  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.container}>
          <Link href="/" style={styles.logo}>
            <Gem size={20} style={{ marginRight: '0.25rem' }} />
            Ruby Reference
          </Link>
          
          {/* Desktop Menu */}
          <ul style={styles.desktopMenu}>
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  style={{
                    ...styles.link,
                    ...(item.isCta && styles.cta),
                  }}
                  onMouseEnter={(e) => {
                    if (item.isCta) {
                      Object.assign(e.target.style, styles.ctaHover);
                    } else {
                      Object.assign(e.target.style, styles.linkHover);
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (item.isCta) {
                      Object.assign(e.target.style, styles.cta);
                    } else {
                      Object.assign(e.target.style, styles.link);
                    }
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <button style={styles.mobileMenuToggle} onClick={toggleMobileMenu} aria-label="Toggle menu">
            <div style={{...styles.hamburgerLine, ...styles.hamburgerLineFirst}}></div>
            <div style={{...styles.hamburgerLine, ...styles.hamburgerLineSecond}}></div>
            <div style={{...styles.hamburgerLine, ...styles.hamburgerLineThird}}></div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && (
        <div style={styles.overlay} onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      {isMobile && (
        <ul style={styles.mobileMenu}>
          {menuItems.map((item, index) => (
            <li 
              key={item.href} 
              style={{
                ...styles.mobileMenuItem,
                transitionDelay: mobileMenuOpen ? item.delay : '0s',
              }}
            >
              <Link 
                href={item.href} 
                style={{
                  ...styles.mobileLinkStyle,
                  ...(item.isCta && styles.mobileCta),
                }}
                onClick={() => setMobileMenuOpen(false)}
                onMouseEnter={(e) => {
                  if (!item.isCta) {
                    e.target.style.background = 'rgba(220, 38, 38, 0.1)';
                    e.target.style.color = colors.rubyRed;
                  } else {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.background = colors.rubyRedDark;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!item.isCta) {
                    e.target.style.background = 'transparent';
                    e.target.style.color = colors.textPrimary;
                  } else {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.background = colors.rubyRed;
                  }
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Navigation;  