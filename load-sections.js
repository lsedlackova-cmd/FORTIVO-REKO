// Seznam sekcí, které se načítají do index.html
const sections = [
  "header",
  "domu",
  "o-nas",
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

        // Pokud načítáme header, znovu připojíme JS pro funkčnost
        if (section === "header") {
          const headerScript = document.createElement("script");
          headerScript.src = "js/header.js";
          headerScript.defer = true;
          document.body.appendChild(headerScript);
        }
      } else {
        console.warn(`Element s ID '${section}' nebyl nalezen v index.html`);
      }
    })
    .catch(err => {
      console.error(`Chyba při načítání sekce '${section}':`, err);
    });
});



