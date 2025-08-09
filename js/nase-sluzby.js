(function () {
  const DURATION_SEC = 10; 

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

  function setupMarquee(root) {
    const name = root.getAttribute('data-name');
    const count = parseInt(root.getAttribute('data-count'), 10) || 0;
    const viewport = root.querySelector('.carousel-viewport');
    if (!name || !count || !viewport) return;

    const track = document.createElement('div');
    track.className = 'carousel-track';
    viewport.appendChild(track);

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

    appendSeries();
    appendSeries();

    root.style.setProperty('--scroll-duration', `${DURATION_SEC}s`);

    function layout() {
      const vpHeight = viewport.clientHeight; 
      imgs.forEach((img, idx) => {
        const item = items[idx];
        const nw = img.naturalWidth;
        const nh = img.naturalHeight;
        if (nw > 0 && nh > 0) {
          const widthPx = Math.max(80, Math.round(vpHeight * (nw / nh))); 
          item.style.flex = `0 0 ${widthPx}px`;
        }
      });
    }

    imgs.forEach(img => {
      if (img.complete) {
        layout();
      } else {
        img.addEventListener('load', layout, { once: true });
        img.addEventListener('error', layout, { once: true });
      }
    });

    let raf;
    function relayoutAndRestart() {
      layout();
      cancelAnimationFrame(raf);
      track.style.animation = 'none';
      raf = requestAnimationFrame(() => { track.style.animation = ''; });
    }
    window.addEventListener('resize', relayoutAndRestart);

    layout();
  }

  if (document.querySelector('.services-section')) {
    initServices();
  } else {
    setTimeout(() => {
      if (document.querySelector('.services-section')) initServices();
    }, 0);
  }
})();


