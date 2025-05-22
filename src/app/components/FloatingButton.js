import { colors, shadows } from '../constants/styles';

const FloatingButton = ({ count, onClick }) => {
  const styles = {
    button: {
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      width: '56px',
      height: '56px',
      background: colors.rubyRed,
      border: 'none',
      borderRadius: '50%',
      boxShadow: shadows.lg,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      color: 'white',
      zIndex: 999,
    },
    count: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      background: '#059669',
      color: 'white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      fontWeight: 600,
    },
  };
  return (
    <button style={styles.button} onClick={onClick} aria-label="選択リスト">
      🚀
      {count > 0 && <span style={styles.count}>{count}</span>}
    </button>
  );
};

export default FloatingButton; 