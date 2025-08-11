(function(){
  const FORM_ID = 'kontaktForm';

  function scrollToKontakt() {
    const wrapper = document.getElementById('kontakt');
    if (wrapper) wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function handleHash() {
    if ((location.hash || '').toLowerCase() === '#kontakt') scrollToKontakt();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleHash);
  } else {
    handleHash();
  }
  window.addEventListener('hashchange', handleHash);

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a, [data-scroll-to]');
    if (!a) return;
    const href = (a.getAttribute('href') || '').trim().toLowerCase();
    const hash = (a.hash || '').trim().toLowerCase();
    const data = (a.getAttribute('data-scroll-to') || '').trim().toLowerCase();
    const isKontakt = href === '#kontakt' || hash === '#kontakt' || href.endsWith('#kontakt') || data === 'kontakt';
    if (!isKontakt) return;
    e.preventDefault();
    if ((location.hash || '').toLowerCase() !== '#kontakt') history.pushState(null, '', '#kontakt');
    scrollToKontakt();
  });

  function setStatus(msg, ok=true){
    const el = document.getElementById('formStatus');
    if (!el) return;
    el.textContent = msg || '';
    el.style.color = ok ? '#2e7d32' : '#b00020';
  }

  function validate(form){
    let valid = true;
    const v = name => form.elements[name];
    const setErr = (name, msg='')=>{
      const input = v(name);
      const err = document.getElementById(`err-${name}`);
      if (!input || !err) return;
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      err.textContent = msg;
      if (msg) valid = false;
    };

    // vyčisti chyby
    ['name','email','phone','place','message'].forEach(n=>setErr(n,''));

    const email = (v('email').value || '').trim();
    if (!email) setErr('email','Vyplňte e-mail.');
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) setErr('email','Zadejte platný e-mail.');

    const phone = (v('phone').value || '').trim();
    if (phone && !/^[+0-9 ()-]{6,}$/.test(phone)) setErr('phone','Zadejte platný telefon.');

    const place = (v('place').value || '').trim();
    if (!place) setErr('place','Vyplňte město realizace.');

    const msg = (v('message').value || '').trim();
    if (!msg) setErr('message','Krátce popište vaši poptávku.');
    else if (msg.length < 10) setErr('message','Zpráva by měla mít aspoň 10 znaků.');

    const hp = v('company').value;
    const start = parseInt(v('formStart').value || '0', 10);
    const elapsed = Date.now() - start;
    if (hp) valid = false;
    if (elapsed < 1500) valid = false;

    return valid;
  }

  function attach(){
    const root = document.getElementById('kontakt');
    if (!root) return false;
    const form = root.querySelector('#'+FORM_ID);
    if (!form) return false;

    const fs = form.querySelector('#formStart');
    if (fs) fs.value = String(Date.now());

    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      setStatus('');
      if (!validate(form)) {
        setStatus('Zkontrolujte prosím zvýrazněná pole.', false);
        return;
      }
      const submitBtn = document.getElementById('submitBtn');
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      try{
        await new Promise(r=>setTimeout(r, 1200));
        setStatus('Děkujeme, zpráva byla odeslána. Ozveme se co nejdříve.', true);
        form.reset();
        const fs2 = form.querySelector('#formStart');
        if (fs2) fs2.value = String(Date.now());
      }catch(err){
        setStatus('Odeslání se nezdařilo. Zkuste to prosím znovu.', false);
      }finally{
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
    });

    form.querySelectorAll('input, textarea').forEach(el=>{
      el.addEventListener('blur', ()=>validate(form));
    });

    return true;
  }

  function initWhenReady(){
    if (attach()) return;
    const slot = document.getElementById('kontakt');
    if (!slot) return;
    const mo = new MutationObserver(()=>{ if (attach()) mo.disconnect(); });
    mo.observe(slot, { childList:true, subtree:true });
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initWhenReady);
  } else {
    initWhenReady();
  }
})();




