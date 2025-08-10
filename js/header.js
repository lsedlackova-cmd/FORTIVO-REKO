const menuToggle   = document.getElementById('menuToggle');
const mobileMenu   = document.getElementById('mobileMenu');
const dropdown     = document.querySelector('.dropdown');           // desktop
const dropdownTgl  = document.querySelector('.dropdown-toggle');
const searchIcon   = document.getElementById('searchIcon');
const searchForm   = document.getElementById('searchForm');
const searchInput  = document.getElementById('searchInput');
const logoLink     = document.querySelector('.logo');

const openMobileMenu  = () => {
  if (!mobileMenu) return;
  mobileMenu.classList.add('show');
  mobileMenu.classList.remove('hidden');     // musí pryč, jinak je display:none !important
  menuToggle?.setAttribute('aria-expanded','true');
};

const closeMobileMenu = () => {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('show');
  mobileMenu.classList.add('hidden');        
  menuToggle?.setAttribute('aria-expanded','false');
  mobileMenu.querySelectorAll('.mobile-dropdown.open').forEach(dd => dd.classList.remove('open'));
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

// CLICK OUTSIDE + ESC
document.addEventListener('click', (e) => {
  if (!inside(e.target, dropdown) && !inside(e.target, dropdownTgl)) closeDesktopDD();
  if (!inside(e.target, mobileMenu) && !inside(e.target, menuToggle)) closeMobileMenu();
  if (!inside(e.target, searchForm) && !inside(e.target, searchIcon)) searchForm?.classList.add('hidden');
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeDesktopDD(); closeMobileMenu(); } });

// SEARCH
searchIcon?.addEventListener('click', (e) => {
  e.stopPropagation();
  if (!searchForm) return;
  const willShow = searchForm.classList.contains('hidden');
  searchForm.classList.toggle('hidden');
  if (willShow) searchInput?.focus();
});
searchForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const q = searchInput?.value?.trim();
  if (!q) return;

  const target = Array.from(document.querySelectorAll('body *:not(header):not(nav):not(script):not(style)'))
    .find(el => el.textContent.toLowerCase().includes(q.toLowerCase()));

  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    target.style.backgroundColor = 'yellow';
    setTimeout(() => target.style.backgroundColor = '', 2000);
    closeMobileMenu();
  } else {
    alert('Text nebyl nalezen.');
  }
});

mobileMenu?.addEventListener('click', (e) => {
  const toggle = e.target.closest('.mobile-dropdown-toggle');
  if (!toggle) return;
  e.preventDefault();
  const current = toggle.closest('.mobile-dropdown');
  if (!current) return;
  // only one open
  mobileMenu.querySelectorAll('.mobile-dropdown.open').forEach(dd => { if (dd !== current) dd.classList.remove('open'); });
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

logoLink?.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('domu')?.scrollIntoView({ behavior: 'smooth' });
  closeMobileMenu();
});

window.addEventListener('hashchange', closeMobileMenu);




