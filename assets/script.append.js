// Hide header on scroll down, show on scroll up
(function(){
  const header = document.querySelector('.header');
  if (!header) return;

  let lastY = window.scrollY;
  let ticking = false;
  const threshold = 80; // start hiding after this many px
  const minDelta = 10; // minimal delta to consider

  const onScrollDirection = () => {
    const y = window.scrollY;

    // Always show header at very top
    if (y <= 0) {
      header.classList.remove('hide');
      lastY = y;
      return;
    }

    // scrolling down
    if (y - lastY > minDelta && y > threshold) {
      header.classList.add('hide');
    }
    // scrolling up
    else if (lastY - y > minDelta) {
      header.classList.remove('hide');
    }

    lastY = y;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => { onScrollDirection(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
})();
