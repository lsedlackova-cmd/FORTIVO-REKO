(function () {
  function buildStars(container, value) {
    const full = Math.floor(value);
    const hasHalf = value % 1 >= 0.5;
    const empty = 5 - full - (hasHalf ? 1 : 0);
    const gid = 'half-' + Math.random().toString(36).slice(2,7);

    const starFull = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.401 8.168L12 18.896l-7.335 3.868 1.401-8.168L.132 9.21l8.2-1.192z"/></svg>';
    const starHalf = `<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="${gid}"><stop offset="50%"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.401 8.168L12 18.896l-7.335 3.868 1.401-8.168L.132 9.21l8.2-1.192z" fill="url(#${gid})"/></svg>`;
    const starEmpty = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.401 8.168L12 18.896l-7.335 3.868 1.401-8.168L.132 9.21l8.2-1.192z" fill="none" stroke="currentColor" stroke-width="1" opacity=".25"/></svg>';

    container.innerHTML = '';
    for (let i = 0; i < full; i++) container.insertAdjacentHTML('beforeend', starFull);
    if (hasHalf) container.insertAdjacentHTML('beforeend', starHalf);
    for (let i = 0; i < empty; i++) container.insertAdjacentHTML('beforeend', starEmpty);
  }

  function renderAllStars(scope) {
    scope.querySelectorAll('.reference-stars').forEach(el => {
      const val = parseFloat(el.dataset.stars || el.parentElement?.dataset.rating || '0');
      buildStars(el, val);
    });
  }

  function tryInitNow() {
    const slot = document.getElementById('reference');
    if (!slot) return false;
    const grid = slot.querySelector('.reference-grid');
    if (!grid) return false;
    renderAllStars(slot);
    return true;
  }

  function initWhenReady() {
    if (tryInitNow()) return;
    const slot = document.getElementById('reference');
    if (!slot) return;
    const mo = new MutationObserver(() => { if (tryInitNow()) mo.disconnect(); });
    mo.observe(slot, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhenReady);
  } else {
    initWhenReady();
  }
})();


