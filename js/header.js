// Hamburger menu toggle (mobil)
document.getElementById('menuToggle')?.addEventListener('click', () => {
  document.getElementById('mobileMenu')?.classList.toggle('hidden');
});

// Desktop dropdown
const dropdown = document.querySelector('.dropdown');
const dropdownToggle = document.querySelector('.dropdown-toggle');

// Mobile dropdown
const mobileDropdown = document.querySelector('.mobile-dropdown');
const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');

// Vyhledávání
const searchIcon = document.getElementById('searchIcon');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

// Klik na logo
const logoLink = document.querySelector('.logo');

// === EVENTY ===

// Dropdown toggle – desktop
dropdownToggle?.addEventListener('click', (e) => {
  e.preventDefault();
  dropdown?.classList.toggle('open');
});

// Dropdown toggle – mobil
mobileDropdownToggle?.addEventListener('click', (e) => {
  e.preventDefault();
  mobileDropdown?.classList.toggle('open');
});

// Zavření submenu a vyhledávání při kliknutí mimo
document.addEventListener('click', (e) => {
  if (!dropdown?.contains(e.target) && !dropdownToggle?.contains(e.target)) {
    dropdown?.classList.remove('open');
  }

  if (!mobileDropdown?.contains(e.target) && !mobileDropdownToggle?.contains(e.target)) {
    mobileDropdown?.classList.remove('open');
  }

  if (!searchForm?.contains(e.target) && !searchIcon?.contains(e.target)) {
    searchForm?.classList.add('hidden');
  }
});

// Otevření/skrytí pole pro vyhledávání
searchIcon?.addEventListener('click', (e) => {
  e.stopPropagation();
  if (searchForm) {
    searchForm.classList.toggle('hidden');
    if (!searchForm.classList.contains('hidden')) {
      searchInput?.focus();
    }
  }
});

// Vyhledávání – přechod na sekci
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

// Klik na logo – návrat na #domu
logoLink?.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('domu')?.scrollIntoView({ behavior: 'smooth' });
});

