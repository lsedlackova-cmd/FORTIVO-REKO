document.addEventListener("DOMContentLoaded", () => {
  // === HAMBURGER MENU (MOBIL) ===
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // === DROPDOWN MENU (DESKTOP) ===
  const dropdownToggle = document.getElementById("dropdownToggle");
  const dropdown = dropdownToggle?.parentElement;

  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener("click", (e) => {
      e.preventDefault();
      dropdown.classList.toggle("open");
    });
  }

  // === DROPDOWN MENU (MOBIL) ===
  const mobileDropdownToggle = document.getElementById("mobileDropdownToggle");
  const mobileDropdown = mobileDropdownToggle?.parentElement;

  if (mobileDropdown && mobileDropdownToggle) {
    mobileDropdownToggle.addEventListener("click", (e) => {
      e.preventDefault();
      mobileDropdown.classList.toggle("open");
    });
  }

  // === VYHLEDÁVÁNÍ ===
  const searchIcon = document.getElementById("searchIcon");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  if (searchIcon && searchForm && searchInput) {
    searchIcon.addEventListener("click", () => {
      searchForm.classList.toggle("hidden");
      searchInput.focus();
    });

    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = searchInput.value.trim();
      if (value !== "") {
        window.location.href = `/search?q=${encodeURIComponent(value)}`;
      }
    });
  }
});
