import Link from 'next/link';
import { colors, shadows, fontFamily } from '../constants/styles';

const Navigation = () => {
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
    },
    menu: {
      display: 'flex',
      listStyle: 'none',
      gap: '2rem',
      margin: 0,
      padding: 0,
      alignItems: 'center',
    },
    link: {
      color: colors.textSecondary,
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: '0.9rem',
      padding: '0.5rem 0',
      transition: 'color 0.2s ease',
      '&:hover': {
        color: colors.rubyRed,
      },
    },
    cta: {
      background: colors.rubyRed,
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      fontWeight: 600,
      transition: 'all 0.2s ease',
      '&:hover': {
        background: colors.rubyRedDark,
        transform: 'translateY(-1px)',
      },
    },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link href="/" style={styles.logo}>
          Ruby Reference
        </Link>
        <ul style={styles.menu}>
          <li>
            <Link href="/docs" style={styles.link}>
              ドキュメント
            </Link>
          </li>
          <li>
            <Link href="/examples" style={styles.link}>
              サンプル
            </Link>
          </li>
          <li>
            <Link href="/contribute" style={styles.cta}>
              貢献する
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation; 