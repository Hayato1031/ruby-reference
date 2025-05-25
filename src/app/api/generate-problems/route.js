import { NextResponse } from 'next/server';

export async function POST(request) {
  let selected;
  let problemType;
  const overallStartTime = Date.now();
  
  console.log(`🎯 ===== 問題生成API開始 - ${new Date().toLocaleTimeString()} =====`);
  
  try {
    const body = await request.json();
    selected = body.selected;
    problemType = body.problemType || 'mixed';
    
    if (!selected || selected.length === 0) {
      return NextResponse.json(
        { error: 'No items selected' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY is not set');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // 選択されたアイテムの情報を整理
    const selectedInfo = selected.map(item => ({
      name: item.name,
      description: item.description,
      example: item.example,
      version: item.version
    }));

    console.log('選択されたアイテム:', selectedInfo);

    // GPTレスポンスからJSONを抽出するヘルパー関数
    const extractJSON = (content) => {
      try {
        // まず直接パースを試行
        return JSON.parse(content);
      } catch (e) {
        try {
          // JSONコードブロックから抽出を試行
          const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
          if (jsonMatch) {
            let jsonContent = jsonMatch[1].trim();
            
            // 段階的な文字列クリーンアップ
            jsonContent = jsonContent
              // 制御文字を除去（改行とタブは保持）
              .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '')
              // HTMLエンティティをデコード
              .replace(/&#39;/g, "'")
              .replace(/&quot;/g, '"')
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              // バッククォートを通常のクォートに置換
              .replace(/`([^`]*)`/g, '"$1"')
              // 単独のバッククォートを削除
              .replace(/`/g, '')
              // 不正なエスケープシーケンスを修正
              .replace(/\\(?!["\\/bfnrt])/g, '\\\\')
              // 未終了の文字列を検出して修正
              .replace(/("[^"]*?)$/gm, '$1"');
            
            // 不完全なJSONを検出して修正
            if (!jsonContent.endsWith('}')) {
              // 最後の不完全な部分を削除
              const lastCommaIndex = jsonContent.lastIndexOf(',');
              const lastQuoteIndex = jsonContent.lastIndexOf('"');
              if (lastCommaIndex > lastQuoteIndex) {
                jsonContent = jsonContent.substring(0, lastCommaIndex);
              }
              // 閉じ括弧を追加
              let openBraces = (jsonContent.match(/{/g) || []).length;
              let closeBraces = (jsonContent.match(/}/g) || []).length;
              while (openBraces > closeBraces) {
                jsonContent += '}';
                closeBraces++;
              }
            }
            
            return JSON.parse(jsonContent);
          }
          
          // JSON部分を検索して抽出
          const jsonStart = content.indexOf('{');
          const jsonEnd = content.lastIndexOf('}');
          if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
            let jsonContent = content.substring(jsonStart, jsonEnd + 1);
            
            // 段階的な文字列クリーンアップ
            jsonContent = jsonContent
              // 制御文字を除去（改行とタブは保持）
              .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '')
              // HTMLエンティティをデコード
              .replace(/&#39;/g, "'")
              .replace(/&quot;/g, '"')
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              // バッククォートを通常のクォートに置換
              .replace(/`([^`]*)`/g, '"$1"')
              // 単独のバッククォートを削除
              .replace(/`/g, '')
              // 不正なエスケープシーケンスを修正
              .replace(/\\(?!["\\/bfnrt])/g, '\\\\')
              // 未終了の文字列を検出して修正
              .replace(/("[^"]*?)$/gm, '$1"');
            
            return JSON.parse(jsonContent);
          }
          
          throw new Error('Valid JSON not found in response');
        } catch (parseError) {
          console.error('JSON parse error:', parseError.message);
          console.error('Content that failed to parse:', content.substring(0, 1500));
          
          // 最後の手段：より簡単なフォールバック
          try {
            // 問題生成の場合
            if (content.includes('"problems"')) {
              const titleMatch = content.match(/"title"\s*:\s*"([^"]*?)"/);
              const descMatch = content.match(/"description"\s*:\s*"([^"]*?)"/);
              
              if (titleMatch && descMatch) {
                return {
                  problems: [{
                    title: titleMatch[1]
                      .replace(/&#39;/g, "'")
                      .replace(/&quot;/g, '"')
                      .replace(/&amp;/g, '&')
                      .replace(/&lt;/g, '<')
                      .replace(/&gt;/g, '>'),
                    description: descMatch[1]
                      .replace(/&#39;/g, "'")
                      .replace(/&quot;/g, '"')
                      .replace(/&amp;/g, '&')
                      .replace(/&lt;/g, '<')
                      .replace(/&gt;/g, '>'),
                    type: 'mixed',
                    syntax: ['selected'],
                    inputData: 'データが生成されませんでした',
                    expectedOutput: '出力が生成されませんでした',
                    difficulty: '基礎'
                  }]
                };
              }
            }
            
            // 回答生成の場合
            if (content.includes('"answer"')) {
              const answerMatch = content.match(/"answer"\s*:\s*"([\s\S]*?)"/);
              if (answerMatch) {
                let answerContent = answerMatch[1]
                  .replace(/\\n/g, '\n')
                  .replace(/\\"/g, '"')
                  .replace(/\\\\/g, '\\')
                  .replace(/&#39;/g, "'")
                  .replace(/&quot;/g, '"')
                  .replace(/&amp;/g, '&')
                  .replace(/&lt;/g, '<')
                  .replace(/&gt;/g, '>');
                
                return { answer: answerContent };
              }
            }
            
            // 完全にフォールバック
            return {
              answer: content.replace(/```json|```/g, '').trim()
                .replace(/&#39;/g, "'")
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>') || "コンテンツの解析に失敗しました。"
            };
            
          } catch (fallbackError) {
            console.error('Fallback parsing failed:', fallbackError.message);
            return {
              answer: "コンテンツの解析に失敗しました。生のレスポンス: " + content.substring(0, 500)
            };
          }
        }
      }
    };

    // OpenAI APIを呼び出すヘルパー関数（リトライ機能付き）
    const callOpenAI = async (requestBody, maxRetries = 3, requestType = 'GPT Request') => {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const startTime = Date.now();
          console.log(`🚀 [${requestType}] リクエスト送信 (試行${attempt}/${maxRetries}) - ${new Date().toLocaleTimeString()}`);
          console.log(`📝 [${requestType}] モデル: ${requestBody.model}, max_tokens: ${requestBody.max_tokens}`);
          
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });

          const endTime = Date.now();
          const responseTime = endTime - startTime;

          if (response.ok) {
            const data = await response.json();
            
            // トークン使用量とタイミングをログ出力
            const usage = data.usage || {};
            console.log(`✅ [${requestType}] レスポンス受信 - ${new Date().toLocaleTimeString()}`);
            console.log(`⏱️  [${requestType}] レスポンス時間: ${responseTime}ms`);
            console.log(`🎯 [${requestType}] トークン消費:`);
            console.log(`   - 入力トークン: ${usage.prompt_tokens || 'N/A'}`);
            console.log(`   - 出力トークン: ${usage.completion_tokens || 'N/A'}`);
            console.log(`   - 合計トークン: ${usage.total_tokens || 'N/A'}`);
            
            // コスト計算（GPT-4の料金で計算）
            const inputCost = (usage.prompt_tokens || 0) * 0.00003; // $0.03/1K tokens
            const outputCost = (usage.completion_tokens || 0) * 0.00006; // $0.06/1K tokens
            const totalCost = inputCost + outputCost;
            console.log(`💰 [${requestType}] 推定コスト: $${totalCost.toFixed(6)} (入力: $${inputCost.toFixed(6)}, 出力: $${outputCost.toFixed(6)})`);
            console.log(`---`);
            
            return data;
          }

          // レート制限エラーの場合は指数バックオフで待機
          if (response.status === 429) {
            const waitTime = Math.pow(2, attempt) * 1000; // 2秒、4秒、8秒
            console.log(`❌ [${requestType}] レート制限エラー（試行${attempt}/${maxRetries}）- ${waitTime}ms待機中... - ${new Date().toLocaleTimeString()}`);
            
            if (attempt < maxRetries) {
              await new Promise(resolve => setTimeout(resolve, waitTime));
              continue;
            }
          }

          // その他のエラーの場合
          const errorText = await response.text();
          console.log(`❌ [${requestType}] APIエラー: ${response.status} - レスポンス時間: ${responseTime}ms - ${new Date().toLocaleTimeString()}`);
          throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
          
        } catch (error) {
          const errorTime = Date.now();
          console.log(`❌ [${requestType}] 例外エラー（試行${attempt}/${maxRetries}）: ${error.message} - ${new Date().toLocaleTimeString()}`);
          
          if (attempt === maxRetries) {
            throw error;
          }
          
          // ネットワークエラーなどの場合も少し待機
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    };

    // 問題生成
    const generateProblems = async () => {
      const selectedList = selectedInfo.map(item => `- ${item.name}: ${item.description}`).join('\n');
      const syntaxList = selectedInfo.map(item => item.name).join(', ');
      
      // 単一選択時は構文練習問題、複数選択時は包括的複合問題を生成
      const shouldGenerateCombinedProblem = selectedInfo.length > 1;
      const numberOfProblems = shouldGenerateCombinedProblem ? 2 : 3; // 複数選択時は2問、単一選択時は3問

      const prompt = shouldGenerateCombinedProblem ? 
        // 複数選択時：包括的複合問題
        `以下のRuby構文を使った包括的な練習問題を${numberOfProblems}つ生成してください。

【選択された構文】
${selectedList}

【重要な制約】
1. 曖昧な表現は使わない（「適切な」「基本的な」「実用的な」禁止）
2. 具体的な変数名と値を指定（例：変数scoreに85が入っています）
3. 期待する出力を明確に示す
4. 各問題で選択されたすべての構文（${syntaxList}）を組み合わせて使用する
5. 問題の難易度を段階的に上げる（基礎→応用）

【問題タイプ】${problemType === 'code' ? 'コード重視' : problemType === 'story' ? 'ストーリー重視' : 'バランス型'}

【JSON出力の注意事項】
- バッククォート（\`）は使用禁止
- 文字列内では通常のクォート（"）のみ使用
- 文章は途中で切れないよう完結させる

以下のJSON形式で回答：
{
  "problems": [
    {
      "title": "問題タイトル",
      "type": "${problemType}",
      "description": "具体的な問題文（変数名と値を明記）",
      "syntax": [${selectedInfo.map(item => `"${item.name}"`).join(', ')}],
      "inputData": "具体的な入力データ",
      "expectedOutput": "期待する出力",
      "difficulty": "基礎/応用"
    }
  ]
}`
        :
        // 単一選択時：構文練習問題
        `以下のRuby構文を集中的に練習するための問題を${numberOfProblems}つ生成してください。

【選択された構文】
${selectedList}

【重要な制約】
1. 曖昧な表現は使わない（「適切な」「基本的な」「実用的な」禁止）
2. 具体的な変数名と値を指定（例：変数scoreに85が入っています）
3. 期待する出力を明確に示す
4. 選択された構文（${syntaxList}）を重点的に使用する
5. 問題の難易度を段階的に上げる（基礎→中級→応用）

【問題タイプ】${problemType === 'code' ? 'コード重視' : problemType === 'story' ? 'ストーリー重視' : 'バランス型'}

【JSON出力の注意事項】
- バッククォート（\`）は使用禁止
- 文字列内では通常のクォート（"）のみ使用
- 文章は途中で切れないよう完結させる

以下のJSON形式で回答：
{
  "problems": [
    {
      "title": "問題タイトル",
      "type": "${problemType}",
      "description": "具体的な問題文（変数名と値を明記）",
      "syntax": [${selectedInfo.map(item => `"${item.name}"`).join(', ')}],
      "inputData": "具体的な入力データ",
      "expectedOutput": "期待する出力",
      "difficulty": "基礎/中級/応用"
    }
  ]
}`;

      const requestBody = {
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'あなたはRubyプログラミングの教師です。曖昧な表現を避け、具体的な値を使った明確な問題を作成してください。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.4,
        max_tokens: 1500,
      };

      const data = await callOpenAI(requestBody, 3, '問題生成');
      return extractJSON(data.choices[0].message.content);
    };

    // 回答生成（順次実行でコスト抑制）
    const generateAnswers = async (problems) => {
      const totalProblems = problems.length;
      console.log(`📝 ===== 回答生成フェーズ開始 =====`);
      console.log(`📊 生成する回答数: ${totalProblems}問`);
      console.log(`⏰ 開始時刻: ${new Date().toLocaleTimeString()}`);
      console.log(`---`);
      
      const problemsWithAnswers = [];
      
      for (let i = 0; i < problems.length; i++) {
        const problem = problems[i];
        const currentIndex = i + 1;
        const answerStartTime = Date.now();
        
        console.log(`🔄 問題${currentIndex}/${totalProblems}の回答生成開始`);
        console.log(`📋 問題タイトル: "${problem.title}"`);
        console.log(`🎯 使用構文: ${problem.syntax.join(', ')}`);
        console.log(`⏰ 開始時刻: ${new Date().toLocaleTimeString()}`);
        
        const prompt = `以下の問題の回答を提供してください。

【問題】
${problem.title}
${problem.description}
使用構文: ${problem.syntax.join(', ')}

【回答要件】
1. 実行可能なRubyコード
2. 各行にコメント
3. 実行例の提示

【JSON出力の注意事項】
- バッククォート（\`）は使用禁止
- 文字列内では通常のクォート（"）のみ使用
- 改行は\\nで表現
- 文章は途中で切れないよう完結させる

JSON形式で回答：
{
  "answer": "コード例と解説をシンプルなテキストで記述。コードブロックは使わず通常の文章として記述。"
}`;

        const requestBody = {
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'あなたはRubyプログラミングの教師です。実行可能なコードと簡潔な解説を提供してください。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 1000,
        };

        const data = await callOpenAI(requestBody, 3, `回答生成(${currentIndex}/${totalProblems})`);
        
        let answerData;
        try {
          answerData = extractJSON(data.choices[0].message.content);
        } catch (jsonError) {
          console.error(`JSON解析失敗 - 問題${currentIndex}: ${jsonError.message}`);
          console.log('Raw response:', data.choices[0].message.content);
          
          // フォールバック: 生のコンテンツをそのまま使用
          answerData = {
            answer: (data.choices[0].message.content || "回答の生成に失敗しました。")
              .replace(/&#39;/g, "'")
              .replace(/&quot;/g, '"')
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
          };
        }
        
        const answerEndTime = Date.now();
        const answerDuration = answerEndTime - answerStartTime;
        
        problemsWithAnswers.push({
          ...problem,
          answer: answerData.answer
        });
        
        console.log(`✅ 問題${currentIndex}/${totalProblems}の回答生成完了`);
        console.log(`⏱️  処理時間: ${answerDuration}ms`);
        console.log(`📈 進行状況: ${currentIndex}/${totalProblems} (${Math.round((currentIndex / totalProblems) * 100)}%)`);
        console.log(`---`);
        
        // レート制限を避けるため、次のリクエストまで少し待機
        if (i < problems.length - 1) {
          console.log(`⏳ 次の問題の回答生成まで1秒待機中...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      console.log(`🎉 ===== 回答生成フェーズ完了 =====`);
      console.log(`📊 生成した回答数: ${problemsWithAnswers.length}/${totalProblems}`);
      console.log(`⏰ 完了時刻: ${new Date().toLocaleTimeString()}`);
      console.log(`---`);
      
      return problemsWithAnswers;
    };

    // 問題生成と回答生成を実行
    const problemsData = await generateProblems();
    const problems = problemsData.problems || [];
    
    if (problems.length === 0) {
      throw new Error('No problems generated');
    }

    const problemsWithAnswers = await generateAnswers(problems);

    const overallEndTime = Date.now();
    const overallDuration = overallEndTime - overallStartTime;
    console.log(`✅ 問題生成完了！`);
    console.log(`📊 生成した問題数: ${problemsWithAnswers.length}`);
    console.log(`🕒 総処理時間: ${overallDuration}ms`);

    return NextResponse.json({
      problems: problemsWithAnswers,
      metadata: {
        selectedItems: selectedInfo,
        problemType: problemType,
        generatedAt: new Date().toISOString(),
        processingTime: overallDuration
      }
    });

  } catch (error) {
    console.error('Error generating problems:', error);
    
    // レート制限エラーの場合は特別なメッセージ
    if (error.message.includes('429')) {
      return NextResponse.json(
        { 
          error: 'APIのレート制限に達しました',
          details: 'OpenAI APIの使用制限を一時的に超過しました。',
          suggestion: '1-2分お待ちいただいてから再度お試しください。使用頻度が高い場合は、少し間隔をあけてご利用ください。',
          fallback: false,
          retryAfter: 60 // 60秒後の再試行を推奨
        },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'GPTによる問題生成に失敗しました',
        details: error.message,
        suggestion: 'しばらく時間をおいてから再試行してください。問題が続く場合は、選択する構文を減らしてみてください。',
        fallback: false
      },
      { status: 500 }
    );
  }
} 