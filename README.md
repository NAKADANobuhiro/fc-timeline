# fc-timeline

サッカークラブの選手・監督 **在籍タイムライン** ビジュアライザー。  
横軸を月単位で表示し、レンタル移籍・複数在籍・監督歴を正確に描画する。

## サンプル

http://fc-timeline.ironsite.net/

---

## 使い方

ローカルで開く場合は **Live Server** 等の HTTP サーバー経由で `index.html` を開く  
（`file://` では CORS 制約により JS ファイルの読み込みに失敗する場合がある）。

```bash
cd fc-timeline
npx serve .       # または VS Code の Live Server 拡張
```

---

## ファイル構成

```
fc-timeline/
├── index.html                    # エントリーポイント
├── README.md                     # このファイル
├── CLAUDE.md                     # Claude 向けプロジェクト概要
├── css/
│   └── fc-timeline.css           # スタイル（ダーク / ライトテーマ）
├── js/
│   ├── data.js                   # DATASETS={}, PLAYERS=[] の宣言
│   └── fc-timeline.js            # 描画エンジン（D3.js v7）
├── data/
│   ├── players_juventus.js       # ユヴェントスFC 選手データ
│   ├── players_real_madrid.js    # レアル・マドリードCF
│   ├── players_fiorentina.js     # ACFフィオレンティーナ
│   ├── players_barcelona.js      # FCバルセロナ
│   ├── players_psg.js            # パリ・サンジェルマン
│   ├── players_ac_milan.js       # ACミラン
│   ├── players_inter.js          # インテルナツィオナーレ・ミラノ
│   ├── players_napoli.js         # SSCナポリ
│   ├── players_roma.js           # ASローマ
│   ├── players_atalanta.js       # アタランタBC
│   ├── players_chelsea.js        # チェルシーFC
│   ├── players_bayern.js         # FCバイエルン・ミュンヘン
│   ├── players_dortmund.js       # ボルシア・ドルトムント
│   ├── players_machida.js        # FC町田ゼルビア
│   ├── players_kawasaki.js       # 川崎フロンターレ
│   ├── players_fctokyo.js        # FC東京
│   ├── managers.js               # 歴代監督データ（全クラブ共通）
│   └── clubs.js                  # クラブデータセット定義
├── scraping/
│   ├── 06_wikipedia.py           # Wikipedia 選手スクレイパー（全 16 クラブ対応）
│   ├── 07_managers.py            # Wikipedia 監督スクレイパー
│   └── 08_fix_retired.py         # 引退選手の end 日付を補完・修正するスクリプト
└── runbook/
    └── fc-timeline-runbook.docx  # 運用手順書（スクレイピング・データ更新手順）
```

---

## 登録クラブ（16 クラブ）

### ヨーロッパ

| クラブ | 国 | 選手数 |
|---|---|---|
| ユヴェントスFC | イタリア | ~370名 |
| レアル・マドリードCF | スペイン | ~370名 |
| ACFフィオレンティーナ | イタリア | ~300名 |
| FCバルセロナ | スペイン | ~380名 |
| パリ・サンジェルマンFC | フランス | ~330名 |
| ACミラン | イタリア | ~330名 |
| インテルナツィオナーレ・ミラノ | イタリア | ~320名 |
| SSCナポリ | イタリア | ~310名 |
| ASローマ | イタリア | ~340名 |
| アタランタBC | イタリア | ~280名 |
| チェルシーFC | イングランド | ~370名 |
| FCバイエルン・ミュンヘン | ドイツ | ~350名 |
| ボルシア・ドルトムント | ドイツ | ~330名 |

### Jリーグ

| クラブ | 選手数 |
|---|---|
| FC町田ゼルビア | ~190名 |
| 川崎フロンターレ | ~100名 |
| FC東京 | ~140名 |

---

## 主な機能

| 機能 | 説明 |
|---|---|
| 在籍バー | 実線 = 通常在籍 / 破線ボーダー = レンタル加入 / 点線 = レンタルアウト中 |
| 背番号バッジ | バー上にクラブ登録番号を表示（infobox から自動取得） |
| 在籍パネル | チャートをクリック → 指定月の在籍選手を GK/DF/MF/FW/監督 別に一覧表示 |
| ツールチップ | バー・左パネル・右パネルにマウスオーバーで選手詳細を表示 |
| 監督表示 | `data/managers.js` で管理。ポジション = "監督" として通常選手と同列に描画 |
| フィルタ | ポジション別チェックボックスで表示/非表示を切替 |
| ソート | ポジション順 / 生年月順 / 在籍開始日順 |
| ビュー | 全期間（2000〜）/ 直近（2015/8〜） ← デフォルト: 全期間 |
| ズーム | マウスホイール（Ctrl）・ボタン・`+` `-` キー |
| テーマ | ライト / ダーク 切替（LocalStorage に保存）← デフォルト: ライトモード |
| キーボード | `←→`: 月移動 / `↑↓`: スクロール / `Esc`: パネル閉じる |

---

## データ形式

### 選手エントリ（`data/players_*.js`）

```js
{
  name:  "ケナン・ユルディズ",
  cat:   "FW",            // 監督 / GK / DF / MF / FW
  nat:   "トルコ",
  birth: "2005-05-04",

  careers: [
    { team: "ユヴェントスFC", start: "2023-07" },
    //                        ↑ end 省略 = 現在も在籍
    { team: "サンプドリア",   start: "2024-01", end: "2024-06", loan: true },
    //                                                           ↑ loan: true = レンタル加入
  ],
}
```

### 監督エントリ（`data/managers.js`）

```js
PLAYERS.push(
  { name: "マルチェロ・リッピ", cat: "監督", nat: "イタリア", birth: "1948-04-15",
    careers: [{ team: "ユヴェントスFC", start: "1994-07", end: "1999-06" },
              { team: "ユヴェントスFC", start: "2001-07", end: "2004-06" }] },
);
```

### クラブデータセット（`data/clubs.js`）

```js
DATASETS.juventus = {
  name:   "ユヴェントスFC",
  team:   "ユヴェントスFC",
  events: [ { year: 2024, month: 6, name: 'CL決勝' }, ... ],
};
```

---

## スクレイパー

### `scraping/06_wikipedia.py` — 選手データ生成

日本語 Wikipedia のカテゴリページを起点に選手データを自動生成する。全 16 クラブ対応。

```bash
cd scraping
pip install requests beautifulsoup4

python 06_wikipedia.py juventus     # ユヴェントス
python 06_wikipedia.py real_madrid  # レアル・マドリード
python 06_wikipedia.py machida      # FC町田ゼルビア（Jリーグ）
# ... 他クラブは runbook 参照
```

- 生成先: `../data/players_{key}.js`
- チェックポイント: `output_{key}.json`（50件ごと自動保存）
- Jリーグクラブ（machida / kawasaki / fctokyo）は `season: "jleague"` 設定により終了月を 12月として出力

### `scraping/07_managers.py` — 監督データ生成

歴代監督記事・クラブ Wikipedia 記事の「歴代監督」テーブルから監督データを生成する。

```bash
python 07_managers.py juventus
# → ../data/managers.js の該当クラブブロックを上書き
```

### `scraping/08_fix_retired.py` — 引退選手の end 補完

既存の `players_*.js` から「引退しているのに `end` がない」エントリを検出・修正する。

```bash
python 08_fix_retired.py machida kawasaki fctokyo   # 対象クラブを修正
python 08_fix_retired.py all                        # 全対応クラブを修正
python 08_fix_retired.py machida --revert           # 誤設定された end を元に戻す
python 08_fix_retired.py machida --dry-run          # 書き込みなしで確認
```

検出ロジック:
1. Wikipedia 記事テキストの引退キーワード（「現役引退」「引退した」等）から年を抽出
2. テキストで見つからない場合は infobox のクラブ在籍年を参照
3. open-ended な在籍（「2022-」形式）は現役とみなし end を設定しない

---

## 品質チェック（スクレイピング後）

1. Wikipedia スカッドリストと APP の「現在月」在籍パネルを比較
2. リザーブ / ユース在籍をトップチームと混同していないか確認
3. `team: "通算"` の誤混入エントリがないか確認
4. 引退選手に `end` が正しく設定されているか確認（`08_fix_retired.py` で補完可能）

---

## 依存ライブラリ

- [D3.js v7](https://d3js.org/) — チャート描画（CDN 利用、インストール不要）
- Python: `requests`, `beautifulsoup4` — スクレイパーのみ使用

---

## 運用手順書

詳細な手順（スクレイピング実行手順・データ更新フロー・トラブルシューティング）は  
`runbook/fc-timeline-runbook.docx` を参照。

---

## ライセンス

個人利用・学習目的。データは Wikipedia（CC BY-SA）をもとに生成。
