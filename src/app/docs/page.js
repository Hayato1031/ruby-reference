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
  // 配列メソッド
  {
    id: 1,
    name: 'map',
    description: '配列の各要素を変換して、新しい配列を作ります。元の配列は変更されません。',
    detailedDescription: 'mapメソッドは配列の各要素に対してブロック内の処理を実行し、その結果を新しい配列として返します。元の配列は変更されないため、安全にデータを変換できます。',
    example: 'numbers = [1, 2, 3, 4, 5]\ndoubled = numbers.map { |n| n * 2 }\nputs doubled\n# => [2, 4, 6, 8, 10]\n\nnames = ["alice", "bob", "charlie"]\nupper_names = names.map { |name| name.upcase }\nputs upper_names\n# => ["ALICE", "BOB", "CHARLIE"]',
    syntax: 'array.map { |element| block }\narray.map(&:method)',
    parameters: 'ブロック: 各要素に対して実行する処理',
    returnValue: '各要素にブロックを適用した結果の新しい配列',
    version: '1.8.7',
  },
  {
    id: 2,
    name: 'select',
    description: '条件に合う要素だけを選んで、新しい配列を作ります。',
    detailedDescription: 'selectメソッドは配列の各要素に対してブロック内の条件を評価し、trueを返す要素のみを含む新しい配列を返します。フィルタリング処理でよく使われます。',
    example: 'numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\neven_numbers = numbers.select { |n| n.even? }\nputs even_numbers\n# => [2, 4, 6, 8, 10]\n\nwords = ["apple", "banana", "cherry", "date"]\nlong_words = words.select { |word| word.length > 5 }\nputs long_words\n# => ["banana", "cherry"]',
    syntax: 'array.select { |element| condition }\narray.select(&:method)',
    parameters: 'ブロック: 各要素が条件を満たすかを判定する処理',
    returnValue: '条件を満たす要素のみを含む新しい配列',
    version: '1.8.7',
  },
  {
    id: 3,
    name: 'each',
    description: '配列の各要素に対して処理を実行します。配列自体を返します。',
    detailedDescription: 'eachメソッドは配列の各要素に対してブロック内の処理を実行します。主に副作用（画面への出力など）のために使用され、元の配列をそのまま返します。',
    example: 'fruits = ["apple", "banana", "cherry"]\nfruits.each { |fruit| puts "I like #{fruit}" }\n# => I like apple\n# => I like banana\n# => I like cherry\n\n# インデックスも使いたい場合\nfruits.each_with_index do |fruit, index|\n  puts "#{index + 1}. #{fruit}"\nend\n# => 1. apple\n# => 2. banana\n# => 3. cherry',
    syntax: 'array.each { |element| block }\narray.each_with_index { |element, index| block }',
    parameters: 'ブロック: 各要素に対して実行する処理',
    returnValue: '元の配列（自分自身）',
    version: '1.8.7',
  },
  {
    id: 4,
    name: 'reject',
    description: '条件に合わない要素を選んで、新しい配列を作ります（selectの逆）。',
    detailedDescription: 'rejectメソッドはselectの逆の動作をします。ブロック内の条件がfalseを返す要素のみを含む新しい配列を返します。',
    example: 'numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nodd_numbers = numbers.reject { |n| n.even? }\nputs odd_numbers\n# => [1, 3, 5, 7, 9]\n\nwords = ["", "hello", "", "world", ""]\nnon_empty = words.reject { |word| word.empty? }\nputs non_empty\n# => ["hello", "world"]',
    syntax: 'array.reject { |element| condition }',
    parameters: 'ブロック: 要素を除外する条件',
    returnValue: '条件を満たさない要素のみを含む新しい配列',
    version: '1.8.7',
  },
  {
    id: 5,
    name: 'find',
    description: '条件に合う最初の要素を見つけて返します。',
    detailedDescription: 'findメソッド（detectとも呼ばれる）は、配列の中から条件に合う最初の要素を見つけて返します。見つからない場合はnilを返します。',
    example: 'numbers = [1, 3, 5, 8, 9, 12]\nfirst_even = numbers.find { |n| n.even? }\nputs first_even\n# => 8\n\npeople = [\n  { name: "Alice", age: 25 },\n  { name: "Bob", age: 30 },\n  { name: "Charlie", age: 35 }\n]\nadult = people.find { |person| person[:age] >= 30 }\nputs adult[:name]\n# => Bob',
    syntax: 'array.find { |element| condition }\narray.detect { |element| condition }',
    parameters: 'ブロック: 検索条件',
    returnValue: '条件を満たす最初の要素、または nil',
    version: '1.8.7',
  },
  {
    id: 6,
    name: 'reduce',
    description: '配列の要素を一つずつ処理して、単一の値にまとめます。',
    detailedDescription: 'reduceメソッド（injectとも呼ばれる）は、配列の要素を順番に処理し、アキュムレータ（累積値）を更新しながら最終的に一つの値を返します。合計や最大値の計算によく使われます。',
    example: 'numbers = [1, 2, 3, 4, 5]\nsum = numbers.reduce(0) { |total, n| total + n }\nputs sum\n# => 15\n\n# 初期値を省略する場合\nproduct = numbers.reduce { |result, n| result * n }\nputs product\n# => 120\n\n# シンボルを使った省略記法\nsum2 = numbers.reduce(:+)\nputs sum2\n# => 15',
    syntax: 'array.reduce(initial) { |accumulator, element| block }\narray.reduce { |accumulator, element| block }\narray.reduce(:symbol)',
    parameters: 'initial: 初期値（省略可）、ブロック: 累積処理',
    returnValue: '最終的な累積値',
    version: '1.8.7',
  },

  // 文字列メソッド
  {
    id: 7,
    name: 'upcase',
    description: '文字列をすべて大文字に変換します。',
    detailedDescription: 'upcaseメソッドは文字列内のすべての小文字を大文字に変換した新しい文字列を返します。元の文字列は変更されません。',
    example: 'name = "ruby programming"\nuppercase = name.upcase\nputs uppercase\n# => "RUBY PROGRAMMING"\n\n# 元の文字列は変更されない\nputs name\n# => "ruby programming"\n\n# 破壊的な変更をしたい場合は upcase!\nname.upcase!\nputs name\n# => "RUBY PROGRAMMING"',
    syntax: 'string.upcase\nstring.upcase!',
    parameters: 'なし',
    returnValue: '大文字に変換された新しい文字列',
    version: '1.8.7',
  },
  {
    id: 8,
    name: 'downcase',
    description: '文字列をすべて小文字に変換します。',
    detailedDescription: 'downcaseメソッドは文字列内のすべての大文字を小文字に変換した新しい文字列を返します。',
    example: 'company = "APPLE Inc."\nlowercase = company.downcase\nputs lowercase\n# => "apple inc."\n\n# メールアドレスの正規化によく使われる\nemail = "USER@EXAMPLE.COM"\nnormalized = email.downcase\nputs normalized\n# => "user@example.com"',
    syntax: 'string.downcase\nstring.downcase!',
    parameters: 'なし',
    returnValue: '小文字に変換された新しい文字列',
    version: '1.8.7',
  },
  {
    id: 9,
    name: 'strip',
    description: '文字列の前後の空白文字を取り除きます。',
    detailedDescription: 'stripメソッドは文字列の先頭と末尾にある空白文字（スペース、タブ、改行など）を取り除いた新しい文字列を返します。ユーザー入力の処理でよく使われます。',
    example: 'user_input = "  hello world  \\n"\ncleaned = user_input.strip\nputs "\'#{cleaned}\'"\n# => \'hello world\'\n\n# フォームから受け取ったデータの処理\nname = "  Alice  "\nemail = "\\talice@example.com\\n"\nclean_name = name.strip\nclean_email = email.strip\nputs "Name: #{clean_name}"\nputs "Email: #{clean_email}"',
    syntax: 'string.strip\nstring.strip!',
    parameters: 'なし',
    returnValue: '前後の空白が除去された新しい文字列',
    version: '1.8.7',
  },
  {
    id: 10,
    name: 'split',
    description: '文字列を指定した文字で分割して、配列にします。',
    detailedDescription: 'splitメソッドは文字列を指定した区切り文字で分割し、結果を配列として返します。CSVデータの解析やURLの分解などでよく使われます。',
    example: 'text = "apple,banana,cherry"\nfruits = text.split(",")\nputs fruits\n# => ["apple", "banana", "cherry"]\n\n# スペースで分割（デフォルト）\nsentence = "Hello Ruby World"\nwords = sentence.split\nputs words\n# => ["Hello", "Ruby", "World"]\n\n# 分割数を制限\ndata = "a:b:c:d:e"\nparts = data.split(":", 3)\nputs parts\n# => ["a", "b", "c:d:e"]',
    syntax: 'string.split(separator, limit)',
    parameters: 'separator: 区切り文字（省略時は空白）、limit: 分割数の上限',
    returnValue: '分割された文字列の配列',
    version: '1.8.7',
  },
  {
    id: 11,
    name: 'gsub',
    description: '文字列内の指定したパターンを別の文字列に置き換えます。',
    detailedDescription: 'gsubメソッドは文字列内のすべてのマッチするパターンを指定した文字列に置き換えた新しい文字列を返します。正規表現も使用できます。',
    example: 'text = "Hello World World"\nresult = text.gsub("World", "Ruby")\nputs result\n# => "Hello Ruby Ruby"\n\n# 正規表現を使用\nphone = "090-1234-5678"\ndigits_only = phone.gsub(/-/, "")\nputs digits_only\n# => "09012345678"\n\n# ブロックを使用した高度な置換\ntext = "I have 3 apples and 5 oranges"\nresult = text.gsub(/\\d+/) { |num| (num.to_i * 2).to_s }\nputs result\n# => "I have 6 apples and 10 oranges"',
    syntax: 'string.gsub(pattern, replacement)\nstring.gsub(pattern) { |match| block }',
    parameters: 'pattern: 検索パターン、replacement: 置換文字列またはブロック',
    returnValue: '置換された新しい文字列',
    version: '1.8.7',
  },

  // ハッシュメソッド
  {
    id: 12,
    name: 'keys',
    description: 'ハッシュのすべてのキーを配列として取得します。',
    detailedDescription: 'keysメソッドはハッシュに含まれるすべてのキーを配列として返します。キーの順序は挿入順序で保持されます（Ruby 1.9以降）。',
    example: 'person = { name: "Alice", age: 25, city: "Tokyo" }\nall_keys = person.keys\nputs all_keys\n# => [:name, :age, :city]\n\n# 文字列キーのハッシュ\nconfig = { "host" => "localhost", "port" => 3000 }\nkeys = config.keys\nputs keys\n# => ["host", "port"]',
    syntax: 'hash.keys',
    parameters: 'なし',
    returnValue: 'キーの配列',
    version: '1.8.7',
  },
  {
    id: 13,
    name: 'values',
    description: 'ハッシュのすべての値を配列として取得します。',
    detailedDescription: 'valuesメソッドはハッシュに含まれるすべての値を配列として返します。',
    example: 'scores = { math: 85, english: 92, science: 78 }\nall_scores = scores.values\nputs all_scores\n# => [85, 92, 78]\n\n# 平均点を計算\naverage = all_scores.sum / all_scores.length.to_f\nputs "平均点: #{average}"\n# => 平均点: 85.0',
    syntax: 'hash.values',
    parameters: 'なし',
    returnValue: '値の配列',
    version: '1.8.7',
  },
  {
    id: 14,
    name: 'merge',
    description: '二つのハッシュを結合して、新しいハッシュを作ります。',
    detailedDescription: 'mergeメソッドは現在のハッシュに別のハッシュの内容を結合した新しいハッシュを返します。重複するキーがある場合は、引数のハッシュの値が優先されます。',
    example: 'default_config = { host: "localhost", port: 3000, ssl: false }\nuser_config = { port: 8080, ssl: true }\nfinal_config = default_config.merge(user_config)\nputs final_config\n# => {:host=>"localhost", :port=>8080, :ssl=>true}\n\n# 元のハッシュは変更されない\nputs default_config\n# => {:host=>"localhost", :port=>3000, :ssl=>false}',
    syntax: 'hash1.merge(hash2)\nhash1.merge(hash2) { |key, old_val, new_val| block }',
    parameters: 'hash2: 結合するハッシュ、ブロック: 重複キーの処理方法',
    returnValue: '結合された新しいハッシュ',
    version: '1.8.7',
  },

  // 数値メソッド
  {
    id: 15,
    name: 'times',
    description: '指定した回数だけ処理を繰り返します。',
    detailedDescription: 'timesメソッドは数値が示す回数だけブロック内の処理を繰り返し実行します。ブロックには0から始まるインデックスが渡されます。',
    example: '5.times { |i| puts "#{i + 1}回目の処理" }\n# => 1回目の処理\n# => 2回目の処理\n# => 3回目の処理\n# => 4回目の処理\n# => 5回目の処理\n\n# 配列を作成\nresult = []\n3.times { |i| result << i * i }\nputs result\n# => [0, 1, 4]',
    syntax: 'number.times { |index| block }',
    parameters: 'ブロック: 繰り返し実行する処理',
    returnValue: '元の数値',
    version: '1.8.7',
  },
  {
    id: 16,
    name: 'round',
    description: '数値を指定した桁数で四捨五入します。',
    detailedDescription: 'roundメソッドは数値を指定した小数点以下の桁数で四捨五入します。引数を省略すると整数に四捨五入されます。',
    example: 'pi = 3.14159\nrounded = pi.round(2)\nputs rounded\n# => 3.14\n\n# 整数に四捨五入\nnum = 2.7\ninteger = num.round\nputs integer\n# => 3\n\n# 負の値で桁を指定（10の位で四捨五入）\nbig_num = 1234.5\nrounded_tens = big_num.round(-1)\nputs rounded_tens\n# => 1230',
    syntax: 'number.round(precision)',
    parameters: 'precision: 小数点以下の桁数（省略時は0）',
    returnValue: '四捨五入された数値',
    version: '1.8.7',
  },

  // その他のよく使うメソッド
  {
    id: 17,
    name: 'length',
    description: '配列や文字列の要素数や文字数を取得します。',
    detailedDescription: 'lengthメソッド（sizeも同じ）は、配列の要素数や文字列の文字数を返します。非常によく使われる基本的なメソッドです。',
    example: 'fruits = ["apple", "banana", "cherry"]\ncount = fruits.length\nputs count\n# => 3\n\n# 文字列の場合\ntext = "Hello Ruby"\nchar_count = text.length\nputs char_count\n# => 10\n\n# 空かどうかの判定に使用\nif fruits.length > 0\n  puts "果物があります"\nelse\n  puts "果物がありません"\nend',
    syntax: 'array.length\nstring.length\narray.size\nstring.size',
    parameters: 'なし',
    returnValue: '要素数または文字数（整数）',
    version: '1.8.7',
  },
  {
    id: 18,
    name: 'empty?',
    description: '配列や文字列が空かどうかを判定します。',
    detailedDescription: 'empty?メソッドは配列に要素がない、または文字列に文字がない場合にtrueを返します。条件分岐でよく使われます。',
    example: 'fruits = []\nif fruits.empty?\n  puts "果物がありません"\nelse\n  puts "果物があります"\nend\n# => 果物がありません\n\n# 文字列の場合\nname = ""\nif name.empty?\n  puts "名前が入力されていません"\nend\n# => 名前が入力されていません\n\n# 空白文字があるかのチェック\ntext = "  "\nputs text.empty?        # => false\nputs text.strip.empty?  # => true',
    syntax: 'array.empty?\nstring.empty?',
    parameters: 'なし',
    returnValue: '空の場合 true、そうでなければ false',
    version: '1.8.7',
  },
  {
    id: 19,
    name: 'include?',
    description: '配列や文字列に指定した要素や文字列が含まれているかを判定します。',
    detailedDescription: 'include?メソッドは、配列に指定した要素が含まれているか、または文字列に指定した部分文字列が含まれているかを判定します。',
    example: 'fruits = ["apple", "banana", "cherry"]\nhas_apple = fruits.include?("apple")\nputs has_apple\n# => true\n\n# 文字列の場合\nemail = "user@example.com"\nhas_at = email.include?("@")\nputs has_at\n# => true\n\n# 条件分岐で使用\nif fruits.include?("banana")\n  puts "バナナがあります"\nend\n# => バナナがあります',
    syntax: 'array.include?(object)\nstring.include?(substring)',
    parameters: 'object: 検索する要素、substring: 検索する部分文字列',
    returnValue: '含まれている場合 true、そうでなければ false',
    version: '1.8.7',
  },
  {
    id: 20,
    name: 'join',
    description: '配列の要素を指定した文字列で連結します。',
    detailedDescription: 'joinメソッドは配列の要素を指定した区切り文字で連結した文字列を返します。splitの逆の操作として使われることが多いです。',
    example: 'words = ["Hello", "Ruby", "World"]\nsentence = words.join(" ")\nputs sentence\n# => "Hello Ruby World"\n\n# カンマで区切る\nfruits = ["apple", "banana", "cherry"]\nlist = fruits.join(", ")\nputs list\n# => "apple, banana, cherry"\n\n# 区切り文字なし\nnumbers = [1, 2, 3, 4, 5]\nresult = numbers.join\nputs result\n# => "12345"',
    syntax: 'array.join(separator)',
    parameters: 'separator: 区切り文字（省略時は空文字）',
    returnValue: '連結された文字列',
    version: '1.8.7',
  }
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState({ groupId: 'basics', genreId: 'variables' });
  const [selectedIds, setSelectedIds] = useState(new Set());

  const handleSelect = (id) => {
    setSelectedIds(prev => new Set(prev).add(id));
  };

  const handleDeselect = (id) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleSectionChange = (genreId, groupId) => {
    setActiveSection({ groupId, genreId });
  };

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
            onSectionChange={handleSectionChange}
          />
          <main style={styles.main}>
            <h1 style={styles.title}>
              <span style={styles.accent}>Ruby</span> メソッドリファレンス
            </h1>
            <MethodGrid 
              methods={methods} 
              selectedIds={selectedIds}
              onSelect={handleSelect}
              onDeselect={handleDeselect}
            />
          </main>
        </div>
      </div>
    </>
  );
} 