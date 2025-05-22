import { colors, shadows } from '../constants/styles';

const SelectedModal = ({ open, onClose, selected, onRemove, onGenerate, isGenerating }) => {
  if (!open) return null;
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.5)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modal: {
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      maxWidth: '600px',
      width: '90%',
      maxHeight: '80vh',
      overflowY: 'auto',
      boxShadow: shadows.xl,
      position: 'relative',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottom: `1px solid ${colors.borderLight}`,
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: 700,
      color: colors.textPrimary,
    },
    close: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: colors.textTertiary,
      padding: '0.5rem',
      borderRadius: '4px',
      transition: 'all 0.2s ease',
    },
    list: {
      marginBottom: '1.5rem',
    },
    item: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem',
      margin: '0.5rem 0',
      background: colors.bgSecondary,
      border: `1px solid ${colors.borderLight}`,
      borderRadius: '8px',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.9rem',
    },
    remove: {
      background: colors.rubyRed,
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '0.25rem 0.5rem',
      cursor: 'pointer',
      fontSize: '0.75rem',
      fontWeight: 500,
      transition: 'all 0.2s ease',
    },
    generate: {
      width: '100%',
      background: colors.rubyRed,
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: selected.length === 0 || isGenerating ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      marginTop: '1rem',
      opacity: selected.length === 0 || isGenerating ? 0.5 : 1,
    },
    empty: {
      color: colors.textSecondary,
      textAlign: 'center',
      padding: '2rem',
    },
  };
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.header}>
          <h3 style={styles.title}>選択したアイテムで練習問題を生成</h3>
          <button style={styles.close} onClick={onClose}>×</button>
        </div>
        <div style={styles.list}>
          {selected.length === 0 ? (
            <div style={styles.empty}>
              まだアイテムが選択されていません。<br />学習したい構文やメソッドを選択してください。
            </div>
          ) : (
            <>
              <h4 style={{marginBottom: '1rem', color: colors.rubyRed}}>選択されたアイテム ({selected.length}個)</h4>
              {selected.map(item => (
                <div key={item.id} style={styles.item}>
                  <span>{item.name}{item.version ? `（Ruby ${item.version}〜）` : ''}</span>
                  <button style={styles.remove} onClick={() => onRemove(item.id)}>削除</button>
                </div>
              ))}
            </>
          )}
        </div>
        <button
          style={styles.generate}
          disabled={selected.length === 0 || isGenerating}
          onClick={() => selected.length > 0 && !isGenerating && onGenerate()}
        >
          {isGenerating ? '生成中...' : '練習問題を生成する'}
        </button>
      </div>
    </div>
  );
};

export default SelectedModal;      