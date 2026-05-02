/* ================================================================
   data/clubs.js  –  クラブデータセット定義
   ================================================================

   ■ 各 DATASETS エントリのフィールド
     name         : 表示名（サイドバー・タイトルに使用）
     league       : リーグ名（サイドバーのグループラベルに使用）
     team         : PLAYERS.careers[].team と照合する文字列（正式名称・完全一致）
     teamAliases  : team の別名配列（他クラブスクレイパーが短縮名で記録した場合に対応）
     period       : 対象期間の表示用文字列
     categories   : ポジション → カラーコードのマップ
     events       : 月単位のイベント { year, month, name }

   ■ 選手データは player.js の PLAYERS 配列から自動抽出される
     （このファイルに選手を直接書く必要はない）

   ■ 並び順: プレミアリーグ / リーガ・エスパニョーラ / ブンデスリーガ
             / セリエA / リーグ・アン / Jリーグ
             各リーグ内はチーム名（カナ）順
   ================================================================ */

// ────────────────────────────────────────────────
// プレミアリーグ
// ────────────────────────────────────────────────

// アーセナルFC
DATASETS.arsenal = {
  name:         "アーセナルFC",
  league:       "プレミアリーグ",
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

// チェルシーFC
DATASETS.chelsea = {
  name:         "チェルシーFC",
  league:       "プレミアリーグ",
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

// トッテナム・ホットスパーFC
DATASETS.tottenham = {
  name:         "トッテナム・ホットスパーFC",
  league:       "プレミアリーグ",
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
// リーガ・エスパニョーラ
// ────────────────────────────────────────────────

// FCバルセロナ
DATASETS.barcelona = {
  name:         "FCバルセロナ",
  league:       "リーガ・エスパニョーラ",
  team:         "FCバルセロナ",
  teamAliases:  ["バルセロナ", "Barcelona", "FC Barcelona"],
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

// レアル・マドリードCF
DATASETS.real_madrid = {
  name:         "レアル・マドリードCF",
  league:       "リーガ・エスパニョーラ",
  team:         "レアル・マドリードCF",
  teamAliases:  ["レアル・マドリード", "レアルマドリード", "Real Madrid"],
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
// ブンデスリーガ
// ────────────────────────────────────────────────

// FCバイエルン・ミュンヘン
DATASETS.bayern = {
  name:         "FCバイエルン・ミュンヘン",
  league:       "ブンデスリーガ",
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

// ボルシア・ドルトムント
DATASETS.dortmund = {
  name:         "ボルシア・ドルトムント",
  league:       "ブンデスリーガ",
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
// セリエA
// ────────────────────────────────────────────────

// ACミラン
DATASETS.ac_milan = {
  name:         "ACミラン",
  league:       "セリエA",
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

// アタランタBC
DATASETS.atalanta = {
  name:         "アタランタBC",
  league:       "セリエA",
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

// インテルナツィオナーレ・ミラノ
DATASETS.inter = {
  name:         "インテルナツィオナーレ・ミラノ",
  league:       "セリエA",
  team:         "インテルナツィオナーレ・ミラノ",
  teamAliases:  ["インテル", "インテルナツィオナーレ", "インテル・ミラノ", "Inter Milan"],
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

// ユヴェントスFC
DATASETS.juventus = {
  name:         "ユヴェントスFC",
  league:       "セリエA",
  team:         "ユヴェントスFC",
  teamAliases:  ["ユヴェントス", "ユベントス", "Juventus"],
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

// SSCナポリ
DATASETS.napoli = {
  name:         "SSCナポリ",
  league:       "セリエA",
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

// ACFフィオレンティーナ
DATASETS.fiorentina = {
  name:         "ACFフィオレンティーナ",
  league:       "セリエA",
  team:         "ACFフィオレンティーナ",
  teamAliases:  ["フィオレンティーナ", "Fiorentina"],
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

    // ── セリエA準優勝 ──
    { year: 2008, month:  5, name: 'セリエA2位' },

    // ── コッパ・イタリア優勝 ──
    { year: 2001, month:  5, name: 'コッパ優勝' },
  ],
};

// ASローマ
DATASETS.roma = {
  name:         "ASローマ",
  league:       "セリエA",
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
// リーグ・アン
// ────────────────────────────────────────────────

// パリ・サンジェルマン
DATASETS.psg = {
  name:         "パリ・サンジェルマン",
  league:       "リーグ・アン",
  team:         "パリ・サンジェルマン",
  teamAliases:  ["パリサンジェルマン", "PSG", "Paris Saint-Germain"],
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
// Jリーグ
// ────────────────────────────────────────────────

// 川崎フロンターレ
DATASETS.kawasaki = {
  name:         "川崎フロンターレ",
  league:       "Jリーグ",
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

// FC町田ゼルビア
DATASETS.machida = {
  name:         "FC町田ゼルビア",
  league:       "Jリーグ",
  team:         "FC町田ゼルビア",
  teamAliases:  ["町田ゼルビア", "町田"],
  period:       "2000/01〜2025/26",

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

// FC東京
DATASETS.fctokyo = {
  name:         "FC東京",
  league:       "Jリーグ",
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
