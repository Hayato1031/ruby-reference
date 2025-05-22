import Link from 'next/link';
import { colors, gradients, fontFamily } from '../constants/styles';

const Hero = () => {
  const styles = {
    header: {
      background: gradients.background,
      padding: '8rem 2rem 4rem',
      textAlign: 'center',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      maxWidth: '800px',
      width: '100%',
    },
    badge: {
      display: 'inline-block',
      background: 'rgba(220, 38, 38, 0.1)',
      color: colors.rubyRed,
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: 600,
      marginBottom: '2rem',
    },
    title: {
      fontSize: 'clamp(3rem, 6vw, 5rem)',
      fontWeight: 800,
      color: colors.textPrimary,
      marginBottom: '1.5rem',
      lineHeight: 1.1,
    },
    rubyText: {
      color: colors.rubyRed,
    },
    subtitle: {
      fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
      color: colors.textSecondary,
      marginBottom: '3rem',
      lineHeight: 1.5,
    },
    ctaContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginBottom: '4rem',
    },
    ctaButton: {
      padding: '0.75rem 2rem',
      borderRadius: '8px',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.2s ease',
      fontSize: '1rem',
    },
    primaryCta: {
      background: colors.rubyRed,
      color: 'white',
      '&:hover': {
        background: colors.rubyRedDark,
        transform: 'translateY(-2px)',
      },
    },
    secondaryCta: {
      background: 'transparent',
      color: colors.textPrimary,
      border: `2px solid ${colors.borderMedium}`,
      '&:hover': {
        borderColor: colors.rubyRed,
        color: colors.rubyRed,
      },
    },
    stats: {
      display: 'flex',
      justifyContent: 'center',
      gap: '4rem',
      marginTop: '3rem',
    },
    statItem: {
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: 800,
      color: colors.rubyRed,
      display: 'block',
    },
    statLabel: {
      fontSize: '0.9rem',
      color: colors.textTertiary,
      fontWeight: 500,
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.content}>
        <span style={styles.badge}>完全無料</span>
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
          <Link href="/docs" style={{ ...styles.ctaButton, ...styles.primaryCta }}>
            ドキュメントを見る
          </Link>
          <Link href="/examples" style={{ ...styles.ctaButton, ...styles.secondaryCta }}>
            サンプルコードを見る
          </Link>
        </div>
        <div style={styles.stats}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>434</span>
            <span style={styles.statLabel}>メソッド解説</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>434+</span>
            <span style={styles.statLabel}>コード例</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>91</span>
            <span style={styles.statLabel}>構文解説</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;  