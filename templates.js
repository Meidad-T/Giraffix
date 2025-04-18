// templates.js

// Smooth carousel fade logic
window.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-preview');
  
    carousels.forEach(carousel => {
      const folder = carousel.dataset.folder;
      const total = parseInt(carousel.dataset.total, 10);
      let current = 1;
  
      const img1 = carousel.querySelectorAll('img')[0];
      const img2 = carousel.querySelectorAll('img')[1];
  
      let showingFirst = true;
  
      setInterval(() => {
        current = (current % total) + 1;
        const nextImg = `${folder}/preview_${current}.png`;
  
        if (showingFirst) {
          img2.src = nextImg;
          img2.classList.add('active');
          img1.classList.remove('active');
        } else {
          img1.src = nextImg;
          img1.classList.add('active');
          img2.classList.remove('active');
        }
  
        showingFirst = !showingFirst;
      }, 3000);
    });
  });
  