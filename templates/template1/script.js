document.addEventListener("DOMContentLoaded", () => {
    const bind = (inputId, targetId, fallback = '') => {
      const input = document.getElementById(inputId);
      const target = document.getElementById(targetId);
  
      if (!input || !target) return;
      const update = () => {
        target.textContent = input.value.trim() || fallback;
      };
      input.addEventListener('input', update);
      update(); // initial
    };
  
    bind('input-name', 'name', 'Your Name');
    bind('input-phone', 'contact');
    bind('input-email', 'contact');
    bind('input-address', 'contact');
  
    // Combine contact fields
    const updateContact = () => {
      const phone = document.getElementById('input-phone')?.value.trim();
      const email = document.getElementById('input-email')?.value.trim();
      const address = document.getElementById('input-address')?.value.trim();
      const combined = [phone, email, address].filter(Boolean).join(" | ");
      document.getElementById('contact').textContent = combined || 'Phone | Email | Address';
    };
  
    ['input-phone', 'input-email', 'input-address'].forEach(id => {
      const input = document.getElementById(id);
      if (input) input.addEventListener('input', updateContact);
    });
  
    // Summary
    const summaryInput = document.getElementById('input-summary');
    const summaryPreview = document.getElementById('summary');
    summaryInput.addEventListener('input', () => {
      summaryPreview.textContent = summaryInput.value.trim() || 'A passionate and detail-oriented professional...';
    });
  
    // Education section
    const renderEducation = () => {
      const school = document.getElementById('edu-school').value;
      const degree = document.getElementById('edu-degree').value;
      const start = document.getElementById('edu-start').value;
      const end = document.getElementById('edu-end').value;
  
      const educationHTML = `
        <div class="education-entry">
          <p><strong>${school || ''}</strong> - ${degree || ''}</p>
          <p><small>${start || ''} to ${end || ''}</small></p>
        </div>
      `;
      document.getElementById('education-section').innerHTML = educationHTML;
    };
  
    ['edu-school', 'edu-degree', 'edu-start', 'edu-end'].forEach(id => {
      const input = document.getElementById(id);
      if (input) input.addEventListener('input', renderEducation);
    });
  
    // Skills
    const skillsInput = document.getElementById('skills-input');
    skillsInput.addEventListener('input', () => {
      const list = skillsInput.value.split(',').map(skill => skill.trim()).filter(Boolean);
      document.getElementById('skills-list').innerHTML = list.map(skill => `<li>${skill}</li>`).join('');
    });
  
    // Interests
    const interestsInput = document.getElementById('interests-input');
    interestsInput.addEventListener('input', () => {
      const list = interestsInput.value.split(',').map(int => int.trim()).filter(Boolean);
      document.getElementById('interests-list').innerHTML = list.map(int => `<li>${int}</li>`).join('');
    });
  
    // Projects
    const projTitle = document.getElementById('proj-title');
    const projDesc = document.getElementById('proj-desc');
    const renderProject = () => {
      const html = `
        <div class="project-entry">
          <p><strong>${projTitle.value}</strong></p>
          <p>${projDesc.value}</p>
        </div>
      `;
      document.getElementById('projects-section').innerHTML = html;
    };
  
    projTitle.addEventListener('input', renderProject);
    projDesc.addEventListener('input', renderProject);
  
    // Live update on form submit (disable default)
    document.getElementById('resume-form').addEventListener('submit', e => {
      e.preventDefault();
    });
  
    // Init render
    updateContact();
    renderEducation();
    renderProject();
  });
  