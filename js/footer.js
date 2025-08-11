(function(){
  // Aktuální rok do copyrightu
  const y = document.getElementById('footerYear');
  if (y) y.textContent = String(new Date().getFullYear());

  // Bezpečnost pro externí odkazy (až je napojíš)
  document.querySelectorAll('#site-footer a[href^="http"]').forEach(a=>{
    a.setAttribute('rel','noopener noreferrer');
    if (!a.getAttribute('target')) a.setAttribute('target','_blank');
  });

  // Klidné focus zvýraznění po klávesnici
  document.querySelectorAll('#site-footer a').forEach(a=>{
    a.addEventListener('keydown', (e)=>{
      if (e.key === 'Tab') a.classList.add('kbd-focus');
    });
    a.addEventListener('blur', ()=> a.classList.remove('kbd-focus'));
  });
})();
