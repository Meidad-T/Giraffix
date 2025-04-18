document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 0;
    const steps = document.querySelectorAll('.form-step');
  
    window.nextStep = () => {
      if (currentStep < steps.length - 1) {
        steps[currentStep].classList.remove('active');
        currentStep += 1;
        steps[currentStep].classList.add('active');
      }
    };
  
    window.removeField = (id) => {
      const input = document.getElementById(id);
      if (input) {
        input.value = '';
        updatePreview();
      }
    };
  
    const updatePreview = () => {
      document.getElementById('previewName').textContent =
        document.getElementById('nameInput')?.value || 'Your Name';
  
      const phone = document.getElementById('phoneInput')?.value;
      const email = document.getElementById('emailInput')?.value;
      const address = document.getElementById('addressInput')?.value;
      const contact = [phone, email, address].filter(Boolean).join(' | ');
      document.getElementById('previewContact').textContent =
        contact || 'Phone | Email | Address';
  
      const institution = document.getElementById('eduInstitution')?.value;
      const degree = document.getElementById('eduDegree')?.value;
      const field = document.getElementById('eduField')?.value;
      const gpa = document.getElementById('eduGPA')?.value;
      const awards = document.getElementById('eduAwards')?.value;
      const start = document.getElementById('eduStart')?.value;
      const end = document.getElementById('eduEnd')?.value;
  
      const eduText = [
        institution && `<strong>${institution}</strong>`,
        degree,
        field,
        (start || end) && `(${start} - ${end})`,
        gpa && `GPA: ${gpa}`,
        awards && `Awards: ${awards}`
      ].filter(Boolean).join(', ');
  
      document.getElementById('educationList').innerHTML = eduText ? `<li>${eduText}</li>` : '';
    };
  
    document.getElementById('resumeForm').addEventListener('input', updatePreview);
    updatePreview();
  });
  