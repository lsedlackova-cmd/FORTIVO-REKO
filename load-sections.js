const sections = [
  "header",
  "domu",
  "o-nas",
  "nase-sluzby",
  "reference",
  "kontakt",
  "footer"
];

sections.forEach(section => {
  fetch(`html/${section}.html`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Soubor ${section}.html nenalezen`);
      }
      return res.text();
    })
    .then(html => {
      const container = document.getElementById(section);
      if (!container) {
        console.warn(`Element s ID '${section}' nebyl nalezen v index.html`);
        return;
      }

      container.innerHTML = html;

      const ensureScript = (src) => {
        if (!document.querySelector(`script[src="${src}"]`)) {
          const s = document.createElement("script");
          s.src = src;
          s.defer = true;
          document.body.appendChild(s);
        }
      };

      if (section === "header")      ensureScript("js/header.js");
      if (section === "domu")        ensureScript("js/domu.js");
      if (section === "o-nas")       ensureScript("js/o-nas.js");
      if (section === "nase-sluzby") ensureScript("js/nase-sluzby.js"); 
      if (section === "reference")   ensureScript("js/reference.js"); 
      if (section === "kontakt")     ensureScript("js/kontakt.js"); 
    
    })
    .catch(err => {
      console.error(`Chyba při načítání sekce '${section}':`, err.message);
    });
});





