import { colors, shadows, fontFamily } from '../constants/styles';

const MethodCard = ({ name, description, example, isSelected, onSelect, version }) => {
  const styles = {
    card: {
      background: colors.bgSecondary,
      border: `1px solid ${isSelected ? colors.rubyRed : colors.borderLight}`,
      borderRadius: '12px',
      padding: '1.5rem',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      position: 'relative',
      backgroundColor: isSelected ? 'rgba(220, 38, 38, 0.05)' : colors.bgSecondary,
      '&:hover': {
        borderColor: colors.rubyRed,
        boxShadow: shadows.md,
      },
    },
    name: {
      fontFamily: fontFamily.mono,
      fontSize: '1.1rem',
      fontWeight: 600,
      color: colors.rubyRed,
      marginBottom: '0.5rem',
    },
    description: {
      color: colors.textSecondary,
      marginBottom: '1rem',
      fontSize: '0.9rem',
      lineHeight: 1.5,
    },
    example: {
      background: colors.bgPrimary,
      border: `1px solid ${colors.borderLight}`,
      borderRadius: '8px',
      padding: '1rem',
      fontFamily: fontFamily.mono,
      fontSize: '0.85rem',
      color: colors.textPrimary,
      whiteSpace: 'pre-wrap',
      overflowX: 'auto',
    },
    checkbox: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      width: '20px',
      height: '20px',
      border: `2px solid ${isSelected ? colors.rubyRed : colors.borderMedium}`,
      borderRadius: '4px',
      background: isSelected ? colors.rubyRed : colors.bgPrimary,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&::after': isSelected ? {
        content: '"✓"',
        color: 'white',
        fontSize: '12px',
        fontWeight: 'bold',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      } : {},
    },
    version: {
      marginTop: '0.75rem',
      fontSize: '0.8rem',
      color: colors.textTertiary,
      fontFamily: fontFamily.mono,
      textAlign: 'right',
    },
  };

  return (
    <div style={styles.card} onClick={onSelect}>
      <div style={styles.checkbox} />
      <h3 style={styles.name}>{name}</h3>
      <p style={styles.description}>{description}</p>
      <pre style={styles.example}>{example}</pre>
      {version && (
        <div style={styles.version}>Ruby {version}〜</div>
      )}
    </div>
  );
};

export default MethodCard; 