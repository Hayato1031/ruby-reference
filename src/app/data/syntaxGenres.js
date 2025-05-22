const syntaxGenres = [
    {
      id: 'control',
      title: '条件分岐・くり返し',
      description: 'if や while など、条件によって処理を変えたり、同じ処理をくり返すための書き方です。'
    },
    {
      id: 'variables',
      title: '変数・定数',
      description: 'データに名前をつけて保存しておくための書き方です。定数は書きかえできない値です。'
    },
    {
      id: 'literals',
      title: '値の書き方（リテラル）',
      description: '文字や数値など、実際に使う「値」の書き方です。例：文字列（"Hello"）や配列（[1, 2, 3]）など。'
    },
    {
      id: 'method_definition',
      title: 'メソッド定義',
      description: '処理のまとまりを「メソッド」として定義する書き方です。何回も同じ処理を使いたいときに便利です。'
    },
    {
      id: 'class_module',
      title: 'クラスとモジュール',
      description: 'オブジェクト指向に必要な「クラス」や「モジュール」の作り方です。ちょっとむずかしいので後からでもOK。'
    },
    {
      id: 'exception_syntax',
      title: 'エラーの対処（例外処理）',
      description: 'プログラムがエラーで止まらないように、エラーをつかまえて別の処理をする方法です。'
    },
    {
      id: 'block',
      title: 'ブロック・くくり処理',
      description: 'do...end や {} で囲んだ「くくり処理」の書き方です。each などとセットで使います。'
    },
    {
      id: 'scope',
      title: 'スコープ（使える場所）',
      description: '変数やメソッドが「どこで使えるか」を決めるルールです。クラスの中や外などで使えるかが変わります。'
    },
    {
      id: 'visibility',
      title: 'メソッドの可視性',
      description: 'メソッドを「外から使っていいかどうか」を決める設定です。private などを使います。'
    },
    {
      id: 'operator',
      title: '計算や比較の記号（演算子）',
      description: '+（たし算）や ==（同じか）などの、計算や比較のための記号です。'
    },
    {
      id: 'meta',
      title: '特別な書き方（メタプログラミング）',
      description: 'Rubyの特徴である「コードを自動で作るような仕組み」のまとめです。少し上級向け。'
    },
    {
      id: 'sugar',
      title: '書き方のバリエーション（構文の工夫）',
      description: '同じ意味の書き方でも、すっきり書ける方法があります。unless や 1行での書き方など。'
    },
    {
      id: 'misc',
      title: 'その他',
      description: 'どのジャンルにも入らないけど知っておきたいものをまとめています。'
    }
  ];

export default syntaxGenres; 