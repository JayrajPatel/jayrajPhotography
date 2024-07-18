document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel');
  const tiles = document.querySelectorAll('.tile');
  const tileWidth = tiles[0].offsetWidth + 10; // Adjust for margin-right
  const images = Array.from(tiles).map(tile => tile.querySelector('img'));

  let currentIndex = 0;
  let timer;

  // Preload images and start carousel
  function startCarousel() {
      images.forEach(img => {
          const src = img.getAttribute('data-src');
          if (src) {
              const image = new Image();
              image.onload = () => {
                  img.src = src;
                  img.removeAttribute('data-src');
              };
              image.onerror = (err) => {
                  console.error('Error loading image:', err);
              };
              image.src = src; // Start loading image
          }
      });

      // Start auto-scrolling
      timer = setInterval(() => {
          currentIndex++;
          if (currentIndex >= tiles.length) {
              currentIndex = 0;
          }
          updateCarousel();
      }, 3000); // Adjust auto-scroll speed (3000ms = 3 seconds)
  }

  // Function to update carousel position
  function updateCarousel() {
      const offset = -currentIndex * tileWidth;
      carousel.style.transform = `translateX(${offset}px)`;
  }

  // Initialize carousel
  startCarousel();

  // Reset timer and restart auto-scrolling on mouseenter
  carousel.addEventListener('mouseenter', () => {
      clearInterval(timer);
  });

  // Resume auto-scrolling on mouseleave
  carousel.addEventListener('mouseleave', () => {
      startCarousel();
  });
});
