/* ================================================================
   data/clubs.js  –  クラブデータセット定義
   ================================================================

   ■ 各 DATASETS エントリのフィールド
     name       : 表示名（サイドバー・タイトルに使用）
     team       : PLAYERS.careers[].team と照合する文字列（完全一致）
     period     : 対象期間の表示用文字列
     categories : ポジション → カラーコードのマップ
     events     : 月単位のイベント { year, month, name }

   ■ 選手データは player.js の PLAYERS 配列から自動抽出される
     （このファイルに選手を直接書く必要はない）

   ================================================================ */

DATASETS.juventus = {
  name:   "ユベントスFC",
  team:   "Juventus",   // player.js の careers[].team と照合
  period: "2000/01〜2025/26",

  categories: {
    '監督': '#c0392b',   // 赤
    'Attack':  '#e67e22',   // オレンジ
    'Midfield':  '#27ae60',   // 緑
    'Defender':  '#2471a3',   // 青
    'Goalkeeper':  '#6c3483',   // 紫
  },

  events: [
    // ── W杯 ──
    { year: 2002, month:  6, name: '日韓W杯' },
    { year: 2006, month:  7, name: 'ドイツW杯' },
    { year: 2010, month:  7, name: 'S.アフリカW杯' },
    { year: 2014, month:  7, name: 'ブラジルW杯' },
    { year: 2018, month:  7, name: 'ロシアW杯' },
    { year: 2022, month: 11, name: 'カタールW杯' },

    // ── CLファイナル ──
    { year: 2003, month:  5, name: 'CL決勝' },
    { year: 2015, month:  6, name: 'CL決勝' },
    { year: 2017, month:  6, name: 'CL決勝' },

    // ── セリエA優勝（スクデット）──
    { year: 2012, month:  5, name: 'スクデット' },
    { year: 2013, month:  5, name: 'スクデット' },
    { year: 2014, month:  5, name: 'スクデット' },
    { year: 2015, month:  5, name: 'スクデット' },
    { year: 2016, month:  5, name: 'スクデット' },
    { year: 2017, month:  5, name: 'スクデット' },
    { year: 2018, month:  5, name: 'スクデット' },
    { year: 2019, month:  5, name: 'スクデット' },
    { year: 2020, month:  8, name: 'スクデット' },
  ],
};
