// === ELEMENTY ===
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

const dropdown = document.querySelector('.dropdown');
const dropdownToggle = document.querySelector('.dropdown-toggle');

const mobileDropdown = document.querySelector('.mobile-dropdown');
const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');

const searchIcon = document.getElementById('searchIcon');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

const logoLink = document.querySelector('.logo');

// === FUNKCE ===

// Přepínání hamburger menu (mobil)
menuToggle?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('hidden');
});

// Přepínání dropdown menu (desktop)
dropdownToggle?.addEventListener('click', (e) => {
  e.preventDefault();
  dropdown?.classList.toggle('open');
});

// Přepínání dropdown menu (mobil)
mobileDropdownToggle?.addEventListener('click', (e) => {
  e.preventDefault();
  mobileDropdown?.classList.toggle('open');
});

// Skrytí dropdownů a hledání při kliknutí mimo
document.addEventListener('click', (e) => {
  // Dropdown desktop
  if (!dropdown?.contains(e.target) && !dropdownToggle?.contains(e.target)) {
    dropdown?.classList.remove('open');
  }

  // Dropdown mobil
  if (!mobileDropdown?.contains(e.target) && !mobileDropdownToggle?.contains(e.target)) {
    mobileDropdown?.classList.remove('open');
  }

  // Vyhledávání
  if (!searchForm?.contains(e.target) && !searchIcon?.contains(e.target)) {
    searchForm?.classList.add('hidden');
  }
});

// Zobrazit/skryt vyhledávání
searchIcon?.addEventListener('click', (e) => {
  e.stopPropagation();
  if (searchForm) {
    searchForm.classList.toggle('hidden');
    if (!searchForm.classList.contains('hidden')) {
      searchInput?.focus();
    }
  }
});

// Odeslání vyhledávacího formuláře
searchForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput?.value.trim().toLowerCase();
  if (query) {
    const target = document.querySelector(`[id*="${query}"]`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert("Sekce nebyla nalezena.");
    }
  }
});

// Klik na logo – návrat na Domů
logoLink?.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('domu')?.scrollIntoView({ behavior: 'smooth' });
});



