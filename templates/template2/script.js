// script.js

document.addEventListener("DOMContentLoaded", () => {
  const bind = (inputId, targetId, fallback = '') => {
    const input = document.getElementById(inputId);
    const target = document.getElementById(targetId);
    if (!input || !target) return;
    const update = () => {
      target.textContent = input.value.trim() || fallback;
    };
    input.addEventListener('input', update);
    update();
  };

  bind('input-name', 'name', 'Your Name');
  bind('input-phone', 'contact');
  bind('input-email', 'contact');
  bind('input-address', 'contact');

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

  const summaryInput = document.getElementById('input-summary');
  const summaryPreview = document.getElementById('summary');
  summaryInput.addEventListener('input', () => {
    summaryPreview.textContent = summaryInput.value.trim() || 'A passionate and detail-oriented professional...';
  });

  const eduBullets = [];
  const bulletContainer = document.createElement('div');
  bulletContainer.id = "edu-bullets-container";
  document.querySelector('[id="edu-end"]').closest('.form-section').appendChild(bulletContainer);

  const renderEducation = () => {
    const school = document.getElementById('edu-school')?.value;
    const degree = document.getElementById('edu-degree')?.value;
    const gpa = document.getElementById('edu-gpa')?.value;
    const start = document.getElementById('edu-start')?.value;
    const end = document.getElementById('edu-end')?.value;
    const startYear = start?.split('-')[0];
    const endYear = end?.split('-')[0];
    const bulletItems = eduBullets.filter(b => b.trim() !== '');
    const bulletHTML = bulletItems.length ? '<ul>' + bulletItems.map(b => `<li>${b}</li>`).join('') + '</ul>' : '';
    const educationHTML = `
      <div class="education-entry">
        <p><strong>${school || ''}</strong> - ${degree || ''} ${gpa ? `(GPA: ${gpa})` : ''}</p>
        <p><small>${startYear || ''} - ${endYear || ''}</small></p>
        ${bulletHTML}
      </div>
    `;
    document.getElementById('education-section').innerHTML = educationHTML;
  };

  ['edu-school', 'edu-degree', 'edu-gpa', 'edu-start', 'edu-end'].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.addEventListener('input', renderEducation);
  });

  const addBulletBtn = document.createElement('button');
  addBulletBtn.textContent = '+ Add Achievement';
  addBulletBtn.type = 'button';
  addBulletBtn.className = 'cta-button';
  document.querySelector('[id="edu-end"]').closest('.form-section').appendChild(addBulletBtn);

  addBulletBtn.addEventListener('click', () => {
    eduBullets.push('');
    renderEduBullets();
    renderEducation();
  });

  const renderEduBullets = () => {
    bulletContainer.innerHTML = eduBullets.map((val, i) => `
      <div class="form-group">
        <input type="text" class="edu-bullet-input" data-index="${i}" value="${val}" placeholder="e.g. Dean’s List, 3 semesters" />
      </div>
    `).join('');
  };

  bulletContainer.addEventListener('input', e => {
    if (e.target.classList.contains('edu-bullet-input')) {
      const index = e.target.dataset.index;
      eduBullets[index] = e.target.value;
      renderEducation();
    }
  });

  const skillsInput = document.getElementById('skills-input');
  skillsInput.addEventListener('input', () => {
    const list = skillsInput.value.split(',').map(skill => skill.trim()).filter(Boolean);
    document.getElementById('skills-list').innerHTML = list.map(skill => `<li>${skill}</li>`).join('');
  });

  const interestsInput = document.getElementById('interests-input');
  interestsInput.addEventListener('input', () => {
    const list = interestsInput.value.split(',').map(int => int.trim()).filter(Boolean);
    document.getElementById('interests-list').innerHTML = list.map(int => `<li>${int}</li>`).join('');
  });

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

  const renderExperience = () => {
    const title = document.getElementById('exp-title')?.value.trim();
    const company = document.getElementById('exp-company')?.value.trim();
    const start = document.getElementById('exp-start')?.value;
    const end = document.getElementById('exp-end')?.value;
    const desc = document.getElementById('exp-desc')?.value.trim();
    const startDate = start ? start.split('-').reverse().join('/') : '';
    const endDate = end ? end.split('-').reverse().join('/') : '';
    const experienceHTML = `
      <div class="experience-entry">
        <p><strong>${title || ''}</strong> at ${company || ''}</p>
        <p><small>${startDate || ''} - ${endDate || ''}</small></p>
        <p>${desc || ''}</p>
      </div>
    `;
    document.getElementById('experience-section').innerHTML = experienceHTML;
  };
  ['exp-title', 'exp-company', 'exp-start', 'exp-end', 'exp-desc'].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.addEventListener('input', renderExperience);
  });

  document.getElementById('resume-form').addEventListener('submit', e => e.preventDefault());

  const resume = document.getElementById('resume');
  const colorInput = document.getElementById('resume-color');
  const textColorInput = document.getElementById('text-color');

  const applyTextColor = (color) => {
    document.querySelectorAll('#resume h1, #resume p, #resume li, #resume .section-title').forEach(el => {
      el.style.color = color;
    });
  };

  const updateGradient = () => {
    const color = colorInput.value;
    resume.style.background = `linear-gradient(180deg, ${color}, #ffffff)`;
  };

  colorInput.addEventListener('input', updateGradient);
  textColorInput?.addEventListener('input', () => applyTextColor(textColorInput.value));

  updateGradient();
  applyTextColor(textColorInput?.value || '#00796b');

  const finalColorInput = document.getElementById('resume-color-final');
  const finalTextColorInput = document.getElementById('text-color-final');

  if (finalColorInput) {
    finalColorInput.addEventListener('input', () => {
      const color = finalColorInput.value;
      resume.style.background = `linear-gradient(180deg, ${color}, #ffffff)`;
      colorInput.value = color;
    });
    colorInput.addEventListener('input', () => {
      finalColorInput.value = colorInput.value;
    });
  }

  if (finalTextColorInput) {
    finalTextColorInput.addEventListener('input', () => {
      applyTextColor(finalTextColorInput.value);
      textColorInput.value = finalTextColorInput.value;
    });
    textColorInput.addEventListener('input', () => {
      finalTextColorInput.value = textColorInput.value;
    });
  }

  updateContact();
  renderEducation();
  renderExperience();
  renderProject();

  const wrapper = document.querySelector('.form-sections-wrapper');
  const sections = document.querySelectorAll('.form-section');
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  let currentIndex = 0;

  const updateSectionView = () => {
    sections.forEach((section, index) => {
      section.classList.toggle('active', index === currentIndex);
    });
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === sections.length - 1;
  };

  nextBtn.addEventListener('click', () => {
    if (currentIndex < sections.length - 1) currentIndex++;
    updateSectionView();
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) currentIndex--;
    updateSectionView();
  });

  updateSectionView();

  const downloadBtn = document.getElementById('download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const element = document.getElementById('resume');

      const opt = {
        margin:       [70, 40, 70, 40],
        filename:     'resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  {
          scale: 2,
          logging: false,
          useCORS: true,
          scrollY: 0
        },
        jsPDF: {
          unit: 'pt',
          format: 'a4',
          orientation: 'portrait'
        },
        pagebreak: {
          mode: ['avoid-all', 'css', 'legacy']
        }
      };

      html2pdf().set(opt).from(element).save();
    });
  }
});