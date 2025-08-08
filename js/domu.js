(function () {
  const video = document.getElementById("heroVideo");
  const button = document.getElementById("muteToggle");

  if (!video || !button) {
    console.warn("Video nebo tlačítko nebylo nalezeno");
    return;
  }

  video.muted = true;
  button.textContent = "🔇";

  button.addEventListener("click", () => {
    video.muted = !video.muted;
    button.textContent = video.muted ? "🔇" : "🔊";

    if (!video.paused) {
      video.play().catch((err) => {
        console.warn("Nepodařilo se přehrát video:", err.message);
      });
    }
  });
})();










