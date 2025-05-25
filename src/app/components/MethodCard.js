import { colors, shadows, fontFamily } from '../constants/styles';
import { Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import highlightRubyCode from '../utils/syntaxHighlight';

const MethodCard = ({ name, description, example, isSelected, onSelect, version, detailedDescription, syntax, parameters, returnValue }) => {
  const [showModal, setShowModal] = useState(false);

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
      display: 'flex',
      flexDirection: 'column',
      minHeight: '280px',
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
      background: '#1e1e1e',
      border: `1px solid ${colors.borderLight}`,
      borderRadius: '8px',
      padding: '1rem',
      fontFamily: fontFamily.mono,
      fontSize: '0.85rem',
      color: '#f8f8f2',
      whiteSpace: 'pre',
      overflowX: 'auto',
      margin: 0,
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardContent: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
    },
    version: {
      marginTop: 'auto',
      marginBottom: '0.5rem',
      fontSize: '0.8rem',
      color: colors.textTertiary,
      fontFamily: fontFamily.mono,
      textAlign: 'right',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '0.5rem',
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '2rem',
    },
    modalContent: {
      background: colors.bgPrimary,
      borderRadius: '12px',
      padding: '2rem',
      maxWidth: '800px',
      maxHeight: '90vh',
      overflow: 'auto',
      width: '100%',
      position: 'relative',
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottom: `1px solid ${colors.borderLight}`,
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: colors.textSecondary,
      padding: '0.5rem',
    },
    modalSection: {
      marginBottom: '1.5rem',
    },
    modalSectionTitle: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: colors.textPrimary,
      marginBottom: '0.75rem',
    },
    modalExample: {
      background: '#1e1e1e',
      border: `1px solid ${colors.borderLight}`,
      borderRadius: '8px',
      padding: '1.5rem',
      fontFamily: fontFamily.mono,
      fontSize: '0.9rem',
      color: '#f8f8f2',
      whiteSpace: 'pre',
      overflowX: 'auto',
      margin: 0,
      lineHeight: 1.5,
    },
    viewDetailsButton: {
      background: 'none',
      border: 'none',
      color: colors.rubyRed,
      cursor: 'pointer',
      fontSize: '0.8rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      padding: '0.5rem 0.75rem',
      borderRadius: '6px',
      transition: 'all 0.2s ease',
      alignSelf: 'flex-end',
    },
  };

  return (
    <>
      <div style={styles.card}>
        <div 
          style={styles.checkbox}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          {isSelected && <Check size={12} color="white" />}
        </div>
        <div style={styles.cardContent}>
          <h3 style={styles.name}>{name}</h3>
          <p style={styles.description}>{description}</p>
          <pre 
            style={styles.example}
            dangerouslySetInnerHTML={{
              __html: highlightRubyCode(example)
            }}
          />
          {version && (
            <div style={styles.version}>Ruby {version}〜</div>
          )}
        </div>
        <div style={styles.buttonContainer}>
          <button 
            style={styles.viewDetailsButton}
            onClick={() => setShowModal(true)}
            onMouseEnter={(e) => e.target.style.background = 'rgba(220, 38, 38, 0.1)'}
            onMouseLeave={(e) => e.target.style.background = 'none'}
          >
            詳細 <ExternalLink size={12} />
          </button>
        </div>
      </div>

      {showModal && (
        <div style={styles.modal} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={{ ...styles.name, fontSize: '1.5rem', marginBottom: 0 }}>{name}</h2>
              <button style={styles.closeButton} onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            
            <div style={styles.modalSection}>
              <h3 style={styles.modalSectionTitle}>概要</h3>
              <p style={{ color: colors.textSecondary, lineHeight: 1.6 }}>
                {detailedDescription || description}
              </p>
            </div>

            {syntax && (
              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>構文</h3>
                <pre style={styles.modalExample}>
                  <code dangerouslySetInnerHTML={{ __html: highlightRubyCode(syntax) }} />
                </pre>
              </div>
            )}

            {parameters && (
              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>パラメータ</h3>
                <p style={{ color: colors.textSecondary, lineHeight: 1.6 }}>{parameters}</p>
              </div>
            )}

            <div style={styles.modalSection}>
              <h3 style={styles.modalSectionTitle}>使用例</h3>
              <pre style={styles.modalExample}>
                <code dangerouslySetInnerHTML={{ __html: highlightRubyCode(example) }} />
              </pre>
            </div>

            {returnValue && (
              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>戻り値</h3>
                <p style={{ color: colors.textSecondary, lineHeight: 1.6 }}>{returnValue}</p>
              </div>
            )}

            {version && (
              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>対応バージョン</h3>
                <p style={{ color: colors.textTertiary, fontFamily: fontFamily.mono }}>
                  Ruby {version}〜
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MethodCard; 