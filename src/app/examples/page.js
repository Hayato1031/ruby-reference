"use client";

import Navigation from '../components/Navigation';
import { colors, shadows } from '../constants/styles';
import { useState } from 'react';
import { Sprout, Rocket, Flame, Briefcase, Gem } from 'lucide-react';
import highlightRubyCode from '../utils/syntaxHighlight';

const ExamplesPage = () => {
  const [activeCategory, setActiveCategory] = useState('basic');
  const [selectedExample, setSelectedExample] = useState(null);

  const categories = [
    { id: 'basic', name: '基本', icon: Sprout, color: '#10b981' },
    { id: 'intermediate', name: '中級', icon: Rocket, color: '#f59e0b' },
    { id: 'advanced', name: '上級', icon: Flame, color: '#ef4444' },
    { id: 'practical', name: '実用的', icon: Briefcase, color: '#8b5cf6' },
  ];

  const examples = {
    basic: [
      {
        id: 1,
        title: 'Hello World',
        difficulty: '★☆☆',
        syntax: ['puts', 'string'],
        description: 'Rubyの基本的な出力処理',
        code: `# 基本的な出力
puts "Hello, World!"
puts "Ruby を始めよう！"

# 変数を使った出力
name = "太郎"
puts "こんにちは、#{name}さん！"`,
        output: `Hello, World!
Ruby を始めよう！
こんにちは、太郎さん！`,
        explanation: 'putsメソッドを使って文字列を出力します。#{変数名}で文字列内に変数を埋め込めます。'
      },
      {
        id: 2,
        title: '変数と演算',
        difficulty: '★☆☆',
        syntax: ['variables', 'operators'],
        description: '基本的な変数の使い方と演算',
        code: `# 数値の計算
a = 10
b = 3
puts "#{a} + #{b} = #{a + b}"
puts "#{a} * #{b} = #{a * b}"

# 文字列の操作
first_name = "太郎"
last_name = "田中"
full_name = last_name + first_name
puts "フルネーム: #{full_name}"`,
        output: `10 + 3 = 13
10 * 3 = 30
フルネーム: 田中太郎`,
        explanation: '変数に値を代入し、演算子で計算や文字列の結合を行います。'
      },
      {
        id: 3,
        title: '配列の基本',
        difficulty: '★★☆',
        syntax: ['array', 'each'],
        description: '配列の作成と基本的な操作',
        code: `# 配列の作成
fruits = ["りんご", "バナナ", "オレンジ"]
puts "果物の種類: #{fruits.length}個"

# 配列の各要素を出力
fruits.each do |fruit|
  puts "好きな果物: #{fruit}"
end

# 要素の追加
fruits << "いちご"
puts "追加後: #{fruits}"`,
        output: `果物の種類: 3個
好きな果物: りんご
好きな果物: バナナ
好きな果物: オレンジ
追加後: ["りんご", "バナナ", "オレンジ", "いちご"]`,
        explanation: '配列の作成、要素の反復処理、要素の追加方法を学びます。'
      },
      {
        id: 10,
        title: '条件分岐（if文）',
        difficulty: '★☆☆',
        syntax: ['if', 'elsif', 'else'],
        description: '基本的な条件分岐の使い方',
        code: `# 年齢による判定
age = 20

if age >= 20
  puts "成人です"
elsif age >= 13
  puts "10代です"
else
  puts "子供です"
end

# 三項演算子
message = age >= 18 ? "大人" : "子供"
puts "分類: #{message}"`,
        output: `成人です
分類: 大人`,
        explanation: 'if文を使った条件分岐と三項演算子の使い方を学びます。'
      },
      {
        id: 11,
        title: 'ループ処理',
        difficulty: '★★☆',
        syntax: ['for', 'while', 'times'],
        description: '基本的なループ処理の使い方',
        code: `# times を使ったループ
3.times do |i|
  puts "#{i + 1}回目の実行"
end

# for文
for num in 1..5
  puts "数字: #{num}"
end

# while文
count = 0
while count < 3
  puts "カウント: #{count}"
  count += 1
end`,
        output: `1回目の実行
2回目の実行
3回目の実行
数字: 1
数字: 2
数字: 3
数字: 4
数字: 5
カウント: 0
カウント: 1
カウント: 2`,
        explanation: 'times、for、whileを使った様々なループ処理を学びます。'
      },
      {
        id: 12,
        title: 'ハッシュの基本',
        difficulty: '★★☆',
        syntax: ['hash', 'keys', 'values'],
        description: 'ハッシュの作成と基本操作',
        code: `# ハッシュの作成
person = {
  "name" => "田中太郎",
  "age" => 25,
  "city" => "東京"
}

# シンボルを使ったハッシュ
student = {
  name: "佐藤花子",
  grade: 3,
  subject: "数学"
}

puts "名前: #{person['name']}"
puts "学生: #{student[:name]}"
puts "キー一覧: #{student.keys}"
puts "値一覧: #{student.values}"`,
        output: `名前: 田中太郎
学生: 佐藤花子
キー一覧: [:name, :grade, :subject]
値一覧: ["佐藤花子", 3, "数学"]`,
        explanation: 'ハッシュの作成方法とキーでの値の取得、keys/valuesメソッドを学びます。'
      },
      {
        id: 26,
        title: '数値と計算',
        difficulty: '★☆☆',
        syntax: ['Integer', 'Float', 'Math'],
        description: '数値の型と基本的な計算処理',
        code: `# 整数と浮動小数点数
integer_num = 42
float_num = 3.14
puts "整数: #{integer_num} (#{integer_num.class})"
puts "小数: #{float_num} (#{float_num.class})"

# 基本的な計算
puts "足し算: #{5 + 3}"
puts "引き算: #{10 - 4}"
puts "掛け算: #{6 * 7}"
puts "割り算: #{15 / 4}"  # 整数除算
puts "割り算（小数）: #{15.0 / 4}"

# 便利なメソッド
puts "絶対値: #{-5.abs}"
puts "四捨五入: #{3.7.round}"
puts "切り上げ: #{3.2.ceil}"
puts "切り下げ: #{3.9.floor}"`,
        output: `整数: 42 (Integer)
小数: 3.14 (Float)
足し算: 8
引き算: 6
掛け算: 42
割り算: 3
割り算（小数）: 3.75
絶対値: 5
四捨五入: 4
切り上げ: 4
切り下げ: 3`,
        explanation: '整数と浮動小数点数の違い、基本的な算術演算、数値操作メソッドを学習します。'
      },
      {
        id: 27,
        title: '文字列の基本操作',
        difficulty: '★☆☆',
        syntax: ['String', 'length', 'upcase', 'downcase'],
        description: '文字列の基本的な操作方法',
        code: `# 文字列の作成
greeting = "こんにちは"
name = "Ruby"

# 文字列の結合
message = greeting + "、" + name + "！"
puts message

# 文字列の情報取得
puts "文字数: #{message.length}"
puts "バイト数: #{message.bytesize}"

# 大文字・小文字変換
english = "Hello World"
puts "大文字: #{english.upcase}"
puts "小文字: #{english.downcase}"
puts "最初だけ大文字: #{english.capitalize}"

# 文字列の繰り返し
puts "Ruby " * 3

# 文字列に含まれるかチェック
puts "Rubyが含まれる？: #{message.include?('Ruby')}"`,
        output: `こんにちは、Ruby！
文字数: 9
バイト数: 17
大文字: HELLO WORLD
小文字: hello world
最初だけ大文字: Hello world
Ruby Ruby Ruby 
Rubyが含まれる？: true`,
        explanation: '文字列の結合、長さ取得、大文字小文字変換、検索などの基本操作を学びます。'
      },
      {
        id: 28,
        title: 'true/false（真偽値）',
        difficulty: '★☆☆',
        syntax: ['boolean', 'true', 'false', 'nil'],
        description: 'Rubyの真偽値とnilの扱い',
        code: `# 真偽値の基本
is_ruby_fun = true
is_difficult = false

puts "Rubyは楽しい？: #{is_ruby_fun}"
puts "難しい？: #{is_difficult}"

# 比較演算子
age = 20
puts "成人？: #{age >= 20}"
puts "未成年？: #{age < 20}"

# Rubyで「偽」とみなされるもの
puts "falseは偽: #{!false}"
puts "nilは偽: #{!nil}"
puts "0は真: #{!0}"      # 注意：他の言語と違い0は真
puts "空文字は真: #{!''}"    # 注意：空文字も真

# nil（何もない）の確認
value = nil
puts "nilかどうか: #{value.nil?}"

# 条件での使用
if is_ruby_fun
  puts "Rubyの勉強を続けよう！"
end`,
        output: `Rubyは楽しい？: true
難しい？: false
成人？: true
未成年？: false
falseは偽: true
nilは偽: true
0は真: true
空文字は真: true
nilかどうか: true
Rubyの勉強を続けよう！`,
        explanation: 'Rubyの真偽値、nil、比較演算子の使い方を学びます。Rubyでは false と nil 以外は全て真です。'
      },
      {
        id: 29,
        title: 'range（範囲）',
        difficulty: '★★☆',
        syntax: ['Range', '..', '...', 'to_a'],
        description: '範囲オブジェクトの使い方',
        code: `# 範囲の作成
range1 = 1..5      # 1から5まで（5を含む）
range2 = 1...5     # 1から5まで（5を含まない）

puts "1..5の範囲: #{range1.to_a}"
puts "1...5の範囲: #{range2.to_a}"

# 文字の範囲
alphabet = 'a'..'e'
puts "aからeまで: #{alphabet.to_a}"

# 範囲を使ったループ
puts "1から3まで数える:"
(1..3).each do |num|
  puts "  #{num}"
end

# 配列のスライス
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
puts "2番目から4番目まで: #{numbers[2..4]}"
puts "最後の3つ: #{numbers[-3..-1]}"

# 範囲に含まれるかチェック
score = 85
grade_a = 90..100
grade_b = 80..89

if grade_a.include?(score)
  puts "成績：A"
elsif grade_b.include?(score)
  puts "成績：B"
end`,
        output: `1..5の範囲: [1, 2, 3, 4, 5]
1...5の範囲: [1, 2, 3, 4]
aからeまで: ["a", "b", "c", "d", "e"]
1から3まで数える:
  1
  2
  3
2番目から4番目まで: [2, 3, 4]
最後の3つ: [7, 8, 9]
成績：B`,
        explanation: '範囲オブジェクトの作成と使用方法を学びます。..は終端を含み、...は含みません。'
      },
      {
        id: 30,
        title: 'メソッドの定義',
        difficulty: '★★☆',
        syntax: ['def', 'return', 'parameters'],
        description: '独自のメソッドの定義と呼び出し',
        code: `# 引数なしのメソッド
def say_hello
  puts "こんにちは！"
end

# 引数ありのメソッド
def greet(name)
  puts "こんにちは、#{name}さん！"
end

# 戻り値のあるメソッド
def add(a, b)
  a + b  # 最後の式が自動的に戻り値になる
end

# returnを明示的に使う
def multiply(a, b)
  return a * b
end

# デフォルト引数
def introduce(name, age = 20)
  puts "私は#{name}、#{age}歳です"
end

# 可変長引数
def sum(*numbers)
  total = 0
  numbers.each { |num| total += num }
  total
end

# メソッドの呼び出し
say_hello
greet("太郎")
puts "足し算の結果: #{add(5, 3)}"
puts "掛け算の結果: #{multiply(4, 6)}"
introduce("花子")
introduce("次郎", 25)
puts "合計: #{sum(1, 2, 3, 4, 5)}"`,
        output: `こんにちは！
こんにちは、太郎さん！
足し算の結果: 8
掛け算の結果: 24
私は花子、20歳です
私は次郎、25歳です
合計: 15`,
        explanation: 'メソッドの定義、引数、戻り値、デフォルト引数、可変長引数の使い方を学びます。'
      },
      {
        id: 31,
        title: 'シンボル（Symbol）',
        difficulty: '★★☆',
        syntax: ['Symbol', ':', 'to_s', 'to_sym'],
        description: 'シンボルの概念と使い方',
        code: `# シンボルの作成
symbol1 = :hello
symbol2 = :ruby_programming

puts "シンボル1: #{symbol1}"
puts "シンボル2: #{symbol2}"
puts "クラス: #{symbol1.class}"

# 文字列との違い
string = "hello"
symbol = :hello

puts "文字列のobject_id: #{string.object_id}"
puts "同じ文字列のobject_id: #{'hello'.object_id}"
puts "シンボルのobject_id: #{symbol.object_id}"
puts "同じシンボルのobject_id: #{:hello.object_id}"

# 変換
puts "シンボル→文字列: #{symbol.to_s}"
puts "文字列→シンボル: #{string.to_sym}"

# ハッシュのキーとして使用（よくある使い方）
person = {
  name: "田中太郎",    # name: は :name => の省略形
  age: 30,
  city: "東京"
}

puts "名前: #{person[:name]}"
puts "年齢: #{person[:age]}"

# シンボルの配列
colors = [:red, :green, :blue]
puts "色の配列: #{colors}"`,
        output: `シンボル1: hello
シンボル2: ruby_programming
クラス: Symbol
文字列のobject_id: 60
同じ文字列のobject_id: 80
シンボルのobject_id: 1086748
同じシンボルのobject_id: 1086748
シンボル→文字列: hello
文字列→シンボル: hello
名前: 田中太郎
年齢: 30
色の配列: [:red, :green, :blue]`,
        explanation: 'シンボルは文字列に似ていますが、同じシンボルは常に同じオブジェクトです。ハッシュのキーなどでよく使われます。'
      },
      {
        id: 32,
        title: '配列の便利メソッド',
        difficulty: '★★☆',
        syntax: ['Array', 'first', 'last', 'empty?', 'include?'],
        description: '配列の便利なメソッドを覚えよう',
        code: `# 配列の作成
numbers = [1, 2, 3, 4, 5]
fruits = ["りんご", "バナナ", "オレンジ"]
empty_array = []

# 要素へのアクセス
puts "最初の要素: #{numbers.first}"
puts "最後の要素: #{numbers.last}"
puts "2番目の要素: #{numbers[1]}"
puts "後ろから2番目: #{numbers[-2]}"

# 配列の情報
puts "要素数: #{numbers.length}"
puts "空かどうか: #{empty_array.empty?}"
puts "3が含まれる？: #{numbers.include?(3)}"
puts "配列の最小値: #{numbers.min}"
puts "配列の最大値: #{numbers.max}"

# 要素の追加・削除
fruits << "ぶどう"              # 末尾に追加
puts "追加後: #{fruits}"

removed = fruits.pop             # 末尾から削除
puts "削除した要素: #{removed}"
puts "削除後: #{fruits}"

# 配列の結合
all_items = numbers + fruits
puts "結合した配列: #{all_items}"

# 配列の並び替え
mixed_numbers = [3, 1, 4, 1, 5, 9, 2, 6]
puts "元の配列: #{mixed_numbers}"
puts "昇順ソート: #{mixed_numbers.sort}"
puts "降順ソート: #{mixed_numbers.sort.reverse}"`,
        output: `最初の要素: 1
最後の要素: 5
2番目の要素: 2
後ろから2番目: 4
要素数: 5
空かどうか: true
3が含まれる？: true
配列の最小値: 1
配列の最大値: 5
追加後: ["りんご", "バナナ", "オレンジ", "ぶどう"]
削除した要素: ぶどう
削除後: ["りんご", "バナナ", "オレンジ"]
結合した配列: [1, 2, 3, 4, 5, "りんご", "バナナ", "オレンジ"]
元の配列: [3, 1, 4, 1, 5, 9, 2, 6]
昇順ソート: [1, 1, 2, 3, 4, 5, 6, 9]
降順ソート: [9, 6, 5, 4, 3, 2, 1, 1]`,
        explanation: '配列の基本的なメソッドを使って、要素の取得、追加、削除、並び替えなどを行います。'
      }
    ],
    intermediate: [
      {
        id: 4,
        title: 'ハッシュとメソッド',
        difficulty: '★★☆',
        syntax: ['hash', 'methods', 'def'],
        description: 'ハッシュとメソッド定義の組み合わせ',
        code: `# メソッドの定義
def calculate_age(birth_year)
  current_year = 2024
  current_year - birth_year
end

# ハッシュを使った人物情報
person = {
  name: "田中太郎",
  birth_year: 1990,
  city: "東京"
}

age = calculate_age(person[:birth_year])
puts "#{person[:name]}さんは#{age}歳です"
puts "#{person[:city]}在住です"`,
        output: `田中太郎さんは34歳です
東京在住です`,
        explanation: 'メソッドを定義してハッシュのデータを処理します。'
      },
      {
        id: 5,
        title: 'クラスの基本',
        difficulty: '★★★',
        syntax: ['class', 'initialize', 'attr_accessor'],
        description: 'オブジェクト指向プログラミングの基礎',
        code: `class Person
  attr_accessor :name, :age
  
  def initialize(name, age)
    @name = name
    @age = age
  end
  
  def introduce
    "こんにちは、#{@name}です。#{@age}歳です。"
  end
  
  def adult?
    @age >= 20
  end
end

# インスタンスの作成
person1 = Person.new("佐藤花子", 25)
person2 = Person.new("山田次郎", 17)

puts person1.introduce
puts "成人: #{person1.adult? ? 'はい' : 'いいえ'}"
puts person2.introduce
puts "成人: #{person2.adult? ? 'はい' : 'いいえ'}"`,
        output: `こんにちは、佐藤花子です。25歳です。
成人: はい
こんにちは、山田次郎です。17歳です。
成人: いいえ`,
        explanation: 'クラスを定義してオブジェクトを作成し、メソッドを呼び出します。'
      },
      {
        id: 13,
        title: '配列操作とメソッド',
        difficulty: '★★☆',
        syntax: ['array', 'push', 'pop', 'shift', 'unshift'],
        description: '配列への要素の追加・削除操作',
        code: `# 配列の操作
fruits = ["りんご", "バナナ"]

# 末尾に追加
fruits.push("オレンジ")
fruits << "ぶどう"

puts "追加後: #{fruits}"

# 末尾から削除
last_fruit = fruits.pop
puts "削除した果物: #{last_fruit}"
puts "削除後: #{fruits}"

# 先頭に追加・削除
fruits.unshift("いちご")
puts "先頭追加後: #{fruits}"

first_fruit = fruits.shift
puts "先頭削除: #{first_fruit}"
puts "最終結果: #{fruits}"`,
        output: `追加後: ["りんご", "バナナ", "オレンジ", "ぶどう"]
削除した果物: ぶどう
削除後: ["りんご", "バナナ", "オレンジ"]
先頭追加後: ["いちご", "りんご", "バナナ", "オレンジ"]
先頭削除: いちご
最終結果: ["りんご", "バナナ", "オレンジ"]`,
        explanation: 'push/pop（末尾）、shift/unshift（先頭）を使った配列操作を学びます。'
      },
      {
        id: 14,
        title: '文字列操作',
        difficulty: '★★☆',
        syntax: ['string', 'gsub', 'split', 'strip'],
        description: '文字列の加工と操作メソッド',
        code: `# 文字列の操作
text = "  Hello Ruby World  "

# 前後の空白を削除
clean_text = text.strip
puts "空白削除: '#{clean_text}'"

# 文字列の置換
replaced = clean_text.gsub("Ruby", "Python")
puts "置換後: #{replaced}"

# 文字列の分割
words = clean_text.split(" ")
puts "分割結果: #{words}"

# 大文字・小文字変換
puts "大文字: #{clean_text.upcase}"
puts "小文字: #{clean_text.downcase}"

# 文字列の長さ
puts "文字数: #{clean_text.length}"`,
        output: `空白削除: 'Hello Ruby World'
置換後: Hello Python World
分割結果: ["Hello", "Ruby", "World"]
大文字: HELLO RUBY WORLD
小文字: hello ruby world
文字数: 17`,
        explanation: '文字列の前後空白削除、置換、分割、大文字小文字変換などの操作を学びます。'
      },
      {
        id: 15,
        title: '継承とオーバーライド',
        difficulty: '★★★',
        syntax: ['class', 'inheritance', 'super'],
        description: 'クラスの継承とメソッドのオーバーライド',
        code: `# 基底クラス
class Animal
  def initialize(name)
    @name = name
  end
  
  def speak
    "#{@name}が鳴いています"
  end
  
  def introduce
    "私は#{@name}です"
  end
end

# 継承クラス
class Dog < Animal
  def speak
    "#{@name}がワンワン！"
  end
  
  def introduce
    super + "。犬です。"
  end
end

class Cat < Animal
  def speak
    "#{@name}がニャーニャー！"
  end
end

# インスタンス作成
dog = Dog.new("ポチ")
cat = Cat.new("タマ")

puts dog.introduce
puts dog.speak
puts cat.introduce
puts cat.speak`,
        output: `私はポチです。犬です。
ポチがワンワン！
私はタマです
タマがニャーニャー！`,
        explanation: 'クラスの継承、メソッドのオーバーライド、superキーワードの使い方を学びます。'
      },
      {
        id: 16,
        title: '例外処理',
        difficulty: '★★★',
        syntax: ['begin', 'rescue', 'ensure', 'raise'],
        description: 'エラーハンドリングと例外処理',
        code: `# 例外処理の基本
def safe_divide(a, b)
  begin
    result = a / b
    puts "#{a} ÷ #{b} = #{result}"
    result
  rescue ZeroDivisionError => e
    puts "エラー: ゼロで割ることはできません"
    puts "詳細: #{e.message}"
    nil
  rescue => e
    puts "予期しないエラー: #{e.class}"
    nil
  ensure
    puts "計算処理が完了しました"
  end
end

# 正常なケース
safe_divide(10, 2)
puts "---"

# エラーケース
safe_divide(10, 0)
puts "---"

# カスタム例外
def check_age(age)
  raise "年齢は0以上である必要があります" if age < 0
  puts "年齢: #{age}歳"
end

begin
  check_age(-5)
rescue => e
  puts "エラーをキャッチ: #{e.message}"
end`,
        output: `10 ÷ 2 = 5
計算処理が完了しました
---
エラー: ゼロで割ることはできません
詳細: divided by 0
計算処理が完了しました
---
エラーをキャッチ: 年齢は0以上である必要があります`,
        explanation: 'begin-rescue-ensureを使った例外処理とraiseでの例外発生を学びます。'
      },
      {
        id: 33,
        title: 'each以外のイテレータ',
        difficulty: '★★☆',
        syntax: ['map', 'select', 'reject', 'find'],
        description: '配列を操作する便利なイテレータメソッド',
        code: `# サンプルデータ
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
words = ["apple", "banana", "cherry", "date"]

# map: 各要素を変換して新しい配列を作る
doubled = numbers.map { |n| n * 2 }
puts "2倍した配列: #{doubled}"

upcase_words = words.map { |word| word.upcase }
puts "大文字に変換: #{upcase_words}"

# select: 条件に合う要素だけを選ぶ
even_numbers = numbers.select { |n| n.even? }
puts "偶数のみ: #{even_numbers}"

long_words = words.select { |word| word.length > 5 }
puts "5文字より長い単語: #{long_words}"

# reject: 条件に合わない要素を選ぶ（selectの逆）
odd_numbers = numbers.reject { |n| n.even? }
puts "奇数のみ: #{odd_numbers}"

# find: 条件に合う最初の要素を見つける
first_even = numbers.find { |n| n.even? }
puts "最初の偶数: #{first_even}"

# count: 条件に合う要素の個数を数える
even_count = numbers.count { |n| n.even? }
puts "偶数の個数: #{even_count}"

# any?: 条件に合う要素が1つでもあるか
has_big_number = numbers.any? { |n| n > 8 }
puts "8より大きい数がある？: #{has_big_number}"

# all?: 全ての要素が条件に合うか
all_positive = numbers.all? { |n| n > 0 }
puts "全て正の数？: #{all_positive}"`,
        output: `2倍した配列: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
大文字に変換: ["APPLE", "BANANA", "CHERRY", "DATE"]
偶数のみ: [2, 4, 6, 8, 10]
5文字より長い単語: ["banana", "cherry"]
奇数のみ: [1, 3, 5, 7, 9]
最初の偶数: 2
偶数の個数: 5
8より大きい数がある？: true
全て正の数？: true`,
        explanation: '配列の各要素に対して処理を行う便利なメソッドを学びます。each以外にも多くの便利なメソッドがあります。'
      },
      {
        id: 34,
        title: 'ハッシュの高度な操作',
        difficulty: '★★☆',
        syntax: ['Hash', 'merge', 'each', 'transform_values'],
        description: 'ハッシュの様々な操作方法',
        code: `# ハッシュの作成
person = {
  name: "田中太郎",
  age: 30,
  city: "東京",
  hobbies: ["読書", "映画鑑賞"]
}

# ハッシュの情報取得
puts "全てのキー: #{person.keys}"
puts "全ての値: #{person.values}"
puts "要素数: #{person.length}"

# ハッシュの各要素に対する処理
puts "\\n個人情報:"
person.each do |key, value|
  puts "  #{key}: #{value}"
end

# キーの存在確認
puts "\\n年齢情報がある？: #{person.has_key?(:age)}"
puts "職業情報がある？: #{person.has_key?(:job)}"

# ハッシュのマージ
additional_info = {
  job: "エンジニア",
  experience: 5
}

full_info = person.merge(additional_info)
puts "\\nマージ後の情報:"
full_info.each { |k, v| puts "  #{k}: #{v}" }

# 値だけを変換
ages_in_months = { age: person[:age] }
monthly_age = ages_in_months.transform_values { |age| age * 12 }
puts "\\n月齢: #{monthly_age[:age]}ヶ月"

# 条件に合うペアだけを選択
numeric_data = full_info.select { |key, value| value.is_a?(Numeric) }
puts "\\n数値データのみ:"
numeric_data.each { |k, v| puts "  #{k}: #{v}" }

# デフォルト値の設定
hash_with_default = Hash.new("不明")
hash_with_default[:name] = "佐藤花子"
puts "\\n名前: #{hash_with_default[:name]}"
puts "年齢: #{hash_with_default[:age]}"  # キーが存在しない場合はデフォルト値`,
        output: `全てのキー: [:name, :age, :city, :hobbies]
全ての値: ["田中太郎", 30, "東京", ["読書", "映画鑑賞"]]
要素数: 4

個人情報:
  name: 田中太郎
  age: 30
  city: 東京
  hobbies: ["読書", "映画鑑賞"]

年齢情報がある？: true
職業情報がある？: false

マージ後の情報:
  name: 田中太郎
  age: 30
  city: 東京
  hobbies: ["読書", "映画鑑賞"]
  job: エンジニア
  experience: 5

月齢: 360ヶ月

数値データのみ:
  age: 30
  experience: 5

名前: 佐藤花子
年齢: 不明`,
        explanation: 'ハッシュの高度な操作方法を学びます。merge、select、transform_valuesなどの便利なメソッドを覚えましょう。'
      },
      {
        id: 35,
        title: 'ブロック付きメソッドの自作',
        difficulty: '★★★',
        syntax: ['yield', 'block_given?', '&block'],
        description: 'ブロックを受け取るメソッドの作成',
        code: `# ブロックを受け取るメソッドの定義
def repeat_task(times)
  puts "タスクを#{times}回実行します"
  
  times.times do |i|
    if block_given?
      yield(i + 1)  # ブロックに引数を渡して実行
    else
      puts "  #{i + 1}回目の実行"
    end
  end
  
  puts "タスク完了！"
end

# ブロックなしで呼び出し
repeat_task(3)

puts "\\n" + "="*30 + "\\n"

# ブロック付きで呼び出し
repeat_task(3) do |count|
  puts "  カスタム処理 #{count}回目: Hello!"
end

puts "\\n" + "="*30 + "\\n"

# より実用的な例：配列の各要素に処理を適用
def process_array(array)
  return "配列が空です" if array.empty?
  
  results = []
  array.each_with_index do |item, index|
    if block_given?
      processed = yield(item, index)
      results << processed
    else
      results << item
    end
  end
  
  results
end

numbers = [1, 2, 3, 4, 5]

# ブロックなし
puts "元の配列: #{process_array(numbers)}"

# ブロック付き：各要素を2倍
doubled = process_array(numbers) { |num, idx| num * 2 }
puts "2倍した結果: #{doubled}"

# ブロック付き：インデックス付きの文字列
indexed = process_array(["a", "b", "c"]) { |char, idx| "#{idx}:#{char}" }
puts "インデックス付き: #{indexed}"`,
        output: `タスクを3回実行します
  1回目の実行
  2回目の実行
  3回目の実行
タスク完了！

==============================

タスクを3回実行します
  カスタム処理 1回目: Hello!
  カスタム処理 2回目: Hello!
  カスタム処理 3回目: Hello!
タスク完了！

==============================

元の配列: [1, 2, 3, 4, 5]
2倍した結果: [2, 4, 6, 8, 10]
インデックス付き: ["0:a", "1:b", "2:c"]`,
        explanation: 'yieldとblock_given?を使って、ブロックを受け取るメソッドを作成します。これにより柔軟で再利用可能なメソッドが作れます。'
      },
      {
        id: 36,
        title: 'クラス変数とクラスメソッド',
        difficulty: '★★★',
        syntax: ['@@', 'self', 'class methods'],
        description: 'クラス変数とクラスメソッドの使い方',
        code: `class Student
  @@student_count = 0  # クラス変数（全インスタンスで共有）
  
  attr_accessor :name, :grade
  
  def initialize(name, grade)
    @name = name
    @grade = grade
    @@student_count += 1  # 学生が作られるたびにカウント増加
  end
  
  # インスタンスメソッド
  def introduce
    "#{@name}（#{@grade}年生）です"
  end
  
  # クラスメソッド（Student.total_countで呼び出し）
  def self.total_count
    @@student_count
  end
  
  def self.create_honor_student(name)
    # クラスメソッドから自クラスのインスタンスを作成
    new(name, "特待生")
  end
  
  # クラスメソッドの別の書き方
  class << self
    def reset_count
      @@student_count = 0
    end
    
    def average_grade(students)
      return 0 if students.empty?
      
      total = students.sum { |student| student.grade.to_i }
      total.to_f / students.length
    end
  end
end

# インスタンスの作成
puts "現在の学生数: #{Student.total_count}"

student1 = Student.new("田中太郎", 3)
student2 = Student.new("佐藤花子", 2)
puts "学生追加後: #{Student.total_count}"

puts student1.introduce
puts student2.introduce

# クラスメソッドでインスタンス作成
honor_student = Student.create_honor_student("山田次郎")
puts honor_student.introduce
puts "特待生追加後: #{Student.total_count}"

# 平均学年の計算（学年を数値に変換できるもののみ）
regular_students = [student1, student2]
avg = Student.average_grade(regular_students)
puts "平均学年: #{avg}年生"

# カウントリセット
Student.reset_count
puts "リセット後の学生数: #{Student.total_count}"`,
        output: `現在の学生数: 0
学生追加後: 2
田中太郎（3年生）です
佐藤花子（2年生）です
山田次郎（特待生）です
特待生追加後: 3
平均学年: 2.5年生
リセット後の学生数: 0`,
        explanation: 'クラス変数（@@）は全インスタンスで共有され、クラスメソッド（self.method_name）はクラス自体に対して呼び出します。'
      },
      {
        id: 37,
        title: 'attr系メソッドの詳細',
        difficulty: '★★☆',
        syntax: ['attr_reader', 'attr_writer', 'attr_accessor'],
        description: 'ゲッターとセッターの自動生成',
        code: `# 異なるattr系メソッドの比較
class Book
  # 読み取り専用（getter のみ）
  attr_reader :isbn, :pages
  
  # 書き込み専用（setter のみ）
  attr_writer :price
  
  # 読み書き両方可能（getter + setter）
  attr_accessor :title, :author
  
  def initialize(title, author, isbn, pages)
    @title = title
    @author = author
    @isbn = isbn
    @pages = pages
    @price = 0  # デフォルト価格
  end
  
  # priceは書き込み専用なので、読み取り用に独自メソッドを定義
  def display_price
    "#{@price}円"
  end
  
  # 本の情報を表示
  def info
    "『#{@title}』#{@author}著 (#{@isbn}) #{@pages}ページ #{display_price}"
  end
  
  # attr_readerと同じことを手動で書くと：
  # def isbn
  #   @isbn
  # end
  
  # attr_writerと同じことを手動で書くと：
  # def price=(value)
  #   @price = value
  # end
  
  # attr_accessorと同じことを手動で書くと：
  # def title
  #   @title
  # end
  # def title=(value)
  #   @title = value
  # end
end

# 本のインスタンス作成
book = Book.new("Ruby入門", "山田太郎", "978-0000000000", 300)

# attr_readerで読み取り可能
puts "ISBN: #{book.isbn}"
puts "ページ数: #{book.pages}"

# attr_accessorで読み書き可能
puts "タイトル: #{book.title}"
book.title = "Ruby完全マスター"  # 変更可能
puts "変更後タイトル: #{book.title}"

puts "著者: #{book.author}"
book.author = "田中花子"         # 変更可能
puts "変更後著者: #{book.author}"

# attr_writerで書き込み可能（直接読み取りはできない）
book.price = 2800
puts "価格: #{book.display_price}"

# エラーになる例（コメントアウト）
# puts book.price  # エラー：priceはattr_writerなので読み取りメソッドがない
# book.isbn = "new-isbn"  # エラー：isbnはattr_readerなので書き込みメソッドがない

puts "\\n本の情報: #{book.info}"`,
        output: `ISBN: 978-0000000000
ページ数: 300
タイトル: Ruby入門
変更後タイトル: Ruby完全マスター
著者: 山田太郎
変更後著者: 田中花子
価格: 2800円

本の情報: 『Ruby完全マスター』田中花子著 (978-0000000000) 300ページ 2800円`,
        explanation: 'attr_reader（読み取り専用）、attr_writer（書き込み専用）、attr_accessor（読み書き可能）の違いを理解しましょう。'
      }
    ],
    advanced: [
      {
        id: 6,
        title: 'ブロックとイテレータ',
        difficulty: '★★★',
        syntax: ['blocks', 'map', 'select', 'reduce'],
        description: '高度なブロック処理とイテレータの活用',
        code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# map: 各要素を変換
squares = numbers.map { |n| n ** 2 }
puts "平方数: #{squares}"

# select: 条件に合う要素を選択
evens = numbers.select { |n| n.even? }
puts "偶数: #{evens}"

# reduce: 畳み込み演算
sum = numbers.reduce(0) { |total, n| total + n }
puts "合計: #{sum}"

# チェーンメソッド
result = numbers
  .select { |n| n.odd? }
  .map { |n| n * 3 }
  .reduce(:+)
puts "奇数×3の合計: #{result}"`,
        output: `平方数: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
偶数: [2, 4, 6, 8, 10]
合計: 55
奇数×3の合計: 75`,
        explanation: 'ブロックを使った高度なデータ処理とメソッドチェーンを学びます。'
      },
      {
        id: 7,
        title: 'モジュールとMixin',
        difficulty: '★★★',
        syntax: ['module', 'include', 'extend'],
        description: 'モジュールを使ったコードの再利用',
        code: `module Greetable
  def greet
    "こんにちは、#{name}です！"
  end
  
  def farewell
    "#{name}です。さようなら！"
  end
end

module Calculable
  def add(a, b)
    a + b
  end
  
  def multiply(a, b)
    a * b
  end
end

class Student
  include Greetable
  extend Calculable
  
  attr_accessor :name, :grade
  
  def initialize(name, grade)
    @name = name
    @grade = grade
  end
end

student = Student.new("田中太郎", 3)
puts student.greet
puts student.farewell

# クラスメソッドとして使用
puts "計算結果: #{Student.add(5, 3)}"
puts "計算結果: #{Student.multiply(4, 7)}"`,
        output: `こんにちは、田中太郎です！
田中太郎です。さようなら！
計算結果: 8
計算結果: 28`,
        explanation: 'モジュールでコードを整理し、includeとextendで機能を追加します。'
      }
    ],
    practical: [
      {
        id: 8,
        title: 'ファイル処理',
        difficulty: '★★☆',
        syntax: ['File', 'IO', 'each_line'],
        description: 'ファイルの読み書き処理',
        code: `# ファイルに書き込み
File.open("sample.txt", "w") do |file|
  file.puts "こんにちは、世界！"
  file.puts "Rubyでファイル処理"
  file.puts "#{Time.now}"
end

# ファイルから読み込み
puts "ファイルの内容:"
File.open("sample.txt", "r") do |file|
  file.each_line.with_index(1) do |line, number|
    puts "#{number}: #{line.chomp}"
  end
end

# ファイルサイズ
size = File.size("sample.txt")
puts "ファイルサイズ: #{size}バイト"`,
        output: `ファイルの内容:
1: こんにちは、世界！
2: Rubyでファイル処理
3: 2024-01-15 10:30:45 +0900
ファイルサイズ: 67バイト`,
        explanation: 'ファイルの読み書きとファイル情報の取得方法を学びます。'
      },
      {
        id: 9,
        title: 'JSON処理とAPI',
        difficulty: '★★★',
        syntax: ['JSON', 'require', 'hash'],
        description: 'JSON形式のデータ処理',
        code: `require 'json'

# ハッシュからJSONへ変換
user_data = {
  id: 1,
  name: "田中太郎",
  email: "tanaka@example.com",
  skills: ["Ruby", "JavaScript", "Python"],
  profile: {
    age: 30,
    location: "東京"
  }
}

json_string = JSON.pretty_generate(user_data)
puts "JSON出力:"
puts json_string

# JSONからハッシュへ変換
parsed_data = JSON.parse(json_string)
puts "\\n解析結果:"
puts "名前: #{parsed_data['name']}"
puts "年齢: #{parsed_data['profile']['age']}"
puts "スキル: #{parsed_data['skills'].join(', ')}"`,
        output: `JSON出力:
{
  "id": 1,
  "name": "田中太郎",
  "email": "tanaka@example.com",
  "skills": [
    "Ruby",
    "JavaScript",
    "Python"
  ],
  "profile": {
    "age": 30,
    "location": "東京"
  }
}

解析結果:
名前: 田中太郎
年齢: 30
スキル: Ruby, JavaScript, Python`,
        explanation: 'JSONライブラリを使ってデータの変換と処理を行います。'
      }
    ]
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '6rem 2rem 3rem',
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem',
    },
    title: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: 800,
      color: colors.textPrimary,
      marginBottom: '1rem',
    },
    subtitle: {
      fontSize: '1.1rem',
      color: colors.textSecondary,
      maxWidth: '600px',
      margin: '0 auto',
    },
    categories: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '3rem',
    },
    categoryCard: {
      padding: '1.5rem',
      background: colors.bgSecondary,
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: colors.borderLight,
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center',
    },
    activeCategoryCard: {
      borderColor: colors.rubyRed,
      background: colors.bgPrimary,
      transform: 'translateY(-2px)',
      boxShadow: shadows.md,
    },
    categoryIcon: {
      marginBottom: '0.5rem',
      display: 'flex',
      justifyContent: 'center',
    },
    categoryName: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: colors.textPrimary,
    },
    examplesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem',
    },
    exampleCard: {
      background: colors.bgPrimary,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: colors.borderLight,
      borderRadius: '12px',
      padding: '1.5rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    exampleCardHover: {
      transform: 'translateY(-3px)',
      boxShadow: shadows.lg,
      borderColor: colors.rubyRed,
    },
    exampleHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start',
      marginBottom: '1rem',
    },
    exampleTitle: {
      fontSize: '1.3rem',
      fontWeight: 700,
      color: colors.textPrimary,
      marginBottom: '0.5rem',
    },
    difficulty: {
      fontSize: '0.9rem',
      color: colors.rubyRed,
      fontWeight: 600,
    },
    description: {
      color: colors.textSecondary,
      marginBottom: '1rem',
      fontSize: '0.95rem',
    },
    syntaxTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
    syntaxTag: {
      background: 'rgba(220, 38, 38, 0.1)',
      color: colors.rubyRed,
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: 500,
    },
    codePreview: {
      background: '#f8f9fa',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: colors.borderLight,
      borderRadius: '6px',
      padding: '0.75rem',
      fontSize: '0.85rem',
      fontFamily: 'monospace',
      color: colors.textSecondary,
      overflow: 'hidden',
      position: 'relative',
      whiteSpace: 'pre',
      lineHeight: 1.4,
      margin: 0,  // preタグのデフォルトマージンを削除
    },
    viewButton: {
      background: colors.rubyRed,
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      fontSize: '0.9rem',
      fontWeight: 600,
      cursor: 'pointer',
      marginTop: '1rem',
      transition: 'all 0.2s ease',
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
      maxWidth: '900px',
      maxHeight: '90vh',
      overflow: 'auto',
      width: '100%',
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      paddingBottom: '1rem',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: colors.borderLight,
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: colors.textSecondary,
    },
    codeBlock: {
      background: '#1e1e1e',
      color: '#f8f8f2',
      padding: '1.5rem',
      borderRadius: '8px',
      fontSize: '0.9rem',
      fontFamily: 'monospace',
      overflow: 'auto',
      marginBottom: '1.5rem',
      lineHeight: 1.5,
      whiteSpace: 'pre',
      margin: 0,  // preタグのデフォルトマージンを削除
    },
    outputBlock: {
      background: '#f8f9fa',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: colors.borderLight,
      padding: '1rem',
      borderRadius: '8px',
      fontSize: '0.9rem',
      fontFamily: 'monospace',
      marginBottom: '1.5rem',
      whiteSpace: 'pre',
      lineHeight: 1.4,
      margin: 0,  // preタグのデフォルトマージンを削除
    },
    explanation: {
      color: colors.textSecondary,
      lineHeight: 1.6,
      fontSize: '1rem',
    },
  };

  const getCurrentExamples = () => examples[activeCategory] || [];

  const openModal = (example) => {
    setSelectedExample(example);
  };

  const closeModal = () => {
    setSelectedExample(null);
  };

  return (
    <div>
      <Navigation />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            Ruby <span style={{ color: colors.rubyRed }}>サンプル</span>コード
          </h1>
          <p style={styles.subtitle}>
            実践的なRubyのサンプルコードを難易度別に紹介。
            基本的な構文から高度なテクニックまで、実際に動くコードで学習できます。
          </p>
        </div>

        <div style={styles.categories}>
          {categories.map((category) => (
            <div
              key={category.id}
              style={{
                ...styles.categoryCard,
                ...(activeCategory === category.id ? styles.activeCategoryCard : {}),
              }}
              onClick={() => setActiveCategory(category.id)}
              onMouseEnter={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = shadows.sm;
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              <div style={styles.categoryIcon}>
                <category.icon size={32} color={category.color} />
              </div>
              <div style={styles.categoryName}>{category.name}</div>
            </div>
          ))}
        </div>

        <div style={styles.examplesGrid}>
          {getCurrentExamples().map((example) => (
            <div
              key={example.id}
              style={styles.exampleCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = shadows.lg;
                e.currentTarget.style.borderColor = colors.rubyRed;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = colors.borderLight;
              }}
            >
              <div style={styles.exampleHeader}>
                <div>
                  <h3 style={styles.exampleTitle}>{example.title}</h3>
                  <div style={styles.difficulty}>{example.difficulty}</div>
                </div>
              </div>
              
              <p style={styles.description}>{example.description}</p>
              
              <div style={styles.syntaxTags}>
                {example.syntax.map((tag, index) => (
                  <span key={index} style={styles.syntaxTag}>{tag}</span>
                ))}
              </div>
              
                          <pre 
                style={styles.codePreview} 
                dangerouslySetInnerHTML={{
                  __html: highlightRubyCode(
                    example.code.split('\n').slice(0, 3).join('\n') + 
                    (example.code.split('\n').length > 3 ? '\n...' : '')
                  )
                }}
              />
              
              <button 
                style={styles.viewButton}
                onClick={() => openModal(example)}
                onMouseEnter={(e) => e.target.style.background = colors.rubyRedDark}
                onMouseLeave={(e) => e.target.style.background = colors.rubyRed}
              >
                詳細を見る
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedExample && (
        <div style={styles.modal} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div>
                <h2 style={styles.exampleTitle}>{selectedExample.title}</h2>
                <div style={styles.difficulty}>{selectedExample.difficulty}</div>
              </div>
              <button style={styles.closeButton} onClick={closeModal}>
                ✕
              </button>
            </div>

            <div style={styles.syntaxTags}>
              {selectedExample.syntax.map((tag, index) => (
                <span key={index} style={styles.syntaxTag}>{tag}</span>
              ))}
            </div>

            <h3 style={{ color: colors.textPrimary, marginBottom: '1rem' }}>コード</h3>
            <pre style={styles.codeBlock}>
              <code 
                dangerouslySetInnerHTML={{
                  __html: highlightRubyCode(selectedExample.code)
                }}
              />
            </pre>

            <h3 style={{ color: colors.textPrimary, marginBottom: '1rem' }}>実行結果</h3>
            <pre style={styles.outputBlock}>
              {selectedExample.output}
            </pre>

            <h3 style={{ color: colors.textPrimary, marginBottom: '1rem' }}>解説</h3>
            <p style={styles.explanation}>
              {selectedExample.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamplesPage; 