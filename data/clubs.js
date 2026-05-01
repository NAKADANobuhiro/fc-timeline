/* ================================================================
   data/clubs.js  –  クラブデータセット定義
   ================================================================

   ■ 各 DATASETS エントリのフィールド
     name         : 表示名（サイドバー・タイトルに使用）
     team         : PLAYERS.careers[].team と照合する文字列（正式名称・完全一致）
     teamAliases  : team の別名配列（他クラブスクレイパーが短縮名で記録した場合に対応）
     period       : 対象期間の表示用文字列
     categories   : ポジション → カラーコードのマップ
     events       : 月単位のイベント { year, month, name }

   ■ 選手データは player.js の PLAYERS 配列から自動抽出される
     （このファイルに選手を直接書く必要はない）

   ================================================================ */

// ────────────────────────────────────────────────
// レアル・マドリードCF
// ────────────────────────────────────────────────
DATASETS.real_madrid = {
  name:   "レアル・マドリードCF",
  team:         "レアル・マドリードCF",
  teamAliases:  ["レアル・マドリード", "レアルマドリード", "Real Madrid"],
  period: "2000/01〜2025/26",

  categories: {
    '監督': '#c0392b',   // 赤
    'FW':  '#e67e22',   // オレンジ
    'MF':  '#27ae60',   // 緑
    'DF':  '#2471a3',   // 青
    'GK':  '#6c3483',   // 紫
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
    { year: 2002, month:  5, name: 'CL決勝' },
    { year: 2014, month:  5, name: 'CL決勝' },
    { year: 2016, month:  5, name: 'CL決勝' },
    { year: 2017, month:  6, name: 'CL決勝' },
    { year: 2018, month:  5, name: 'CL決勝' },
    { year: 2022, month:  5, name: 'CL決勝' },
    { year: 2024, month:  6, name: 'CL決勝' },

    // ── ラ・リーガ優勝 ──
    { year: 2001, month:  5, name: 'リーガ優勝' },
    { year: 2003, month:  6, name: 'リーガ優勝' },
    { year: 2007, month:  6, name: 'リーガ優勝' },
    { year: 2008, month:  5, name: 'リーガ優勝' },
    { year: 2012, month:  5, name: 'リーガ優勝' },
    { year: 2017, month:  5, name: 'リーガ優勝' },
    { year: 2020, month:  7, name: 'リーガ優勝' }, // コロナ禍による変則日程
    { year: 2022, month:  4, name: 'リーガ優勝' },
    { year: 2024, month:  5, name: 'リーガ優勝' },
  ],
};

// ────────────────────────────────────────────────
// FCバルセロナ
// ────────────────────────────────────────────────
DATASETS.barcelona = {
  name:   "FCバルセロナ",
  team:         "FCバルセロナ",
  teamAliases:  ["バルセロナ", "Barcelona", "FC Barcelona"],
  period: "2000/01〜2025/26",

  categories: {
    '監督': '#c0392b',   // 赤
    'FW':  '#e67e22',   // オレンジ
    'MF':  '#27ae60',   // 緑
    'DF':  '#2471a3',   // 青
    'GK':  '#6c3483',   // 紫
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
    { year: 2006, month:  5, name: 'CL決勝' },
    { year: 2009, month:  5, name: 'CL決勝' },
    { year: 2011, month:  5, name: 'CL決勝' },
    { year: 2015, month:  6, name: 'CL決勝' },

    // ── ラ・リーガ優勝 ──
    { year: 2005, month:  5, name: 'リーガ優勝' },
    { year: 2006, month:  5, name: 'リーガ優勝' },
    { year: 2009, month:  5, name: 'リーガ優勝' },
    { year: 2010, month:  5, name: 'リーガ優勝' },
    { year: 2011, month:  5, name: 'リーガ優勝' },
    { year: 2013, month:  5, name: 'リーガ優勝' },
    { year: 2015, month:  5, name: 'リーガ優勝' },
    { year: 2016, month:  5, name: 'リーガ優勝' },
    { year: 2018, month:  5, name: 'リーガ優勝' },
    { year: 2019, month:  5, name: 'リーガ優勝' },
    { year: 2023, month:  5, name: 'リーガ優勝' },
  ],
};

// ────────────────────────────────────────────────
// パリ・サンジェルマン
// ────────────────────────────────────────────────
DATASETS.psg = {
  name:   "パリ・サンジェルマン",
  team:         "パリ・サンジェルマン",
  teamAliases:  ["パリサンジェルマン", "PSG", "Paris Saint-Germain"],
  period: "2000/01〜2025/26",

  categories: {
    '監督': '#c0392b',   // 赤
    'FW':  '#e67e22',   // オレンジ
    'MF':  '#27ae60',   // 緑
    'DF':  '#2471a3',   // 青
    'GK':  '#6c3483',   // 紫
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
    { year: 2020, month:  8, name: 'CL決勝' }, // コロナ禍による変則日程

    // ── リーグ・アン優勝 ──
    { year: 2013, month:  5, name: 'リーグ優勝' },
    { year: 2014, month:  5, name: 'リーグ優勝' },
    { year: 2015, month:  5, name: 'リーグ優勝' },
    { year: 2016, month:  3, name: 'リーグ優勝' }, // 異例の早期優勝
    { year: 2018, month:  4, name: 'リーグ優勝' },
    { year: 2019, month:  4, name: 'リーグ優勝' },
    { year: 2020, month:  4, name: 'リーグ優勝' }, // シーズン打ち切りによる認定
    { year: 2022, month:  4, name: 'リーグ優勝' },
    { year: 2023, month:  5, name: 'リーグ優勝' },
    { year: 2024, month:  4, name: 'リーグ優勝' },
  ],
};

// ────────────────────────────────────────────────
// ACFフィオレンティーナ
// ────────────────────────────────────────────────
DATASETS.fiorentina = {
  name:   "ACFフィオレンティーナ",
  team:         "ACFフィオレンティーナ",
  teamAliases:  ["フィオレンティーナ", "Fiorentina"],
  period: "2000/01〜2025/26",

  categories: {
    '監督': '#c0392b',   // 赤
    'FW':  '#e67e22',   // オレンジ
    'MF':  '#27ae60',   // 緑
    'DF':  '#2471a3',   // 青
    'GK':  '#6c3483',   // 紫
  },

  events: [
    // ── W杯 ──
    { year: 2002, month:  6, name: '日韓W杯' },
    { year: 2006, month:  7, name: 'ドイツW杯' },
    { year: 2010, month:  7, name: 'S.アフリカW杯' },
    { year: 2014, month:  7, name: 'ブラジルW杯' },
    { year: 2018, month:  7, name: 'ロシアW杯' },
    { year: 2022, month: 11, name: 'カタールW杯' },

    // ── セリエA準優勝 ──
    { year: 2008, month:  5, name: 'セリエA2位' },

    // ── コッパ・イタリア優勝 ──
    { year: 2001, month:  5, name: 'コッパ優勝' },
  ],
};

// ────────────────────────────────────────────────
// ACミラン
// ────────────────────────────────────────────────
DATASETS.ac_milan = {
  name:         "ACミラン",
  team:         "ACミラン",
  teamAliases:  ["ミラン", "AC Milan", "Milan"],
  period:       "2000/01〜2025/26",

  categories: {
    '監督': '#c0392b',
    'FW':  '#e67e22',
    'MF':  '#27ae60',
    'DF':  '#2471a3',
    'GK':  '#6c3483',
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
    { year: 2005, month:  5, name: 'CL決勝' },
    { year: 2007, month:  5, name: 'CL決勝' },

    // ── セリエA優勝（スクデット）──
    { year: 2004, month:  5, name: 'スクデット' },
    { year: 2011, month:  5, name: 'スクデット' },
    { year: 2022, month:  5, name: 'スクデット' },
  ],
};

// ────────────────────────────────────────────────
// インテルナツィオナーレ・ミラノ
// ────────────────────────────────────────────────
DATASETS.inter = {
  name:         "インテルナツィオナーレ・ミラノ",
  team:         "インテルナツィオナーレ・ミラノ",
  teamAliases:  ["インテル", "インテルナツィオナーレ", "インテル・ミラノ", "Inter Milan"],
  period: "2000/01〜2025/26",

  categories: {
    '監督': '#c0392b',
    'FW':  '#e67e22',
    'MF':  '#27ae60',
    'DF':  '#2471a3',
    'GK':  '#6c3483',
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
    { year: 2010, month:  5, name: 'CL決勝' },
    { year: 2023, month:  6, name: 'CL決勝' },

    // ── セリエA優勝（スクデット）──
    { year: 2006, month:  5, name: 'スクデット' },  // ユヴェントス剥奪分
    { year: 2007, month:  5, name: 'スクデット' },
    { year: 2008, month:  5, name: 'スクデット' },
    { year: 2009, month:  5, name: 'スクデット' },
    { year: 2010, month:  5, name: 'スクデット' },
    { year: 2021, month:  5, name: 'スクデット' },
    { year: 2024, month:  5, name: 'スクデット' },
  ],
};

// ────────────────────────────────────────────────
DATASETS.juventus = {
  name:   "ユヴェントスFC",
  team:         "ユヴェントスFC",
  teamAliases:  ["ユヴェントス", "ユベントス", "Juventus"],
  period: "2000/01〜2025/26",

  categories: {
    '監督': '#c0392b',   // 赤
    'FW':  '#e67e22',   // オレンジ
    'MF':  '#27ae60',   // 緑
    'DF':  '#2471a3',   // 青
    'GK':  '#6c3483',   // 紫
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

// ────────────────────────────────────────────────
// SSCナポリ
// ────────────────────────────────────────────────
DATASETS.napoli = {
  name:         "SSCナポリ",
  team:         "SSCナポリ",
  teamAliases:  ["ナポリ", "Napoli", "SSC Napoli"],
  period:       "2000/01〜2025/26",

  categories: {
    '監督': '#c0392b',
    'FW':  '#e67e22',
    'MF':  '#27ae60',
    'DF':  '#2471a3',
    'GK':  '#6c3483',
  },

  events: [
    // ── W杯 ──
    { year: 2002, month:  6, name: '日韓W杯' },
    { year: 2006, month:  7, name: 'ドイツW杯' },
    { year: 2010, month:  7, name: 'S.アフリカW杯' },
    { year: 2014, month:  7, name: 'ブラジルW杯' },
    { year: 2018, month:  7, name: 'ロシアW杯' },
    { year: 2022, month: 11, name: 'カタールW杯' },

    // ── セリエA優勝（スクデット）──
    { year: 2023, month:  5, name: 'スクデット' },
  ],
};

// ────────────────────────────────────────────────
// ASローマ
// ────────────────────────────────────────────────
DATASETS.roma = {
  name:         "ASローマ",
  team:         "ASローマ",
  teamAliases:  ["ローマ", "AS Roma", "Roma"],
  period:       "2000/01〜2025/26",

  categories: {
    '監督': '#c0392b',
    'FW':  '#e67e22',
    'MF':  '#27ae60',
    'DF':  '#2471a3',
    'GK':  '#6c3483',
  },

  events: [
    // ── W杯 ──
    { year: 2002, month:  6, name: '日韓W杯' },
    { year: 2006, month:  7, name: 'ドイツW杯' },
    { year: 2010, month:  7, name: 'S.アフリカW杯' },
    { year: 2014, month:  7, name: 'ブラジルW杯' },
    { year: 2018, month:  7, name: 'ロシアW杯' },
    { year: 2022, month: 11, name: 'カタールW杯' },

    // ── CLセミファイナル ──
    { year: 2018, month:  4, name: 'CLベスト4' },

    // ── セリエA優勝（スクデット）──
    { year: 2001, month:  5, name: 'スクデット' },

    // ── EL / Conference 優勝 ──
    { year: 2022, month:  5, name: 'UECL優勝' },
  ],
};

// ────────────────────────────────────────────────
// アタランタBC
// ────────────────────────────────────────────────
DATASETS.atalanta = {
  name:         "アタランタBC",
  team:         "アタランタBC",
  teamAliases:  ["アタランタ", "Atalanta", "Atalanta BC"],
  period:       "2000/01〜2025/26",

  categories: {
    '監督': '#c0392b',
    'FW':  '#e67e22',
    'MF':  '#27ae60',
    'DF':  '#2471a3',
    'GK':  '#6c3483',
  },

  events: [
    // ── W杯 ──
    { year: 2002, month:  6, name: '日韓W杯' },
    { year: 2006, month:  7, name: 'ドイツW杯' },
    { year: 2010, month:  7, name: 'S.アフリカW杯' },
    { year: 2014, month:  7, name: 'ブラジルW杯' },
    { year: 2018, month:  7, name: 'ロシアW杯' },
    { year: 2022, month: 11, name: 'カタールW杯' },

    // ── EL優勝 ──
    { year: 2024, month:  5, name: 'EL優勝' },
  ],
};

// ────────────────────────────────────────────────
// チェルシーFC
// ────────────────────────────────────────────────
DATASETS.chelsea = {
  name:         "チェルシーFC",
  team:         "チェルシーFC",
  teamAliases:  ["チェルシー", "Chelsea", "Chelsea FC"],
  period:       "2000/01〜2025/26",

  categories: {
    '監督': '#c0392b',
    'FW':  '#e67e22',
    'MF':  '#27ae60',
    'DF':  '#2471a3',
    'GK':  '#6c3483',
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
    { year: 2008, month:  5, name: 'CL決勝' },
    { year: 2012, month:  5, name: 'CL決勝' },
    { year: 2021, month:  5, name: 'CL決勝' },

    // ── プレミアリーグ優勝 ──
    { year: 2005, month:  4, name: 'PL優勝' },
    { year: 2006, month:  4, name: 'PL優勝' },
    { year: 2010, month:  5, name: 'PL優勝' },
    { year: 2015, month:  5, name: 'PL優勝' },
    { year: 2017, month:  5, name: 'PL優勝' },
  ],
};

// ────────────────────────────────────────────────
// FCバイエルン・ミュンヘン
// ────────────────────────────────────────────────
DATASETS.bayern = {
  name:   "FCバイエルン・ミュンヘン",
  team:         "FCバイエルン・ミュンヘン",
  teamAliases:  ["バイエルン", "バイエルン・ミュンヘン", "Bayern", "Bayern Munich", "FC Bayern"],
  period:       "2000/01〜2025/26",

  categories: {
    '監督': '#c0392b',
    'FW':  '#e67e22',
    'MF':  '#27ae60',
    'DF':  '#2471a3',
    'GK':  '#6c3483',
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
    { year: 2010, month:  5, name: 'CL決勝' },
    { year: 2012, month:  5, name: 'CL決勝' },
    { year: 2013, month:  5, name: 'CL決勝' },
    { year: 2020, month:  8, name: 'CL決勝' },
    { year: 2023, month:  6, name: 'CL決勝' },

    // ── ブンデスリーガ優勝 ──
    { year: 2003, month:  5, name: 'BL優勝' },
    { year: 2005, month:  5, name: 'BL優勝' },
    { year: 2006, month:  5, name: 'BL優勝' },
    { year: 2008, month:  4, name: 'BL優勝' },
    { year: 2010, month:  4, name: 'BL優勝' },
    { year: 2013, month:  4, name: 'BL優勝' },
    { year: 2014, month:  3, name: 'BL優勝' },
    { year: 2015, month:  4, name: 'BL優勝' },
    { year: 2016, month:  3, name: 'BL優勝' },
    { year: 2017, month:  4, name: 'BL優勝' },
    { year: 2018, month:  4, name: 'BL優勝' },
    { year: 2019, month:  4, name: 'BL優勝' },
    { year: 2020, month:  6, name: 'BL優勝' },
    { year: 2021, month:  4, name: 'BL優勝' },
    { year: 2022, month:  4, name: 'BL優勝' },
    { year: 2023, month:  4, name: 'BL優勝' },
  ],
};

// ────────────────────────────────────────────────
// ボルシア・ドルトムント
// ────────────────────────────────────────────────
DATASETS.dortmund = {
  name:         "ボルシア・ドルトムント",
  team:         "ボルシア・ドルトムント",
  teamAliases:  ["ドルトムント", "BVB", "Borussia Dortmund"],
  period:       "2000/01〜2025/26",

  categories: {
    '監督': '#c0392b',
    'FW':  '#e67e22',
    'MF':  '#27ae60',
    'DF':  '#2471a3',
    'GK':  '#6c3483',
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
    { year: 2013, month:  5, name: 'CL決勝' },
    { year: 2024, month:  6, name: 'CL決勝' },

    // ── ブンデスリーガ優勝 ──
    { year: 2002, month:  4, name: 'BL優勝' },
    { year: 2011, month:  4, name: 'BL優勝' },
    { year: 2012, month:  3, name: 'BL優勝' },
  ],
};

// ────────────────────────────────────────────────
// FC町田ゼルビア
// ────────────────────────────────────────────────
DATASETS.machida = {
  name:         "FC町田ゼルビア",
  team:         "FC町田ゼルビア",
  teamAliases:  ["町田ゼルビア", "町田"],
  period: "2000/01〜2025/26",

  categories: {
    '監督': '#c0392b',
    'FW':  '#e67e22',
    'MF':  '#27ae60',
    'DF':  '#2471a3',
    'GK':  '#6c3483',
  },

  events: [
    // ── J1昇格 ──
    { year: 2024, month:  1, name: 'J1昇格' },
  ],
};

// ────────────────────────────────────────────────
// 川崎フロンターレ
// ────────────────────────────────────────────────
DATASETS.kawasaki = {
  name:   "川崎フロンターレ",
  team:         "川崎フロンターレ",
  teamAliases:  ["川崎", "Kawasaki Frontale"],
  period:       "2000/01〜2025/26",

  categories: {
    '監督': '#c0392b',
    'FW':  '#e67e22',
    'MF':  '#27ae60',
    'DF':  '#2471a3',
    'GK':  '#6c3483',
  },

  events: [
    // ── J1優勝 ──
    { year: 2017, month: 11, name: 'J1優勝' },
    { year: 2018, month: 11, name: 'J1優勝' },
    { year: 2019, month: 12, name: 'J1優勝' },
    { year: 2020, month: 12, name: 'J1優勝' },
    { year: 2021, month: 11, name: 'J1優勝' },
  ],
};

// ────────────────────────────────────────────────
// アーセナルFC
// ────────────────────────────────────────────────
DATASETS.arsenal = {
  name:         "アーセナルFC",
  team:         "アーセナルFC",
  teamAliases:  ["アーセナル", "Arsenal", "Arsenal FC"],
  period:       "2000/01〜2025/26",

  categories: {
    '監督': '#c0392b',
    'FW':  '#e67e22',
    'MF':  '#27ae60',
    'DF':  '#2471a3',
    'GK':  '#6c3483',
  },

  events: [
    // ── W杯 ──
    { year: 2002, month:  6, name: '日韓W杯' },
    { year: 2006, month:  7, name: 'ドイツW杯' },
    { year: 2010, month:  7, name: 'S.アフリカW杯' },
    { year: 2014, month:  7, name: 'ブラジルW杯' },
    { year: 2018, month:  7, name: 'ロシアW杯' },
    { year: 2022, month: 11, name: 'カタールW杯' },

    // ── プレミアリーグ優勝 ──
    { year: 2002, month:  5, name: 'PL優勝' },
    { year: 2004, month:  4, name: 'PL優勝（無敗）' }, // The Invincibles

    // ── FAカップ優勝 ──
    { year: 2003, month:  5, name: 'FA杯優勝' },
    { year: 2005, month:  5, name: 'FA杯優勝' },
    { year: 2014, month:  5, name: 'FA杯優勝' },
    { year: 2015, month:  5, name: 'FA杯優勝' },
    { year: 2017, month:  5, name: 'FA杯優勝' },
    { year: 2020, month:  8, name: 'FA杯優勝' },
  ],
};

// ────────────────────────────────────────────────
// トッテナム・ホットスパーFC
// ────────────────────────────────────────────────
DATASETS.tottenham = {
  name:         "トッテナム・ホットスパーFC",
  team:         "トッテナム・ホットスパーFC",
  teamAliases:  ["トッテナム・ホットスパー", "トッテナム", "Tottenham", "Tottenham Hotspur", "Spurs"],
  period:       "2000/01〜2025/26",

  categories: {
    '監督': '#c0392b',
    'FW':  '#e67e22',
    'MF':  '#27ae60',
    'DF':  '#2471a3',
    'GK':  '#6c3483',
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
    { year: 2019, month:  6, name: 'CL決勝' },

    // ── リーグカップ優勝 ──
    { year: 2008, month:  2, name: 'リーグ杯優勝' },
  ],
};

// ────────────────────────────────────────────────
// FC東京
// ────────────────────────────────────────────────
DATASETS.fctokyo = {
  name:         "FC東京",
  team:         "FC東京",
  teamAliases:  ["東京", "FC Tokyo"],
  period:       "2000/01〜2025/26",

  categories: {
    '監督': '#c0392b',
    'FW':  '#e67e22',
    'MF':  '#27ae60',
    'DF':  '#2471a3',
    'GK':  '#6c3483',
  },

  events: [
    // ── J1優勝 ──
    { year: 2009, month: 11, name: 'J1優勝' },
  ],
};
