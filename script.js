document.addEventListener("DOMContentLoaded", function () {
  // 🔍 Vyhledávání
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
  }

  // ♻️ Duplikuj reference pro plynulý karusel
  const refCarousel = document.querySelector(".reference-carousel");
  if (refCarousel) {
    refCarousel.innerHTML += refCarousel.innerHTML;
  }

  // ♻️ Duplikuj loga pro plynulý karusel
  const logosCarousel = document.querySelector(".logos-carousel");
  if (logosCarousel) {
    logosCarousel.innerHTML += logosCarousel.innerHTML;
  }

  // 🔢 Počítadla (statistiky pod fotkou)
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
  }, {
    threshold: 0.6
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });
});

// 🔍 Odstranění diakritiky pro spolehlivé hledání
function removeDiacritics(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// 🔎 Funkce pro vyhledávání textu
function searchWeb() {
  const input = document.getElementById("searchInput");
  if (!input) return;

  const term = removeDiacritics(input.value.toLowerCase());
  const pageText = removeDiacritics(document.body.innerText.toLowerCase());

  if (term && pageText.includes(term)) {
    alert(`Výraz "${input.value}" byl nalezen na stránce.`);
  } else {
    alert(`Výraz "${input.value}" nebyl nalezen.`);
  }
}







