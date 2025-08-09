// Jednoduchý, opakovaně použitelný karusel
class SimpleCarousel {
  constructor(root) {
    this.root = root;
    this.track = root.querySelector('.carousel-track');
    this.slides = Array.from(root.querySelectorAll('.carousel-slide'));
    this.prevBtn = root.querySelector('.prev');
    this.nextBtn = root.querySelector('.next');
    this.dotsWrap = root.querySelector('.carousel-dots');

    this.index = 0;
    this.len = this.slides.length;

    // autoplay
    this.autoplay = (root.dataset.autoplay || 'true') === 'true';
    this.interval = Number(root.dataset.interval || 3500);
    this.timer = null;

    // state
    this.isDragging = false;
    this.startX = 0;
    this.currentX = 0;

    this.setup();
    this.bind();
    this.start();
  }

  setup() {
    // Dots
    this.dotsWrap.innerHTML = '';
    this.dots = this.slides.map((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Přejít na snímek ${i + 1}`);
      b.addEventListener('click', () => this.goTo(i, true));
      this.dotsWrap.appendChild(b);
      return b;
    });

    // init classes
    this.update();
  }

  bind() {
    // Buttons
    this.prevBtn?.addEventListener('click', () => this.prev(true));
    this.nextBtn?.addEventListener('click', () => this.next(true));

    // Pause on hover (desktop)
    this.root.addEventListener('mouseenter', () => this.stop());
    this.root.addEventListener('mouseleave', () => this.start());

    // Swipe (touch)
    this.root.addEventListener('touchstart', this.onTouchStart, { passive: true });
    this.root.addEventListener('touchmove', this.onTouchMove, { passive: true });
    this.root.addEventListener('touchend', this.onTouchEnd);

    // Keyboard
    this.root.setAttribute('tabindex', '0');
    this.root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev(true);
      if (e.key === 'ArrowRight') this.next(true);
    });

    // Pause when page hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.stop();
      else this.start();
    });
  }

  onTouchStart = (e) => {
    this.isDragging = true;
    this.startX = e.touches[0].clientX;
    this.currentX = this.startX;
  };

  onTouchMove = (e) => {
    if (!this.isDragging) return;
    this.currentX = e.touches[0].clientX;
  };

  onTouchEnd = () => {
    if (!this.isDragging) return;
    const dx = this.currentX - this.startX;
    const threshold = 40; // px
    if (dx > threshold) this.prev(true);
    else if (dx < -threshold) this.next(true);
    this.isDragging = false;
  };

  start() {
    if (!this.autoplay || this.timer) return;
    this.timer = setInterval(() => this.next(false), this.interval);
  }

  stop() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  }

  prev(user = false) {
    this.index = (this.index - 1 + this.len) % this.len;
    this.update();
    if (user) this.restart();
  }

  next(user = false) {
    this.index = (this.index + 1) % this.len;
    this.update();
    if (user) this.restart();
  }

  goTo(i, user = false) {
    this.index = (i + this.len) % this.len;
    this.update();
    if (user) this.restart();
  }

  restart() {
    this.stop();
    this.start();
  }

  update() {
    // Posun pomocí translateX
    const offset = -this.index * 100;
    this.track.style.transform = `translateX(${offset}%)`;
    this.track.style.transition = 'transform 400ms ease';

    // Aktuální slide class
    this.slides.forEach((li, i) => li.classList.toggle('is-current', i === this.index));

    // Dots
    this.dots.forEach((d, i) => d.setAttribute('aria-current', i === this.index ? 'true' : 'false'));
  }
}

// Init všech karuselů na stránce sekce
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach(root => new SimpleCarousel(root));
});
