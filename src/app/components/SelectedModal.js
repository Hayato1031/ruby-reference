import { useState, useEffect } from 'react';
import { colors, shadows } from '../constants/styles';
import { Code, BookOpen, Zap, Info, Loader2, Coffee, Brain, Sparkles } from 'lucide-react';

const SelectedModal = ({ open, onClose, selected, onRemove, onGenerate, isGenerating }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProblemType, setSelectedProblemType] = useState(null);
  const [showTooltip, setShowTooltip] = useState(null);
  const [showMainTooltip, setShowMainTooltip] = useState(false);
  const [animationFrame, setAnimationFrame] = useState(0);
  const [spinAngle, setSpinAngle] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 生成中のアニメーション効果
  useEffect(() => {
    let interval;
    if (isGenerating) {
      interval = setInterval(() => {
        setSpinAngle(prev => (prev + 6) % 360);
        setAnimationFrame(prev => (prev + 1) % 4);
      }, 300); // よりゆっくりとしたアニメーション
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

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
      padding: isMobile ? '1rem' : '2rem',
      boxSizing: 'border-box',
    },
    modal: {
      background: 'white',
      borderRadius: isMobile ? '12px' : '12px',
      padding: isMobile ? '1.5rem' : '2rem',
      maxWidth: isMobile ? 'calc(100vw - 2rem)' : '600px',
      width: isMobile ? 'calc(100vw - 2rem)' : '100%',
      maxHeight: isMobile ? 'calc(100vh - 2rem)' : '80vh',
      overflowY: 'auto',
      boxShadow: shadows.xl,
      position: 'relative',
      boxSizing: 'border-box',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: isMobile ? '1.25rem' : '1.5rem',
      paddingBottom: '1rem',
      borderBottom: `1px solid ${colors.borderLight}`,
    },
    title: {
      fontSize: isMobile ? '1.1rem' : '1.25rem',
      fontWeight: 700,
      color: colors.textPrimary,
      lineHeight: 1.3,
      wordWrap: 'break-word',
      flex: 1,
      marginRight: '1rem',
    },
    close: {
      background: 'none',
      border: 'none',
      fontSize: isMobile ? '1.25rem' : '1.5rem',
      cursor: 'pointer',
      color: colors.textTertiary,
      padding: isMobile ? '0.4rem' : '0.5rem',
      borderRadius: '4px',
      transition: 'all 0.2s ease',
      flexShrink: 0,
    },
    list: {
      marginBottom: isMobile ? '1.25rem' : '1.5rem',
    },
    item: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '0.6rem' : '0.75rem',
      margin: '0.5rem 0',
      background: colors.bgSecondary,
      border: `1px solid ${colors.borderLight}`,
      borderRadius: isMobile ? '6px' : '8px',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: isMobile ? '0.85rem' : '0.9rem',
      gap: '0.5rem',
    },
    itemText: {
      flex: 1,
      wordWrap: 'break-word',
      overflow: 'hidden',
    },
    remove: {
      background: colors.rubyRed,
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: isMobile ? '0.4rem 0.6rem' : '0.25rem 0.5rem',
      cursor: 'pointer',
      fontSize: isMobile ? '0.7rem' : '0.75rem',
      fontWeight: 500,
      transition: 'all 0.2s ease',
      flexShrink: 0,
      minWidth: isMobile ? '36px' : 'auto',
    },
    problemTypeSection: {
      marginBottom: isMobile ? '1.25rem' : '1.5rem',
      padding: isMobile ? '0.8rem' : '1rem',
      background: colors.bgSecondary,
      borderRadius: isMobile ? '6px' : '8px',
      border: `1px solid ${colors.borderLight}`,
    },
    problemTypeTitle: {
      fontSize: isMobile ? '0.95rem' : '1rem',
      fontWeight: 600,
      color: colors.textPrimary,
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      position: 'relative',
    },
    problemTypeOptions: {
      display: 'flex',
      gap: isMobile ? '0.5rem' : '0.75rem',
      flexWrap: 'wrap',
    },
    problemTypeButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: isMobile ? '0.6rem 0.8rem' : '0.75rem 1rem',
      border: `2px solid ${colors.borderLight}`,
      borderRadius: isMobile ? '6px' : '8px',
      background: 'white',
      cursor: 'pointer',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      fontWeight: 500,
      transition: 'all 0.2s ease',
      flex: isMobile ? '1' : '1',
      justifyContent: 'center',
      minWidth: isMobile ? '100px' : '120px',
      textAlign: 'center',
    },
    problemTypeButtonActive: {
      borderColor: colors.rubyRed,
      background: `linear-gradient(135deg, ${colors.rubyRed} 0%, #d73027 100%)`,
      color: 'white',
    },
    generateSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    },
    generate: {
      width: '100%',
      background: `linear-gradient(135deg, ${colors.rubyRed} 0%, #d73027 100%)`,
      color: 'white',
      border: 'none',
      borderRadius: isMobile ? '6px' : '8px',
      padding: isMobile ? '0.8rem 1.2rem' : '0.75rem 1.5rem',
      fontSize: isMobile ? '0.95rem' : '1rem',
      fontWeight: 600,
      cursor: selected.length === 0 || isGenerating || !selectedProblemType ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      opacity: selected.length === 0 || isGenerating || !selectedProblemType ? 0.5 : 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
      minHeight: isMobile ? '48px' : 'auto',
    },
    generateHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(239, 68, 68, 0.4)',
    },
    generateDescription: {
      fontSize: isMobile ? '0.8rem' : '0.85rem',
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 1.4,
    },
    empty: {
      color: colors.textSecondary,
      textAlign: 'center',
      padding: isMobile ? '1.5rem' : '2rem',
      fontSize: isMobile ? '0.9rem' : '1rem',
      lineHeight: 1.6,
    },
    selectedHeader: {
      marginBottom: '1rem',
      color: colors.rubyRed,
      fontSize: isMobile ? '0.95rem' : '1rem',
      fontWeight: 600,
    },
    tooltip: {
      position: 'absolute',
      top: '-3.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#1f2937',
      color: 'white',
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      fontSize: '0.85rem',
      lineHeight: 1.4,
      maxWidth: '280px',
      zIndex: 1000,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      whiteSpace: 'pre-line',
      textAlign: 'left',
    },
    tooltipArrow: {
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 0,
      height: 0,
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderTop: '6px solid #1f2937',
    },
    problemTypeButtonContainer: {
      position: 'relative',
      flex: isMobile ? '1' : '1',
    },
    // 問題タイプセクション用の大きなツールチップ
    mainTooltip: {
      position: 'absolute',
      top: '100%',
      left: '0',
      right: '0',
      background: '#1f2937',
      color: 'white',
      padding: '1.25rem',
      borderRadius: '8px',
      fontSize: '0.9rem',
      lineHeight: 1.5,
      zIndex: 1000,
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
      marginTop: '0.5rem',
      textAlign: 'left',
    },
    generatingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.02) 40%, rgba(255, 255, 255, 0.98) 70%),
        linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)
      `,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      zIndex: 1000,
      borderRadius: isMobile ? '12px' : '12px',
      backdropFilter: 'blur(12px) saturate(180%)',
      boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.3)',
      overflow: 'hidden',
    },
    generatingIcon: {
      marginBottom: '1.5rem',
      transform: `rotate(${spinAngle}deg)`,
      transition: 'transform 0.3s ease-out',
      position: 'relative',
      display: 'inline-block',
      padding: isMobile ? '1rem' : '1.5rem',
      background: colors.rubyRed,
      borderRadius: '50%',
      boxShadow: `0 4px 12px rgba(239, 68, 68, 0.3)`,
    },
    generatingIconInner: {
      background: 'white',
      borderRadius: '50%',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: colors.rubyRed,
    },
    generatingTitle: {
      fontSize: isMobile ? '1.4rem' : '1.8rem',
      fontWeight: 800,
      color: colors.rubyRed,
      marginBottom: '1rem',
      background: `linear-gradient(135deg, ${colors.rubyRed} 0%, #ff6b6b 50%, #e15759 100%)`,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: 'none',
    },
    generatingDescription: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      color: colors.textSecondary,
      lineHeight: 1.6,
      marginBottom: '1.5rem',
      fontWeight: 500,
    },
    loadingDots: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.2rem',
    },
    dot: {
      width: '0.5rem',
      height: '0.5rem',
      background: colors.rubyRed,
      borderRadius: '50%',
      animation: 'blink 1s infinite',
    },
  };

  const handleProblemTypeClick = (type) => {
    setSelectedProblemType(type);
  };

  const handleGenerate = () => {
    if (!selectedProblemType) {
      alert('問題のタイプを選択してください。');
      return;
    }
    
    onGenerate(selectedProblemType);
  };

  // 問題タイプの説明テキスト
  const problemTypeDescriptions = {
    code: '技術重視の問題形式\n\n• 具体的な配列やハッシュを使用\n• プログラミングスキルに集中\n• 実際の開発現場で使われる技術的な処理\n\n例：配列[1,2,3,4,5]から偶数を抽出',
    story: '日常シナリオ重視の問題形式\n\n• 人物（太郎、花子など）が登場\n• 日常生活や学校・職場での場面\n• 実用的で親しみやすい内容\n\n例：花子さんが買い物リストを整理',
    mixed: '技術とストーリーの組み合わせ\n\n• 人物と具体的なデータの両方を使用\n• バランスの取れた学習アプローチ\n• 幅広い場面での応用力を養成\n\n例：太郎くんが成績データを分析'
  };

  // 全体説明テキスト
  const mainTooltipContent = `💻 コード：技術重視の問題形式
  • 具体的な配列やハッシュを使用
  • プログラミングスキルに集中
  
📖 ストーリー：日常シナリオ重視の問題形式
  • 人物（太郎、花子など）が登場
  • 日常生活や学校・職場での場面
  
⚡ ミックス：技術とストーリーの組み合わせ
  • 人物と具体的なデータの両方を使用
  • バランスの取れた学習アプローチ
  
問題タイプを選択して、あなたに最適な学習スタイルを見つけましょう！`;

  // ツールチップ表示制御
  const handleTooltipShow = (type) => {
    if (!isMobile) {
      setShowTooltip(type);
    }
  };

  const handleTooltipHide = () => {
    setShowTooltip(null);
  };

  // 問題タイプボタンのスタイルを取得する関数
  const getProblemTypeButtonStyle = (type) => {
    const baseStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: isMobile ? '0.6rem 0.8rem' : '0.75rem 1rem',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: colors.borderLight,
      borderRadius: isMobile ? '6px' : '8px',
      background: 'white',
      cursor: 'pointer',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      fontWeight: 500,
      transition: 'all 0.2s ease',
      flex: isMobile ? '1' : '1',
      justifyContent: 'center',
      minWidth: isMobile ? '100px' : '120px',
      textAlign: 'center',
    };

    if (selectedProblemType === type) {
      return {
        ...baseStyle,
        borderColor: colors.rubyRed,
        background: `linear-gradient(135deg, ${colors.rubyRed} 0%, #d73027 100%)`,
        color: 'white',
      };
    }

    return baseStyle;
  };

  // 生成中のアニメーション用スタイル
  const getLoadingAnimationStyles = () => ({
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(255, 255, 255, 0.95)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      borderRadius: isMobile ? '12px' : '12px',
      backdropFilter: 'blur(8px)',
    },
    loadingContent: {
      textAlign: 'center',
      maxWidth: '80%',
    },
    loadingTitle: {
      fontSize: isMobile ? '1.2rem' : '1.4rem',
      fontWeight: 700,
      color: colors.rubyRed,
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
    },
    loadingSteps: {
      fontSize: isMobile ? '0.9rem' : '1rem',
      color: colors.textSecondary,
      lineHeight: 1.6,
      marginBottom: '1.5rem',
    },
    loadingBar: {
      width: '100%',
      height: '8px',
      background: colors.borderLight,
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: '1rem',
    },
    loadingBarFill: {
      height: '100%',
      background: `linear-gradient(135deg, ${colors.rubyRed} 0%, #d73027 100%)`,
      borderRadius: '4px',
      transition: 'width 0.8s ease',
      width: `${(animationFrame + 1) * 25}%`,
    },
    loadingIcon: {
      animation: 'spin 1s linear infinite',
      marginRight: '0.5rem',
    },
    floatingIcons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginTop: '1rem',
    },
    floatingIcon: {
      transform: `translateY(${Math.sin((animationFrame + 1) * 0.5) * 8}px)`,
      transition: 'transform 0.3s ease',
      opacity: 0.7,
    }
  });

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={{...styles.modal, position: 'relative'}} onClick={e => e.stopPropagation()}>
        {/* 生成中のオーバーレイ */}
        {isGenerating && (
          <div style={styles.generatingOverlay}>
            <div style={styles.generatingIcon}>
              <div style={styles.generatingIconInner}>
                <Loader2 size={isMobile ? 24 : 32} />
              </div>
            </div>
            
            <h3 style={styles.generatingTitle}>
              AI問題生成中
            </h3>
            
            <p style={styles.generatingDescription}>
              選択した構文を使った練習問題を生成しています...
            </p>
            
            <div style={styles.loadingDots}>
              <div style={{...styles.dot, animationDelay: '0s'}}></div>
              <div style={{...styles.dot, animationDelay: '0.2s'}}></div>
              <div style={{...styles.dot, animationDelay: '0.4s'}}></div>
            </div>
          </div>
        )}

        <div style={styles.header}>
          <h3 style={styles.title}>選択したアイテムで練習問題を生成</h3>
          <button 
            style={styles.close} 
            onClick={onClose}
            aria-label="モーダルを閉じる"
          >×</button>
        </div>
        <div style={styles.list}>
          {selected.length === 0 ? (
            <div style={styles.empty}>
              まだアイテムが選択されていません。<br />学習したい構文やメソッドを選択してください。
            </div>
          ) : (
            <>
              <h4 style={styles.selectedHeader}>選択されたアイテム ({selected.length}個)</h4>
              {selected.map((item, index) => (
                <div key={item.id || index} style={styles.item}>
                  <div style={styles.itemText}>
                    <strong>{item.name}</strong>
                    {item.description && (
                      <div style={{ 
                        fontSize: isMobile ? '0.75rem' : '0.8rem', 
                        color: colors.textSecondary, 
                        marginTop: '0.25rem',
                        lineHeight: 1.4,
                      }}>
                        {item.description}
                      </div>
                    )}
                  </div>
                  <button 
                    style={styles.remove} 
                    onClick={() => onRemove(item.id)}
                    aria-label={`${item.name}を削除`}
                  >
                    {isMobile ? '×' : '削除'}
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {selected.length > 0 && (
          <>
            <div style={styles.problemTypeSection}>
              <div style={styles.problemTypeTitle}>
                問題のタイプを選択
                <Info 
                  size={16} 
                  style={{ 
                    cursor: 'pointer', 
                    color: colors.textSecondary,
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={() => {
                    if (!isMobile) {
                      setShowMainTooltip(true);
                    }
                  }}
                  onMouseLeave={() => setShowMainTooltip(false)}
                />
                {showMainTooltip && (
                  <div style={styles.mainTooltip}>
                    {mainTooltipContent}
                  </div>
                )}
              </div>
              <div style={styles.problemTypeOptions}>
                <div style={styles.problemTypeButtonContainer}>
                  <button
                    style={getProblemTypeButtonStyle('code')}
                    onClick={() => handleProblemTypeClick('code')}
                  >
                    <Code size={isMobile ? 14 : 16} />
                    コード
                  </button>
                </div>
                
                <div style={styles.problemTypeButtonContainer}>
                  <button
                    style={getProblemTypeButtonStyle('story')}
                    onClick={() => handleProblemTypeClick('story')}
                  >
                    <BookOpen size={isMobile ? 14 : 16} />
                    ストーリー
                  </button>
                </div>
                
                <div style={styles.problemTypeButtonContainer}>
                  <button
                    style={getProblemTypeButtonStyle('mixed')}
                    onClick={() => handleProblemTypeClick('mixed')}
                  >
                    <Zap size={isMobile ? 14 : 16} />
                    ミックス
                  </button>
                </div>
              </div>
            </div>

            <div style={styles.generateSection}>
              <button
                style={styles.generate}
                disabled={selected.length === 0 || isGenerating || !selectedProblemType}
                onClick={handleGenerate}
                onMouseEnter={(e) => {
                  if (!isGenerating && selected.length > 0 && selectedProblemType && !isMobile) {
                    Object.assign(e.target.style, styles.generateHover);
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    Object.assign(e.target.style, styles.generate);
                  }
                }}
                aria-label="練習問題を生成する"
              >
                <Zap size={isMobile ? 16 : 18} />
                {isGenerating ? '生成中...' : '練習問題を生成する'}
              </button>
              <div style={styles.generateDescription}>
                選択した構文・メソッドを使った実践的な練習問題を生成します
              </div>
            </div>
          </>
        )}
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes blink {
          0%, 20% { opacity: 0.3; }
          50% { opacity: 1; }
          80%, 100% { opacity: 0.3; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SelectedModal;      