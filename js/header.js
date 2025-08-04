// Hamburger menu toggle (mobil)
document.getElementById('menuToggle')?.addEventListener('click', () => {
  document.getElementById('mobileMenu')?.classList.toggle('hidden');
});

// Dropdown toggle – desktop
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdown = document.querySelector('.dropdown');

if (dropdown && dropdownToggle) {
  dropdownToggle.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.classList.toggle('open');
  });
}

// Dropdown toggle – mobil
const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');
const mobileDropdown = document.querySelector('.mobile-dropdown');

if (mobileDropdown && mobileDropdownToggle) {
  mobileDropdownToggle.addEventListener('click', (e) => {
    e.preventDefault();
    mobileDropdown.classList.toggle('open');
  });
}

// Zobrazit/skrýt vyhledávací pole
const searchIcon = document.getElementById('searchIcon');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

searchIcon?.addEventListener('click', () => {
  if (searchForm) {
    searchForm.classList.toggle('hidden');
    if (!searchForm.classList.contains('hidden')) {
      searchInput?.focus();
    }
  }
});

// Vyhledávání – scroll na sekci
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

// Klik na logo – scroll na sekci #domu
document.querySelector('.logo')?.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('domu')?.scrollIntoView({ behavior: 'smooth' });
});
