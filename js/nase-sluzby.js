// Naše služby – kontinuální scroll (marquee) s šířkou položek podle poměru stran fotek
(function () {
  const DURATION_SEC = 30; // délka jednoho kompletního průjezdu

  /** Plynulé skrolování na element podle hashe */
  function scrollToServiceByHash() {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const target = document.getElementById(hash);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function initServices() {
    scrollToServiceByHash();
    window.addEventListener('hashchange', scrollToServiceByHash);

    document.querySelectorAll('.service-carousel').forEach(setupMarquee);
  }

  /**
   * Plynule posouvaný pás snímků:
   * - vložíme 2× sérii (1..count) pro bezešvou smyčku
   * - po načtení každého obrázku spočítáme šířku položky:
   *   itemWidth = viewportHeight * (naturalWidth / naturalHeight)
   *   → tím odstraníme falešné „mezery“ způsobené letterboxingem
   */
  function setupMarquee(root) {
    const name = root.getAttribute('data-name');
    const count = parseInt(root.getAttribute('data-count'), 10) || 0;
    const viewport = root.querySelector('.carousel-viewport');
    if (!name || !count || !viewport) return;

    const track = document.createElement('div');
    track.className = 'carousel-track';
    viewport.appendChild(track);

    // Pomocné pole pro položky a img
    const items = [];
    const imgs = [];

    function makeItem(i) {
      const item = document.createElement('div');
      item.className = 'carousel-item';

      const img = document.createElement('img');
      img.loading = 'lazy';
      img.alt = `${name} ${i}`;
      img.src = `img/${name}-${i}.jpg`;

      item.appendChild(img);
      track.appendChild(item);

      items.push(item);
      imgs.push(img);
    }

    function appendSeries() {
      for (let i = 1; i <= count; i++) makeItem(i);
    }

    // dvě série za sebou
    appendSeries();
    appendSeries();

    // rychlost animace přes CSS proměnnou
    root.style.setProperty('--scroll-duration', `${DURATION_SEC}s`);

    // Po načtení každého obrázku dopočítej šířku položky podle poměru stran
    function layout() {
      const vpHeight = viewport.clientHeight; // výška je fixní (CSS)
      imgs.forEach((img, idx) => {
        const item = items[idx];
        const nw = img.naturalWidth;
        const nh = img.naturalHeight;
        if (nw > 0 && nh > 0) {
          const widthPx = Math.max(80, Math.round(vpHeight * (nw / nh))); // pojistka min 80px
          item.style.flex = `0 0 ${widthPx}px`;
        }
      });
    }

    // Když je obrázek už v cache
    imgs.forEach(img => {
      if (img.complete) {
        layout();
      } else {
        img.addEventListener('load', layout, { once: true });
        img.addEventListener('error', layout, { once: true });
      }
    });

    // Reflow při resize (přepočítat šířky + hladce restartovat animaci)
    let raf;
    function relayoutAndRestart() {
      layout();
      cancelAnimationFrame(raf);
      track.style.animation = 'none';
      raf = requestAnimationFrame(() => { track.style.animation = ''; });
    }
    window.addEventListener('resize', relayoutAndRestart);

    // První layout po vložení do DOMu
    layout();
  }

  // Start po dosazení sekce do DOMu
  if (document.querySelector('.services-section')) {
    initServices();
  } else {
    setTimeout(() => {
      if (document.querySelector('.services-section')) initServices();
    }, 0);
  }
})();


