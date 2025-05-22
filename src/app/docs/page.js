"use client";

import { useState } from 'react';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';
import MethodGrid from '../components/MethodGrid';
import { colors } from '../constants/styles';

// サンプルデータ
const sections = [
  {
    id: 'basics',
    title: '基本',
    items: [
      { id: 'variables', name: '変数' },
      { id: 'methods', name: 'メソッド' },
      { id: 'classes', name: 'クラス' },
    ],
  },
  {
    id: 'advanced',
    title: '応用',
    items: [
      { id: 'modules', name: 'モジュール' },
      { id: 'blocks', name: 'ブロック' },
      { id: 'procs', name: 'Proc' },
    ],
  },
];

const methods = [
  {
    id: 1,
    name: 'map',
    description: '配列の各要素に対してブロックを評価し、その結果を含む新しい配列を返します。',
    example: 'numbers = [1, 2, 3, 4, 5]\ndoubled = numbers.map { |n| n * 2 }\n# => [2, 4, 6, 8, 10]',
  },
  {
    id: 2,
    name: 'select',
    description: '配列の各要素に対してブロックを評価し、その結果が真の要素のみを含む新しい配列を返します。',
    example: 'numbers = [1, 2, 3, 4, 5]\neven = numbers.select { |n| n.even? }\n# => [2, 4]',
  },
  // 他のメソッドも同様に追加できます
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('variables');

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '4rem 2rem',
      display: 'grid',
      gridTemplateColumns: '280px 1fr',
      gap: '3rem',
    },
    main: {
      background: colors.bgPrimary,
      border: `1px solid ${colors.borderLight}`,
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
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
  };

  return (
    <>
      <Navigation />
      <div style={{ paddingTop: '4rem' }}>
        <div style={styles.container}>
          <Sidebar
            sections={sections}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          <main style={styles.main}>
            <h1 style={styles.title}>
              <span style={styles.accent}>Ruby</span> メソッドリファレンス
            </h1>
            <MethodGrid methods={methods} />
          </main>
        </div>
      </div>
    </>
  );
} 