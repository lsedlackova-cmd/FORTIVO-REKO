document.addEventListener("DOMContentLoaded", function () {
  // 🔍 Lupa
  const searchIcon = document.querySelector(".search-icon");
  const searchWrapper = document.querySelector(".search-wrapper");
  const searchInput = document.querySelector(".search-input");

  if (searchIcon && searchWrapper) {
    searchIcon.addEventListener("click", function (e) {
      e.preventDefault();
      searchWrapper.classList.toggle("active");

      if (searchWrapper.classList.contains("active") && searchInput) {
        setTimeout(() => searchInput.focus(), 200);
      }
    });

    // 🔎 Enter pro spuštění vyhledávání
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        searchWeb();
      }
    });
  }

  // ♻️ Karusely
  const refCarousel = document.querySelector(".reference-carousel");
  if (refCarousel) refCarousel.innerHTML += refCarousel.innerHTML;

  const logosCarousel = document.querySelector(".logos-carousel");
  if (logosCarousel) logosCarousel.innerHTML += logosCarousel.innerHTML;

  // 🔢 Počítadla (čísla)
  const counters = document.querySelectorAll(".count, .stat-number");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute("data-target");
        let current = 0;
        const increment = target / 100;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };

        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => observer.observe(counter));

  // 📂 Dropdown menu (klikání místo hover)
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      const menu = this.nextElementSibling;
      if (menu) {
        const isVisible = menu.style.display === "block";
        menu.style.display = isVisible ? "none" : "block";
      }
    });
  });

  // 📱 Mobilní menu toggle (☰)
  const toggleButton = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (toggleButton && mobileMenu) {
    toggleButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });
  }
});

// 🧹 Odstranění diakritiky
function removeDiacritics(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// 🔎 Vyhledávací funkce
function searchWeb() {
  const input = document.getElementById("searchInput");
  if (!input) return;

  const term = removeDiacritics(input.value.trim().toLowerCase());
  if (!term) return;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

  while (walker.nextNode()) {
    const node = walker.currentNode;

    if (
      node.parentNode.tagName === "SCRIPT" ||
      node.parentNode.tagName === "STYLE" ||
      node.parentNode.tagName === "NOSCRIPT"
    ) {
      continue;
    }

    const text = removeDiacritics(node.textContent.toLowerCase());

    if (text.includes(term)) {
      let element = node.parentNode;
      while (element && !element.id && element !== document.body) {
        element = element.parentNode;
      }

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
  }

  alert(`Výraz "${input.value}" nebyl nalezen.`);
}











