// Hamburger menu toggle
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('hidden');
});

// Dropdown toggle - desktop
const dropdown = document.querySelector('.dropdown');
const dropdownToggle = document.querySelector('.dropdown-toggle');

if (dropdown && dropdownToggle) {
  dropdownToggle.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.classList.toggle('open');
  });
}

// Dropdown toggle - mobile
const mobileDropdown = document.querySelector('.mobile-dropdown');
const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');

if (mobileDropdown && mobileDropdownToggle) {
  mobileDropdownToggle.addEventListener('click', (e) => {
    e.preventDefault();
    mobileDropdown.classList.toggle('open');
  });
}

// Search logic
const searchIcon = document.getElementById('searchIcon');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

searchIcon.addEventListener('click', () => {
  searchForm.classList.toggle('hidden');
  searchInput.focus();
});

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const term = searchInput.value.trim();
  if (term) {
    window.location.href = `/search?q=${encodeURIComponent(term)}`;
  }
});


