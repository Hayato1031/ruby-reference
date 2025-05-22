"use client";

import MethodCard from './MethodCard';
import { colors, shadows } from '../constants/styles';

const MethodGrid = ({ methods, selectedIds, onSelect, onDeselect }) => {
  const styles = {
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '1.5rem',
      marginTop: '2rem',
    },
    floatingButton: {
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
      '&:hover': {
        background: colors.rubyRedDark,
        transform: 'scale(1.1)',
      },
    },
    selectedCount: {
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
    <div>
      <div style={styles.grid}>
        {methods.map((method) => (
          <MethodCard
            key={method.id}
            {...method}
            isSelected={selectedIds.has(method.id)}
            onSelect={() =>
              selectedIds.has(method.id)
                ? onDeselect(method.id)
                : onSelect(method.id)
            }
          />
        ))}
      </div>
      {selectedIds.size > 0 && (
        <button style={styles.floatingButton}>
          <span style={styles.selectedCount}>{selectedIds.size}</span>
          ✓
        </button>
      )}
    </div>
  );
};

export default MethodGrid; 