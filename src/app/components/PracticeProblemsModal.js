"use client";

import { useState, useEffect } from 'react';
import { colors, shadows } from '../constants/styles';
import { 
  Gem, 
  X, 
  FileText, 
  Settings, 
  Lightbulb, 
  Eye, 
  EyeOff,
  Target,
  Code,
  BookOpen,
  Star
} from 'lucide-react';
import highlightRubyCode from '../utils/syntaxHighlight';

const PracticeProblemsModal = ({ open, onClose, problems }) => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [showAnswers, setShowAnswers] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  // HTMLエンティティをデコードする関数
  const decodeHTMLEntities = (text) => {
    if (!text) return '';
    
    // まず基本的なHTMLエンティティをデコード
    let decoded = text
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, '/')
      .replace(/&#x60;/g, '`')
      .replace(/&apos;/g, "'");
    
    // ブラウザのDOMを使用した完全なデコード
    try {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = decoded;
      return textarea.value;
    } catch (e) {
      console.warn('HTML entity decoding failed, using fallback', e);
      return decoded;
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (open) {
      setCurrentProblemIndex(0);
      setShowAnswers({});
    }
  }, [open]);

  if (!open || !problems || problems.length === 0) return null;

  const currentProblem = problems[currentProblemIndex];

  const nextProblem = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
    }
  };

  const prevProblem = () => {
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex(currentProblemIndex - 1);
    }
  };

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.6)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(4px)',
      padding: isMobile ? '1rem' : '2rem',
      boxSizing: 'border-box',
    },
    modal: {
      background: 'white',
      borderRadius: isMobile ? '12px' : '16px',
      padding: '0',
      maxWidth: isMobile ? 'calc(100vw - 2rem)' : '900px',
      width: isMobile ? 'calc(100vw - 2rem)' : '100%',
      maxHeight: isMobile ? 'calc(100vh - 2rem)' : '90vh',
      overflowY: 'auto',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      position: 'relative',
      border: `1px solid ${colors.borderLight}`,
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '1.25rem 1.25rem 1rem 1.25rem' : '2rem 2rem 1rem 2rem',
      marginBottom: '0',
      borderBottom: `2px solid ${colors.borderLight}`,
      background: `linear-gradient(135deg, ${colors.bgPrimary} 0%, #f8f9fa 100%)`,
      borderRadius: `${isMobile ? '12px' : '16px'} ${isMobile ? '12px' : '16px'} 0 0`,
      flexShrink: 0,
    },
    title: {
      fontSize: isMobile ? '1.3rem' : '1.75rem',
      fontWeight: 800,
      color: colors.textPrimary,
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '0.5rem' : '0.75rem',
    },
    close: {
      background: 'rgba(239, 68, 68, 0.1)',
      border: 'none',
      fontSize: isMobile ? '1rem' : '1.25rem',
      cursor: 'pointer',
      color: '#ef4444',
      padding: isMobile ? '0.6rem' : '0.75rem',
      borderRadius: '50%',
      transition: 'all 0.2s ease',
      width: isMobile ? '36px' : '44px',
      height: isMobile ? '36px' : '44px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    closeHover: {
      background: 'rgba(239, 68, 68, 0.2)',
      transform: 'scale(1.1)',
    },
    content: {
      padding: isMobile ? '1rem 1.25rem 1.25rem 1.25rem' : '1.5rem 2rem 2rem 2rem',
      flex: 1,
      overflowY: 'auto',
    },
    problemContainer: {
      marginBottom: isMobile ? '1.75rem' : '2.5rem',
      padding: '0',
      border: `2px solid ${colors.borderLight}`,
      borderRadius: isMobile ? '8px' : '12px',
      background: 'white',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.2s ease',
    },
    problemHeader: {
      background: `linear-gradient(135deg, ${colors.rubyRed} 0%, #d73027 100%)`,
      color: 'white',
      padding: isMobile ? '1rem 1.25rem' : '1.25rem 1.5rem',
      margin: 0,
    },
    problemTitle: {
      fontSize: isMobile ? '1.05rem' : '1.3rem',
      fontWeight: 700,
      margin: 0,
      lineHeight: 1.3,
      wordWrap: 'break-word',
    },
    problemType: {
      fontSize: isMobile ? '0.8rem' : '0.85rem',
      opacity: 0.9,
      marginTop: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    problemBody: {
      padding: isMobile ? '1.25rem 1.25rem' : '1.5rem',
    },
    section: {
      marginBottom: isMobile ? '1.5rem' : '2rem',
    },
    sectionTitle: {
      fontSize: isMobile ? '0.95rem' : '1.1rem',
      fontWeight: 700,
      color: colors.textPrimary,
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: isMobile ? '0.4rem 0.6rem' : '0.5rem 0.75rem',
      background: `linear-gradient(135deg, ${colors.bgSecondary} 0%, #f1f5f9 100%)`,
      borderRadius: isMobile ? '6px' : '8px',
      border: `1px solid ${colors.borderLight}`,
    },
    sectionContent: {
      color: colors.textSecondary,
      lineHeight: 1.8,
      fontSize: isMobile ? '0.9rem' : '1rem',
      marginTop: '1rem',
      wordWrap: 'break-word',
    },
    objectiveContent: {
      background: 'linear-gradient(135deg, #fef3e2 0%, #fed7aa 100%)',
      border: '2px solid #fb923c',
      borderRadius: isMobile ? '8px' : '12px',
      padding: isMobile ? '0.8rem' : '1rem',
      color: '#ea580c',
      fontWeight: '600',
      marginTop: '0.75rem',
      fontSize: isMobile ? '0.85rem' : '1rem',
      lineHeight: 1.6,
    },
    codeBlock: {
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      color: '#e2e8f0',
      border: '1px solid #475569',
      borderRadius: isMobile ? '6px' : '8px',
      padding: isMobile ? '0.9rem' : '1.25rem',
      fontFamily: 'JetBrains Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
      fontSize: isMobile ? '0.75rem' : '0.9rem',
      overflow: 'auto',
      margin: '1rem 0',
      position: 'relative',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      lineHeight: 1.5,
    },
    codeBlockBefore: {
      content: '"Ruby"',
      position: 'absolute',
      top: '0.4rem',
      right: '0.6rem',
      fontSize: '0.65rem',
      color: '#94a3b8',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      fontWeight: '600',
    },
    syntaxList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: isMobile ? '0.4rem' : '0.5rem',
      marginTop: '0.75rem',
    },
    syntaxTag: {
      background: `linear-gradient(135deg, ${colors.rubyRed} 0%, #d73027 100%)`,
      color: 'white',
      padding: isMobile ? '0.3rem 0.6rem' : '0.4rem 0.8rem',
      borderRadius: '20px',
      fontSize: isMobile ? '0.75rem' : '0.85rem',
      fontFamily: 'JetBrains Mono, monospace',
      fontWeight: '600',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      wordBreak: 'break-all',
    },
    answerButton: {
      background: `linear-gradient(135deg, ${colors.rubyRed} 0%, #d73027 100%)`,
      border: 'none',
      color: 'white',
      borderRadius: isMobile ? '6px' : '8px',
      padding: isMobile ? '0.7rem 1.2rem' : '0.75rem 1.5rem',
      cursor: 'pointer',
      fontSize: isMobile ? '0.9rem' : '0.95rem',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      marginBottom: '1rem',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      width: isMobile ? '100%' : 'auto',
      justifyContent: 'center',
    },
    answerButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(239, 68, 68, 0.4)',
    },
    answerContent: {
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      border: '2px solid #0ea5e9',
      borderRadius: isMobile ? '8px' : '12px',
      padding: isMobile ? '1.25rem 1.25rem' : '1.5rem',
      color: colors.textPrimary,
      lineHeight: 1.8,
      fontSize: isMobile ? '0.9rem' : '1rem',
      position: 'relative',
      overflow: 'hidden',
      animation: 'fadeInUp 0.3s ease-out',
      wordWrap: 'break-word',
    },
    answerContentBefore: {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      height: '4px',
      background: 'linear-gradient(90deg, #0ea5e9, #06b6d4, #0ea5e9)',
      borderRadius: `${isMobile ? '8px' : '12px'} ${isMobile ? '8px' : '12px'} 0 0`,
    },
    noProblems: {
      textAlign: 'center',
      color: colors.textSecondary,
      padding: isMobile ? '2rem 1rem' : '3rem 2rem',
      fontSize: isMobile ? '1rem' : '1.1rem',
    },
    problemNumber: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      width: isMobile ? '24px' : '28px',
      height: isMobile ? '24px' : '28px',
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      fontWeight: '700',
      marginRight: isMobile ? '0.5rem' : '0.75rem',
      flexShrink: 0,
    },
  };

  const formatContent = (content) => {
    if (!content) return '';
    
    // 改行文字を正規化し、HTMLエンティティをデコード
    const normalizedContent = decodeHTMLEntities(content.replace(/\\n/g, '\n').replace(/\r\n/g, '\n'));
    
    // コンテンツを行ごとに分析し、コードブロックと解説を分離
    const lines = normalizedContent.split('\n');
    const elements = [];
    let currentCodeBlock = '';
    let currentText = '';
    let inCodeBlock = false;
    let isRubyCode = false;
    
    // セクション識別パターン
    const sectionPatterns = {
      '【解答コード】': { color: '#059669', bgColor: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', borderColor: '#16a34a' },
      '【ステップバイステップ解説】': { color: '#7c3aed', bgColor: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', borderColor: '#8b5cf6' },
      '【実行例】': { color: '#ea580c', bgColor: 'linear-gradient(135度, #fff7ed 0%, #fed7aa 100%)', borderColor: '#f97316' },
      '【解説】': { color: '#0891b2', bgColor: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', borderColor: '#06b6d4' },
      'ステップバイステップ解説': { color: '#7c3aed', bgColor: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', borderColor: '#8b5cf6' },
      '実行例': { color: '#ea580c', bgColor: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)', borderColor: '#f97316' },
      '解説': { color: '#0891b2', bgColor: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', borderColor: '#06b6d4' },
      '解答コード': { color: '#059669', bgColor: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', borderColor: '#16a34a' }
    };
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // コードブロックの開始/終了を検出
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          // コードブロック開始
          if (currentText.trim()) {
            elements.push({ type: 'text', content: currentText.trim() });
            currentText = '';
          }
          inCodeBlock = true;
          isRubyCode = line.includes('ruby');
          currentCodeBlock = '';
        } else {
          // コードブロック終了
          if (currentCodeBlock.trim()) {
            elements.push({ 
              type: 'code', 
              content: currentCodeBlock.trim(),
              language: isRubyCode ? 'ruby' : ''
            });
          }
          currentCodeBlock = '';
          inCodeBlock = false;
          isRubyCode = false;
        }
      } else if (inCodeBlock) {
        // コードブロック内
        currentCodeBlock += (currentCodeBlock ? '\n' : '') + line;
      } else {
        // セクション開始の検出
        const sectionMatch = Object.keys(sectionPatterns).find(pattern => line.trim().startsWith(pattern));
        if (sectionMatch) {
          // 既存のテキストがあれば追加
          if (currentText.trim()) {
            elements.push({ type: 'text', content: currentText.trim() });
            currentText = '';
          }
          // セクション開始
          elements.push({ 
            type: 'section_start', 
            sectionName: sectionMatch,
            style: sectionPatterns[sectionMatch]
          });
          // セクション名以降のコンテンツを取得
          const sectionContent = line.replace(sectionMatch, '').replace(/^[：:]\s*/, '').trim();
          if (sectionContent) {
            currentText = sectionContent;
          }
        } else {
          // コロン付きのセクションを検出
          const colonMatch = Object.keys(sectionPatterns).find(pattern => 
            line.trim().startsWith(pattern + ':') || line.trim().startsWith(pattern + '：')
          );
          if (colonMatch) {
            // 既存のテキストがあれば追加
            if (currentText.trim()) {
              elements.push({ type: 'text', content: currentText.trim() });
              currentText = '';
            }
            // セクション開始
            elements.push({ 
              type: 'section_start', 
              sectionName: colonMatch,
              style: sectionPatterns[colonMatch]
            });
            // セクション名以降のコンテンツを取得
            const sectionContent = line.replace(new RegExp(`^${colonMatch}[：:]\\s*`), '').trim();
            if (sectionContent) {
              currentText = sectionContent;
            }
          } else {
            // 通常のテキスト
            currentText += (currentText ? '\n' : '') + line;
          }
        }
      }
    }
    
    // 残りのコンテンツを処理
    if (currentText.trim()) {
      elements.push({ type: 'text', content: currentText.trim() });
    }
    if (currentCodeBlock.trim() && inCodeBlock) {
      elements.push({ 
        type: 'code', 
        content: currentCodeBlock.trim(),
        language: isRubyCode ? 'ruby' : ''
      });
    }
    
    // JSXに変換
    return elements.map((element, index) => {
      if (element.type === 'section_start') {
        return (
          <div key={index} style={{
            margin: '1.5rem 0 0.5rem 0',
            padding: isMobile ? '0.8rem 1rem' : '1rem 1.25rem',
            background: element.style.bgColor,
            border: `2px solid ${element.style.borderColor}`,
            borderRadius: isMobile ? '8px' : '10px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              color: element.style.color,
              fontSize: isMobile ? '1rem' : '1.1rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {element.sectionName === '【解答コード】' && '💻'}
              {element.sectionName === '【ステップバイステップ解説】' && '📝'}
              {element.sectionName === '【実行例】' && '▶️'}
              {element.sectionName === '【解説】' && '💡'}
              {element.sectionName === '解答コード' && '💻'}
              {element.sectionName === 'ステップバイステップ解説' && '📝'}
              {element.sectionName === '実行例' && '▶️'}
              {element.sectionName === '解説' && '💡'}
              {element.sectionName}
            </div>
          </div>
        );
      } else if (element.type === 'code') {
        return (
          <div key={index} style={styles.codeBlock}>
            <div style={styles.codeBlockBefore}>Ruby</div>
            <pre style={{ 
              margin: 0, 
              lineHeight: 1.5, 
              wordWrap: 'break-word', 
              whiteSpace: 'pre-wrap',
              fontFamily: 'inherit'
            }}
            dangerouslySetInnerHTML={{
              __html: highlightRubyCode(element.content)
            }}
            />
          </div>
        );
      } else {
        // テキストを段落と構造化セクションに分割
        const paragraphs = element.content.split('\n\n');
        return paragraphs.map((paragraph, pIndex) => {
          if (!paragraph.trim()) return null;
          
          // 自動的にコードを検出（複数行で始まりがclass, def, if, while, case, for, each, mapなど）
          const codeKeywords = ['class ', 'def ', 'if ', 'while ', 'case ', 'for ', 'each', 'map', 'puts ', 'print ', 'p '];
          const lines = paragraph.split('\n');
          const isCodeBlock = lines.length > 2 && lines.some(line => 
            codeKeywords.some(keyword => line.trim().startsWith(keyword)) ||
            line.includes('=') && (line.includes('new') || line.includes('[') || line.includes('"'))
          );
          
          if (isCodeBlock) {
            return (
              <div key={`${index}-${pIndex}`} style={styles.codeBlock}>
                <div style={styles.codeBlockBefore}>Ruby</div>
                <pre style={{ 
                  margin: 0, 
                  lineHeight: 1.5, 
                  wordWrap: 'break-word', 
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'inherit'
                }}
                dangerouslySetInnerHTML={{
                  __html: highlightRubyCode(paragraph)
                }}
                />
              </div>
            );
          }
          
          // 構造化された項目の検出（課題：、入力データ：など）
          if (paragraph.match(/^(背景・目的|課題|入力データ|処理内容|期待する出力|制約条件|学習のポイント)[：:]/)) {
            const [label, ...contentParts] = paragraph.split(/[：:]/);
            const content = contentParts.join(':').trim();
            
            const labelColors = {
              '背景・目的': '#6366f1',
              '課題': '#dc2626', 
              '入力データ': '#059669',
              '処理内容': '#7c3aed',
              '期待する出力': '#ea580c',
              '制約条件': '#be123c',
              '学習のポイント': '#0891b2'
            };
            
            return (
              <div key={`${index}-${pIndex}`} style={{
                margin: '1rem 0',
                padding: isMobile ? '0.8rem' : '1rem',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                border: `2px solid ${colors.borderLight}`,
                borderRadius: isMobile ? '6px' : '8px',
                borderLeftColor: labelColors[label.trim()] || colors.rubyRed,
                borderLeftWidth: '4px'
              }}>
                <div style={{ 
                  color: labelColors[label.trim()] || colors.rubyRed, 
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem'
                }}>
                  {label.trim()}
                </div>
                <div style={{ 
                  lineHeight: 1.7,
                  color: colors.textSecondary,
                  fontSize: isMobile ? '0.85rem' : '0.95rem'
                }}>
                  {content.split('\n').map((line, lineIndex) => (
                    <div key={lineIndex} style={{ margin: '0.25rem 0', wordWrap: 'break-word' }}>
                      {/^\d+\./.test(line.trim()) ? (
                        <div style={{ marginLeft: '1rem' }}>
                          <span style={{ color: labelColors[label.trim()] || colors.rubyRed, fontWeight: 600 }}>
                            {line.match(/^\d+\./)?.[0]}
                          </span>
                          <span> {decodeHTMLEntities(line.replace(/^\d+\.\s*/, ''))}</span>
                        </div>
                      ) : line.startsWith('- ') ? (
                        <span>• {decodeHTMLEntities(line.substring(2))}</span>
                      ) : decodeHTMLEntities(line)}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          
          // 見出しや重要なテキストの検出
          if (paragraph.startsWith('###') || paragraph.startsWith('## ')) {
            const headingText = paragraph.replace(/^#+\s*/, '');
            return (
              <h4 key={`${index}-${pIndex}`} style={{ 
                margin: '1.5rem 0 0.75rem 0', 
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: 700,
                color: colors.textPrimary,
                lineHeight: 1.4
              }}>
                {decodeHTMLEntities(headingText)}
              </h4>
            );
          }
          
          // 通常の段落
          return (
            <div key={`${index}-${pIndex}`} style={{ 
              margin: '0.75rem 0', 
              lineHeight: 1.7, 
              wordWrap: 'break-word',
              color: colors.textSecondary,
              fontSize: isMobile ? '0.9rem' : '1rem',
              whiteSpace: 'pre-line'  // 改行を保持
            }}>
              {decodeHTMLEntities(paragraph)}
            </div>
          );
        }).filter(Boolean);
      }
    });
  };

  const getProblemTypeIcon = (type) => {
    const iconSize = isMobile ? 14 : 16;
    switch (type) {
      case 'code':
        return <Code size={iconSize} />;
      case 'story':
        return <BookOpen size={iconSize} />;
      default:
        return <FileText size={iconSize} />;
    }
  };

  const getProblemTypeText = (type) => {
    switch (type) {
      case 'code':
        return 'コードベースの問題';
      case 'story':
        return 'ストーリーベースの問題';
      default:
        return '練習問題';
    }
  };

  const getDifficultyBadge = (difficulty) => {
    if (!difficulty) return null;
    
    const difficultyColors = {
      '基礎': { bg: '#dbeafe', color: '#1e40af', border: '#3b82f6' },
      '中級': { bg: '#fef3c7', color: '#d97706', border: '#f59e0b' },
      '応用': { bg: '#fee2e2', color: '#dc2626', border: '#ef4444' }
    };
    
    const colors_diff = difficultyColors[difficulty] || difficultyColors['基礎'];
    
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0.25rem 0.5rem',
        background: colors_diff.bg,
        color: colors_diff.color,
        border: `1px solid ${colors_diff.border}`,
        borderRadius: '4px',
        fontSize: isMobile ? '0.7rem' : '0.75rem',
        fontWeight: 600,
        marginLeft: '0.5rem'
      }}>
        <Star size={12} />
        {difficulty}
      </span>
    );
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <div style={styles.header}>
          <h3 style={styles.title}>
            <Gem size={isMobile ? 20 : 24} />
            Ruby 練習問題
          </h3>
          <button 
            style={styles.close} 
            onClick={onClose}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.closeHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.close)}
            aria-label="モーダルを閉じる"
          >
            <X size={isMobile ? 16 : 20} />
          </button>
        </div>
        
        <div style={styles.content}>
          {problems.length === 0 ? (
            <div style={styles.noProblems}>
              練習問題が見つかりませんでした。
            </div>
          ) : (
            problems.map((problem, index) => (
              <div key={index} style={styles.problemContainer}>
                <div style={styles.problemHeader}>
                  <h4 style={styles.problemTitle}>
                    <span style={styles.problemNumber}>{index + 1}</span>
                    {decodeHTMLEntities(problem.title)}
                    {getDifficultyBadge(problem.difficulty)}
                  </h4>
                  <div style={styles.problemType}>
                    {getProblemTypeIcon(problem.type)}
                    {getProblemTypeText(problem.type)}
                  </div>
                </div>
                
                <div style={styles.problemBody}>
                  {problem.objective && (
                    <div style={styles.section}>
                      <div style={styles.sectionTitle}>
                        <Target size={isMobile ? 16 : 18} />
                        学習目標
                      </div>
                      <div style={styles.objectiveContent}>
                        {decodeHTMLEntities(problem.objective)}
                      </div>
                    </div>
                  )}

                  <div style={styles.section}>
                    <div style={styles.sectionTitle}>
                      <FileText size={isMobile ? 16 : 18} />
                      問題
                    </div>
                    <div style={styles.sectionContent}>
                      {formatContent(problem.description)}
                    </div>
                  </div>

                  {problem.syntax && problem.syntax.length > 0 && (
                    <div style={styles.section}>
                      <div style={styles.sectionTitle}>
                        <Settings size={isMobile ? 16 : 18} />
                        使用する構文・メソッド
                      </div>
                      <div style={styles.syntaxList}>
                        {problem.syntax.map((item, i) => (
                          <span key={i} style={styles.syntaxTag}>{item}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={styles.section}>
                    <div style={styles.sectionTitle}>
                      <Lightbulb size={isMobile ? 16 : 18} />
                      答え
                    </div>
                    <button
                      style={styles.answerButton}
                      onClick={() => {
                        setShowAnswers(prev => ({
                          ...prev,
                          [index]: !prev[index]
                        }));
                      }}
                      onMouseEnter={(e) => !isMobile && Object.assign(e.target.style, styles.answerButtonHover)}
                      onMouseLeave={(e) => !isMobile && Object.assign(e.target.style, styles.answerButton)}
                      aria-label={showAnswers[index] ? "答えを隠す" : "答えを表示"}
                    >
                      {showAnswers[index] ? (
                        <>
                          <EyeOff size={14} />
                          答えを隠す
                        </>
                      ) : (
                        <>
                          <Eye size={14} />
                          答えを表示
                        </>
                      )}
                    </button>
                    {showAnswers[index] && (
                      <div style={styles.answerContent}>
                        <div style={styles.answerContentBefore}></div>
                        {formatContent(problem.answer)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PracticeProblemsModal; 