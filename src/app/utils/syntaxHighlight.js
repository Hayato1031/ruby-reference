const highlightRubyCode = (code) => {
  if (!code) return '';
  
  // 特殊文字をエスケープ（まずプレーンテキストをHTMLセーフにする）
  let escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  // エスケープされたテキストに対してシンタックスハイライトを適用
  return escaped
    // コメント（#で始まる行）
    .replace(/(#.*$)/gm, '<span style="color: #6a9955;">$1</span>')
    // Rubyキーワード
    .replace(/\b(def|end|class|module|if|elsif|else|unless|case|when|while|until|for|in|do|break|next|return|yield|require|include|extend|attr_reader|attr_writer|attr_accessor|private|protected|public|initialize|self|super|nil|true|false|begin|rescue|ensure|raise)\b/g, '<span style="color: #569cd6;">$1</span>')
    // 一般的なRubyメソッド
    .replace(/\b(puts|print|p|gets|chomp|to_s|to_i|to_f|to_a|length|size|empty\?|include\?|map|select|reject|each|times|upto|downto|step|split|gsub|sub|strip|upcase|downcase|capitalize|reverse|sort|uniq|join|push|pop|shift|unshift|first|last|min|max|sum|count|any\?|all\?|find|detect|keys|values|has_key\?|merge|delete|clear)\b/g, '<span style="color: #dcdcaa;">$1</span>')
    // 文字列リテラル (エスケープ後の&quot;を対象)
    .replace(/(&quot;[^&]*?&quot;)/g, '<span style="color: #ce9178;">$1</span>')
    .replace(/(&#39;[^&#]*?&#39;)/g, '<span style="color: #ce9178;">$1</span>')
    // 数値リテラル
    .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #b5cea8;">$1</span>')
    // シンボル (:word)
    .replace(/(:\w+)/g, '<span style="color: #4fc1ff;">$1</span>')
    // インスタンス変数・クラス変数
    .replace(/(@\w+|@@\w+)/g, '<span style="color: #9cdcfe;">$1</span>')
    // グローバル変数
    .replace(/(\$\w+)/g, '<span style="color: #4fc1ff;">$1</span>');
};

export default highlightRubyCode; 