# fc-timeline

サッカークラブの選手・監督 **在籍タイムライン** ツール。  
横軸を月単位で表示し、レンタル移籍・複数在籍・監督歴を描画する。

## デモ

**http://fc-timeline.ironsite.net/**

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
│   ├── players_arsenal.js        # アーセナルFC 選手データ
│   ├── players_chelsea.js        # チェルシーFC
│   ├── players_tottenham.js      # トッテナム・ホットスパーFC
│   ├── players_barcelona.js      # FCバルセロナ
│   ├── players_real_madrid.js    # レアル・マドリードCF
│   ├── players_bayern.js         # FCバイエルン・ミュンヘン
│   ├── players_dortmund.js       # ボルシア・ドルトムント
│   ├── players_ac_milan.js       # ACミラン
│   ├── players_atalanta.js       # アタランタBC
│   ├── players_inter.js          # インテルナツィオナーレ・ミラノ
│   ├── players_juventus.js       # ユヴェントスFC
│   ├── players_napoli.js         # SSCナポリ
│   ├── players_fiorentina.js     # ACFフィオレンティーナ
│   ├── players_roma.js           # ASローマ
│   ├── players_psg.js            # パリ・サンジェルマン
│   ├── players_kawasaki.js       # 川崎フロンターレ
│   ├── players_machida.js        # FC町田ゼルビア
│   ├── players_fctokyo.js        # FC東京
│   ├── managers.js               # 歴代監督データ（全18クラブ共通）
│   └── clubs.js                  # クラブデータセット定義
├── image/                        # クラブエンブレム SVG/PNG
├── scraping/
│   ├── 06_wikipedia.py           # Wikipedia 選手スクレイパー（全18クラブ対応）
│   ├── 07_managers.py            # Wikipedia 監督スクレイパー（MANUAL_OVERRIDES 内蔵）
│   ├── 08_fix_retired.py         # 引退選手の end 日付を補完・修正
│   └── 09_emblems.py             # クラブエンブレム画像取得
└── runbook/
    └── fc-timeline-runbook.docx  # 運用手順書
```

---

## 登録クラブ（18クラブ）

| リーグ | クラブ |
|---|---|
| プレミアリーグ | アーセナルFC / チェルシーFC / トッテナム・ホットスパーFC |
| リーガ・エスパニョーラ | FCバルセロナ / レアル・マドリードCF |
| ブンデスリーガ | FCバイエルン・ミュンヘン / ボルシア・ドルトムント |
| セリエA | ACミラン / アタランタBC / インテルナツィオナーレ・ミラノ / ユヴェントスFC / SSCナポリ / ACFフィオレンティーナ / ASローマ |
| リーグ・アン | パリ・サンジェルマン |
| Jリーグ | 川崎フロンターレ / FC町田ゼルビア / FC東京 |

---

## 主な機能

| 機能 | 説明 |
|---|---|
| 在籍バー | 実線 = 通常在籍 / 破線ボーダー = レンタル加入 / バーギャップ = レンタルアウト中 |
| 背番号バッジ | バー上にクラブ登録番号を表示（Wikipedia infobox から自動取得） |
| 在籍パネル | チャートをクリック → 指定月の在籍選手を GK/DF/MF/FW/監督 別に一覧表示 |
| フォーカスモード | [フォーカス] ボタン or スペースキー長押し → クリックした月の在籍者のみ表示 |
| ツールチップ | バー・左パネル・右パネルにマウスオーバーで選手詳細・全キャリアを表示 |
| フィルタ | ポジション別チェックボックスで表示/非表示を切替 |
| ソート | ポジション順 / 生年月順 / 在籍開始日順 |
| ビュー | 全期間（2000〜）/ 直近（2015/8〜） |
| ズーム | マウスホイール（Ctrl）・ボタン・`+` `-` キー |
| テーマ | ライト / ダーク 切替（LocalStorage に保存） |
| ヘルプ | `H` キー / ハンバーガーメニュー → ヘルプ |
| キーボード | `←→`: 月移動 / `↑↓`: スクロール / `Esc`: パネル閉じる / `H`: ヘルプ |

---

## データ形式

### 選手エントリ（`data/players_*.js`）

```js
PLAYERS.push(
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
  },
);
```

### 監督エントリ（`data/managers.js`）

1監督 = 1エントリ。複数期在任の場合も `careers` 配列に複数スティントをまとめる。

```js
PLAYERS.push(
  { name: "マッシミリアーノ・アッレグリ", cat: "監督", nat: "イタリア", birth: "1967-08-11",
    careers: [
      { team: "ユヴェントスFC", start: "2014-07", end: "2019-06" },
      { team: "ユヴェントスFC", start: "2021-07", end: "2024-06" }
    ]
  },
);
```

> 選手と監督が同一人物の場合（例: アッレグリ、ピルロ）、`cat` が異なるため別エントリとして共存できる。

### クラブデータセット（`data/clubs.js`）

```js
DATASETS.arsenal = {
  name:        "アーセナルFC",
  league:      "プレミアリーグ",   // サイドバーのリーグラベル
  team:        "アーセナルFC",
  teamAliases: ["アーセナル", "Arsenal"],
  events:      [ { year: 2004, month: 4, name: 'PL優勝（無敗）' }, ... ],
};
```

---

## スクレイパー

```bash
cd scraping
pip install requests beautifulsoup4
```

### 選手データ生成（`06_wikipedia.py`）

```bash
python 06_wikipedia.py arsenal     # アーセナル
python 06_wikipedia.py tottenham   # トッテナム
python 06_wikipedia.py juventus    # ユヴェントス
# → ../data/players_{key}.js に出力
# チェックポイント output_{key}.json に50件ごと自動保存（再実行で続きから）
```

### 監督データ生成（`07_managers.py`）

```bash
python 07_managers.py juventus
python 07_managers.py chelsea
# → ../data/managers.js の対象クラブブロックを上書き
```

英語圏クラブ（arsenal / tottenham）は Wikipedia 記事構造の違いにより自動取得できないため、スクリプト内の `MANUAL_OVERRIDES` に全監督を手動定義している。

### 引退選手の end 補完（`08_fix_retired.py`）

```bash
python 08_fix_retired.py all                 # 全クラブ
python 08_fix_retired.py juventus --dry-run  # 書き込みなし確認
```

### エンブレム取得（`09_emblems.py`）

```bash
python 09_emblems.py               # 全18クラブ
python 09_emblems.py arsenal       # 個別指定
python 09_emblems.py --dry-run     # URL 確認のみ
# → ../image/{key}.svg に保存
```

---

## 品質チェック（スクレイピング後）

1. Wikipedia スカッドリストと APP の「現在月」在籍パネルを比較
2. リザーブ / ユース在籍をトップチームと混同していないか確認
3. `team: "通算"` の誤混入エントリがないか確認
4. 引退選手に `end` が正しく設定されているか（`08_fix_retired.py` で補完可能）
5. 監督が現在も在籍扱いになっていないか確認（`managers.js` の `end` 漏れ）
6. 生年が著しく古い選手が現役扱いになっていないか（年齢40歳超を目安に確認）

---

## 依存ライブラリ

- [D3.js v7](https://d3js.org/) — チャート描画（CDN 利用、インストール不要）
- Python: `requests`, `beautifulsoup4` — スクレイパーのみ使用

---

## 運用手順書

詳細な手順は `runbook/fc-timeline-runbook.docx` を参照。

## GitHub

**https://github.com/NAKADANobuhiro/fc-timeline**

データの追加・修正は Pull Request 歓迎。データ形式は `CLAUDE.md` を参照。
