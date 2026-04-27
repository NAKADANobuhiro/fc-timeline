/* =========================================================
   fc-timeline.js  –  描画エンジン
   ========================================================= */

/* ===== CONSTANTS ===== */
const NAME_W      = 160;   // 名前パネル幅
const ROW_H       = 28;    // 1行の高さ
const BAR_H       = 13;    // バーの高さ
const HDR_H       = 56;    // ヘッダー高さ
const EV_LANE_H   = 13;    // イベントラベル1レーン分の高さ
const EV_MAX_LANES = 2;    // イベントレーン最大数
const EV_AREA_H   = EV_MAX_LANES * EV_LANE_H;  // = 26
const SEASON_Y    = EV_AREA_H;                  // = 26  シーズンラベル帯 上端
const SEASON_H    = 16;                         // シーズンラベル帯 高さ
const TICK_Y      = SEASON_Y + SEASON_H;        // = 42  月ティック帯 上端
const TICK_H      = HDR_H - TICK_Y;            // = 14  月ティック帯 高さ

const AXIS_START  = 2000;                       // 2000年1月
const AXIS_END    = 2026 + 5 / 12;             // 2026年6月

// カテゴリ表示順（上から並ぶ順序）
const CAT_ORDER   = ['監督', 'GK', 'DF', 'MF', 'FW'];

/* ===== THEME ===== */
function cv(name) {
  return getComputedStyle(document.body).getPropertyValue(name).trim();
}
let currentTheme = localStorage.getItem('fctl-theme') || 'light';

function applyTheme(theme) {
  currentTheme = theme;
  document.body.classList.toggle('light', theme === 'light');
  localStorage.setItem('fctl-theme', theme);
  const icon  = document.getElementById('theme-icon');
  const label = document.getElementById('theme-label');
  if (icon)  icon.textContent  = theme === 'light' ? '☀️' : '🌙';
  if (label) label.textContent = theme === 'light' ? 'ダークモードに切替' : 'ライトモードに切替';
  buildChart();
}
function toggleTheme() { applyTheme(currentTheme === 'dark' ? 'light' : 'dark'); }

/* ===== TOOLTIP HELPER ===== */
// 左側選手名ホバー用：現在のクラブ以外の全キャリアを表示
function buildCareerTooltipHTML(p, ds) {
  const color   = ds.categories[p.position] || ds.categories[normalizePos(p.position)] || '#888';
  const normPos = normalizePos(p.position);
  let html = `<div class="tt-name">${p.name}</div>`;
  if (p.nat) html += `<div class="tt-nat">${p.nat}</div>`;
  html += `<div class="tt-pos" style="color:${color};font-weight:700">${normPos}</div>`;
  if (p.birth) {
    const bParts = p.birth.split('-');
    html += `<div class="tt-birth">生年月日: ${bParts[0]}年${Number(bParts[1])}月</div>`;
  }
  (p.careers || []).forEach(c => {
    const isCurrent = matchesTeam(c.team, ds);
    const endStr    = c.end ? fmtYM(c.end) : '現在';
    const loanStr   = c.loan ? ' <span class="tt-loan-badge">レンタル</span>' : '';
    if (isCurrent) {
      html += `<div class="tt-period-current">${c.team}: ${fmtYM(c.start)} 〜 ${endStr}${loanStr}</div>`;
    } else {
      html += `<div class="tt-period">${c.team}: ${fmtYM(c.start)} 〜 ${endStr}${loanStr}</div>`;
    }
  });
  return html;
}

function buildPlayerTooltipHTML(p, ds) {
  const color   = ds.categories[p.position] || ds.categories[normalizePos(p.position)] || '#888';
  const normPos = normalizePos(p.position);
  let html = `<div class="tt-name">${p.name}</div>`;
  if (p.nat) html += `<div class="tt-nat">${p.nat}</div>`;
  html += `<div class="tt-pos" style="color:${color};font-weight:700">${normPos}</div>`;
  if (p.birth) {
    const bParts = p.birth.split('-');
    html += `<div class="tt-birth">生年月日: ${bParts[0]}年${Number(bParts[1])}月</div>`;
  }
  p.stints.forEach(s => {
    const endStr  = s.end ? fmtYM(s.end) : '現在';
    const loanStr = s.loan ? ' <span class="tt-loan-badge">レンタル</span>' : '';
    html += `<div class="tt-period">在籍: ${fmtYM(s.start)} 〜 ${endStr}${loanStr}</div>`;
    if (s.number != null) html += `<div class="tt-number">#${s.number}</div>`;
  });
  p.loanOuts.forEach(lo => {
    const isInStint = p.stints.some(s => {
      const ss = toDecY(s.start), se = s.end ? toDecY(s.end) : AXIS_END;
      const ls = toDecY(lo.start), le = lo.end ? toDecY(lo.end) : AXIS_END;
      return ls < se && le > ss;
    });
    if (isInStint) {
      html += `<div class="tt-loanout">↗ レンタル: ${lo.team}（${fmtYM(lo.start)}〜${fmtYM(lo.end)}）</div>`;
    }
  });
  return html;
}

function showTooltip(html, clientX, clientY) {
  const ttEl = document.getElementById('tooltip');
  ttEl.innerHTML = html;
  ttEl.classList.add('show');
  posTooltip(clientX, clientY);
}
function posTooltip(clientX, clientY) {
  const ttEl = document.getElementById('tooltip');
  const ttH  = ttEl.offsetHeight || 120;
  const ttW  = ttEl.offsetWidth  || 200;
  const vw   = window.innerWidth;
  const vh   = window.innerHeight;
  const left = clientX + ttW + 14 > vw ? clientX - ttW - 8 : clientX + 14;
  const top  = clientY + ttH - 10 > vh ? clientY - ttH - 4 : clientY - 10;
  ttEl.style.left = left + 'px';
  ttEl.style.top  = top  + 'px';
}
function hideTooltip() {
  document.getElementById('tooltip').classList.remove('show');
}

/* ===== DATE UTILITIES ===== */

// "YYYY-MM" → 小数年（2010-07 → 2010.5）
function toDecY(str) {
  if (!str) return null;
  const parts = str.split('-');
  return Number(parts[0]) + (Number(parts[1]) - 1) / 12;
}

// "YYYY-MM" → "YYYY年M月"  / null → "現在"
function fmtYM(str) {
  if (!str) return '現在';
  const parts = str.split('-');
  return `${parts[0]}年${Number(parts[1])}月`;
}

// 小数年 → "YYYY/YY" シーズン表記
// シーズン開始月: 8月  例) 2023.583（8月）→ "2023/24"
function decYToSeason(dy) {
  const yr = Math.floor(dy);
  const mo = Math.round((dy - yr) * 12) + 1;
  const seasonStart = mo >= 8 ? yr : yr - 1;
  return `${seasonStart}/${String(seasonStart + 1).slice(2)}`;
}

/* ===== DATA UTILITIES ===== */

// PLAYERS から現在のクラブに関係する選手を抽出して在籍情報を付加
// クラブ名の一致判定（正式名 + teamAliases の別名に対応）
function matchesTeam(teamStr, ds) {
  if (teamStr === ds.team) return true;
  if (ds.teamAliases && ds.teamAliases.includes(teamStr)) return true;
  return false;
}

function getPlayersForDataset(ds) {
  // 「名前＋カテゴリ」の組み合わせでマージ。
  // 同一人物でも「選手（MF等）」と「監督」は別エントリとして共存させる
  // （例: ピルロ = ACミランでMF + ユヴェントスで監督）。
  // 同じ名前・同じcatが複数クラブブロックに存在する場合（例: アンチェロッティが
  // ユヴェントスとACミランの両方の監督ブロックに登録）は careers をマージして1エントリに統合。
  const byKey = new Map();
  for (const p of PLAYERS) {
    const key = `${p.name}|${p.cat}`;
    if (!byKey.has(key)) {
      // 最初の出現: careers のコピーを持つ新エントリを作成
      byKey.set(key, { ...p, careers: [...p.careers] });
    } else {
      // 2回目以降: careers をマージ（重複 start は除外）
      const existing = byKey.get(key);
      const existingStarts = new Set(existing.careers.map(c => c.start));
      for (const c of p.careers) {
        if (!existingStarts.has(c.start)) {
          existing.careers.push(c);
          existingStarts.add(c.start);
        }
      }
    }
  }
  const uniquePlayers = [...byKey.values()];

  return uniquePlayers
    .filter(p => p.careers.some(c => {
      if (!matchesTeam(c.team, ds)) return false;
      // AXIS_START より前に退団済みの場合は表示対象外
      const endDecY = c.end ? toDecY(c.end) : AXIS_END;
      return endDecY > AXIS_START;
    }))
    .map(p => ({
      ...p,
      position: p.position || p.cat || '?',   // cat → position に統一
      // このクラブへの在籍エントリ（loan_in 含む・表示範囲内のみ）
      stints:   p.careers.filter(c => {
        if (!matchesTeam(c.team, ds)) return false;
        const endDecY = c.end ? toDecY(c.end) : AXIS_END;
        return endDecY > AXIS_START;
      }),
      // loan_out 候補: 他クラブへの loan エントリ（在籍中のギャップ検出に使用）
      loanOuts: p.careers.filter(c => !matchesTeam(c.team, ds) && c.loan === true),
    }));
}

// stint の表示セグメントを返す（loan_out 期間をギャップとして除去）
// 戻り値: [{start: decimal, end: decimal, openEnd: bool}, ...]
function segmentsFor(stint, loanOuts) {
  const s = toDecY(stint.start);
  const e = stint.end ? toDecY(stint.end) : AXIS_END;

  // 在籍期間と重なる loan_out を絞り込んでソート
  const gaps = loanOuts
    .filter(lo => lo.start && (lo.end ? toDecY(lo.end) : AXIS_END) > s
                           && toDecY(lo.start) < e)
    .map(lo => ({ s: toDecY(lo.start), e: lo.end ? toDecY(lo.end) : AXIS_END }))
    .sort((a, b) => a.s - b.s);

  const segs = [];
  let cur = s;
  for (const gap of gaps) {
    const gs = Math.max(gap.s, s);
    const ge = Math.min(gap.e, e);
    if (gs > cur) segs.push({ start: cur, end: gs, openEnd: false });
    cur = Math.max(cur, gap.e);
  }
  if (cur < e) segs.push({ start: cur, end: e, openEnd: !stint.end });
  return segs;
}

// ポジション表記の正規化マップ（英語 → 日本語略称）
const POS_NORM = {
  // Attack / Forward
  'Attack':      'FW', 'Attacker':    'FW', 'Attackers':   'FW',
  'Forward':     'FW', 'Forwards':    'FW', 'Striker':     'FW',
  // Midfield
  'Midfield':    'MF', 'Midfielder':  'MF', 'Midfielders': 'MF',
  // Defender
  'Defender':    'DF', 'Defenders':   'DF', 'Defence':     'DF',
  'Defense':     'DF', 'Back':        'DF',
  // Goalkeeper
  'Goalkeeper':  'GK', 'Goalkeepers': 'GK', 'Keeper':      'GK',
  'GoalKeeper':  'GK',
  // Manager
  'Manager':     '監督', 'Coach':     '監督', 'Head Coach': '監督',
};

// position 文字列を CAT_ORDER の正規キーに変換する
function normalizePos(pos) {
  return POS_NORM[pos] || pos;
}

// カテゴリのソート順インデックスを返す
function catIndex(cat) {
  const i = CAT_ORDER.indexOf(normalizePos(cat));
  return i === -1 ? CAT_ORDER.length : i;
}

/* ===== STATE ===== */
let currentKey   = '';
let visibleCats  = {};
let curPlayers   = [];
let spacePressed = false;  // スペースキー押下中フラグ（在籍絞り込みモード）
let focusMode    = false;  // フォーカスボタン トグル（在籍絞り込みモード）
let curT        = d3.zoomIdentity;
let sortMode    = 'cat';   // 'birth' | 'cat' | 'tenure'
let kXExtra     = 1.0;
let curChartH   = 0;
let curTotalDataH = 0;
let curChartW   = 0;
let svgEl, contentG, namesG, axisG, zoomBehavior, xScale;
let evHitItems  = [];
let selectedDecY = null;  // 選択中の小数年（null = 未選択）

/* ===== VIEW RANGE ===== */
let viewMode = 'full';                          // 'recent' | 'full'
const VIEW_RECENT_START = 2015 + 7 / 12;        // 2015年8月

/* ===== HAMBURGER MENU ===== */
function toggleMenu(e) {
  e.stopPropagation();
  document.getElementById('hamburger-menu').classList.toggle('hidden');
}
function closeMenu() {
  document.getElementById('hamburger-menu').classList.add('hidden');
}
document.addEventListener('click', e => {
  if (!e.target.closest('#hamburger-btn') && !e.target.closest('#hamburger-menu')) closeMenu();
});

/* ===== SIDEBAR ===== */
function renderSidebar() {
  const list = document.getElementById('era-list');
  list.innerHTML = '';
  Object.keys(DATASETS).forEach(key => {
    const d  = DATASETS[key];
    const el = document.createElement('div');
    el.className = 'era-item' + (key === currentKey ? ' active' : '');
    el.innerHTML =
      `<img class="era-emblem" src="image/${key}.svg"` +
        ` onerror="this.src='image/${key}.png'; this.onerror=function(){this.classList.add('hidden');};"` +
        ` alt="${d.name}">` +
      `<div class="era-name">${d.name}</div>`;
    el.onclick = () => { visibleCats = {}; loadDataset(key); };
    list.appendChild(el);
  });
}

function renderFilters(ds) {
  const sec = document.getElementById('filters');
  sec.innerHTML = '';
  const head = document.createElement('div');
  head.className = 'filter-head';
  head.innerHTML =
    '<h3>ポジション フィルター</h3>' +
    '<div class="filter-btns">' +
      '<button class="filter-btn" id="filter-all">全選択</button>' +
      '<button class="filter-btn" id="filter-none">全解除</button>' +
    '</div>';
  sec.appendChild(head);
  const cats = Object.keys(ds.categories);
  head.querySelector('#filter-all').onclick  = () => { cats.forEach(c => visibleCats[c] = true);  renderFilters(ds); buildChart(); };
  head.querySelector('#filter-none').onclick = () => { cats.forEach(c => visibleCats[c] = false); renderFilters(ds); buildChart(); };
  cats.forEach(cat => {
    if (visibleCats[cat] === undefined) visibleCats[cat] = true;
    const lbl = document.createElement('label');
    lbl.className = 'filter-check';
    lbl.innerHTML =
      `<input type="checkbox" ${visibleCats[cat] ? 'checked' : ''}>` +
      `<span class="filter-dot" style="background:${ds.categories[cat]}"></span>${cat}`;
    lbl.querySelector('input').onchange = e => { visibleCats[cat] = e.target.checked; buildChart(); };
    sec.appendChild(lbl);
  });
}

function renderLegend(ds) {
  const leg = document.getElementById('legend');
  leg.innerHTML = '';
  Object.entries(ds.categories).forEach(([name, color]) => {
    leg.innerHTML +=
      `<div class="legend-item"><span class="legend-dot" style="background:${color}"></span>${name}</div>`;
  });
}

/* ===== SIDEBAR TOGGLE ===== */
let sidebarOpen = true;
function toggleSidebar() {
  sidebarOpen = !sidebarOpen;
  const sb = document.getElementById('sidebar');
  const expandBtn = document.getElementById('expand-btn');
  sb.classList.toggle('collapsed', !sidebarOpen);
  expandBtn.style.display = sidebarOpen ? 'none' : 'flex';
  setTimeout(buildChart, 270);
}

/* ===== AGE PANEL ===== */

// 小数年を最近傍月にスナップしてパネルを開く
function selectDecY(decY) {
  const wasOpen = document.getElementById('age-panel').classList.contains('open');
  const months  = Math.round((decY - AXIS_START) * 12);
  const snapped = AXIS_START + months / 12;
  selectedDecY  = Math.max(AXIS_START, Math.min(AXIS_END, snapped));
  document.getElementById('age-panel').classList.add('open');
  renderAgePanel();
  redrawFixed();
  // フォーカスモード中は日付変化のたびに再描画して絞り込みを更新する
  if (!wasOpen || focusMode) setTimeout(buildChart, focusMode ? 0 : 260);
}

// パネルを閉じる（selectedDecY は保持 → チャートクリックで再表示可能）
function closeAgePanel() {
  document.getElementById('age-panel').classList.remove('open');
  redrawFixed();
  setTimeout(buildChart, 260);
}

// 選択日付が画面端に近い場合にスクロール
function scrollDecYIntoView(decY) {
  if (!svgEl) return;
  const W      = +svgEl.attr('width');
  const margin = 80;
  const sx     = NAME_W + curT.x + xScale(decY) * curT.k * kXExtra;
  let dx = 0;
  if (sx < NAME_W + margin) dx = NAME_W + margin - sx;
  else if (sx > W - margin) dx = W - margin - sx;
  if (dx === 0) return;
  // curT.translate は translate-then-scale 空間で動く → dx を k で割る必要はない
  // d3.zoomIdentity を使って直接組み立てる
  const newX = curT.x + dx;
  const minX = Math.min(0, curChartW - curChartW * curT.k * kXExtra);
  const cx   = Math.max(minX, Math.min(0, newX));
  const newT = d3.zoomIdentity.scale(curT.k).translate(cx / curT.k, curT.y / curT.k);
  svgEl.call(zoomBehavior.transform, newT);
}

// パネルに在籍選手リストを描画
function renderAgePanel() {
  if (selectedDecY === null || !currentKey) return;
  const ds = DATASETS[currentKey];
  const yr = Math.floor(selectedDecY);
  const mo = Math.round((selectedDecY - yr) * 12) + 1;
  document.getElementById('age-panel-year').textContent = `${yr}年${mo}月`;

  // 全選手（フィルター無視）をソートして在籍チェック
  const allP = getPlayersForDataset(ds).slice().sort((a, b) => {
    const cd = catIndex(a.position) - catIndex(b.position);
    if (cd !== 0) return cd;
    return toDecY(a.birth || '1970-01') - toDecY(b.birth || '1970-01');
  });

  const present = allP.filter(p =>
    p.stints.some(stint => {
      const segs = segmentsFor(stint, p.loanOuts);
      return segs.some(seg => seg.start <= selectedDecY && selectedDecY <= seg.end);
    })
  );

  const list = document.getElementById('age-panel-list');
  list.innerHTML = '';

  if (present.length === 0) {
    list.innerHTML =
      '<div style="padding:14px 10px;font-size:11px;color:var(--text-muted)">在籍選手なし</div>';
    return;
  }

  let lastCat = null;
  present.forEach(p => {
    const normCat = normalizePos(p.position);
    if (normCat !== lastCat) {
      lastCat = normCat;
      const head = document.createElement('div');
      head.className = 'age-cat-head';
      head.textContent = normCat;
      list.appendChild(head);
    }
    const color = ds.categories[p.position] || ds.categories[normalizePos(p.position)] || '#888';
    const activeSint = p.stints.find(stint => {
      const segs = segmentsFor(stint, p.loanOuts);
      return segs.some(seg => seg.start <= selectedDecY && selectedDecY <= seg.end);
    });
    const isLoanIn = activeSint ? !!activeSint.loan : false;
    const numPart  = activeSint && activeSint.number != null
      ? ` <span class="age-num">(${activeSint.number})</span>` : '';

    // 選択月時点の年齢
    const age = p.birth
      ? Math.floor(selectedDecY - toDecY(p.birth))
      : null;

    const item = document.createElement('div');
    item.className = 'age-item';
    item.innerHTML =
      `<span class="age-dot" style="background:${color}"></span>` +
      `<span class="age-name">${p.name}${numPart}</span>` +
      (isLoanIn ? `<span class="age-loan">L</span>` : '') +
      (age !== null ? `<span class="age-age">${age}</span>` : '');

    // ホバーツールチップ
    item.addEventListener('mouseover', function(ev) {
      showTooltip(buildPlayerTooltipHTML(p, ds), ev.clientX, ev.clientY);
    });
    item.addEventListener('mousemove', function(ev) {
      posTooltip(ev.clientX, ev.clientY);
    });
    item.addEventListener('mouseout', hideTooltip);

    list.appendChild(item);
  });
}

/* ===== LOAD DATASET ===== */
function loadDataset(key) {
  currentKey = key;
  try { if (location.hash !== '#' + key) history.replaceState(null, '', '#' + key); } catch (e) {}
  renderSidebar();
  const ds = DATASETS[key];
  document.getElementById('t-title').textContent = ds.name;
  document.title = ds.name + ' / fc-timeline';
  curT     = d3.zoomIdentity;
  kXExtra  = getViewKXExtra();
  visibleCats = {};
  renderFilters(ds);
  renderLegend(ds);

  // パネルを buildChart より先に開く（幅計算を正確にするため）
  // CSS トランジションを一時的に無効化して即座に 200px にする
  if (selectedDecY === null) {
    const now = new Date();
    const dy  = now.getFullYear() + now.getMonth() / 12;
    selectedDecY = Math.max(AXIS_START, Math.min(AXIS_END, dy));
  }
  const panelEl = document.getElementById('age-panel');
  panelEl.style.transition = 'none';
  panelEl.classList.add('open');
  panelEl.offsetHeight;   // reflow を強制して即座に 200px を反映
  panelEl.style.transition = '';

  buildChart();
  applyViewMode(false);
  renderAgePanel();
  redrawFixed();
}

/* =========================================================
   MAIN CHART
   ========================================================= */
function buildChart() {
  if (!currentKey || !DATASETS[currentKey]) return;
  const ds = DATASETS[currentKey];
  const wrap = document.getElementById('chart-wrap');
  wrap.innerHTML = '';

  // 選手抽出 → フィルター → ソート
  const allPlayers = getPlayersForDataset(ds);
  curPlayers = allPlayers
    .filter(p => visibleCats[p.position] !== false)
    .filter(p => {
      // solid セグメントが表示範囲内に一定期間（2ヶ月以上）あれば表示
      const viewStart = viewMode === 'recent' ? VIEW_RECENT_START : AXIS_START;
      const MIN_SOLID = 2 / 12;  // 2ヶ月未満の solid は無視
      return p.stints.some(stint => {
        const segs = segmentsFor(stint, p.loanOuts);
        return segs.some(seg => {
          const visStart = Math.max(seg.start, viewStart);
          const visEnd   = Math.min(seg.end,   AXIS_END);
          return visEnd - visStart >= MIN_SOLID;
        });
      });
    })
    .slice()
    .sort((a, b) => {
      if (sortMode === 'tenure') {
        // 現クラブへの最初の移籍日（最も古い在籍開始日）で昇順ソート
        const firstStint = p => p.careers
          .filter(c => matchesTeam(c.team, ds))
          .map(c => toDecY(c.start || '1970-01'))
          .reduce((mn, v) => Math.min(mn, v), Infinity);
        return firstStint(a) - firstStint(b);
      }
      if (sortMode === 'cat') {
        const cd = catIndex(a.position) - catIndex(b.position);
        if (cd !== 0) return cd;
        // 第二キー: 現クラブへの最初の在籍開始日で昇順
        const firstStint = p => p.careers
          .filter(c => matchesTeam(c.team, ds))
          .map(c => toDecY(c.start || '1970-01'))
          .reduce((mn, v) => Math.min(mn, v), Infinity);
        return firstStint(a) - firstStint(b);
      }
      // 生年月でセカンダリソート
      return toDecY(a.birth || '1970-01') - toDecY(b.birth || '1970-01');
    });

  // スペースキー押下中 or フォーカスモード：選択月に在籍している選手だけを絞り込み表示
  if ((spacePressed || focusMode) && selectedDecY !== null) {
    curPlayers = curPlayers.filter(p =>
      p.stints.some(s => {
        const ss = toDecY(s.start);
        const se = s.end ? toDecY(s.end) : AXIS_END;
        return ss <= selectedDecY && selectedDecY < se;
      })
    );
  }

  const rect = wrap.getBoundingClientRect();
  const W = rect.width, H = rect.height;
  if (W < 20 || H < 20) return;

  const chartW = W - NAME_W;
  xScale = d3.scaleLinear().domain([AXIS_START, AXIS_END]).range([0, chartW]);

  const chartH = H - HDR_H;
  curChartH     = chartH;
  curTotalDataH = curPlayers.length * ROW_H + 80;
  curChartW     = chartW;

  /* SVG */
  svgEl = d3.select(wrap).append('svg')
    .attr('width', W).attr('height', H)
    .style('display', 'block');

  /* Clip paths */
  const defs = svgEl.append('defs');
  defs.append('clipPath').attr('id', 'clip-chart')
    .append('rect').attr('x', NAME_W).attr('y', HDR_H)
    .attr('width', chartW).attr('height', chartH);
  defs.append('clipPath').attr('id', 'clip-ev')
    .append('rect').attr('x', NAME_W).attr('y', 0)
    .attr('width', chartW).attr('height', EV_AREA_H);

  /* Content group（ズーム対象） */
  contentG = svgEl.append('g').attr('clip-path', 'url(#clip-chart)');
  const cg = contentG.append('g').attr('class', 'cg');
  applyContentTransform(cg, curT);

  drawBars(cg, ds);

  /* Fixed overlay groups */
  namesG = svgEl.append('g');
  axisG  = svgEl.append('g');

  /* コーナー塗り */
  svgEl.append('rect')
    .attr('width', NAME_W).attr('height', HDR_H)
    .attr('fill', cv('--chart-panel'));

  redrawFixed();

  /* ── ズーム挙動 ── */
  let _mdX = 0, _mdY = 0;

  zoomBehavior = d3.zoom()
    .scaleExtent([0.15, 30])
    .filter(event => {
      if (event.type === 'wheel') return false;
      return !event.ctrlKey && !event.button;
    })
    .on('start', event => {
      const src = event.sourceEvent;
      if (!src) return;
      if (src.type === 'touchstart') {
        const t = src.touches && src.touches[0];
        if (t) { _mdX = t.clientX; _mdY = t.clientY; }
      } else if (src.clientX !== undefined) {
        // mousedown / pointerdown どちらでも記録
        _mdX = src.clientX; _mdY = src.clientY;
      }
    })
    .on('zoom', event => {
      let t = event.transform;
      const minY = Math.min(0, curChartH - curTotalDataH * t.k);
      const minX = Math.min(0, curChartW - curChartW * t.k * kXExtra);
      const cy   = Math.max(minY, Math.min(0, t.y));
      const cx   = Math.max(minX, Math.min(0, t.x));
      if (cy !== t.y || cx !== t.x)
        t = d3.zoomIdentity.scale(t.k).translate(cx / t.k, cy / t.k);
      curT = t;
      applyContentTransform(svgEl.select('.cg'), curT);
      redrawFixed();
      document.getElementById('zoom-info').textContent = Math.round(curT.k * 100) + '%';
    })
    .on('end', event => {
      const src = event.sourceEvent;
      if (!src) return;
      let ex, ey;
      if (src.type === 'touchend') {
        const t = src.changedTouches && src.changedTouches[0];
        if (!t) return;
        ex = t.clientX; ey = t.clientY;
      } else if (src.type === 'mouseup' || src.type === 'pointerup') {
        ex = src.clientX; ey = src.clientY;
      } else return;
      if (Math.abs(ex - _mdX) > 8 || Math.abs(ey - _mdY) > 8) return;

      // クリック座標を SVG 相対に変換
      const svgRect = svgEl.node().getBoundingClientRect();
      const px = ex - svgRect.left;
      const py = ey - svgRect.top;

      // イベントラベルのヒット判定（ラベル帯の高さ内かつX一致の場合のみ無視）
      if (py < EV_AREA_H + 8) {
        for (const hit of evHitItems) {
          if (px >= hit.sx - hit.w / 2 && px <= hit.sx + hit.w / 2) return;
        }
      }

      // 名前パネル領域はスキップ
      if (px < NAME_W) return;

      // クリック位置の小数年を計算してパネル選択
      const chartRelX = px - NAME_W;
      const rawDecY = xScale.invert((chartRelX - curT.x) / (curT.k * kXExtra));
      if (rawDecY < AXIS_START || rawDecY > AXIS_END) return;
      selectDecY(rawDecY);
    });

  svgEl.call(zoomBehavior);

  /* ── ホイール → スクロール ── */
  svgEl.on('wheel.scroll', function(event) {
    event.preventDefault();
    if (event.ctrlKey) {
      const delta  = event.deltaMode === 1 ? event.deltaY * ROW_H : event.deltaY;
      const factor = delta > 0 ? 1 / 1.15 : 1.15;
      svgEl.call(zoomBehavior.scaleBy, factor);
      return;
    }
    const delta  = event.deltaMode === 1 ? event.deltaY * ROW_H : event.deltaY;
    const hDelta = event.deltaMode === 1 ? event.deltaX * ROW_H : event.deltaX;
    const dx = event.shiftKey ? -delta : -hDelta;
    const dy = event.shiftKey ? 0      : -delta;
    let newT = curT.translate(dx, dy);
    const minY = Math.min(0, curChartH - curTotalDataH * newT.k);
    const minX = Math.min(0, curChartW - curChartW * newT.k * kXExtra);
    const cy   = Math.max(minY, Math.min(0, newT.y));
    const cx   = Math.max(minX, Math.min(0, newT.x));
    if (cy !== newT.y || cx !== newT.x)
      newT = d3.zoomIdentity.scale(newT.k).translate(cx / newT.k, cy / newT.k);
    svgEl.call(zoomBehavior.transform, newT);
  }, { passive: false });
}

/* ── applyContentTransform ── */
function applyContentTransform(sel, t) {
  sel.attr('transform',
    `translate(${NAME_W + t.x},${HDR_H + t.y}) scale(${t.k * kXExtra},${t.k})`
  );
}

/* =========================================================
   DRAW BARS
   ========================================================= */
function drawBars(cg, ds) {
  const ttEl = document.getElementById('tooltip');

  /* シーズン区切り（8月）縦グリッド */
  for (let yr = 2000; yr <= 2025; yr++) {
    const sx = xScale(yr + 7 / 12);
    cg.append('line')
      .attr('x1', sx).attr('y1', 0)
      .attr('x2', sx).attr('y2', curPlayers.length * ROW_H + 80)
      .attr('stroke', cv('--border')).attr('stroke-width', 0.6).attr('opacity', 0.5);
  }
  /* 1月の補助線（細い） */
  for (let yr = 2001; yr <= 2026; yr++) {
    const sx = xScale(yr);
    cg.append('line')
      .attr('x1', sx).attr('y1', 0)
      .attr('x2', sx).attr('y2', curPlayers.length * ROW_H + 80)
      .attr('stroke', cv('--border-lite')).attr('stroke-width', 0.4).attr('opacity', 0.3);
  }

  curPlayers.forEach((p, i) => {
    const color = ds.categories[p.position] || ds.categories[normalizePos(p.position)] || '#888';
    const cy    = i * ROW_H + ROW_H / 2;

    /* 行ストライプ */
    if (i % 2 === 0) {
      cg.append('rect')
        .attr('x', xScale(AXIS_START) - 5).attr('y', i * ROW_H)
        .attr('width', xScale(AXIS_END) - xScale(AXIS_START) + 10).attr('height', ROW_H)
        .attr('fill', cv('--chart-stripe'));
    }

    /* 各在籍エントリ */
    p.stints.forEach(stint => {
      const segs = segmentsFor(stint, p.loanOuts);
      const isLoanIn = !!stint.loan;

      segs.forEach(seg => {
        const x1 = xScale(Math.max(seg.start, AXIS_START));
        const x2 = xScale(Math.min(seg.end,   AXIS_END));
        const bw = x2 - x1;
        if (bw <= 0) return;

        /* バー本体（グロー） */
        cg.append('rect')
          .attr('x', x1).attr('y', cy - BAR_H / 2 - 3)
          .attr('width', bw).attr('height', BAR_H + 6)
          .attr('fill', color).attr('rx', 3).attr('opacity', 0.08);

        /* バー本体 */
        const bar = cg.append('rect')
          .attr('x', x1).attr('y', cy - BAR_H / 2)
          .attr('width', bw).attr('height', BAR_H)
          .attr('fill', color).attr('rx', 3)
          .attr('opacity', isLoanIn ? 0.65 : 0.82)
          .attr('cursor', 'pointer');

        /* レンタル加入: 破線ボーダー */
        if (isLoanIn) {
          bar.attr('stroke', cv('--loan-dash'))
             .attr('stroke-width', 1.2)
             .attr('stroke-dasharray', '4,2');
        }

        /* 開放バー（現役・在籍中）: 右端に矢印 */
        if (seg.openEnd) {
          const arrowX = x2;
          const _ax = arrowX;
          cg.append('polygon')
            .attr('class', 'bar-text').attr('data-x', _ax + 5)
            .attr('points', `${_ax * kXExtra},${cy - 5} ${(_ax + 8) * kXExtra},${cy} ${_ax * kXExtra},${cy + 5}`)
            .attr('transform', `scale(${1 / kXExtra},1)`)
            .attr('fill', color).attr('opacity', 0.9)
            .attr('pointer-events', 'none');
        }

        /* 背番号ラベル */
        if (bw > 16 && stint.number != null) {
          const _x = (x1 + x2) / 2;
          const numStr = String(stint.number);
          cg.append('text')
            .attr('class', 'bar-text').attr('data-x', _x)
            .attr('x', _x * kXExtra).attr('y', cy + 4)
            .attr('text-anchor', 'middle')
            .attr('transform', `scale(${1 / kXExtra},1)`)
            .attr('fill', 'rgba(255,255,255,0.90)')
            .attr('font-size', Math.min(10, BAR_H - 1))
            .attr('font-weight', 700)
            .attr('pointer-events', 'none')
            .text(numStr);
        }

        /* ツールチップ */
        const loanOuts = p.loanOuts.filter(lo => {
          const los = toDecY(lo.start);
          const loe = lo.end ? toDecY(lo.end) : AXIS_END;
          return los < toDecY(stint.end || '9999-12') && loe > toDecY(stint.start);
        });
        bar
          .on('mouseover', function(event) {
            d3.select(this).attr('opacity', 1);
            const endStr = stint.end ? fmtYM(stint.end) : '現在';
            let html =
              `<div class="tt-name">${p.name}</div>` +
              `<div class="tt-nat">${p.national || ''}</div>` +
              `<div class="tt-period">在籍: ${fmtYM(stint.start)} 〜 ${endStr}</div>`;
            if (stint.number != null) html += `<div class="tt-number">#${stint.number}</div>`;
            if (isLoanIn) html += `<div class="tt-loan">レンタル加入</div>`;
            if (p.birth)  html += `<div class="tt-birth">生年月: ${fmtYM(p.birth)}</div>`;
            if (loanOuts.length > 0) {
              loanOuts.forEach(lo => {
                html += `<div class="tt-loanout">↗ レンタル移籍: ${fmtYM(lo.start)}〜${fmtYM(lo.end)}</div>`;
              });
            }
            ttEl.innerHTML = html;
            ttEl.classList.add('show');
          })
          .on('mousemove', event => {
            posTooltip(event.clientX, event.clientY);
          })
          .on('mouseout', function() {
            d3.select(this).attr('opacity', isLoanIn ? 0.65 : 0.82);
            ttEl.classList.remove('show');
          });
      }); // segs.forEach

      /* loan_out ギャップ: 薄い点線で「不在」を示す */
      p.loanOuts.forEach(lo => {
        const stintS = toDecY(stint.start);
        const stintE = stint.end ? toDecY(stint.end) : AXIS_END;
        const loS    = toDecY(lo.start);
        const loE    = lo.end ? toDecY(lo.end) : AXIS_END;
        if (loS >= stintE || loE <= stintS) return;
        const gx1 = xScale(Math.max(loS, stintS, AXIS_START));
        const gx2 = xScale(Math.min(loE, stintE, AXIS_END));
        if (gx2 <= gx1) return;
        cg.append('line')
          .attr('x1', gx1).attr('y1', cy)
          .attr('x2', gx2).attr('y2', cy)
          .attr('stroke', color).attr('stroke-width', 1)
          .attr('stroke-dasharray', '3,3').attr('opacity', 0.35)
          .attr('pointer-events', 'none');
      });

    }); // stints.forEach
  }); // curPlayers.forEach
}

/* =========================================================
   FIXED PANELS
   ========================================================= */
function redrawFixed() {
  drawNamesPanel();
  drawAxisPanel();
}

/* ── 名前パネル（左固定） ── */
function drawNamesPanel() {
  namesG.selectAll('*').remove();
  const W = +svgEl.attr('width');
  const H = +svgEl.attr('height');
  const ds = DATASETS[currentKey];
  const t  = curT;

  namesG.append('rect')
    .attr('width', NAME_W).attr('height', H)
    .attr('fill', cv('--chart-panel'));

  curPlayers.forEach((p, i) => {
    const color = ds.categories[p.position] || ds.categories[normalizePos(p.position)] || '#888';
    const sy    = HDR_H + t.y + (i * ROW_H + ROW_H / 2) * t.k;
    if (sy < HDR_H - ROW_H || sy > H + ROW_H) return;

    /* ストライプ */
    if (i % 2 === 0) {
      namesG.append('rect')
        .attr('x', 0).attr('y', sy - (ROW_H * t.k) / 2)
        .attr('width', NAME_W - 1).attr('height', ROW_H * t.k)
        .attr('fill', cv('--chart-stripe'));
    }
    /* カラーアクセント縦線 */
    namesG.append('rect')
      .attr('x', 0).attr('y', sy - 5).attr('width', 3).attr('height', 10)
      .attr('fill', color).attr('rx', 1);

    /* 選手名 */
    const fs = Math.max(9, Math.min(12, 11 * t.k));
    namesG.append('text')
      .attr('x', NAME_W - 8).attr('y', sy)
      .attr('text-anchor', 'end').attr('dominant-baseline', 'middle')
      .attr('font-size', fs).attr('font-weight', 600)
      .attr('fill', color)
      .attr('pointer-events', 'none')
      .text(p.name);

    /* 透明ヒット領域（名前行全体）→ ツールチップ */
    namesG.append('rect')
      .attr('x', 0).attr('y', sy - (ROW_H * t.k) / 2)
      .attr('width', NAME_W - 1).attr('height', ROW_H * t.k)
      .attr('fill', 'transparent')
      .attr('cursor', 'default')
      .on('mouseover', function(event) {
        showTooltip(buildCareerTooltipHTML(p, ds), event.clientX, event.clientY);
      })
      .on('mousemove', function(event) {
        posTooltip(event.clientX, event.clientY);
      })
      .on('mouseout', hideTooltip);
  });

  /* 右ボーダー */
  namesG.append('line')
    .attr('x1', NAME_W).attr('y1', HDR_H)
    .attr('x2', NAME_W).attr('y2', H)
    .attr('stroke', cv('--border')).attr('stroke-width', 1);
}

/* ── 軸パネル（上固定） ── */
function drawAxisPanel() {
  axisG.selectAll('*').remove();
  const W  = +svgEl.attr('width');
  const ds = DATASETS[currentKey];
  const chartW = W - NAME_W;
  const t  = curT;

  /* 背景 */
  axisG.append('rect')
    .attr('x', NAME_W).attr('width', chartW).attr('height', HDR_H)
    .attr('fill', cv('--chart-panel'));

  /* シーズン帯の背景 */
  axisG.append('rect')
    .attr('x', NAME_W).attr('y', SEASON_Y)
    .attr('width', chartW).attr('height', SEASON_H)
    .attr('fill', cv('--chart-season-bg'));

  /* ── イベントラベル（2レーン） ── */
  const evFontSize = Math.min(14, Math.max(10, 10 * t.k));

  function evLabelW(text) { return text.length * evFontSize * 0.58 + 10; }

  const evItemsAll = (ds.events || []).map(ev => {
    const decY = ev.year + (ev.month - 1) / 12;
    const sx   = NAME_W + t.x + xScale(decY) * t.k * kXExtra;
    const text = ev.name;
    return { ev, decY, sx, text, w: evLabelW(text) };
  });
  evItemsAll.sort((a, b) => a.sx - b.sx);

  /* 貪欲レーン割り当て（最大 EV_MAX_LANES レーン） */
  const laneRights = [];
  for (const item of evItemsAll) {
    const leftEdge = item.sx - item.w / 2 - 4;
    let lane = laneRights.findIndex(r => leftEdge >= r);
    if (lane === -1) {
      lane = laneRights.length < EV_MAX_LANES ? laneRights.length : EV_MAX_LANES - 1;
    }
    if (laneRights[lane] === undefined) laneRights[lane] = 0;
    laneRights[lane] = item.sx + item.w / 2;
    item.lane = lane;
  }
  evHitItems = evItemsAll.map(item => ({ sx: item.sx, w: item.w }));

  const evG = axisG.append('g').attr('clip-path', 'url(#clip-ev)');

  evItemsAll
    .filter(item => item.sx + item.w / 2 >= NAME_W && item.sx - item.w / 2 <= W)
    .forEach(item => {
      const centerY = (item.lane + 0.5) * EV_LANE_H;
      // コネクタ線
      if (centerY + evFontSize * 0.6 < EV_AREA_H) {
        evG.append('line')
          .attr('x1', item.sx).attr('y1', centerY + evFontSize * 0.6)
          .attr('x2', item.sx).attr('y2', EV_AREA_H)
          .attr('stroke', cv('--chart-ev-line')).attr('stroke-width', 0.7).attr('opacity', 0.4);
      }
      // 三角マーカー（EV_AREA_H 境界に）
      axisG.append('polygon')
        .attr('points', `${item.sx-3},${EV_AREA_H} ${item.sx+3},${EV_AREA_H} ${item.sx},${EV_AREA_H+5}`)
        .attr('fill', cv('--chart-ev-line')).attr('opacity', 0.8)
        .attr('cursor', 'pointer')
        .on('click', (event) => { event.stopPropagation(); selectDecY(item.decY); });
      // ラベル
      evG.append('text')
        .attr('x', item.sx).attr('y', centerY)
        .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
        .attr('fill', cv('--chart-ev-text'))
        .attr('font-size', evFontSize).attr('font-weight', 600)
        .attr('cursor', 'pointer')
        .on('click', (event) => { event.stopPropagation(); selectDecY(item.decY); })
        .text(item.text);
    });

  /* ── シーズン区切り・ラベル ── */
  // 1px あたりの年数
  const pxPerMonth = (chartW / ((AXIS_END - AXIS_START) * 12)) * t.k * kXExtra;

  for (let yr = 1999; yr <= 2026; yr++) {
    const decY = yr + 7 / 12;   // 8月
    const sx   = NAME_W + t.x + xScale(decY) * t.k * kXExtra;
    if (sx < NAME_W - 2 || sx > W + 2) continue;

    /* 区切り縦線 */
    axisG.append('line')
      .attr('x1', sx).attr('y1', SEASON_Y)
      .attr('x2', sx).attr('y2', HDR_H)
      .attr('stroke', cv('--border')).attr('stroke-width', 1).attr('opacity', 0.7);

    /* シーズンラベル "2023/24" */
    const nextSx = NAME_W + t.x + xScale((yr + 1) + 7 / 12) * t.k * kXExtra;
    const bandW  = nextSx - sx;
    if (bandW > 20) {
      const labelX = Math.min(Math.max(sx + 3, NAME_W + 2), W - 2);
      axisG.append('text')
        .attr('x', labelX).attr('y', SEASON_Y + SEASON_H / 2)
        .attr('dominant-baseline', 'middle')
        .attr('fill', cv('--chart-yr-text'))
        .attr('font-size', Math.min(11, Math.max(8, bandW / 7)))
        .text(`${String(yr).slice(2)}/${String(yr + 1).slice(2)}`);
    }
  }

  /* ── 月ティック ── */
  const showMonthLabels = pxPerMonth > 14;
  const showMonthTicks  = pxPerMonth > 3;

  if (showMonthTicks) {
    for (let yr = 2000; yr <= 2026; yr++) {
      for (let mo = 1; mo <= 12; mo++) {
        const decY = yr + (mo - 1) / 12;
        if (decY < AXIS_START || decY > AXIS_END) continue;
        const sx = NAME_W + t.x + xScale(decY) * t.k * kXExtra;
        if (sx < NAME_W || sx > W) continue;
        if (mo === 8) continue;  // シーズン区切りは上で描画済み

        const isJan  = (mo === 1);
        const tickH2 = isJan ? 6 : 3;
        axisG.append('line')
          .attr('x1', sx).attr('y1', HDR_H - tickH2)
          .attr('x2', sx).attr('y2', HDR_H)
          .attr('stroke', isJan ? cv('--border') : cv('--border-lite'))
          .attr('stroke-width', isJan ? 0.8 : 0.4);

        if (showMonthLabels) {
          axisG.append('text')
            .attr('x', sx + 2).attr('y', TICK_Y + TICK_H / 2)
            .attr('dominant-baseline', 'middle')
            .attr('fill', cv('--chart-yr-text'))
            .attr('font-size', 8)
            .text(mo);
        }
      }
    }
  } else {
    /* 縮小時: 1月のみ表示 */
    for (let yr = 2000; yr <= 2026; yr++) {
      const sx = NAME_W + t.x + xScale(yr) * t.k * kXExtra;
      if (sx < NAME_W || sx > W) continue;
      axisG.append('line')
        .attr('x1', sx).attr('y1', HDR_H - 5)
        .attr('x2', sx).attr('y2', HDR_H)
        .attr('stroke', cv('--border')).attr('stroke-width', 0.7);
      if (pxPerMonth * 12 > 20) {  // 1年が20px以上なら年ラベル表示
        axisG.append('text')
          .attr('x', sx + 2).attr('y', TICK_Y + TICK_H / 2)
          .attr('dominant-baseline', 'middle')
          .attr('fill', cv('--chart-yr-text')).attr('font-size', 9)
          .text(yr);
      }
    }
  }

  /* 下ボーダー */
  axisG.append('line')
    .attr('x1', 0).attr('y1', HDR_H)
    .attr('x2', W).attr('y2', HDR_H)
    .attr('stroke', cv('--border')).attr('stroke-width', 1);

  /* ── 選択ライン & 日付ピル ── */
  if (selectedDecY !== null) {
    const H  = +svgEl.attr('height');
    const sx = NAME_W + curT.x + xScale(selectedDecY) * curT.k * kXExtra;
    if (sx >= NAME_W && sx <= W) {
      // チャートエリア（HDR_H 以下）のダッシュライン
      axisG.append('line')
        .attr('x1', sx).attr('y1', HDR_H)
        .attr('x2', sx).attr('y2', H)
        .attr('stroke', cv('--accent'))
        .attr('stroke-width', 1.5)
        .attr('stroke-dasharray', '5,4')
        .attr('opacity', 0.45)
        .attr('pointer-events', 'none');

      // ヘッダー内のソリッドライン
      axisG.append('line')
        .attr('x1', sx).attr('y1', SEASON_Y)
        .attr('x2', sx).attr('y2', HDR_H)
        .attr('stroke', cv('--accent'))
        .attr('stroke-width', 1.5)
        .attr('opacity', 0.85)
        .attr('pointer-events', 'none');

      // 日付ピル（シーズン帯に表示）
      const selYr = Math.floor(selectedDecY);
      const selMo = Math.round((selectedDecY - selYr) * 12) + 1;
      const label = `${selYr}年${selMo}月`;
      const pillW = label.length * 6.8 + 12;
      const pillX = Math.min(Math.max(sx - pillW / 2, NAME_W + 2), W - pillW - 2);
      axisG.append('rect')
        .attr('x', pillX).attr('y', SEASON_Y + 2)
        .attr('width', pillW).attr('height', SEASON_H - 4)
        .attr('rx', 4).attr('fill', cv('--accent'))
        .attr('pointer-events', 'none');
      axisG.append('text')
        .attr('x', pillX + pillW / 2).attr('y', SEASON_Y + SEASON_H / 2)
        .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
        .attr('fill', '#fff').attr('font-size', 10).attr('font-weight', 700)
        .attr('pointer-events', 'none')
        .text(label);
    }
  }
}

/* =========================================================
   ZOOM CONTROLS
   ========================================================= */
function zoomXBy(factor, cx) {
  const oldKX = kXExtra;
  const newKX = Math.max(0.1, Math.min(60, oldKX * factor));
  const chartX = cx - NAME_W;
  const newTx  = curT.x + chartX * (1 - newKX / oldKX);
  const minX   = Math.min(0, curChartW - curChartW * curT.k * newKX);
  const clampX = Math.max(minX, Math.min(0, newTx));
  kXExtra = newKX;
  curT = d3.zoomIdentity.translate(clampX / curT.k, curT.y / curT.k).scale(curT.k);
  svgEl.call(zoomBehavior.transform, curT);

  /* バーテキストの横伸び補正 */
  svgEl.selectAll('.bar-text').each(function() {
    const el  = d3.select(this);
    const tag = this.tagName.toLowerCase();
    if (tag === 'text') {
      const dx = +el.attr('data-x');
      el.attr('x', dx * kXExtra).attr('transform', `scale(${1 / kXExtra},1)`);
    } else if (tag === 'polygon') {
      const dx = +el.attr('data-x');
      const cy_val = +this.getAttribute('points').split(',')[1];
      const ax = dx - 8;
      const ex = dx;
      el.attr('points', `${ax * kXExtra},${cy_val - 5} ${ex * kXExtra},${cy_val} ${ax * kXExtra},${cy_val + 5}`)
        .attr('transform', `scale(${1 / kXExtra},1)`);
    }
  });
}

function zoomIn()    { zoomXBy(1.6,   NAME_W + curChartW / 2); }
function zoomOut()   { zoomXBy(0.625, NAME_W + curChartW / 2); }

/* viewMode に対応する kXExtra 値（chartW 不要）*/
function getViewKXExtra() {
  if (viewMode === 'full') return 1.0;
  const frac = (VIEW_RECENT_START - AXIS_START) / (AXIS_END - AXIS_START);
  return 1 / (1 - frac);
}

function applyViewMode(animate = true) {
  if (!svgEl || !curChartW) return;
  let newT;
  if (viewMode === 'full') {
    kXExtra = 1.0;
    newT = d3.zoomIdentity;
  } else {
    // X軸のみスケール（Y方向 = 行の高さは変えない）
    // kXExtra で水平倍率を設定し、curT.k は 1 のまま
    const frac = (VIEW_RECENT_START - AXIS_START) / (AXIS_END - AXIS_START);
    kXExtra = 1 / (1 - frac);
    const tx = -(frac * curChartW) * kXExtra;   // VIEW_RECENT_START が左端 x=0 になる平行移動
    newT = d3.zoomIdentity.translate(tx, 0);    // k=1（Y拡大なし）
  }
  if (animate) {
    svgEl.transition().duration(350).call(zoomBehavior.transform, newT);
  } else {
    svgEl.call(zoomBehavior.transform, newT);
  }
  updateViewMenuState();
}

function setViewMode(mode) {
  viewMode = mode;
  kXExtra = getViewKXExtra();  // buildChart 前に正しい kXExtra を設定
  buildChart();
  applyViewMode(false);
  closeMenu();
}

function updateViewMenuState() {
  const ri = document.getElementById('view-recent');
  const fi = document.getElementById('view-full');
  if (ri) ri.classList.toggle('hmenu-active', viewMode === 'recent');
  if (fi) fi.classList.toggle('hmenu-active', viewMode === 'full');
}

function resetZoom() {
  applyViewMode();
}

function toggleFocus() {
  focusMode = !focusMode;
  const btn = document.getElementById('focus-btn');
  if (btn) btn.classList.toggle('tbtn-active', focusMode);
  buildChart();
}

function setSort(mode) {
  sortMode = mode;
  document.getElementById('sort-birth').classList.toggle('seg-active', mode === 'birth');
  document.getElementById('sort-cat').classList.toggle('seg-active', mode === 'cat');
  document.getElementById('sort-tenure').classList.toggle('seg-active', mode === 'tenure');
  buildChart();
}

/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */
document.addEventListener('keydown', e => {
  if (e.target.matches('input, textarea')) return;
  // スペースキー → 選択月の在籍選手のみ表示（押している間）/ フォーカスモード中はトグル
  if (e.key === ' ') {
    e.preventDefault();
    if (focusMode) { toggleFocus(); return; }
    if (!spacePressed) { spacePressed = true; buildChart(); }
    return;
  }
  if (e.key === '+' || e.key === '=') zoomIn();
  if (e.key === '-') zoomOut();
  if (e.key === '0') resetZoom();
  if (e.key === 'Escape') { closeAgePanel(); return; }
  // Shift+Arrow → 水平ズーム
  if (e.key === 'ArrowRight' && e.shiftKey) { zoomXBy(1.2, NAME_W + curChartW / 2); return; }
  if (e.key === 'ArrowLeft'  && e.shiftKey) { zoomXBy(1 / 1.2, NAME_W + curChartW / 2); return; }
  // ArrowLeft/Right（Shift なし）→ 月単位で選択日付を移動
  if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && !e.shiftKey) {
    if (selectedDecY !== null) {
      e.preventDefault();
      const step = e.key === 'ArrowRight' ? 1 / 12 : -1 / 12;
      selectDecY(selectedDecY + step);
      scrollDecYIntoView(selectedDecY);
    }
    return;
  }
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    const step = ROW_H * 3;
    const dy   = e.key === 'ArrowDown' ? -step : step;
    let newT   = curT.translate(0, dy);
    const minY = Math.min(0, curChartH - curTotalDataH * newT.k);
    const cy   = Math.max(minY, Math.min(0, newT.y));
    if (cy !== newT.y)
      newT = d3.zoomIdentity.translate(newT.x / newT.k, cy / newT.k).scale(newT.k);
    svgEl.call(zoomBehavior.transform, newT);
  }
});

document.addEventListener('keyup', e => {
  if (e.target.matches('input, textarea')) return;
  if (e.key === ' ' && !focusMode) { spacePressed = false; buildChart(); }
});

window.addEventListener('resize', buildChart);

window.addEventListener('hashchange', () => {
  try {
    const key = location.hash.slice(1);
    if (key && DATASETS[key] && key !== currentKey) loadDataset(key);
  } catch (e) {}
});

/* =========================================================
   BOOT
   ========================================================= */
applyTheme(currentTheme);
renderSidebar();

let _initKey = '';
try { _initKey = location.hash.slice(1); } catch (e) {}
const firstKey = _initKey && DATASETS[_initKey] ? _initKey : Object.keys(DATASETS)[0];
if (firstKey) {
  currentKey = firstKey;
  loadDataset(firstKey);
}
