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

  const giraffeInput = document.getElementById('import-giraffe');

if (giraffeInput) {
  giraffeInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (!json.templateName || !json.userData) {
          alert("Invalid .giraffe file. Missing required fields.");
          return;
        }

        // Save data to sessionStorage
        sessionStorage.setItem("giraffe-import-data", JSON.stringify(json));


        // Redirect based on the templateName
        const templateName = json.templateName.toLowerCase();
        const url = `templates/${templateName}/index.html`;

        // Go to the resume editor for that template
        window.location.href = url;
      } catch (err) {
        alert("Failed to read .giraffe file.");
        console.error(err);
      }
    };
    reader.readAsText(file);
  });
}
  