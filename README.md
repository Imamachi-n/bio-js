# bio-js

Javascript sources for biology

## Read 2bit human genome

### 参考

.2bit format  
https://genome.ucsc.edu/FAQ/FAQformat.html#format7

2bit のバイナリファイルのゲノム配列をバイナリエディタで開く。
内容を確認すると16進数で表現されており、基本的に32bit単位で情報が格納されている。
16進数(2^4, 4bit)なので、4bit × 8文字 = 32bitとなることから、8文字で32bit分(4byte)となる。

例えば、ヘッダーの先頭は以下のようになっている。

```
4327411A 00000000 C7010000 00000000
```

余談だが、上記のような32bitの16進数表記を`0x4327411A`のように記述する。

参考  
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators

| バイナリ | 説明                                           |
| -------- | ---------------------------------------------- |
| 4327411A | ファイルを作成したマシンのアーキテクチャの番号 |
| 00000000 | バージョン（基本、0とする）                    |
| C7010000 | ファイル内のシーケンス（配列）の数             |
| 00000000 | reversed（常に0）                              |

`C701000`を16進数から10進数に変換すると、`3,338,731,520`bpとなり、ヒトゲノムのサイズである約3億bpであることがわかる。

続きのヘッダー情報を読み取っていく。
```
04636872 31F72800 00
```

最初の4bite * 2 = 8biteは染色体名の長さを表している。また、それに続く染色体名はASCIIの文字コードに変換することで人間が解釈できる文字列となる。

ASCIIコード変換表 - wiki  
https://ja.wikipedia.org/wiki/ASCII

| バイナリ  | 説明                                                      |
| --------- | --------------------------------------------------------- |
| 04        | 染色体名の長さ（ここでは4文字・32bit()分）                |
| 636872 31 | 染色体名（ここでは長さ4）                                 |
| F72800 00 | ファイルの開始地点から比較した配列データの32bitオフセット |

染色体名を変換すると、以下の通りになる。結果として、`chr1`を指していることがわかる。

| バイナリ | ASCIIコード |
| -- | -- |
| 63 | c |
| 68 | h |
| 72 | r |
| 31| 1 |

このようにして、先頭にあるヘッダー情報を読み取っていくことができる。

## TODOリスト

* JavaScriptでバイナリファイルをインポートするライブラリを見つける。
* ヘッダー情報とシーケンス情報をバイナリから変換する方法を探す。

## エンディアンとは

参考  
https://www.uquest.co.jp/embedded/learning/lecture05.html

## Uint8Array

参考  
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array

Uint8Array タイプは、8 ビット符号なし整数値の配列を表します。各要素は0で初期化されます。生成された Uint8Array オブジェクトのメソッドあるいは配列のような表記法 ("[]") を用いて、要素を参照することができます。