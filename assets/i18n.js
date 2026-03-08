// ── Lochord i18n engine ──────────────────────────────────────────────────────
// Requires:
//   - COMMON_T  defined by assets/translations.js (loaded before this file)
//   - PAGE_T    defined inline in each HTML page   (loaded before this file)
//
// Usage in each HTML page:
//   <script>const PAGE_T = { en: {...}, ja: {...}, ko: {...}, zh: {...} }</script>
//   <script src="assets/translations.js"></script>
//   <script src="assets/i18n.js"></script>

const LANG_LABELS = { en: "EN", ja: "JA", ko: "KO", zh: "ZH" };
const HTML_LANGS  = { en: "en", ja: "ja", ko: "ko", zh: "zh" };

// Merge COMMON_T and PAGE_T — PAGE_T values win on collision.
const T = (function buildT() {
  const merged = {};
  const base   = typeof COMMON_T !== 'undefined' ? COMMON_T : {};
  const page   = typeof PAGE_T   !== 'undefined' ? PAGE_T   : {};
  const langs  = new Set([...Object.keys(base), ...Object.keys(page)]);
  langs.forEach(lang => {
    merged[lang] = Object.assign({}, base[lang] || {}, page[lang] || {});
  });
  return merged;
})();

// ── Apply translations ───────────────────────────────────────────────────────
function applyLang(lang) {
  const dict = T[lang] || T.en;

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  // Update <html lang="...">
  document.documentElement.lang = HTML_LANGS[lang] || 'en';

  // Update lang switcher label + active state
  const label = document.getElementById('currentLangLabel');
  if (label) label.textContent = LANG_LABELS[lang] || 'EN';
  document.querySelectorAll('#langMenu button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update SEO meta tags
  const setMeta = (id, val) => { const el = document.getElementById(id); if (el) el.content = val; };
  if (dict['meta.title']) {
    document.title = dict['meta.title'];
    const pt = document.getElementById('page-title');
    if (pt) pt.textContent = dict['meta.title'];
    setMeta('og-title', dict['meta.title']);
    setMeta('tw-title', dict['meta.title']);
  }
  if (dict['meta.description']) {
    setMeta('meta-desc', dict['meta.description']);
    setMeta('og-desc',   dict['meta.description']);
    setMeta('tw-desc',   dict['meta.description']);
  }
  if (dict['meta.keywords']) setMeta('meta-kw', dict['meta.keywords']);

  // Persist choice
  localStorage.setItem('lochord-lang', lang);

  // Reflect in URL (?lang=xx) — allows sharing language-specific URLs
  const url = new URL(location.href);
  url.searchParams.set('lang', lang);
  history.replaceState(null, '', url);

  // Propagate ?lang= to all same-origin links so navigation preserves language
  document.querySelectorAll('a[href]').forEach(a => {
    try {
      const u = new URL(a.href, location.href);
      if (u.origin === location.origin) {
        u.searchParams.set('lang', lang);
        a.href = u.pathname + u.search + u.hash;
      }
    } catch {}
  });
}

// ── Language switcher UI ─────────────────────────────────────────────────────
const _switcher = document.getElementById('langSwitcher');
const _langBtn  = document.getElementById('langBtn');

if (_langBtn) {
  _langBtn.addEventListener('click', e => {
    e.stopPropagation();
    _switcher.classList.toggle('open');
  });
}
document.addEventListener('click', () => {
  if (_switcher) _switcher.classList.remove('open');
});
document.querySelectorAll('#langMenu button').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    applyLang(btn.dataset.lang);
    if (_switcher) _switcher.classList.remove('open');
  });
});

// ── Auto-detect and apply initial language ───────────────────────────────────
(function initLang() {
  const param    = new URLSearchParams(location.search).get('lang');
  const saved    = localStorage.getItem('lochord-lang');
  const browser  = (navigator.language || '').toLowerCase().slice(0, 2);
  const detected = (param && T[param]) ? param
                 : (saved && T[saved])  ? saved
                 : (['ja','ko','zh'].includes(browser) ? browser : 'en');
  applyLang(detected);
})();
