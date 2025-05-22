const methodSections = [
  { id: 'array', name: '配列', description: '複数の値を順番に管理するときに使うメソッドのグループです。要素の追加・削除・並び替えなどを行います。' },
  { id: 'string', name: '文字列', description: '文字のかたまりを操作するメソッドです。結合・分割・置換・検索などに使われます。' },
  { id: 'hash', name: 'ハッシュ', description: 'キーと値のペアでデータを管理するメソッドです。特定のデータに名前をつけてアクセスする時に使います。' },
  { id: 'number', name: '数値', description: '整数や小数などの数値を扱うメソッドです。計算や桁数の取得などに使います。' },
  { id: 'enum', name: '繰り返し', description: '配列やハッシュの各要素を順番に処理するためのメソッドです。`each`や`map`などが含まれます。' },
  { id: 'logic', name: '条件・論理', description: '論理演算や条件分岐に関連するメソッドや記号です。`!`や`&&`などが含まれます。' },
  { id: 'regexp', name: '正規表現', description: '文字列の中から特定のパターンを見つけたり置き換えたりするメソッドです。' },
  { id: 'object', name: 'オブジェクト', description: 'Rubyの基本であるオブジェクトに関するメソッドです。型の確認や複製などが含まれます。' },
  { id: 'class', name: 'クラス・モジュール', description: 'クラスやモジュールの定義・管理に関するメソッドです。継承やミックスインに関係します。' },
  { id: 'exception', name: '例外処理', description: 'エラーが起きたときに処理を中断せず対応するためのメソッドです。`begin-rescue`などが含まれます。' },
];

export default methodSections;