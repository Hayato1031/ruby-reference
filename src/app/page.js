"use client";

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import MethodGrid from './components/MethodGrid';
import Sidebar from './components/Sidebar';
import FloatingButton from './components/FloatingButton';
import SelectedModal from './components/SelectedModal';
import { colors, shadows } from './constants/styles';
import { useState } from 'react';
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

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProblems, setGeneratedProblems] = useState(null);
  
  // 選択・解除
  const handleSelect = (id) => setSelectedIds(new Set(selectedIds).add(id));
  const handleDeselect = (id) => {
    const newSet = new Set(selectedIds);
    newSet.delete(id);
    setSelectedIds(newSet);
  };
  const handleRemove = (id) => handleDeselect(id);
  
  const handleGenerate = async () => {
    const allItems = Object.values(genreGroups.find(g => g.id === activeGroup).itemsByGenre).flat();
    const selected = allItems.filter(m => selectedIds.has(m.id));
    
    setIsGenerating(true);
    
    try {
      setTimeout(() => {
        const mockProblems = [
          {
            title: `${selected[0].name}を使った問題`,
            description: `次のコードを実行すると何が出力されますか？\n\n\`\`\`ruby\n# ${selected[0].name}を使った例\n${selected[0].example.split('#')[0]}\nputs "結果を予想してください"\n\`\`\``,
            answer: `正解は「${selected[0].description}」に関連します。\n\n解説: ${selected[0].description}`
          }
        ];
        
        if (selected.length > 1) {
          mockProblems.push({
            title: `${selected[1].name}と${selected[0].name}を組み合わせた問題`,
            description: `次のコードを修正して、期待する出力を得るようにしてください。\n\n\`\`\`ruby\n# 修正が必要なコード\ndef process_data(data)\n  # ここにコードを書いてください\nend\n\`\`\``,
            answer: `正解例:\n\`\`\`ruby\ndef process_data(data)\n  # ${selected[0].name}と${selected[1].name}を使った解答例\n  result = ${selected[0].example.split('#')[0].trim()}\n  result\nend\n\`\`\``
          });
        }
        
        alert(`練習問題が生成されました！\n\n問題1: ${mockProblems[0].title}\n${mockProblems[0].description}`);
        setGeneratedProblems(mockProblems);
        setIsGenerating(false);
      }, 1500);
      
      /*
      const response = await fetch('/api/generate-problems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selected }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate problems');
      }
      
      const data = await response.json();
      setGeneratedProblems(data.problems);
      */
    } catch (error) {
      console.error('Error generating problems:', error);
      alert('練習問題の生成に失敗しました。後でもう一度お試しください。');
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
      padding: '4rem 2rem',
    },
    main: {
      background: colors.bgPrimary,
      border: `1px solid ${colors.borderLight}`,
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: shadows.sm,
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 800,
      color: colors.textPrimary,
      marginBottom: '2rem',
      lineHeight: 1.2,
    },
    accent: {
      color: colors.rubyRed,
    },
    popularSection: {
      marginBottom: '4rem',
    },
    docsSection: {
      display: 'grid',
      gridTemplateColumns: '280px 1fr',
      gap: '3rem',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
        gap: '1.5rem',
      },
    },
  };

  return (
    <main>
      <Navigation />
      <Hero />
      <div style={styles.container}>
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
          <Sidebar
            sections={sidebarSections}
            activeSection={{ groupId: activeGroup, genreId: activeGenre }}
            onSectionChange={(genreId, groupId) => handleSectionChange(genreId, groupId)}
            activeGroup={activeGroup}
          />
          <div style={styles.main}>
            <h2 style={styles.title}>
              <span style={styles.accent}>{currentGroup.title.replace('ジャンル', '')}</span> {currentGenre?.name || ''}
            </h2>
            {genreDescription && (
              <div style={{ color: colors.textSecondary, marginBottom: '1.5rem', fontSize: '1rem' }}>{genreDescription}</div>
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
    </main>
  );
}
