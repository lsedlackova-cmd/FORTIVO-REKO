const sections = [
  "header",
  "domu",
  "o-nas",
  "nase-sluzby",
  "reference",
  "kontakty",
  "footer"
];

sections.forEach(section => {
  fetch(`html/${section}.html`)
    .then(res => {
      if (!res.ok) throw new Error(`Soubor ${section}.html nenalezen`);
      return res.text();
    })
    .then(html => {
      const container = document.getElementById(section);
      if (container) {
        container.innerHTML = html;
      } else {
        console.warn(`Element s ID '${section}' nebyl nalezen v index.html`);
      }
    })
    .catch(err => {
      console.error(`Chyba při načítání sekce '${section}':`, err);
    });
});
