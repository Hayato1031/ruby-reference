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

  // 選択・解除
  const handleSelect = (id) => setSelectedIds(new Set(selectedIds).add(id));
  const handleDeselect = (id) => {
    const newSet = new Set(selectedIds);
    newSet.delete(id);
    setSelectedIds(newSet);
  };
  const handleRemove = (id) => handleDeselect(id);
  const handleGenerate = () => {
    const allItems = Object.values(genreGroups.find(g => g.id === activeGroup).itemsByGenre).flat();
    const selected = allItems.filter(m => selectedIds.has(m.id));
    alert(`選択されたアイテム（${selected.length}個）で練習問題を生成します：\n\n${selected.map(m => m.name).join('\n')}`);
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
      />
    </main>
  );
}
