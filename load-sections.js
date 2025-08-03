const sections = ["header"];

sections.forEach(section => {
  fetch(`html/${section}.html`)
    .then(res => {
      if (!res.ok) throw new Error(`Soubor ${section}.html nenalezen`);
      return res.text();
    })
    .then(html => {
      document.getElementById(section).innerHTML = html;
    })
    .catch(err => {
      console.error(`Chyba při načítání sekce '${section}':`, err);
    });
});
