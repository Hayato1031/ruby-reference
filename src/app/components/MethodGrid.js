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
    </div>
  );
};

export default MethodGrid; 