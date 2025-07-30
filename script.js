// Počkej, až se stránka načte
document.addEventListener("DOMContentLoaded", function () {
  const searchIcon = document.querySelector(".search-icon");
  const searchWrapper = document.querySelector(".search-wrapper");
  const searchInput = document.querySelector(".search-input");

  if (searchIcon && searchWrapper) {
    searchIcon.addEventListener("click", function (e) {
      e.preventDefault();
      searchWrapper.classList.toggle("active");

      // Zaostři do pole po zobrazení
      if (searchWrapper.classList.contains("active") && searchInput) {
        setTimeout(() => searchInput.focus(), 200);
      }
    });
  }
});

// Jednoduché hledání textu na stránce
function searchWeb() {
  const term = document.getElementById("searchInput").value.toLowerCase();
  if (!term) return;

  if (document.body.innerText.toLowerCase().includes(term)) {
    alert(`Výraz "${term}" byl nalezen na stránce.`);
  } else {
    alert(`Výraz "${term}" nebyl nalezen.`);
  }
}




