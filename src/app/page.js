"use client";

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import MethodGrid from './components/MethodGrid';
import Sidebar from './components/Sidebar';
import FloatingButton from './components/FloatingButton';
import SelectedModal from './components/SelectedModal';
import PracticeProblemsModal from './components/PracticeProblemsModal';
import { colors, shadows } from './constants/styles';
import { useState, useEffect } from 'react';
import syntaxGenres from './data/syntaxGenres';
import syntaxByGenre from './data/syntaxByGenre';
import methodSections from './data/methodSections';
import methodsByCategory from './data/methodsByCategory';

// ジャンル情報を統一的に管理
const genreGroups = [
  {
    id: 'syntax',
    title: '構文ジャンル',
    genres: syntaxGenres.map(({ id, title }) => ({ id, name: title })),
    itemsByGenre: syntaxByGenre,
  },
  {
    id: 'methods',
    title: 'メソッド',
    genres: methodSections,
    itemsByGenre: methodsByCategory,
  },
];

// サイドバー用sections
const sidebarSections = genreGroups.map(group => ({
  id: group.id,
  title: group.title,
  items: group.genres,
}));

export default function Home() {
  // デフォルトは最初のグループ・最初のジャンル
  const [activeGroup, setActiveGroup] = useState(genreGroups[0].id);
  const [activeGenre, setActiveGenre] = useState(genreGroups[0].genres[0].id);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProblems, setGeneratedProblems] = useState(null);
  const [problemsModalOpen, setProblemsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 選択・解除
  const handleSelect = (id) => setSelectedIds(new Set(selectedIds).add(id));
  const handleDeselect = (id) => {
    const newSet = new Set(selectedIds);
    newSet.delete(id);
    setSelectedIds(newSet);
  };
  const handleRemove = (id) => handleDeselect(id);
  
  const handleGenerate = async (problemType = 'mixed') => {
    const allItems = Object.values(genreGroups.find(g => g.id === activeGroup).itemsByGenre).flat();
    const selected = allItems.filter(m => selectedIds.has(m.id));
    
    setIsGenerating(true);
    
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
        .replace(/&apos;/g, "'")
        .replace(/&#40;/g, '(')
        .replace(/&#41;/g, ')')
        .replace(/&#91;/g, '[')
        .replace(/&#93;/g, ']')
        .replace(/&#123;/g, '{')
        .replace(/&#125;/g, '}');
      
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

    // プロブレムオブジェクトのすべてのテキストフィールドをデコードする関数
    const decodeProblemsData = (problems) => {
      return problems.map(problem => ({
        ...problem,
        title: decodeHTMLEntities(problem.title),
        description: decodeHTMLEntities(problem.description),
        answer: decodeHTMLEntities(problem.answer),
        inputData: problem.inputData ? decodeHTMLEntities(problem.inputData) : problem.inputData,
        expectedOutput: problem.expectedOutput ? decodeHTMLEntities(problem.expectedOutput) : problem.expectedOutput,
        objective: problem.objective ? decodeHTMLEntities(problem.objective) : problem.objective,
      }));
    };
    
    try {
      const response = await fetch('/api/generate-problems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selected, problemType }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // サーバーからのエラーメッセージを表示
        const errorMessage = data.error || 'GPTによる問題生成に失敗しました';
        const suggestion = data.suggestion || 'しばらく時間をおいてから再試行してください。';
        alert(`${errorMessage}\n\n${suggestion}`);
        return;
      }
      
      // 問題が正常に生成された場合
      if (data.problems && data.problems.length > 0) {
        const decodedProblems = decodeProblemsData(data.problems);
        setGeneratedProblems(decodedProblems);
        setProblemsModalOpen(true);
      } else {
        alert('問題の生成に失敗しました。選択した構文を確認して再試行してください。');
      }
    } catch (error) {
      console.error('Error generating problems:', error);
      alert(`GPTによる問題生成でエラーが発生しました。\n\nエラー詳細: ${error.message}\n\nしばらく時間をおいてから再試行してください。問題が続く場合は、選択する構文を減らしてみてください。`);
    } finally {
      setIsGenerating(false);
    }
    
    setModalOpen(false);
  };

  // 選択中のアイテム情報
  const allItems = Object.values(genreGroups.find(g => g.id === activeGroup).itemsByGenre).flat();
  const selectedItems = allItems.filter(m => selectedIds.has(m.id));

  // サイドバー切り替え
  const handleSectionChange = (genreId, groupId) => {
    setActiveGroup(groupId);
    if (groupId !== activeGroup) {
      const newGroup = genreGroups.find(g => g.id === groupId);
      setActiveGenre(newGroup.genres[0].id);
    } else {
      setActiveGenre(genreId);
    }
    // モバイルでサイドバーを閉じる
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // 表示するジャンル・リスト
  const currentGroup = genreGroups.find(g => g.id === activeGroup);
  const currentGenre = currentGroup.genres.find(g => g.id === activeGenre);
  const items = currentGroup.itemsByGenre[activeGenre] || [];
  // 構文ジャンルの場合のみ説明を表示
  const genreDescription = activeGroup === 'syntax'
    ? (syntaxGenres.find(g => g.id === activeGenre)?.description || '')
    : '';

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '2rem 1rem' : '3rem 2rem',
    },
    main: {
      background: colors.bgPrimary,
      border: `1px solid ${colors.borderLight}`,
      borderRadius: isMobile ? '8px' : '12px',
      padding: isMobile ? '1.5rem' : '2rem',
      boxShadow: shadows.sm,
    },
    title: {
      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
      fontWeight: 800,
      color: colors.textPrimary,
      marginBottom: isMobile ? '1.5rem' : '2rem',
      lineHeight: 1.2,
    },
    accent: {
      color: colors.rubyRed,
    },
    popularSection: {
      marginBottom: isMobile ? '2rem' : '3rem',
    },
    docsSection: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '280px 1fr',
      gap: isMobile ? '1.5rem' : '3rem',
      position: 'relative',
    },
    mobileToggleButton: {
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      gap: '0.75rem',
      background: `linear-gradient(135deg, ${colors.rubyRed} 0%, #d73027 100%)`,
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '1rem 1.5rem',
      fontSize: '1rem',
      fontWeight: 700,
      cursor: 'pointer',
      marginBottom: '1.5rem',
      boxShadow: '0 4px 16px rgba(220, 38, 38, 0.3)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      width: '100%',
      justifyContent: 'center',
      position: 'sticky',
      top: '80px',
      zIndex: 100,
      minHeight: '52px',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(255, 255, 255, 0.2)',
    },
    mobileToggleButtonHover: {
      background: `linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)`,
      transform: 'translateY(-2px) scale(1.02)',
      boxShadow: '0 8px 24px rgba(220, 38, 38, 0.4)',
    },
    sidebarOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 998,
      opacity: sidebarOpen ? 1 : 0,
      visibility: sidebarOpen ? 'visible' : 'hidden',
      transition: 'all 0.3s ease',
    },
    mobileSidebarWrapper: {
      position: isMobile ? 'fixed' : 'relative',
      top: isMobile ? '0' : 'auto',
      left: isMobile ? '0' : 'auto',
      width: isMobile ? '280px' : 'auto',
      height: isMobile ? '100vh' : 'auto',
      background: isMobile ? colors.bgPrimary : 'transparent',
      zIndex: isMobile ? 999 : 'auto',
      transform: isMobile ? (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
      transition: isMobile ? 'transform 0.3s ease' : 'none',
      overflow: isMobile ? 'auto' : 'visible',
      padding: isMobile ? '1rem' : '0',
    },
    mobileHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottom: `1px solid ${colors.borderLight}`,
    },
    mobileHeaderTitle: {
      fontSize: '1.2rem',
      fontWeight: 700,
      color: colors.textPrimary,
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: colors.textSecondary,
      padding: '0.25rem',
    },
    contentArea: {
      minHeight: '500px',
    },
  };

  return (
    <main>
      <Navigation />
      <Hero />
      <div style={styles.container} id="docs">
        <div style={styles.popularSection}>
          <div style={styles.main}>
            <h2 style={styles.title}>
              <span style={styles.accent}>人気の</span>メソッド
            </h2>
            <MethodGrid
              methods={methodsByCategory.array.slice(0, 3)}
              selectedIds={selectedIds}
              onSelect={handleSelect}
              onDeselect={handleDeselect}
            />
          </div>
        </div>
        
        <div style={styles.docsSection}>
          {/* Mobile Toggle Button */}
          <button 
            style={styles.mobileToggleButton}
            onClick={() => setSidebarOpen(true)}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.mobileToggleButtonHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, styles.mobileToggleButton)}
          >
            🔍 学習したいカテゴリを選択
          </button>

          {/* Sidebar Overlay */}
          {isMobile && sidebarOpen && (
            <div style={styles.sidebarOverlay} onClick={() => setSidebarOpen(false)} />
          )}

          {/* Sidebar */}
          <div style={styles.mobileSidebarWrapper}>
            {isMobile && sidebarOpen && (
              <div style={styles.mobileHeader}>
                <h3 style={styles.mobileHeaderTitle}>カテゴリ選択</h3>
                <button 
                  style={styles.closeButton} 
                  onClick={() => setSidebarOpen(false)}
                  aria-label="閉じる"
                >
                  ✕
                </button>
              </div>
            )}
            <Sidebar
              sections={sidebarSections}
              activeSection={{ groupId: activeGroup, genreId: activeGenre }}
              onSectionChange={(genreId, groupId) => handleSectionChange(genreId, groupId)}
              activeGroup={activeGroup}
            />
          </div>

          {/* Main Content */}
          <div style={{...styles.main, ...styles.contentArea}}>
            <h2 style={styles.title}>
              <span style={styles.accent}>{currentGroup.title.replace('ジャンル', '')}</span> {currentGenre?.name || ''}
            </h2>
            {genreDescription && (
              <div style={{ 
                color: colors.textSecondary, 
                marginBottom: '1.5rem', 
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                lineHeight: 1.6,
              }}>
                {genreDescription}
              </div>
            )}
            <MethodGrid
              methods={items}
              selectedIds={selectedIds}
              onSelect={handleSelect}
              onDeselect={handleDeselect}
            />
          </div>
        </div>
      </div>
      
      <FloatingButton count={selectedIds.size} onClick={() => setModalOpen(true)} />
      <SelectedModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        selected={selectedItems}
        onRemove={handleRemove}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
      />
      <PracticeProblemsModal
        open={problemsModalOpen}
        onClose={() => setProblemsModalOpen(false)}
        problems={generatedProblems}
      />
    </main>
  );
}
