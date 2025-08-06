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
      if (!res.ok) {
        throw new Error(`Soubor ${section}.html nenalezen`);
      }
      return res.text();
    })
    .then(html => {
      const container = document.getElementById(section);
      if (container) {
        container.innerHTML = html;

        if (section === "header") {
          const headerScript = document.createElement("script");
          headerScript.src = "js/header.js";
          headerScript.defer = true;
          document.body.appendChild(headerScript);
        }
        if (section === "domu") {
          const domuScript = document.createElement("script");
          domuScript.src = "js/domu.js";
          domuScript.defer = true;
          document.body.appendChild(domuScript);
}
      } else {
        console.warn(`Element s ID '${section}' nebyl nalezen v index.html`);
      }
    })
    .catch(err => {
      console.error(`Chyba při načítání sekce '${section}':`, err.message);
    });
});




