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
    .then(res => res.text())
    .then(html => {
      document.getElementById(section).innerHTML = html;
    });
});
