(function () {
  const section = document.querySelector('#o-nas');
  if (!section) return;
  const nums = section.querySelectorAll('.stat-num');
  if (!nums.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function animate(el, to, dur = 2000) {
    const start = performance.now();
    const from = 0;
    function frame(now) {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(from + (to - from) * easeOut(p));
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        nums.forEach(n => animate(n, parseInt(n.dataset.counter || '0', 10)));
        io.disconnect();
      }
    });
  }, { threshold: 0.35 });

  io.observe(section);
})();
