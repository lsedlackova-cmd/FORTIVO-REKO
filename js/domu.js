document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("heroVideo");
  const button = document.getElementById("muteToggle");

  if (!video || !button) {
    console.warn("Video nebo tlačítko nebylo nalezeno");
    return;
  }

  // Tlačítko pro zapnutí/vypnutí zvuku
  button.addEventListener("click", () => {
    if (video.muted) {
      video.muted = false;
      video.volume = 1;
      video.play ();
      button.textContent = "🔊";
    } else {
      video.muted = true;
      button.textContent = "🔇";
    }
  });
});









