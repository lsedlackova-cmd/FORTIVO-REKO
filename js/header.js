const menuToggle   = document.getElementById('menuToggle');
const mobileMenu   = document.getElementById('mobileMenu');
const dropdown     = document.querySelector('.dropdown');
const dropdownTgl  = document.querySelector('.dropdown-toggle');
const searchIcon   = document.getElementById('searchIcon');
const searchForm   = document.getElementById('searchForm');
const searchInput  = document.getElementById('searchInput');
const logoLink     = document.querySelector('.logo');

let searchNoteTimer = null;

/* ============ jemná bublina u vyhledávání ============ */
function showSearchNote(message) {
  if (!searchForm) return;

  let note = searchForm.querySelector('.search-note');
  if (!note) {
    note = document.createElement('div');
    note.className = 'search-note';
    searchForm.appendChild(note);
  }

  note.textContent = message || 'Ups… nic tu není. Nechcete zkusit jiné slovo?';

  if (getComputedStyle(searchForm).position === 'static') {
    searchForm.style.position = 'relative';
  }

  Object.assign(note.style, {
    position: 'absolute',
    left: '0',
    right: '0',
    top: '100%',
    marginTop: '6px',
    padding: '8px 10px',
    background: '#fff',
    border: '1px solid #02a9be',
    color: '#444',
    borderRadius: '8px',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '12px',
    lineHeight: '1.4',
    boxShadow: '0 4px 12px rgba(0,0,0,.08)',
    zIndex: '5',
    opacity: '1',
    transition: 'opacity .25s ease'
  });

  clearTimeout(searchNoteTimer);
  searchNoteTimer = setTimeout(() => hideSearchNote(), 3500);
}
function hideSearchNote() {
  const note = searchForm?.querySelector('.search-note');
  if (!note) return;
  note.style.opacity = '0';
  setTimeout(() => { note.remove(); }, 250);
}

/* ============ mobilní menu / dropdown ============ */
const openMobileMenu  = () => {
  if (!mobileMenu) return;
  mobileMenu.classList.add('show');
  mobileMenu.classList.remove('hidden');
  menuToggle?.setAttribute('aria-expanded','true');
};

const clearMobileHover = () => {
  mobileMenu?.querySelectorAll('a.is-hover')?.forEach(a => a.classList.remove('is-hover'));
};

const closeMobileMenu = () => {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('show');
  mobileMenu.classList.add('hidden');
  menuToggle?.setAttribute('aria-expanded','false');
  mobileMenu.querySelectorAll('.mobile-dropdown.open').forEach(dd => dd.classList.remove('open'));
  clearMobileHover();
};

const toggleMobile    = () =>
  mobileMenu?.classList.contains('show') ? closeMobileMenu() : openMobileMenu();

const openDesktopDD   = () => { dropdown?.classList.add('open');  dropdownTgl?.setAttribute('aria-expanded','true');  };
const closeDesktopDD  = () => { dropdown?.classList.remove('open'); dropdownTgl?.setAttribute('aria-expanded','false'); };

const inside = (el, root) => !!(el && root && root.contains(el));

menuToggle?.addEventListener('click', (e) => { e.stopPropagation(); toggleMobile(); });

dropdownTgl?.addEventListener('click', (e) => {
  e.preventDefault();
  dropdown?.classList.contains('open') ? closeDesktopDD() : openDesktopDD();
});
dropdownTgl?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); dropdownTgl.click(); }
});

document.addEventListener('click', (e) => {
  if (!inside(e.target, dropdown) && !inside(e.target, dropdownTgl)) closeDesktopDD();
  if (!inside(e.target, mobileMenu) && !inside(e.target, menuToggle)) closeMobileMenu();
  if (!inside(e.target, searchForm) && !inside(e.target, searchIcon)) {
    searchForm?.classList.add('hidden');
    hideSearchNote();
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeDesktopDD(); closeMobileMenu(); hideSearchNote(); }
});

/* ============ vyhledávání ============ */
searchIcon?.addEventListener('click', (e) => {
  e.stopPropagation();
  if (!searchForm) return;
  const willShow = searchForm.classList.contains('hidden');
  searchForm.classList.toggle('hidden');
  if (willShow) {
    searchInput?.focus();
    hideSearchNote();
  }
});

searchInput?.addEventListener('input', () => hideSearchNote());

searchForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const q = searchInput?.value?.trim();
  if (!q) return;

  const target = Array.from(
    document.querySelectorAll('body *:not(header):not(nav):not(script):not(style)')
  ).find(el => el.textContent.toLowerCase().includes(q.toLowerCase()));

  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    target.style.backgroundColor = 'yellow';
    setTimeout(() => target.style.backgroundColor = '', 2000);
    closeMobileMenu();
    hideSearchNote();
  } else {
    showSearchNote('Ups… nic tu není. Nechcete zkusit jiné slovo?');
  }
});

/* ============ mobilní dropdowny ============ */
mobileMenu?.addEventListener('click', (e) => {
  const toggle = e.target.closest('.mobile-dropdown-toggle');
  if (!toggle) return;
  e.preventDefault();
  const current = toggle.closest('.mobile-dropdown');
  if (!current) return;
  // jen jeden otevřený
  mobileMenu.querySelectorAll('.mobile-dropdown.open').forEach(dd => {
    if (dd !== current) dd.classList.remove('open');
  });
  current.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  const link = e.target.closest('#mobileMenu a[href]');
  if (!link) return;

  if (link.classList.contains('mobile-dropdown-toggle')) return;
  const href = link.getAttribute('href') || '';
  if (!href || href === '#') { e.preventDefault(); return; }

  if (href.startsWith('#')) {
    e.preventDefault();
    const target = href.length > 1 ? document.querySelector(href) : null;
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', href);
    closeMobileMenu();
  } else {
    closeMobileMenu();
  }
}, { capture: true });

/* ============ desktop submenu kliky ============ */
document.querySelector('.main-nav')?.addEventListener('click', (e) => {
  const a = e.target.closest('.dropdown .submenu a');
  if (!a) return;
  const href = a.getAttribute('href') || '';
  if (href.startsWith('#') && href.length > 1) {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', href);
  }
  closeDesktopDD();
});

/* ============ logo -> Domů ============ */
logoLink?.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('domu')?.scrollIntoView({ behavior: 'smooth' });
  closeMobileMenu();
  hideSearchNote();
});

window.addEventListener('hashchange', () => { closeMobileMenu(); hideSearchNote(); });

/* =========================================================
   DOTYKOVÝ/MYŠÍ „HOVER“ V MOBILNÍM MENU (full-row podbarvení)
   — funguje na prst/pero/myš bez kliku
   — používá pointerover/mouseover + touchmove na dokumentu
   ========================================================= */
(function setupPointerHover(){
  const root = document.getElementById('mobileMenu');
  if (!root) return;

  let last = null;
  const HOVER_SEL = '#mobileMenu a';

  function setHoverEl(el){
    if (el === last) return;
    if (last) last.classList.remove('is-hover');
    if (el) el.classList.add('is-hover');
    last = el || null;
  }
  function clearHover(){ setHoverEl(null); }

  // z bodu (x,y) najdi nejbližší <a> v #mobileMenu
  function setHoverFromPoint(x, y){
    const el = document.elementFromPoint(x, y)?.closest(HOVER_SEL);
    setHoverEl(el && root.contains(el) ? el : null);
  }

  // pointerover/mouseover – reaguje i bez kliknutí
  root.addEventListener('pointerover', (e)=>{
    const a = e.target.closest(HOVER_SEL);
    if (a) setHoverEl(a);
  });
  root.addEventListener('pointerout', (e)=>{
    if (!root.contains(e.relatedTarget)) clearHover();
  });
  // fallback
  root.addEventListener('mouseover', (e)=>{
    const a = e.target.closest(HOVER_SEL);
    if (a) setHoverEl(a);
  });
  root.addEventListener('mouseleave', clearHover);

  // touchmove po celé stránce – přejezd prstem
  const onTouchMove = (e)=>{
    if (!mobileMenu || !mobileMenu.classList.contains('show')) return;
    const t = e.touches && e.touches[0];
    if (!t) return;
    setHoverFromPoint(t.clientX, t.clientY);
  };
  const onTouchEnd = ()=> clearHover();

  document.addEventListener('touchmove', onTouchMove, {passive:true});
  document.addEventListener('touchend', onTouchEnd, {passive:true});
  document.addEventListener('touchcancel', onTouchEnd, {passive:true});

  // úklid při zavření menu / scrollu / resize
  const cleanup = ()=> clearHover();
  window.addEventListener('scroll', cleanup, {passive:true});
  window.addEventListener('resize', cleanup);

  // když se změní class na rootu (zavření/otevření)
  const obs = new MutationObserver(()=> {
    if (!root.classList.contains('show')) clearHover();
  });
  obs.observe(root, { attributes:true, attributeFilter:['class'] });
})();








