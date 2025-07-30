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
document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".stat-number");

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






