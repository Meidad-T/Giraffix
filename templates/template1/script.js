document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".form-step");
    const nextBtns = document.querySelectorAll(".next-step");
    let currentStep = 0;
  
    const updateResume = () => {
      document.getElementById("preview-name").textContent =
        document.getElementById("input-name").value || "Your Name";
  
      document.getElementById("preview-role").textContent =
        document.getElementById("input-role").value || "Your Job Title";
  
      const email = document.getElementById("input-email").value;
      const phone = document.getElementById("input-phone").value;
      const address = document.getElementById("input-address").value;
      const contact = [email, phone, address].filter(Boolean).join(" | ");
      document.getElementById("preview-contact").textContent =
        contact || "Email | Phone | Address";
  
      document.getElementById("preview-education").innerHTML =
        `<li>${document.getElementById("input-education").value}</li>`;
  
      document.getElementById("preview-experience").innerHTML =
        `<li>${document.getElementById("input-experience").value}</li>`;
  
      document.getElementById("preview-projects").innerHTML =
        `<li>${document.getElementById("input-projects").value}</li>`;
  
      const hobbies = document.getElementById("input-hobbies").value;
      document.getElementById("preview-hobbies").innerHTML =
        hobbies.split(',').map(h => `<li>${h.trim()}</li>`).join('');
    };
  
    document.getElementById("form").addEventListener("input", updateResume);
  
    nextBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        steps[currentStep].classList.remove("active");
        currentStep = Math.min(currentStep + 1, steps.length - 1);
        steps[currentStep].classList.add("active");
      });
    });
  
    updateResume();
  });
  