import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { selected } = await request.json();
    
    if (!selected || selected.length === 0) {
      return NextResponse.json(
        { error: 'No items selected' },
        { status: 400 }
      );
    }
    
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
    
    return NextResponse.json({ problems: mockProblems });
  } catch (error) {
    console.error('Error generating problems:', error);
    return NextResponse.json(
      { error: 'Failed to generate problems' },
      { status: 500 }
    );
  }
}
