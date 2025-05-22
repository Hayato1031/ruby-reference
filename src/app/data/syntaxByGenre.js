const syntaxByGenre = {
    control: [
      { id: 's1', name: 'if文', description: '条件によって処理を分けたいときに使います。', example: 'score = 75\nif score >= 60\n  puts "合格"\nelse\n  puts "不合格"\nend', version: '1.8.7' },
      { id: 's2', name: 'unless文', description: '条件が当てはまらないときだけ処理したいときに使います。', example: 'user = User.find(id)\nunless user\n  puts "ユーザが存在しません"\nend', version: '1.8.7' },
      { id: 's3', name: 'case文', description: '複数の条件をまとめて分岐したいときに使います。', example: 'case color\nwhen "red"\n  puts "赤です"\nwhen "blue", "green"\n  puts "寒色系です"\nelse\n  puts "その他の色です"\nend', version: '1.8.7' },
      { id: 's4', name: 'while文', description: '条件が成り立つ間、繰り返し処理したいときに使います。', example: 'i = 0\nwhile i < 3\n  puts i\n  i += 1\nend', version: '1.8.7' },
      { id: 's5', name: 'until文', description: '条件が成り立たなくなるまで繰り返したいときに使います。', example: 'password = ""\nuntil password == "ruby"\n  password = gets.chomp\nend', version: '1.8.7' },
      { id: 's6', name: 'for文', description: '配列や範囲の全ての要素に対して繰り返したいときに使います。', example: 'sum = 0\nfor n in [1, 2, 3]\n  sum += n\nend\nputs sum   #=> 6', version: '1.8.7' },
      { id: 's7', name: 'break', description: 'ループを途中で抜けたいときに使います。', example: 'numbers.each do |num|\n  break if num < 0\n  puts num\nend', version: '1.8.7' },
      { id: 's8', name: 'next', description: 'ループ内で次の繰り返しに進みたいときに使います。', example: '(1..5).each do |i|\n  next if i % 2 == 0\n  puts i   # 奇数のみ出力\nend', version: '1.8.7' },
      { id: 's9', name: 'redo', description: '同じ繰り返しをやり直したいときに使います。', example: 'i = 0\nwhile i < 3\n  puts i\n  i += 1\n  redo if i == 3 && need_repeat\nend', version: '1.8.7' },
      { id: 's10', name: 'retry', description: '例外処理で、もう一度最初からやり直したいときに使います。', example: 'begin\n  attempt_network_request\nrescue TimeoutError\n  retry   # タイムアウト時に再試行\nend', version: '1.9.0' },
      { id: 's11', name: 'case/in文（パターンマッチ）', description: '値の中身や形によって分岐したいときに使います。配列やハッシュの中身を直接判定できます。', example: 'case data\nin {name: n, age: 20..}\n  puts "20歳以上の#{n}さん"\nin [x, y, z]\n  puts "3要素の配列を受け取りました"\nelse\n  puts "マッチしませんでした"\nend', version: '3.0.0' },
      { id: 's12', name: '右代入演算子(=>)', description: '配列や値を「[a, b] => [x, y]」のように右側の変数に分解して代入したいときに使います。', example: '[1, 2, 3] => [first, *rest]\np first    #=> 1\np rest     #=> [2, 3]', version: '3.0.0' },
      { id: 's13', name: 'パターンマッチ式(in)', description: '値が特定の形かどうかをif文などで簡単に判定したいときに使います。', example: 'if [x, y] in coords\n  puts "X=#{x}, Y=#{y}"\nend', version: '3.0.0' },
      { id: 's14', name: '三項演算子(?:)', description: '簡単な条件分岐を1行で書きたいときに使います。', example: 'result = score >= 60 ? "合格" : "不合格"', version: '1.8.7' },
      { id: 's15', name: 'フリップフロップ演算子', description: 'たとえば「BEGINからENDまで」のように、特定の範囲に入ったら出るまでtrueにしたいときに使います。テキスト処理などで便利です。', example: 'DATA.each_line do |line|\n  puts line if line =~ /BEGIN/ .. line =~ /END/\nend\n__END__\nBEGIN\nfoo\nEND', version: '2.7.0' }
    ],
    variables: [
      { id: 's16', name: 'ローカル変数', description: '一時的な値を保存したいときに使います。', example: 'count = 10\nmessage = "Hello"\ncount += 1', version: '1.8.7' },
      { id: 's17', name: 'インスタンス変数', description: 'オブジェクトごとに値を持たせたいときに使います。', example: 'class User\n  def initialize(name)\n    @name = name\n  end\n  def hello\n    puts "こんにちは、#{@name}さん"\n  end\nend', version: '1.8.7' },
      { id: 's18', name: 'クラス変数', description: 'クラス全体で値を共有したいときに使います。', example: 'class MyClass\n  @@count = 0\n  def initialize; @@count += 1; end\n  def self.count; @@count; end\nend\n3.times { MyClass.new }\nputs MyClass.count  #=> 3', version: '1.8.7' },
      { id: 's19', name: 'グローバル変数', description: 'プログラム全体で値を共有したいときに使います。', example: '$counter = 0\nclass Example\n  def increment; $counter += 1; end\nend\nExample.new.increment\nputs $counter  #=> 1', version: '1.8.7' },
      { id: 's20', name: '定数', description: '変わらない値を保存したいときに使います。', example: 'class MyApp\n  VERSION = 1.0\nend\nputs MyApp::VERSION  #=> 1.0', version: '2.5.0' },
      { id: 's21', name: '多重代入', description: '複数の変数に一度に値を入れたいときに使います。', example: 'a, b, c = 1, 2, 3\nx, y = [10, 20]\nfirst, *rest = [4, 5, 6]\np a    #=> 1\np c    #=> 3\np rest #=> [5, 6]', version: '1.8.7' }
    ],
    literals: [
      { id: 's22', name: '数値リテラル', description: '数字をそのまま使いたいときに使います。', example: 'x = 42\ny = 6.022e23', version: '1.8.7' },
      { id: 's23', name: '有理数リテラル', description: '分数や小数を正確に扱いたいときに使います。', example: 'p 2.5r   #=> (5/2)', version: '2.1.0' },
      { id: 's24', name: '複素数リテラル', description: '複素数（iを使う数）を使いたいときに使います。', example: 'p 2+3i   #=> (2+3i)', version: '2.1.0' },
      { id: 's25', name: '真偽値・nil', description: '「はい/いいえ」や「何もない」を表したいときに使います。', example: 'puts "OK" if true      #=> OK\nputs "NG" if false     # (出力されない)\nputs "Empty" if nil    # (出力されない)', version: '1.8.7' },
      { id: 's26', name: '文字列リテラル', description: '文字や文章を扱いたいときに使います。', example: '"Ruby\n".chomp   #=> "Ruby"', version: '1.9.0' },
      { id: 's27', name: 'ヒアドキュメント', description: '複数行の長い文字列を書きたいときに使います。', example: 'text = <<~MSG\n  こんにちは、\n    これはヒアドキュメントの例です。\nMSG\nputs text', version: '2.3.0' },
      { id: 's28', name: 'シンボルリテラル', description: '識別用のラベルやキーを使いたいときに使います。', example: 'status = :done', version: '1.8.7' },
      { id: 's29', name: '配列リテラル', description: '複数の値をまとめて扱いたいときに使います。', example: 'arr = [10, 20, 30]\np arr[1]   #=> 20', version: '1.8.7' },
      { id: 's30', name: 'ワード配列リテラル(%w)', description: 'たくさんの文字列を簡単に配列にしたいときに使います。', example: 'fruits = %w[apple banana cherry]\np fruits[1]   #=> "banana"', version: '1.8.7' },
      { id: 's31', name: 'シンボル配列リテラル(%i)', description: 'たくさんのシンボルを簡単に配列にしたいときに使います。', example: 'symbols = %i[red green blue]\np symbols[2]   #=> :blue', version: '2.0.0' },
      { id: 's32', name: 'ハッシュリテラル', description: 'キーと値のペアをまとめて管理したいときに使います。', example: 'person = { name: "Alice", age: 20 }\np person[:name]   #=> "Alice"', version: '1.9.0' },
      { id: 's33', name: '範囲リテラル', description: '連続した値の範囲をまとめて扱いたいときに使います。', example: 'range = 1..5\np range.include?(5)   #=> true\np range.include?(6)   #=> false', version: '2.7.0' },
      { id: 's34', name: '正規表現リテラル', description: '文字列のパターンを調べたいときに使います。', example: '/\\d{3}-\\d{4}/.match("TEL: 123-4567")  #=> #<MatchData "123-4567">', version: '1.8.7' },
      { id: 's35', name: 'コマンド出力リテラル', description: 'シェルコマンドの実行結果を文字列で受け取りたいときに使います。', example: 'output = `echo Hello`\nputs output   #=> "Hello\\n"', version: '1.8.7' }
    ],
    method_definition: [
      { id: 's36', name: 'メソッド定義', description: '自分だけの処理をまとめて使いたいときに使います。', example: 'def greet(name)\n  "Hello, #{name}!"\nend\nputs greet("Ruby")   #=> "Hello, Ruby!"', version: '2.1.0' },
      { id: 's37', name: '特異メソッド定義', description: '特定のオブジェクト専用のメソッドを作りたいときに使います。', example: 'str = "hello"\ndef str.shout\n  upcase + "!"\nend\nputs str.shout   #=> "HELLO!"', version: '1.8.7' },
      { id: 's38', name: '引数付きメソッド', description: 'メソッドに値を渡して使いたいときに使います。', example: 'def add(a, b=10)\n  a + b\nend\np add(5)    #=> 15\np add(3, 4) #=> 7', version: '1.8.7' },
      { id: 's39', name: '可変長引数(*)', description: '引数の数が決まっていないときに使います。', example: 'def sum(*numbers)\n  numbers.reduce(0, :+)\nend\np sum(1,2,3)   #=> 6\np sum()        #=> 0', version: '1.8.7' },
      { id: 's40', name: 'キーワード引数', description: '引数に名前を付けて分かりやすく渡したいときに使います。', example: 'def greet(name:, polite: false)\n  greeting = polite ? "Hello" : "Hi"\n  "#{greeting}, #{name}"\nend\nputs greet(name: "Alice")            #=> "Hi, Alice"\nputs greet(name: "Alice", polite: true)  #=> "Hello, Alice"', version: '3.0.0' },
      { id: 's41', name: 'キーワード可変長引数(**)', description: 'キーワード引数をまとめて受け取りたいときに使います。', example: 'def config(**options)\n  p options\nend\nconfig(color: "blue", size: 10)  #=> {:color=>"blue", :size=>10}', version: '3.0.0' },
      { id: 's42', name: 'ブロック引数(&)', description: 'メソッドに処理のかたまり（ブロック）を渡したいときに使います。', example: 'def timing(&action)\n  start = Time.now\n  action.call\n  puts "実行時間: #{Time.now - start}秒"\nend\ntiming { sleep 1 }  #=> 実行時間: 1.0秒 (程度)', version: '1.8.7' },
      { id: 's43', name: '引数転送(...)', description: '受け取った引数やブロックをそのまま他のメソッドに渡したいときに使います。', example: 'def add(a, b)\n  a + b\nend\ndef double_add(...)\n  add(...) * 2\nend\np double_add(3, 4)   #=> 14', version: '2.7.0' },
      { id: 's44', name: 'エンドレスメソッド定義', description: '1行でシンプルなメソッドを書きたいときに使います。', example: 'def square(x) = x * x', version: '3.0.0' },
      { id: 's45', name: '構造的仮引数', description: '配列やハッシュの中身を直接引数として受け取りたいときに使います。', example: 'def show_pair((x, y))\n  puts "x=#{x}, y=#{y}"\nend\nshow_pair([1, 2])   #=> x=1, y=2', version: '1.9.0' }
    ],
    class_module: [
      { id: 's46', name: 'クラス定義', description: '自分だけの型やオブジェクトを作りたいときに使います。', example: 'class Person < Human\n  DEFAULT_AGE = 0\n  def initialize(name)\n    @name = name\n  end\nend', version: '1.8.7' },
      { id: 's47', name: 'モジュール定義', description: '共通の機能をまとめて再利用したいときに使います。', example: 'module Greetings\n  def hello; "こんにちは"; end\nend\nclass User; include Greetings; end\nputs User.new.hello   #=> "こんにちは"', version: '1.8.7' },
      { id: 's48', name: '継承', description: '他のクラスの機能を引き継ぎたいときに使います。', example: 'class Dog < Animal\nend\np Dog.superclass   #=> Animal', version: '1.8.7' },
      { id: 's49', name: '特異クラス', description: '特定のオブジェクト専用のメソッドをまとめて定義したいときに使います。', example: 'class MyClass\n  class << self\n    def class_method\n      "これはクラスメソッド"\n    end\n  end\nend\nputs MyClass.class_method', version: '1.8.7' },
      { id: 's50', name: 'リファインメント', description: '特定の場所だけでクラスの振る舞いを変えたいときに使います。', example: 'module CoreExt\n  refine String do\n    def greet; "#{self}, world"; end\n  end\nend\n\nusing CoreExt\nputs "Hello".greet   #=> "Hello, world"', version: '2.1.0' }
    ],
    exception_syntax: [
      { id: 's51', name: '例外処理', description: 'エラーが起きたときの対応を決めたいときに使います。', example: 'begin\n  risky_operation\n  puts "成功"\nrescue StandardError => e\n  puts "エラー発生: #{e.message}"\nensure\n  puts "常に実行する後処理"\nend', version: '1.8.7' },
      { id: 's52', name: '例外の発生', description: '自分でエラーを発生させたいときに使います。', example: 'def divide(a, b)\n  raise "ゼロで割れません" if b == 0\n  a / b\nend', version: '1.8.7' },
      { id: 's53', name: 'rescue修飾子', description: 'エラー時だけ別の値を返したいときに使います。', example: 'num = Integer(input) rescue -1', version: '1.8.7' },
      { id: 's54', name: 'ensure', description: 'エラーの有無に関わらず必ず実行したい処理があるときに使います。', example: 'f = File.open("data.txt", "w")\nbegin\n  # ファイルに書き込み処理\nensure\n  f.close\nend', version: '1.8.7' },
      { id: 's55', name: 'else節', description: 'エラーがなかったときだけ実行したい処理に使います。', example: 'begin\n  puts "処理開始"\n  perform_task\nrescue\n  puts "エラーが発生"\nelse\n  puts "正常終了"\nend', version: '1.8.7' },
      { id: 's56', name: 'ブロック内の例外処理', description: 'ブロックの中でエラーを処理したいときに使います。', example: '[1, 0, 2].each do |n|\n  puts 10 / n\nrescue ZeroDivisionError\n  puts "ゼロ割エラー"\nend', version: '2.5.0' }
    ],
    block: [
      { id: 's57', name: 'ブロック', description: 'メソッドに処理のまとまりを渡したいときに使います。', example: '[1,2,3].each do |num|\n  puts num * 2\nend', version: '1.8.7' },
      { id: 's58', name: 'yield', description: 'メソッド内で渡されたブロックを実行したいときに使います。', example: 'def with_logging\n  puts "処理開始"\n  yield\n  puts "処理終了"\nend\nwith_logging { puts "本処理" }\n#=> 処理開始\n#   本処理\n#   処理終了', version: '1.8.7' },
      { id: 's59', name: 'ラムダリテラル', description: '名前を付けずにその場で使える小さな関数（無名関数）を作りたいときに使います。', example: 'square = ->(x) { x * x }\np square.call(5)   #=> 25', version: '1.9.0' },
      { id: 's60', name: 'ブロック引数のスコープ', description: 'ブロック内だけで使う変数を定義したいときに使います。', example: 'x = 100\n[1,2,3].each do |x|\n  # ここでのxはブロック引数（外のxとは別）\n  puts x\nend\nputs x   #=> 100', version: '1.9.0' },
      { id: 's61', name: '番号付きパラメータ', description: 'ブロック引数を省略してシンプルに書きたいときに使います。', example: 'p [1,2,3].map { _1 ** 2 }   #=> [1, 4, 9]', version: '2.7.0' },
      { id: 's62', name: '`it`パラメータ', description: 'ブロック内で_1の代わりにitで引数を参照したいときに使います。', example: 'p [4,5,6].map { it * 3 }   #=> [12, 15, 18]', version: '3.4.0' },
      { id: 's63', name: 'ブロックローカル変数', description: 'ブロック内だけで使う変数を明示的に分けたいときに使います。', example: 'x = 1\n2.times do |i; x|\n  x = i  # ここでのxはブロック内ローカル変数\nend\nputs x   #=> 1 （外側のxは変更されない）', version: '1.8.7' }
    ],
    scope: [
      { id: 's64', name: 'ブロックのスコープ', description: 'ブロック内の変数が外に影響しないようにしたいときに使います。', example: 'x = 5\n[1,2,3].each do |x|\n  # ここでのxはブロック専用\nend\nputs x   #=> 5 （外側のxは変わらない）', version: '1.9.0' },
      { id: 's65', name: 'トップレベル', description: 'プログラムの一番外側で定義したいときに使います。', example: 'def top_method; end\np Object.private_instance_methods.include?(:top_method)  #=> true', version: '2.5.0' },
      { id: 's66', name: '定数の解決', description: '定数の参照先を明確にしたいときに使います。', example: 'module A\n  X = 1\nend\nmodule B\n  include A\n  p X   #=> 1 （Mix-inによりA::Xが見つかる）\nend', version: '2.5.0' },
      { id: 's67', name: '変数のスコープ', description: '変数の有効範囲を理解したいときに使います。', example: '// ローカル変数\nx = 1\n[1,2].each { |x| puts x } # 外のxは変わらない\n\n// インスタンス変数\nclass A\n  def set; @v = 1; end\n  def get; @v; end\nend\n\n// クラス変数\nclass B\n  @@v = 1\n  def self.v; @@v; end\nend\n\n// グローバル変数\n$g = 1\ndef show_g; puts $g; end', version: '1.8.7' }
    ],
    visibility: [
      { id: 's68', name: 'メソッドの可視性', description: 'メソッドを外部から呼べるかどうか制御したいときに使います。', example: 'class Test\n  def a; "public"; end\n  private\n  def b; "private"; end\nend\nt = Test.new\np t.a            #=> "public"\np t.respond_to?(:b)   #=> false (bはprivate)', version: '2.7.0' },
      { id: 's69', name: 'クラスメソッドの可視性', description: 'クラスメソッドの公開範囲を制御したいときに使います。', example: 'class Foo\n  class << self\n    private\n    def secret; end\n  end\nend\nFoo.secret   # NoMethodError (private method)', version: '2.1.0' },
      { id: 's70', name: 'protectedメソッド', description: '同じクラスやサブクラス内だけで使えるメソッドにしたいときに使います。', example: 'class Person\n  attr_reader :name\n  def initialize(name); @name = name; end\n  protected\n  def same_name?(other)\n    @name == other.name\n  end\nend\np Person.new("alice").same_name?(Person.new("alice"))  #=> true', version: '1.8.7' }
    ],
    operator: [
      { id: 's71', name: '算術演算子', description: '足し算や引き算など計算したいときに使います。', example: 'p 7 % 3    #=> 1\np 2 ** 3   #=> 8', version: '1.8.7' },
      { id: 's72', name: '比較演算子', description: '値を比べたいときに使います。', example: 'p 5 < 10    #=> true\np "a" == "b"   #=> false', version: '1.8.7' },
      { id: 's73', name: '論理演算子(&&/||/!)', description: '条件を組み合わせたいときに使います。', example: 'p (nil || "fallback")   #=> "fallback"\np (5 && 0)   #=> 0', version: '1.8.7' },
      { id: 's74', name: '論理演算子(and/or/not)', description: '複数の条件や処理をつなげたいときに使います。', example: 'logged_in = true\nauthorized = false\nputs "Welcome!" if logged_in and authorized', version: '1.8.7' },
      { id: 's75', name: '代入演算子', description: '変数に値を入れたり、計算結果を代入したいときに使います。', example: 'count = 0\ncount += 2\np count    #=> 2\noptions = {}\noptions[:timeout] ||= 60\np options  #=> {:timeout=>60}', version: '1.8.7' },
      { id: 's76', name: '安全ナビゲーション演算子', description: '途中でnil（値がない）かもしれないときにエラーを出さずに安全にメソッドを呼びたいときに使います。', example: 'user = nil\np user&.profile&.email   #=> nil （userがnilでもエラーにならない）', version: '2.3.0' },
      { id: 's77', name: 'スコープ解決演算子', description: 'クラスやモジュールの中の定数やメソッドにアクセスしたいときに使います。', example: 'p File::SEPARATOR   #=> "/"\np Math::sin(0)      #=> 0.0', version: '1.8.7' },
      { id: 's78', name: 'ビット演算子', description: '整数の各ビットごとに計算したいときに使います。', example: 'p (6 & 3)   #=> 2\np (1 << 3)  #=> 8', version: '1.8.7' },
      { id: 's79', name: 'マッチ演算子', description: '文字列が正規表現パターンに合うか調べたいときに使います。', example: 'p "abc" =~ /b/   #=> 1\np "abc" !~ /d/  #=> true', version: '2.4.0' }
    ],
    meta: [
      { id: 's80', name: 'alias', description: 'メソッドや変数に別名を付けたいときに使います。', example: 'class C\n  def greet; "hi"; end\n  alias hello greet\nend\np C.new.hello   #=> "hi"', version: '1.8.7' },
      { id: 's81', name: 'undef', description: '不要なメソッドを使えなくしたいときに使います。', example: 'class Parent; def foo; end; end\nclass Child < Parent\n  undef foo\nend\np Child.new.respond_to?(:foo)   #=> false', version: '1.8.7' },
      { id: 's82', name: 'defined?', description: '変数やメソッドが定義されているか調べたいときに使います。', example: 'p defined?(UndefinedVar)   #=> nil\np defined?(Object)        #=> "constant"\np defined?(puts)          #=> "method"', version: '1.8.7' },
      { id: 's83', name: 'super', description: '親クラスの同名メソッドを呼びたいときに使います。', example: 'class Parent\n  def greet(name, polite: false)\n    polite ? "Hello, #{name}." : "Hi, #{name}!"\n  end\nend\nclass Child < Parent\n  def greet(name, polite: false)\n    "#{super}, I\'m #{name}"\n  end\nend', version: '3.0.0' },
      { id: 's84', name: 'BEGIN/ENDブロック', description: 'プログラムの最初や最後に自動で実行したい処理に使います。', example: 'BEGIN { puts "プログラム開始" }\nEND { puts "プログラム終了" }\nputs "実行中"', version: '1.8.7' },
      { id: 's85', name: '__FILE__/__LINE__/__ENCODING__', description: 'ファイル名や行番号などの情報を取得したいときに使います。', example: 'puts __FILE__\nputs __LINE__', version: '1.9.0' },
      { id: 's86', name: '__END__とDATA', description: 'プログラムの後ろにデータを埋め込んで使いたいときに使います。', example: 'puts "本文の実行"\nputs DATA.read   #=> "__END__以下のデータ\\n"\n__END__\n__END__以下のデータ', version: '1.8.7' }
    ],
    sugar: [
      { id: 's87', name: '文修飾子 if/unless', description: '1行で条件分岐を書きたいときに使います。', example: 'y = 10\nputs "positive" if y > 0', version: '1.8.7' },
      { id: 's88', name: '文修飾子 while/until', description: '1行で繰り返し処理を書きたいときに使います。', example: 'x = 3\nputs(x -= 1) until x <= 0', version: '1.8.7' },
      { id: 's89', name: '丸括弧の省略', description: 'メソッド呼び出しをシンプルに書きたいときに使います。', example: 'print "Ruby", "3.4\n"', version: '1.8.7' },
      { id: 's90', name: 'メソッド名の末尾記号', description: 'メソッドの意味を分かりやすくしたいときに使います。', example: 'class Item\n  attr_accessor :price\n  def free?; price == 0; end\nend\nitem = Item.new\nitem.price = 0\np item.free?   #=> true', version: '1.8.7' },
      { id: 's91', name: 'フリップフロップ演算子', description: 'たとえば「BEGINからENDまで」のように、特定の範囲に入ったら出るまでtrueにしたいときに使います。テキスト処理などで便利です。', example: 'DATA.each_line do |line|\n  puts line if line =~ /BEGIN/ .. line =~ /END/\nend\n__END__\nBEGIN\nfoo\nEND', version: '2.7.0' }
    ]
};

export default syntaxByGenre; 